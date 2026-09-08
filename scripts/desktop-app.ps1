<#
  Opens DSA Java Judge as a desktop app: its own window, its own taskbar icon,
  no address bar, no tabs, and no terminal window left sitting behind it.

  It starts the server first if it is not already running, so this is the only
  thing a shortcut needs to point at.

  Deliberately not Electron. The app already requires Node and a JDK on the
  machine, so bundling Chromium would add ~250MB without making anything
  standalone. Chromium's --app mode gives the same window for nothing.

  Install shortcuts for this with: scripts\install-desktop-app.ps1
#>

param(
    # Leave the server running when the window closes. Off by default: closing
    # the app should stop it, the way a desktop app would.
    [switch]$KeepServerRunning
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

# --- port: 3000 unless .env says otherwise (same rule as the other launchers) --
$port = 3000
$envFile = Join-Path $repo '.env'
if (Test-Path $envFile) {
    foreach ($line in Get-Content $envFile) {
        if ($line -match '^\s*PORT\s*=\s*(\d+)') { $port = [int]$Matches[1] }
    }
}
$url = "http://localhost:$port"

function Test-ServerUp {
    try {
        $null = Invoke-WebRequest -Uri "http://127.0.0.1:$port" -UseBasicParsing -TimeoutSec 2
        return $true
    } catch { return $false }
}

# --- prerequisites -----------------------------------------------------------
foreach ($exe in @('node', 'javac')) {
    if (-not (Get-Command $exe -ErrorAction SilentlyContinue)) {
        $what = if ($exe -eq 'node') { 'Node.js (https://nodejs.org/)' } else { 'a JDK (https://adoptium.net/)' }
        [System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms') | Out-Null
        [System.Windows.Forms.MessageBox]::Show(
            "DSA Java Judge needs $exe on your PATH.`n`nInstall $what, then try again.",
            'DSA Java Judge', 'OK', 'Error') | Out-Null
        exit 1
    }
}

# --- start the server if it is not already up --------------------------------
$startedByUs = $false
if (-not (Test-ServerUp)) {
    if (-not (Test-Path (Join-Path $repo 'node_modules'))) {
        Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', 'npm install' -Wait
    }
    # Hidden: the whole point is not to leave a console window behind.
    $server = Start-Process -FilePath 'cmd.exe' `
        -ArgumentList '/c', "npx next dev -H 127.0.0.1 -p $port" `
        -WindowStyle Hidden -PassThru
    $startedByUs = $true

    $ready = $false
    foreach ($i in 1..90) {
        Start-Sleep -Milliseconds 800
        if (Test-ServerUp) { $ready = $true; break }
    }
    if (-not $ready) {
        [System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms') | Out-Null
        [System.Windows.Forms.MessageBox]::Show(
            "The server did not start within about a minute.`n`nRun `"dsa here`" in a terminal to see what went wrong.",
            'DSA Java Judge', 'OK', 'Error') | Out-Null
        exit 1
    }
}

# --- open it in an app window ------------------------------------------------
# --app strips the address bar and tabs, so it reads as an application rather
# than a browser tab. Any Chromium browser will do.
$browsers = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe"
)
$browser = $browsers | Where-Object { Test-Path $_ } | Select-Object -First 1

if ($browser) {
    $proc = Start-Process -FilePath $browser `
        -ArgumentList "--app=$url", '--window-size=1500,950' -PassThru
    # Wait on the window so we know when to stop the server.
    if (-not $KeepServerRunning -and $startedByUs) {
        $proc.WaitForExit()
        # The app window is gone; take the server with it, the way closing a
        # desktop app would. Only ever the process we started.
        Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
            ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
    }
} else {
    # No Chromium browser: fall back to the default browser as an ordinary tab.
    Start-Process $url
}
