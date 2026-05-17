# Agent Instructions

This repository is in the early planning/bootstrap stage for the AI Language Sticker App.

Before starting implementation work, read:

- `docs/AGENT_MEMORY.md`
- `README.md`
- `docs/CODEX_TASKS.md`

Project direction:

- Build an Expo React Native app with TypeScript and Expo Router.
- Prioritize the MVP flow: camera scan -> AI recognition -> animated sticker -> pronunciation.
- Keep the first version focused on WOW feeling rather than AR, social features, or custom AI models.
- Never commit real API keys or secret files.
- Update docs when product decisions or feature behavior change.
- Test before pushing.

Coding principles:

- Follow the local `karpathy-guidelines` skill for all coding work.
- Think before coding: state assumptions, surface uncertainty, and ask when the decision is risky.
- Keep implementations simple and focused on the requested task.
- Make surgical changes only; do not refactor unrelated code.
- Define success criteria and verify changes with appropriate tests or commands.

Collaboration with the user:

- The user is not a programmer. When user judgment is needed, explain the purpose, reason, and recommended option in plain language.
- For complex decisions or operations, break the work into clear steps and guide the user one step at a time.
- Prefer a recommended path instead of presenting many equal choices, while still naming meaningful tradeoffs.

Known notes:

- The app source has been initialized as a minimal Expo React Native app.
- The first screen is intentionally simple and does not request camera or album permissions yet.
- `README.md` currently has a malformed Git command code block.
- Some Chinese text in the PowerShell helper scripts appears to have encoding issues.
