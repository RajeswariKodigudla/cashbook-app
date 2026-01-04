@echo off
echo ========================================
echo Upload Project to GitHub
echo ========================================
echo.

echo Step 1: Checking Git installation...
git --version
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo.
echo Step 2: Checking if git is initialized...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo Initializing git repository...
    git init
) else (
    echo Git is already initialized.
)

echo.
echo Step 3: Adding all files...
git add .

echo.
echo Step 4: Checking git user configuration...
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Git user name not set. Please enter your name:
    set /p GIT_NAME="Your name: "
    git config --global user.name "%GIT_NAME%"
)

git config user.email >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Git user email not set. Please enter your email:
    set /p GIT_EMAIL="Your email: "
    git config --global user.email "%GIT_EMAIL%"
)

echo.
echo Step 5: Making initial commit...
git commit -m "Initial commit: Cashbook app with React frontend and Django backend"
if %errorlevel% neq 0 (
    echo.
    echo No changes to commit, or commit already exists.
)

echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Create a repository on GitHub:
echo    - Go to: https://github.com/new
echo    - Name: cashbook-app
echo    - Make it Public
echo    - DON'T initialize with README
echo.
echo 2. Connect to GitHub (replace YOUR_USERNAME):
echo    git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git
echo.
echo 3. Push to GitHub:
echo    git branch -M main
echo    git push -u origin main
echo.
echo ========================================
echo.
pause




