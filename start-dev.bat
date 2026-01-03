@echo off
echo Starting Cashbook App Development Server...
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting Vite dev server...
echo Server will be available at: http://localhost:5173
echo.
call npm run dev
pause

