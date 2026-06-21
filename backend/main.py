import json
import mimetypes
import os
from pathlib import Path
from typing import Literal

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from pydantic import BaseModel

load_dotenv(Path(__file__).with_name(".env"))

app = FastAPI(title="AI Language Sticker Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8081",
        "http://127.0.0.1:8081",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RecognitionResult(BaseModel):
    object_en: str
    object_zh: str
    specific_en: str = ""
    specific_zh: str = ""
    brand: str = ""
    subtype: str = ""
    confidence: Literal["low", "medium", "high"]
    needs_follow_up: bool = False
    follow_up_question: str = ""


def log_backend_event(message: str) -> None:
    print(f"[recognize] {message}", flush=True)


def log_safe_error(context: str, exc: Exception) -> None:
    message = str(exc)
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        message = message.replace(api_key, "[REDACTED_GEMINI_API_KEY]")

    print(f"[{context}] Error type: {type(exc).__name__}", flush=True)
    print(f"[{context}] Error message: {message}", flush=True)


def get_image_media_type(file: UploadFile) -> str:
    if file.content_type and file.content_type.startswith("image/"):
        return file.content_type

    guessed_type, _ = mimetypes.guess_type(file.filename or "")
    if guessed_type and guessed_type.startswith("image/"):
        return guessed_type

    raise HTTPException(status_code=400, detail="Please upload an image file.")


@app.post("/api/recognize", response_model=RecognitionResult)
async def recognize_image(file: UploadFile = File(...)) -> RecognitionResult:
    log_backend_event("recognize request received")

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not configured.")

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded image is empty.")

    media_type = get_image_media_type(file)
    log_backend_event(
        f"image received filename={file.filename or 'unknown'} "
        f"content_type={media_type} size_bytes={len(image_bytes)}"
    )

    client = genai.Client(api_key=api_key)

    try:
        log_backend_event("gemini request started")
        response = client.models.generate_content(
            model=os.getenv("GEMINI_VISION_MODEL", "gemini-1.5-flash"),
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type=media_type),
                (
                    "Identify the main visible object in this image for a children's learning app. "
                    "Return JSON only. Keep object_zh and object_en as the simple base object used for matching, "
                    "such as 汽车/car, 狗/dog, 人物/person, 男人/man, 女人/woman, 孩子/child, 手机/phone, 电脑/computer. "
                    "Use specific_zh and specific_en for the more precise visible name when you can tell it, "
                    "such as 黑色奔驰SUV/black Mercedes-Benz SUV, 比熊犬/Bichon Frise dog, iPhone/iPhone, "
                    "笔记本电脑/laptop, MacBook/MacBook. "
                    "If a brand or subtype is clearly visible, fill brand and subtype. If not clear, leave brand empty "
                    "and do not guess. If more precision is possible but uncertain, set needs_follow_up to true and "
                    "write a short follow_up_question in Simplified Chinese. "
                    "Return these fields: object_zh, object_en, specific_zh, specific_en, brand, subtype, "
                    "confidence (low, medium, or high), needs_follow_up, follow_up_question."
                ),
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=RecognitionResult,
            ),
        )
        log_backend_event("gemini request completed")
    except Exception as exc:
        log_backend_event("gemini error")
        log_safe_error("Gemini image recognition failed", exc)
        raise HTTPException(status_code=502, detail="Gemini image recognition failed.") from exc

    try:
        result = json.loads(response.text or "{}")
        recognized = RecognitionResult(**result)
        log_backend_event("response returned")
        return recognized
    except Exception as exc:
        log_safe_error("Gemini response parsing failed", exc)
        raise HTTPException(status_code=502, detail="Gemini returned an unexpected response.") from exc


@app.post("/api/recognize/follow-up", response_model=RecognitionResult)
async def follow_up_recognize_image(
    file: UploadFile = File(...),
    object_en: str = Form(""),
    object_zh: str = Form(""),
    specific_en: str = Form(""),
    specific_zh: str = Form(""),
) -> RecognitionResult:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not configured.")

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded image is empty.")

    media_type = get_image_media_type(file)
    client = genai.Client(api_key=api_key)

    base_zh = object_zh or "未知物体"
    base_en = object_en or "object"

    try:
        response = client.models.generate_content(
            model=os.getenv("GEMINI_VISION_MODEL", "gemini-1.5-flash"),
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type=media_type),
                (
                    "This is a follow-up recognition request for a children's learning app. "
                    f"The previous base object was {base_zh}/{base_en}. "
                    f"The previous specific guess was {specific_zh}/{specific_en}. "
                    "Keep object_zh and object_en as the same simple base object for app matching. "
                    "Do not simply repeat generic words such as 汽车/car, 狗/dog, 人物/person, 男人/man, 女人/woman, 孩子/child. "
                    "Focus on a more specific visible answer: brand, model, breed, job, role, or concrete subtype. "
                    "Examples: Mercedes-Benz SUV, Bichon Frise dog, teacher, firefighter, iPhone, MacBook, laptop. "
                    "If a brand is not clearly visible, leave brand empty and do not guess. "
                    "Return JSON only with these fields: object_zh, object_en, specific_zh, specific_en, brand, subtype, "
                    "confidence (low, medium, or high), needs_follow_up, follow_up_question. "
                    "Set needs_follow_up to false when the follow-up gives a better specific answer."
                ),
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=RecognitionResult,
            ),
        )
    except Exception as exc:
        log_safe_error("Gemini follow-up recognition failed", exc)
        raise HTTPException(status_code=502, detail="Gemini follow-up recognition failed.") from exc

    try:
        result = json.loads(response.text or "{}")
        result["object_zh"] = object_zh or result.get("object_zh", "")
        result["object_en"] = object_en or result.get("object_en", "")
        return RecognitionResult(**result)
    except Exception as exc:
        log_safe_error("Gemini follow-up response parsing failed", exc)
        raise HTTPException(status_code=502, detail="Gemini returned an unexpected follow-up response.") from exc
