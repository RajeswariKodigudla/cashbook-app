@echo off
echo ========================================
echo Deploying Frontend to GitHub Pages
echo ========================================
echo.

echo Step 1: Building production version...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Check errors above.
    pause
    exit /b 1
)

echo.
echo Step 2: Deploying to GitHub Pages...
call npm run deploy
if %errorlevel% neq 0 (
    echo Deploy failed! Check errors above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Your app should be live at:
echo https://rajeswarikodigudla.github.io/cashbook-app
echo.
echo Note: It may take a few minutes for changes to appear.
echo.
pause


