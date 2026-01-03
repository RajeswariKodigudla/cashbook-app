# PowerShell script to upload frontend to GitHub
# Replace YOUR_USERNAME with your GitHub username

Write-Host "🚀 Uploading Frontend to GitHub..." -ForegroundColor Green

# Navigate to frontend directory
Set-Location "C:\Users\rajes\OneDrive\Dokumen\Desktop\React\cashbook_app"

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Add all files
Write-Host "Adding files..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Initial commit: Cashbook App Frontend with Login Page"

# Check if remote exists
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Please create a repository on GitHub first!" -ForegroundColor Red
    Write-Host "Then run:" -ForegroundColor Yellow
    Write-Host "git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git" -ForegroundColor Cyan
    Write-Host "git branch -M main" -ForegroundColor Cyan
    Write-Host "git push -u origin main" -ForegroundColor Cyan
} else {
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git branch -M main
    git push -u origin main
    Write-Host "✅ Frontend uploaded successfully!" -ForegroundColor Green
}

Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Create repository on GitHub: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: cashbook-app" -ForegroundColor White
Write-Host "3. Run: git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git" -ForegroundColor White
Write-Host "4. Run: git push -u origin main" -ForegroundColor White

