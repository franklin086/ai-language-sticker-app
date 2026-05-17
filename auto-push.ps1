# 自动提交并推送
# 用法：
#   powershell -ExecutionPolicy Bypass -File .\auto-push.ps1
#   powershell -ExecutionPolicy Bypass -File .\auto-push.ps1 -Message "实现相机识别页面"

param(
    [string]$Message = "Update by Codex"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".git")) {
    throw "当前目录不是 Git 仓库，请先运行 connect-github.ps1"
}

Write-Host "==> 查看改动"
git status --short

$changes = git status --porcelain
if (-not $changes) {
    Write-Host "没有需要提交的改动。" -ForegroundColor Yellow
    exit 0
}

Write-Host "==> 添加文件"
git add .

Write-Host "==> 提交"
git commit -m $Message

Write-Host "==> 推送"
git push

Write-Host "完成：已推送到 GitHub。" -ForegroundColor Green
