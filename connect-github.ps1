param(
    [Parameter(Mandatory=$true)]
    [string]$Repo,

    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

function Write-Step($msg) {
    Write-Host ""
    Write-Host "==> $msg" -ForegroundColor Cyan
}

function Test-Command($name) {
    return $null -ne (Get-Command $name -ErrorAction SilentlyContinue)
}

Write-Step "Check Git"
if (-not (Test-Command "git")) {
    throw "Git not found. Please install Git for Windows first."
}
git --version

Write-Step "Initialize git repository"
if (-not (Test-Path ".git")) {
    git init
}

git branch -M $Branch

Write-Step "Create .gitignore"
$gitignore = @(
"# Dependencies",
"node_modules/",
".pnpm-store/",
".npm/",
".yarn/",
"",
"# Build outputs",
"dist/",
"build/",
"coverage/",
".cache/",
".tmp/",
"temp/",
"",
"# Environment and secrets",
".env",
".env.*",
"!.env.example",
"*.pem",
"*.key",
"*.p12",
"*.jks",
"google-services.json",
"GoogleService-Info.plist",
"firebase-adminsdk*.json",
"serviceAccount*.json",
"",
"# Logs",
"*.log",
"npm-debug.log*",
"yarn-debug.log*",
"pnpm-debug.log*",
"",
"# OS and IDE",
".DS_Store",
"Thumbs.db",
".vscode/*",
"!.vscode/extensions.json",
".idea/",
"",
"# Codex local notes",
".codex-local/"
)
Set-Content -Path ".gitignore" -Value $gitignore -Encoding UTF8

Write-Step "Create .env.example"
$envExample = @(
"OPENAI_API_KEY=",
"DATABASE_URL=",
"FIREBASE_PROJECT_ID=",
"FIREBASE_API_KEY="
)
Set-Content -Path ".env.example" -Value $envExample -Encoding UTF8

Write-Step "Create README.md"
$readme = @(
"# AI Language Sticker App",
"",
"AI interactive language learning app.",
"",
"## Core Features",
"",
"- Camera object recognition",
"- Background removal",
"- Cute interactive word stickers",
"- 9 languages",
"- Real voice pronunciation",
"- Smart review system",
"- No ads and no subscriptions",
"",
"## Git Commands",
"",
"```powershell",
"git pull",
"git add .",
"git commit -m ""Update""",
"git push",
"```",
"",
"## Codex Rules",
"",
"1. Give Codex one small task each time.",
"2. Do not commit real API keys.",
"3. Update docs when features change.",
"4. Test before pushing."
)
Set-Content -Path "README.md" -Value $readme -Encoding UTF8

Write-Step "Create docs/CODEX_TASKS.md"
New-Item -ItemType Directory -Force -Path "docs" | Out-Null

$tasks = @(
"# Codex Tasks",
"",
"## Phase 0 - Project Setup",
"",
"- [ ] Choose tech stack",
"- [ ] Initialize app project",
"- [ ] Setup GitHub repo",
"- [ ] Setup environment variables",
"- [ ] Setup README",
"",
"## Phase 1 - MVP",
"",
"- [ ] Camera input",
"- [ ] Photo preview",
"- [ ] AI object recognition mock",
"- [ ] Background removal mock",
"- [ ] Sticker card UI",
"- [ ] Multi-language word display",
"- [ ] Voice playback",
"",
"## Phase 2 - Learning System",
"",
"- [ ] Favorites",
"- [ ] Review queue",
"- [ ] Spaced repetition",
"- [ ] Learning history",
"",
"## Codex Prompt Template",
"",
"Task:",
"Implement [feature name].",
"",
"Requirements:",
"1. Do not break existing features.",
"2. Explain modified files.",
"3. Provide run and test commands.",
"4. Update .env.example if needed.",
"5. Never commit real API keys."
)
Set-Content -Path "docs/CODEX_TASKS.md" -Value $tasks -Encoding UTF8

Write-Step "Configure GitHub remote"
$remoteUrl = "https://github.com/$Repo.git"

$originExists = $false
try {
    git remote get-url origin | Out-Null
    $originExists = $true
} catch {
    $originExists = $false
}

if ($originExists) {
    git remote set-url origin $remoteUrl
} else {
    git remote add origin $remoteUrl
}

Write-Step "Commit files"
git add .

$changes = git status --porcelain
if ($changes) {
    git commit -m "Initial Codex GitHub setup"
} else {
    Write-Host "No changes to commit."
}

Write-Step "Push to GitHub"
git push -u origin $Branch

Write-Host ""
Write-Host "Done. Connected to https://github.com/$Repo" -ForegroundColor Green
