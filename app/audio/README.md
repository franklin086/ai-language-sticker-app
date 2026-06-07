# Local Audio Assets

This directory is reserved for future local pronunciation files.

Planned structure:

```text
app/audio/
  zh/
  en/
  es/
  pt/
  ja/
```

Current v0.64B does not include real audio files.

Do not import missing `.mp3` files from code yet. The app only uses `audioManifest` string placeholders so Metro will not fail when files are absent.
