# 🚀 Complete Step-by-Step: Deploy Full Stack Project to GitHub

## **Overview**

This guide will help you deploy:
- **Frontend (React)** → GitHub Pages (Free)
- **Backend (Django)** → Railway/Render (Free tier available)

---

## **📋 Prerequisites**

- ✅ GitHub account
- ✅ Node.js installed
- ✅ Python installed
- ✅ Git installed

---

## **🎯 Part 1: Deploy Frontend to GitHub Pages**

### **Step 1: Create GitHub Repository**

1. Go to: https://github.com/new
2. **Repository name:** `cashbook-app`
3. **Description:** "Full-stack Cashbook application"
4. **Visibility:** ✅ **Public** (required for free GitHub Pages)
5. **DO NOT check:**
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. Click **"Create repository"**

---

### **Step 2: Initialize Git (if not done)**

**Open PowerShell in your project folder:**

```bash
cd C:\Users\rajes\OneDrive\Dokumen\Desktop\React\cashbook_app

# Check if git is initialized
git status

# If not initialized:
git init
```

---

### **Step 3: Configure Git (if needed)**

```bash
# Set your name (if not set)
git config --global user.name "Your Name"

# Set your email (if not set)
git config --global user.email "your.email@example.com"
```

---

### **Step 4: Add and Commit Files**

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Cashbook app with React frontend and Django backend"
```

---

### **Step 5: Connect to GitHub**

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git

# If remote already exists, remove and add again:
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git

# Rename branch to main
git branch -M main
```

---

### **Step 6: Push to GitHub**

```bash
# Push to GitHub
git push -u origin main
```

**If asked for authentication:**
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (create at: GitHub → Settings → Developer settings → Personal access tokens)

---

### **Step 7: Update API URL for Production**

**Edit `src/config/api.js`:**

```javascript
// API Configuration
// For production, you'll update this after deploying backend
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  'https://your-backend-url.com/api';  // Update after backend deploy

// For local development, you can keep:
// export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
```

**For now, keep it pointing to localhost. We'll update it after backend deployment.**

---

### **Step 8: Build and Deploy Frontend**

```bash
# Build the app
npm run build

# Deploy to GitHub Pages
npm run deploy
```

**This will:**
1. Build your React app
2. Deploy to `gh-pages` branch
3. Make it available at: `https://YOUR_USERNAME.github.io/cashbook-app`

---

### **Step 9: Enable GitHub Pages**

1. Go to your repository: `https://github.com/YOUR_USERNAME/cashbook-app`
2. Click **"Settings"** (top menu)
3. Scroll to **"Pages"** (left sidebar)
4. **Source:** Select `gh-pages` branch
5. **Folder:** `/ (root)`
6. Click **"Save"**

**Your frontend is now live at:**
```
https://YOUR_USERNAME.github.io/cashbook-app
```

---

## **🎯 Part 2: Deploy Backend to Railway (Recommended)**

### **Step 1: Sign Up for Railway**

1. Go to: https://railway.app
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (easiest)
4. Authorize Railway to access your repositories

---

### **Step 2: Create New Project**

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Select your `cashbook-app` repository
4. Click **"Deploy Now"**

---

### **Step 3: Configure Backend**

1. **Click on the service** that was created
2. Go to **"Settings"** tab
3. **Root Directory:** Set to `backend/backend`
4. **Build Command:** Leave empty (or `pip install -r requirements.txt`)
5. **Start Command:** `python manage.py migrate && python manage.py runserver 0.0.0.0:$PORT`

**Or use gunicorn (recommended for production):**

**First, add gunicorn to requirements.txt:**
```bash
# In backend/backend/requirements.txt, add:
gunicorn
```

**Then set Start Command:**
```
python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
```

---

### **Step 4: Set Environment Variables**

1. Go to **"Variables"** tab
2. Add these variables:

```
SECRET_KEY=your-secret-key-here-make-it-long-and-random
DEBUG=False
ALLOWED_HOSTS=your-app.railway.app,*.railway.app
```

**To generate SECRET_KEY:**
```python
# Run in Python:
import secrets
print(secrets.token_urlsafe(50))
```

---

### **Step 5: Update CORS Settings**

**Edit `backend/backend/backend/settings.py`:**

```python
# CORS settings - Add your GitHub Pages URL
CORS_ALLOWED_ORIGINS = [
    "https://YOUR_USERNAME.github.io",  # Your GitHub Pages URL
    "http://localhost:3000",              # Local development
]

# Or for testing (less secure):
CORS_ALLOW_ALL_ORIGINS = True  # Only for testing
```

**Commit and push this change:**
```bash
git add backend/backend/backend/settings.py
git commit -m "Update CORS settings for production"
git push
```

---

### **Step 6: Deploy**

1. Railway will automatically deploy when you push changes
2. Or click **"Deploy"** button
3. Wait for deployment to complete
4. Check **"Deployments"** tab for status

---

