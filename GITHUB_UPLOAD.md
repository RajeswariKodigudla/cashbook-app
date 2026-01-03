# 📤 Upload Frontend to GitHub

## 🚀 Step-by-Step Guide

### Step 1: Initialize Git (if not already done)
```powershell
cd C:\Users\rajes\OneDrive\Dokumen\Desktop\React\cashbook_app
git init
```

### Step 2: Add All Files
```powershell
git add .
```

### Step 3: Commit Changes
```powershell
git commit -m "Initial commit: Cashbook App Frontend"
```

### Step 4: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `cashbook-app` (or your preferred name)
3. Description: "Cashbook App - Frontend"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 5: Add Remote and Push
```powershell
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git
git branch -M main
git push -u origin main
```

### Step 6: Deploy to GitHub Pages (Optional)
```powershell
npm run build
npm run deploy
```

## ✅ Quick Commands (All in One)
```powershell
cd C:\Users\rajes\OneDrive\Dokumen\Desktop\React\cashbook_app
git init
git add .
git commit -m "Initial commit: Cashbook App Frontend"
git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git
git branch -M main
git push -u origin main
```

## 📝 Notes
- Make sure `.env` files are in `.gitignore` (already added)
- Don't commit `node_modules` (already in `.gitignore`)
- Don't commit `build` folder (already in `.gitignore`)

