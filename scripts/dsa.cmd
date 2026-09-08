@echo off
setlocal EnableDelayedExpansion

::  dsa - open the DSA Java Judge from any terminal.
::
::  Install once with:  powershell -ExecutionPolicy Bypass -File scripts\install-command.ps1
::  Then from anywhere: dsa
::
::  dsa         start it (or just open the browser if it is already running)
::  dsa here    run in THIS terminal so you can see the logs; Ctrl+C stops it
::  dsa stop    stop a server left running in the background
::  dsa help    this text

:: Resolve the repo root (the parent of this script's folder) to a full path,
:: so messages and paths never contain a literal "..".
for %%i in ("%~dp0..") do set "REPO=%%~fi"

:: Port: 3000 unless .env overrides it. Same rule the launcher uses.
set "PORT=3000"
if exist "%REPO%\.env" (
    for /f "usebackq eol=# tokens=1,* delims==" %%a in ("%REPO%\.env") do (
        if /i "%%a"=="PORT" set "PORT=%%b"
    )
)
set "PORT=!PORT: =!"
set "PORT=!PORT:"=!"

if /i "%~1"=="help"   goto :help
if /i "%~1"=="--help" goto :help
if /i "%~1"=="-h"     goto :help
if /i "%~1"=="stop"   goto :stop
if /i "%~1"=="here"   goto :here
if not "%~1"=="" goto :unknown

:: ------------------------------------------------------------------ default
:: If it is already serving, opening the browser is the whole job. Restarting
:: would throw away a warm dev server for no reason.
call :isup
if not errorlevel 1 (
    echo [+] Already running - opening http://localhost:!PORT!
    start "" "http://localhost:!PORT!"
    exit /b 0
)

echo [*] Starting DSA Java Judge on port !PORT!...
echo [*] It opens in its own window. Close that window to stop the server.
start "DSA Java Judge" "%REPO%\JavaJudge.bat"
exit /b 0

:: --------------------------------------------------------------------- here
:here
call :isup
if not errorlevel 1 (
    echo [^^!] Something is already serving on port !PORT!.
    echo [*] Run "dsa stop" first, or just "dsa" to open it.
    exit /b 1
)
call "%REPO%\JavaJudge.bat"
exit /b %errorlevel%

:: --------------------------------------------------------------------- stop
:stop
set "FOUND="
:: Match the local-address column ending in :PORT, so :13000 and :30001 and
:: remote addresses are not mistaken for ours.
for /f "tokens=2,5" %%a in ('netstat -a -n -o ^| findstr /r /c:"LISTENING"') do (
    echo %%a| findstr /r /c:":!PORT!$" >nul 2>nul
    if !errorlevel! equ 0 (
        echo [*] Stopping server on port !PORT! ^(PID %%b^)...
        taskkill /F /PID %%b >nul 2>nul
        set "FOUND=1"
    )
)
if defined FOUND ( echo [+] Stopped. ) else ( echo [*] Nothing was listening on port !PORT!. )
exit /b 0

:: --------------------------------------------------------------------- help
:help
echo.
echo   dsa - DSA Java Judge
echo.
echo     dsa          start it, or open the browser if it is already running
echo     dsa here     run in this terminal so you can see the logs ^(Ctrl+C stops it^)
echo     dsa stop     stop a server running in the background
echo     dsa help     this text
echo.
echo   Repo:  %REPO%
echo   Port:  !PORT!  ^(set PORT= in .env to change it^)
echo.
exit /b 0

:unknown
echo [^^!] Unknown option "%~1". Try "dsa help".
exit /b 1

:: ------------------------------------------------------------------- helper
:: errorlevel 0 when the app answers on the port, 1 otherwise.
:isup
powershell -NoProfile -Command "try { $null = Invoke-WebRequest -Uri 'http://127.0.0.1:%PORT%' -UseBasicParsing -TimeoutSec 2; exit 0 } catch { exit 1 }" >nul 2>nul
exit /b %errorlevel%
