<#
  Creates Desktop and Start Menu shortcuts that open DSA Java Judge as a desktop
  app — its own window, its own icon, no terminal.

  Run once:
      powershell -ExecutionPolicy Bypass -File scripts\install-desktop-app.ps1

  Creates two .lnk files and nothing else. No admin rights, no registry, no
  installer. Delete the shortcuts to undo it.
#>

param(
    [switch]$NoDesktop,
    [switch]$NoStartMenu
)

$ErrorActionPreference = 'Stop'

$repo    = Split-Path -Parent $PSScriptRoot
$launch  = Join-Path $repo 'scripts\desktop-app.ps1'
$icon    = Join-Path $repo 'src\app\favicon.ico'

if (-not (Test-Path $launch)) {
    Write-Host "[!] Could not find $launch" -ForegroundColor Red
    exit 1
}

Write-Host ''
Write-Host '  Installing the DSA Java Judge desktop shortcuts' -ForegroundColor Cyan
Write-Host ''

$shell = New-Object -ComObject WScript.Shell

function New-AppShortcut {
    param([string]$Path)

    $sc = $shell.CreateShortcut($Path)
    $sc.TargetPath = (Get-Command powershell.exe).Source
    # -WindowStyle Hidden plus a minimised shortcut keeps the console out of sight.
    $sc.Arguments  = "-ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -File `"$launch`""
    $sc.WorkingDirectory = $repo
    $sc.Description = 'DSA Java Judge - local Striver A2Z practice'
    $sc.WindowStyle = 7          # minimised
    if (Test-Path $icon) { $sc.IconLocation = $icon }
    $sc.Save()
}

$made = @()

if (-not $NoDesktop) {
    $desktop = [Environment]::GetFolderPath('Desktop')
    $path = Join-Path $desktop 'DSA Java Judge.lnk'
    New-AppShortcut -Path $path
    $made += $path
    Write-Host "  [+] Desktop shortcut"
}

if (-not $NoStartMenu) {
    $startMenu = Join-Path ([Environment]::GetFolderPath('ApplicationData')) 'Microsoft\Windows\Start Menu\Programs'
    if (-not (Test-Path $startMenu)) { New-Item -ItemType Directory -Path $startMenu -Force | Out-Null }
    $path = Join-Path $startMenu 'DSA Java Judge.lnk'
    New-AppShortcut -Path $path
    $made += $path
    Write-Host "  [+] Start Menu entry (search for 'DSA Java Judge')"
}

Write-Host ''
Write-Host '  Done.' -ForegroundColor Green
Write-Host ''
Write-Host '  The shortcut starts the server if it is not already running, then opens'
Write-Host '  the app in its own window. Closing that window stops the server.'
Write-Host ''
Write-Host '  Even closer to a real app: open it once, then use your browser''s'
Write-Host '  "Install DSA Java Judge" item (Chrome: the icon in the address bar,'
Write-Host '  or menu > Cast, save and share > Install page as app). That registers'
Write-Host '  it properly with Windows, using the web manifest this repo ships.'
Write-Host ''
foreach ($m in $made) { Write-Host "    $m" -ForegroundColor DarkGray }
Write-Host ''
