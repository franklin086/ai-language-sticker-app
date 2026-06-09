$NodeDir = "C:\Users\linfa\Downloads\tools\node-v22.22.3-win-x64"

if (-not (Test-Path (Join-Path $NodeDir "node.exe"))) {
  throw "Portable Node 22 was not found at $NodeDir"
}

$env:Path = "$NodeDir;$env:Path"

Write-Host "Using Node:" (& node -v)
Write-Host "Using npm:" (& npm -v)
