@echo off
echo ========================================
echo Deploy Cashbook App to GitHub
echo ========================================
echo.

echo Step 1: Checking Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git is installed. ✓
echo.

echo Step 2: Checking Git status...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo Initializing git repository...
    git init
) else (
    echo Git repository found. ✓
)

echo.
echo Step 3: Adding all files...
git add .
echo Files added. ✓

echo.
echo Step 4: Committing changes...
git commit -m "Deploy cashbook app to GitHub" >nul 2>&1
if %errorlevel% equ 0 (
    echo Changes committed. ✓
) else (
    echo No changes to commit (or already committed). ✓
)

echo.
echo Step 5: Checking remote...
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Remote not found. Adding remote...
    git remote add origin https://github.com/RajeswariKodigudla/cashbook-app.git
    echo Remote added. ✓
) else (
    echo Remote found. ✓
    git remote -v
)

echo.
echo ========================================
echo Next Steps (Run these manually):
echo ========================================
echo.
echo 1. Push to GitHub:
echo    git branch -M main
echo    git push -u origin main
echo.
echo    If asked for authentication:
echo    - Username: RajeswariKodigudla
echo    - Password: Use Personal Access Token
echo.
echo 2. Deploy to GitHub Pages:
echo    npm run deploy
echo.
echo 3. Enable GitHub Pages:
echo    - Go to: https://github.com/RajeswariKodigudla/cashbook-app
echo    - Settings → Pages
echo    - Source: gh-pages branch
echo    - Save
echo.
echo ========================================
echo.
echo Your app will be live at:
echo https://rajeswarikodigudla.github.io/cashbook-app
echo.
pause




