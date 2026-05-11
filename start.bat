@echo off
REM Everyday Deals - Start all servers
REM Prerequisites: JDK 21+, Maven 3.8+, MySQL 8 installed, Node.js

echo ================================================
echo   Everyday Deals - Starting All Servers
echo ================================================
echo.

REM Set database password - change this if your password differs
set DB_PASSWORD=

REM ── Step 1: Ensure MySQL is running ──────────────────────────────────
echo [0/2] Starting MySQL service (MySQL80)...
net start MySQL80 2>nul
if errorlevel 2 (
    echo         MySQL80 is already running.
) else (
    echo         MySQL80 started.
)
echo.

REM ── Step 2: Start backend in its own window ──────────────────────────
echo [1/2] Starting backend on http://localhost:8080 ...
start "Everyday Deals - Backend" cmd /k "%~dp0backend\start.bat"

REM Give the backend time to initialise before starting the frontend
timeout /t 8 /nobreak > nul

REM ── Step 3: Install frontend deps if needed, then start ──────────────
echo [2/2] Starting frontend on http://localhost:3000 ...
if not exist "%~dp0frontend\node_modules" (
    echo     node_modules not found - installing dependencies first...
    cd /d "%~dp0frontend"
    call npm install
    cd /d "%~dp0"
)
start "Everyday Deals - Frontend" cmd /k "%~dp0frontend\start.bat"

echo.
echo Both servers are starting in separate windows.
echo   Backend:  http://localhost:8080
echo   Frontend: http://localhost:3000
echo.
echo Close each server window (or press Ctrl+C inside it) to stop.
pause
