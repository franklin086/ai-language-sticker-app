import json
import mimetypes
import os
from pathlib import Path
from typing import Literal

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
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
    confidence: Literal["low", "medium", "high"]


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
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not configured.")

    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Uploaded image is empty.")

    media_type = get_image_media_type(file)
    client = genai.Client(api_key=api_key)

    try:
        response = client.models.generate_content(
            model=os.getenv("GEMINI_VISION_MODEL", "gemini-1.5-flash"),
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type=media_type),
                (
                    "Identify the main object in this image. "
                    "Return only the object name in English, the object name in Simplified Chinese, "
                    "and a confidence value of low, medium, or high."
                ),
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=RecognitionResult,
            ),
        )
    except Exception as exc:
        log_safe_error("Gemini image recognition failed", exc)
        raise HTTPException(status_code=502, detail="Gemini image recognition failed.") from exc

    try:
        result = json.loads(response.text or "{}")
        return RecognitionResult(**result)
    except Exception as exc:
        log_safe_error("Gemini response parsing failed", exc)
        raise HTTPException(status_code=502, detail="Gemini returned an unexpected response.") from exc