### **Step 7: Get Your Backend URL**

1. Go to **"Settings"** tab
2. Find **"Domains"** section
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://cashbook-app-production.up.railway.app`)

**Your backend URL will be:**
```
https://your-app.railway.app
```

---

### **Step 8: Test Backend**

**In browser, visit:**
```
https://your-app.railway.app/api/
```

**You should see API information JSON.**

---

## **🎯 Part 3: Connect Frontend to Backend**

### **Step 1: Update Frontend API URL**

**Edit `src/config/api.js`:**

```javascript
// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  'https://your-app.railway.app/api';  // Your Railway backend URL

// For local development, you can use:
// export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
```

**Replace `your-app.railway.app` with your actual Railway URL.**

---

### **Step 2: Commit and Push Changes**

```bash
# Add changes
git add src/config/api.js

# Commit
git commit -m "Update API URL for production backend"

# Push
git push
```

---

### **Step 3: Rebuild and Redeploy Frontend**

```bash
# Build
npm run build

# Deploy
npm run deploy
```

**Wait a few minutes for GitHub Pages to update.**

---

## **🎯 Part 4: Final Configuration**

### **Step 1: Update Backend CORS (if needed)**

**Make sure your backend allows your frontend domain:**

**In `backend/backend/backend/settings.py`:**

```python
CORS_ALLOWED_ORIGINS = [
    "https://YOUR_USERNAME.github.io",  # Your GitHub Pages URL
    "http://localhost:3000",
]
```

**Commit and push:**
```bash
git add backend/backend/backend/settings.py
git commit -m "Update CORS for GitHub Pages"
git push
```

---

### **Step 2: Run Database Migrations**

**On Railway:**
1. Go to your service
2. Click **"Deployments"** tab
3. Click on latest deployment
4. Click **"View Logs"**
5. Check if migrations ran (they should run automatically with the start command)

**Or manually via Railway CLI:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Run migrations
railway run python manage.py migrate
```

---

## **✅ Testing Your Deployment**

### **Test Frontend:**
1. Visit: `https://YOUR_USERNAME.github.io/cashbook-app`
2. Should load without errors
3. Check browser console (F12) for errors

### **Test Backend:**
1. Visit: `https://your-app.railway.app/api/`
2. Should see API information

### **Test Full Stack:**
1. Open frontend: `https://YOUR_USERNAME.github.io/cashbook-app`
2. Try to login
3. Try to save a transaction
4. Check if data persists

---

## **📋 Complete Checklist**

### **Frontend:**
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Frontend deployed to GitHub Pages
- [ ] GitHub Pages enabled
- [ ] Frontend accessible at GitHub Pages URL

### **Backend:**
- [ ] Railway account created
- [ ] Project created on Railway
- [ ] Backend deployed
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Backend URL obtained
- [ ] Migrations run

### **Connection:**
- [ ] Frontend API URL updated
- [ ] Frontend redeployed
- [ ] CORS allows frontend domain
- [ ] Full stack tested

---

## **🔄 Alternative: Deploy Backend to Render**

### **Step 1: Sign Up**
1. Go to: https://render.com
2. Sign up with GitHub

### **Step 2: Create Web Service**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. **Settings:**
   - **Name:** `cashbook-backend`
   - **Root Directory:** `backend/backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn backend.wsgi:application`
4. **Environment Variables:**
   - `SECRET_KEY=your-secret-key`
   - `DEBUG=False`
   - `ALLOWED_HOSTS=your-app.onrender.com`
5. Click **"Create Web Service"**

### **Step 3: Get URL**
- Your backend will be at: `https://your-app.onrender.com`

---

## **🔧 Troubleshooting**

### **Frontend Issues:**
- **404 errors:** Use HashRouter or add `_redirects` file
- **API calls fail:** Check API URL in `src/config/api.js`
- **Blank page:** Check browser console for errors

### **Backend Issues:**
- **CORS errors:** Update `CORS_ALLOWED_ORIGINS` in settings
- **500 errors:** Check environment variables and logs
- **Database errors:** Run migrations

**See `DEPLOYMENT_TROUBLESHOOTING.md` for detailed fixes.**

---

## **🎉 Success!**

**Your full-stack app is now deployed!**

- **Frontend:** `https://YOUR_USERNAME.github.io/cashbook-app`
- **Backend:** `https://your-app.railway.app`

**Share your app with the world! 🚀**

---

## **📚 Quick Command Reference**

```bash
# Frontend
npm run build          # Build for production
npm run deploy         # Deploy to GitHub Pages

# Git
git add .              # Add all files
git commit -m "msg"    # Commit changes
git push               # Push to GitHub

# Backend (local)
python manage.py migrate    # Run migrations
python manage.py runserver  # Run locally
```

---

**For detailed troubleshooting, see:**
- `DEPLOYMENT_TROUBLESHOOTING.md`
- `DEPLOYMENT_CHECKLIST.md`

