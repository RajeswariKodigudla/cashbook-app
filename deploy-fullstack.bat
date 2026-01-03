@echo off
echo ========================================
echo Full Stack Deployment Helper
echo ========================================
echo.

echo This script will help you deploy your full-stack app.
echo.
echo Steps:
echo 1. Frontend to GitHub Pages
echo 2. Backend to Railway/Render
echo 3. Connect them together
echo.
pause

echo.
echo ========================================
echo Step 1: Frontend Deployment
echo ========================================
echo.

echo Checking Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo.
echo Checking if git is initialized...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo Initializing git repository...
    git init
) else (
    echo Git is already initialized.
)

echo.
echo Adding all files...
git add .

echo.
echo Checking git user configuration...
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo Git user name not set. Please enter your name:
    set /p GIT_NAME="Your name: "
    git config --global user.name "%GIT_NAME%"
)

git config user.email >nul 2>&1
if %errorlevel% neq 0 (
    echo Git user email not set. Please enter your email:
    set /p GIT_EMAIL="Your email: "
    git config --global user.email "%GIT_EMAIL%"
)

echo.
echo Making commit...
git commit -m "Initial commit: Cashbook app with React frontend and Django backend" >nul 2>&1

echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Create GitHub repository:
echo    - Go to: https://github.com/new
echo    - Name: cashbook-app
echo    - Make it Public
echo    - DON'T initialize with README
echo.
echo 2. Connect to GitHub (replace YOUR_USERNAME):
echo    git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Deploy frontend:
echo    npm run deploy
echo.
echo 4. Enable GitHub Pages:
echo    - Repository → Settings → Pages
echo    - Source: gh-pages branch
echo.
echo 5. Deploy backend to Railway:
echo    - Go to: https://railway.app
echo    - New Project → Deploy from GitHub
echo    - Root Directory: backend/backend
echo    - Set environment variables
echo.
echo 6. Update frontend API URL:
echo    - Edit src/config/api.js
echo    - Update API_BASE_URL with Railway URL
echo    - npm run deploy
echo.
echo ========================================
echo.
echo For detailed instructions, see:
echo - COMPLETE_DEPLOYMENT_GUIDE.md
echo - QUICK_DEPLOY_STEPS.md
echo.
pause


