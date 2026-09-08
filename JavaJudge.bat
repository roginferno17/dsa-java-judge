@echo off
setlocal EnableDelayedExpansion

:: Change to the directory of this script
cd /d "%~dp0"

title DSA Java Judge - Local Environment

echo ====================================================================
echo   DSA JAVA JUDGE - Striver A2Z DSA Sheet Platform
echo   Local Offline Environment with Automatic File Sync
echo ====================================================================
echo.

:: 0. Port: default 3000, overridden by PORT= in .env
set "PORT=3000"
if exist ".env" (
    for /f "usebackq eol=# tokens=1,* delims==" %%a in (".env") do (
        if /i "%%a"=="PORT" set "PORT=%%b"
    )
)
:: strip stray quotes/spaces
set "PORT=%PORT: =%"
set "PORT=%PORT:"=%"

:: 1. Clear only a process LISTENING on our exact local port.
::    The previous version matched ":3000" anywhere in the netstat output, which
::    also hit :13000, :30001 and remote addresses -- and then force-killed that PID.
echo [*] Checking port %PORT%...
for /f "tokens=2,5" %%a in ('netstat -a -n -o ^| findstr /r /c:"LISTENING"') do (
    echo %%a| findstr /r /c:":%PORT%$" >nul 2>nul
    if !errorlevel! equ 0 (
        echo [*] Clearing orphaned server on port %PORT% ^(PID %%b^)...
        taskkill /F /PID %%b >nul 2>nul
    )
)

:: Clear Next.js dev lock if present
if exist ".next\dev" rmdir /s /q ".next\dev" 2>nul

:: 2. Check Node.js
echo [*] Checking Node.js runtime...
where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo [^^!] ERROR: Node.js was not found on your PATH.
    echo [*] Install it from https://nodejs.org/ ^(LTS^), then reopen this window.
    echo.
    pause
    exit /b 1
)
for /f "delims=" %%v in ('node -v 2^>nul') do echo [+] Node.js %%v

:: 3. Check Java JDK - required, the judge cannot run without it
echo [*] Checking Java Development Kit...
where javac >nul 2>nul
if errorlevel 1 (
    echo.
    echo [^^!] ERROR: The Java compiler ^(javac^) was not found on your PATH.
    echo [*] The judge compiles and runs your solutions locally, so a JDK is required.
    echo [*] Install OpenJDK 17 or newer from https://adoptium.net/
    echo.
    pause
    exit /b 1
)
for /f "delims=" %%j in ('javac -version 2^>^&1') do echo [+] %%j

:: 4. Ensure local storage exists
if not exist "user_data" (
    echo [*] Creating user_data directory...
    mkdir "user_data"
)

:: 5. Install dependencies if missing
if not exist "node_modules" (
    echo [*] Dependencies not found. Running npm install...
    call npm install
    if errorlevel 1 (
        echo [^^!] Failed to install dependencies.
        pause
        exit /b 1
    )
)

echo.
echo ====================================================================
echo  [+] Local progress storage: %~dp0user_data\
echo  [+] Starting local web server on http://localhost:%PORT%
echo  [+] Your browser will open automatically once the server is ready.
echo.
echo  [*] Keep this window OPEN while learning.
echo  [*] Closing this window STOPS the web app.
echo ====================================================================
echo.

:: 6. Open the browser once the server responds
start "" /b powershell -NoProfile -Command ^
  "$url='http://localhost:%PORT%'; for($i=0;$i -lt 60;$i++){ try { $r=Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2; if($r.StatusCode -eq 200){ Start-Process $url; break } } catch { Start-Sleep -Milliseconds 800 } }"

:: 7. Start Next.js bound to loopback only.
::    Without -H it listens on every network interface, which would expose the
::    code-execution endpoint to anyone on the same Wi-Fi.
call npx next dev -H 127.0.0.1 -p %PORT%

echo.
echo [*] DSA Java Judge server stopped.
pause
