# 自动拉取远程更新
# 用法：powershell -ExecutionPolicy Bypass -File .\auto-pull.ps1

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".git")) {
    throw "当前目录不是 Git 仓库，请先运行 connect-github.ps1"
}

Write-Host "==> 检查本地未提交改动"
$status = git status --porcelain
if ($status) {
    Write-Host "发现未提交改动，先自动 stash。" -ForegroundColor Yellow
    git stash push -u -m "auto-stash-before-pull"
    $stashed = $true
} else {
    $stashed = $false
}

Write-Host "==> 拉取远程代码"
git pull --rebase

if ($stashed) {
    Write-Host "==> 恢复本地改动"
    git stash pop
}

Write-Host "完成：已同步远程更新。" -ForegroundColor Green
