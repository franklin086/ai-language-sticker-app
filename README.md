# AI Language Sticker App

AI Language Sticker App is an Expo React Native app for playful language learning. The MVP flow is:

1. Pick or capture an image.
2. Recognize the main object with the FastAPI + Gemini backend.
3. Turn the result into a cute word sticker.
4. Show Chinese and English names with pronunciation.
5. Save discoveries into a magic collection.

## Tech Stack

- Frontend: Expo, React Native, TypeScript, Expo Router
- Image input: `expo-image-picker`
- Voice: `expo-speech`
- Backend: FastAPI
- AI vision: Google Gemini via `google-genai`

## Node Version

Use Node 22 LTS for this project. The global system Node may be newer, but Expo is usually more stable on LTS.

This machine has a portable Node 22 installed at:

```powershell
C:\Users\linfa\Downloads\tools\node-v22.22.3-win-x64
```

Enable it for the current PowerShell session:

```powershell
.\scripts\use-node22.ps1
```

Check the active version:

```powershell
node -v
npm -v
```

Expected:

```text
v22.22.3
10.9.8
```

## Frontend Setup

```powershell
npm install
npm run verify
npm run web
```

`npm run web` is configured for lower local resource usage:

```powershell
set BROWSER=none&& expo start --web --offline --max-workers 1
```

## Backend Setup

Use the project-local Python environment:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

Create `backend\.env` from `backend\.env.example`:

```powershell
GEMINI_API_KEY=
GEMINI_VISION_MODEL=gemini-1.5-flash
```

Start the backend:

```powershell
.\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

## Verification

Frontend:

```powershell
npm run verify
```

Backend import check:

```powershell
.\.venv\Scripts\python.exe -c "import backend.main as m; print(type(m.app).__name__)"
```

Expected backend output:

```text
FastAPI
```

## Git Commands

```powershell
git pull
git status
git add .
git commit -m "Update"
git push
```

## Rules

- Do not commit real API keys.
- Keep `.venv/`, `.expo/`, `node_modules/`, and `.env` files out of Git.
- Run `npm run verify` before pushing frontend changes.
- Use the project `.venv` for backend work instead of global Python.
- Keep the MVP focused: image input, recognition, sticker UI, multilingual display, and voice playback.
