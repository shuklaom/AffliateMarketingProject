@echo off
echo Starting AffiliateHub React App...
echo.

cd %~dp0

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting development server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

npm start
