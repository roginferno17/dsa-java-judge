<#
  Sets up the `dsa` terminal command. Run this once:

      powershell -ExecutionPolicy Bypass -File scripts\install-command.ps1

  What it does, and nothing else:
    1. Creates %USERPROFILE%\bin if it does not exist.
    2. Writes a two-line shim there that calls scripts\dsa.cmd in this repo.
    3. Adds %USERPROFILE%\bin to your USER Path, if it is not already on it.

  It does not need admin rights, does not touch the system-wide Path, and does
  not install anything. Undo it by deleting %USERPROFILE%\bin\dsa.cmd and
  removing that folder from your Path in the environment-variables dialog.

  The shim is deliberately thin: the real logic lives in scripts\dsa.cmd inside
  the repo, so `git pull` updates the command and you never rerun this.
#>

$ErrorActionPreference = 'Stop'

$repo    = Split-Path -Parent $PSScriptRoot
$target  = Join-Path $repo 'scripts\dsa.cmd'
$binDir  = Join-Path $env:USERPROFILE 'bin'
$shim    = Join-Path $binDir 'dsa.cmd'

if (-not (Test-Path $target)) {
    Write-Host "[!] Could not find $target" -ForegroundColor Red
    Write-Host "    Run this from inside the repo: powershell -ExecutionPolicy Bypass -File scripts\install-command.ps1"
    exit 1
}

Write-Host ''
Write-Host '  Installing the `dsa` command' -ForegroundColor Cyan
Write-Host ''

# 1. Somewhere to put it -----------------------------------------------------
if (-not (Test-Path $binDir)) {
    New-Item -ItemType Directory -Path $binDir | Out-Null
    Write-Host "  [+] Created $binDir"
} else {
    Write-Host "  [=] $binDir already exists"
}

# 2. The shim ----------------------------------------------------------------
# %* forwards arguments, so `dsa stop` and `dsa here` reach the real script.
$shimBody = @"
@echo off
call "$target" %*
"@

if ((Test-Path $shim) -and ((Get-Content $shim -Raw).Trim() -eq $shimBody.Trim())) {
    Write-Host "  [=] Shim already up to date"
} else {
    Set-Content -Path $shim -Value $shimBody -Encoding ASCII
    Write-Host "  [+] Wrote $shim"
}

# 3. PATH --------------------------------------------------------------------
# User-level only. Read the stored value rather than $env:Path, which is the
# already-expanded copy this process inherited.
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($null -eq $userPath) { $userPath = '' }

$onPath = $userPath.Split(';') | Where-Object { $_.TrimEnd('\') -ieq $binDir.TrimEnd('\') }

if ($onPath) {
    Write-Host "  [=] $binDir is already on your Path"
    $needsNewTerminal = $false
} else {
    $updated = if ($userPath.TrimEnd(';')) { "$($userPath.TrimEnd(';'));$binDir" } else { $binDir }
    [Environment]::SetEnvironmentVariable('Path', $updated, 'User')
    Write-Host "  [+] Added $binDir to your Path"
    $needsNewTerminal = $true
}

# Make it work in THIS session too, so it can be tried immediately.
if ($env:Path -notlike "*$binDir*") { $env:Path = "$env:Path;$binDir" }

Write-Host ''
Write-Host '  Done.' -ForegroundColor Green
Write-Host ''
if ($needsNewTerminal) {
    Write-Host '  Open a NEW terminal, then from any folder:' -ForegroundColor Yellow
} else {
    Write-Host '  From any folder:'
}
Write-Host ''
Write-Host '      dsa          start it, or open the browser if already running'
Write-Host '      dsa here     run in this terminal, with logs'
Write-Host '      dsa stop     stop a background server'
Write-Host '      dsa help     all of the above'
Write-Host ''
