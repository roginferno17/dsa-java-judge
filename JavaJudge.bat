@echo off
setlocal

:: Change to current directory of the script
cd /d "%~dp0"

title DSA Java Judge - Local Environment

echo ====================================================================
echo   DSA JAVA JUDGE - Striver A2Z DSA Sheet Platform
echo   Local Offline Environment with Automatic File Sync
echo ====================================================================
echo.

:: 0. Clean up any leftover processes on port 3000 from previous sessions
for /f "tokens=5" %%a in ('netstat -a -n -o 2^>nul ^| findstr ":3000" ^| findstr "LISTENING"') do (
    if not "%%a"=="" (
        echo [*] Clearing orphaned server on port 3000 ^(PID %%a^)...
        taskkill /F /PID %%a >nul 2>nul
    )
)

:: Clear Next.js dev lock if present
if exist ".next\dev" rmdir /s /q ".next\dev" 2>nul

:: 1. Check Node.js installation
echo [*] Checking Node.js runtime...
where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo [!] ERROR: Node.js is not installed or not found in your system PATH.
    echo [*] Please download and install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "delims=" %%v in ('node -v 2^>nul') do echo [+] Node.js runtime found: %%v

:: 2. Check Java JDK
echo [*] Checking Java Development Kit...
where javac >nul 2>nul
if errorlevel 1 (
    echo [!] Warning: Java compiler javac was not found in PATH.
    echo [*] If Docker Desktop is running, code will execute in Docker.
    echo [*] To compile locally, install OpenJDK 17+ or Oracle JDK.
) else (
    for /f "delims=" %%j in ('javac -version 2^>^&1') do echo [+] Java compiler found: %%j
)

:: 3. Ensure user_data folder and progress.json exist
if not exist "user_data" (
    echo [*] Creating user_data directory...
    mkdir "user_data"
)

if not exist "user_data\progress.json" (
    echo [*] Initializing user_data\progress.json...
    echo { "version": "1.0", "problems": {} } > "user_data\progress.json"
)

:: 4. Ensure .env exists
if not exist ".env" (
    if exist ".env.example" (
        copy /y ".env.example" ".env" >nul
    ) else (
        echo PORT=3000 > ".env"
    )
)

:: 5. Install dependencies if node_modules missing
if not exist "node_modules" (
    echo [*] Dependencies not found. Running npm install...
    call npm install
    if errorlevel 1 (
        echo [!] Failed to install dependencies.
        pause
        exit /b 1
    )
)

echo.
echo ====================================================================
echo  [+] Local progress storage: %~dp0user_data\progress.json
echo  [+] Starting local web server on http://localhost:3000
echo  [+] Browser will open automatically once the server is ready!
echo.
echo  [*] Keep this window OPEN while learning.
echo  [*] Closing this window will immediately STOP the web app.
echo ====================================================================
echo.

:: 6. Launch background helper to wait for port 3000 and open default browser
start "" /b powershell -NoProfile -Command "$url='http://localhost:3000'; for($i=0;$i -lt 45;$i++){ try { $req=[System.Net.WebRequest]::Create($url); $req.Timeout=1500; $res=$req.GetResponse(); if($res.StatusCode -eq 200){ $res.Close(); Start-Process $url; break }; $res.Close() } catch { Start-Sleep -Milliseconds 800 } }"

:: 7. Start Next.js development server in foreground
call npx next dev -p 3000

echo.
echo [*] DSA Java Judge server stopped.
pause
