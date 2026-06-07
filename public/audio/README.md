# Local Audio Assets

This folder is reserved for future local pronunciation files.

First phase support:

```text
public/audio/
  zh/
    panda.mp3
    cat.mp3
    dog.mp3
    car.mp3
    cup.mp3
    book.mp3
    phone.mp3
    computer.mp3
    rocket.mp3
    camera.mp3
  en/
    panda.mp3
    cat.mp3
    dog.mp3
    car.mp3
    cup.mp3
    book.mp3
    phone.mp3
    computer.mp3
    rocket.mp3
    camera.mp3
```

Only `zh` and `en` are planned for real local audio in this phase.
`es`, `pt`, and `ja` remain manifest placeholders and should fall back to the future audio strategy.

Do not import MP3 files in TypeScript. Use public path strings such as `/audio/en/panda.mp3`.
Do not commit large generated audio files unless the project explicitly asks for them.
