# 🚀 Complete Guide: Deploy Cashbook App to GitHub

## 📋 **Overview**

This guide covers:
1. ✅ **Frontend Deployment** → GitHub Pages (Free)
2. ✅ **Backend Deployment** → Options (Heroku, Railway, Render, etc.)
3. ✅ **Configuration** → Update API URLs for production

---

## 🎯 **Part 1: Deploy Frontend to GitHub Pages**

### **Step 1: Create GitHub Repository**

1. **Go to GitHub:** https://github.com/new
2. **Repository name:** `cashbook-app` (or your preferred name)
3. **Visibility:** Public (required for free GitHub Pages)
4. **Don't initialize** with README, .gitignore, or license
5. **Click "Create repository"**

---

### **Step 2: Initialize Git (if not already done)**

**Open terminal in project root:**

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init
```

---

### **Step 3: Update API Configuration for Production**

**Before deploying, update API URL for production:**

**Option A: Use Environment Variable (Recommended)**

**Create `.env.production` file in project root:**

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

**Update `src/config/api.js`:**

```javascript
// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.com/api'  // Production backend URL
    : 'http://127.0.0.1:8000/api');        // Local development
```

**Option B: Hardcode Production URL (Quick Fix)**

**Update `src/config/api.js`:**

```javascript
// For production deployment, update this:
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  'https://your-backend-url.com/api';  // Change to your backend URL
```

**⚠️ Important:** Replace `your-backend-url.com` with your actual backend URL after deploying backend (see Part 2).

---

### **Step 4: Add Files to Git**

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Cashbook app ready for deployment"
```

---

### **Step 5: Connect to GitHub**

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git

# Or if you already have a remote:
git remote set-url origin https://github.com/YOUR_USERNAME/cashbook-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### **Step 6: Deploy to GitHub Pages**

**Option A: Using npm script (Easiest)**

```bash
# Build and deploy
npm run deploy
```

**This will:**
1. Build the app (`npm run build`)
2. Deploy to `gh-pages` branch
3. Make it available at: `https://YOUR_USERNAME.github.io/cashbook-app`

**Option B: Manual Deployment**

```bash
# Build the app
npm run build

# Install gh-pages if not installed
npm install --save-dev gh-pages

# Deploy
npx gh-pages -d build
```

---

### **Step 7: Enable GitHub Pages**

1. **Go to your repository on GitHub**
2. **Click "Settings"**
3. **Scroll to "Pages" section**
4. **Source:** Select `gh-pages` branch
5. **Folder:** `/ (root)`
6. **Click "Save"**

**Your app will be live at:**
```
https://YOUR_USERNAME.github.io/cashbook-app
```

---

## 🎯 **Part 2: Deploy Backend (Django)**

**⚠️ Important:** GitHub Pages only hosts static files. You need a separate service for the Django backend.

### **Option 1: Railway (Recommended - Easy & Free)**

**Railway offers free tier with $5 credit/month.**

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Select your repository**
6. **Add service:**
   - **Root Directory:** `backend/backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python manage.py migrate && python manage.py runserver`
7. **Add environment variables:**
   - `SECRET_KEY` (generate a new one)
   - `DEBUG=False`
   - `ALLOWED_HOSTS=your-app.railway.app`
8. **Deploy!**

**Get your backend URL:** `https://your-app.railway.app`

---

### **Option 2: Render (Free Tier Available)**

1. **Go to:** https://render.com
2. **Sign up** with GitHub
3. **Click "New +" → "Web Service"**
4. **Connect your repository**
5. **Settings:**
   - **Root Directory:** `backend/backend`
   - **Build Command:** `pip install -r requirements.txt && python manage.py migrate`
   - **Start Command:** `gunicorn backend.wsgi:application`
6. **Add environment variables:**
   - `SECRET_KEY`
   - `DEBUG=False`
   - `ALLOWED_HOSTS=your-app.onrender.com`
7. **Deploy!**

**Get your backend URL:** `https://your-app.onrender.com`

---

### **Option 3: Heroku (Paid, but reliable)**

1. **Install Heroku CLI:** https://devcenter.heroku.com/articles/heroku-cli
2. **Login:** `heroku login`
3. **Create app:** `heroku create your-app-name`
4. **Set environment variables:**
   ```bash
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set DEBUG=False
   heroku config:set ALLOWED_HOSTS=your-app.herokuapp.com
   ```
5. **Deploy:** `git push heroku main`

---

### **Option 4: PythonAnywhere (Free for beginners)**

1. **Sign up:** https://www.pythonanywhere.com
2. **Upload your backend code**
3. **Configure web app**
4. **Set environment variables**
5. **Deploy!**

---

## 🔧 **Part 3: Update Frontend API URL**

**After deploying backend, update frontend:**

### **Method 1: Update .env.production**

**Create/update `.env.production`:**

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

**Rebuild and redeploy:**

```bash
npm run deploy
```

### **Method 2: Update src/config/api.js**

```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.com/api'  // Your deployed backend
    : 'http://127.0.0.1:8000/api');       // Local development
```

**Rebuild and redeploy:**

```bash
npm run deploy
```

---

## 🔒 **Part 4: Configure CORS for Production**

**Update Django backend settings:**

**In `backend/backend/backend/settings.py`:**

```python
# For production, update ALLOWED_HOSTS
ALLOWED_HOSTS = [
    'your-backend-url.com',
    'your-app.railway.app',  # If using Railway
    'your-app.onrender.com',  # If using Render
    'localhost',
    '127.0.0.1',
]

# Update CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://YOUR_USERNAME.github.io",  # GitHub Pages
    "http://localhost:3000",             # Local development
]

# Or allow all origins (less secure, but easier for testing)
CORS_ALLOW_ALL_ORIGINS = True  # Only for development/testing
```

---

## 📝 **Part 5: Database Setup for Production**

**For production, use a proper database:**

### **Option 1: PostgreSQL (Recommended)**

**Update `settings.py`:**

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}
```

**Railway/Render provide PostgreSQL automatically.**

### **Option 2: Keep SQLite (Simple, but not recommended for production)**

**SQLite works for small apps, but has limitations.**

---

## ✅ **Part 6: Complete Deployment Checklist**

### **Frontend:**
- [ ] Create GitHub repository
- [ ] Update API URL in `src/config/api.js`
- [ ] Create `.env.production` with backend URL
- [ ] Initialize git and push to GitHub
- [ ] Run `npm run deploy`
- [ ] Enable GitHub Pages in repository settings
- [ ] Test deployed frontend

### **Backend:**
- [ ] Choose hosting service (Railway/Render/Heroku)
- [ ] Deploy backend
- [ ] Get backend URL
- [ ] Update CORS settings
- [ ] Set environment variables
- [ ] Run migrations on production
- [ ] Test backend API endpoints

### **Configuration:**
- [ ] Update frontend API URL to point to deployed backend
- [ ] Redeploy frontend with new API URL
- [ ] Test full stack (login, save transactions)

---

## 🧪 **Part 7: Testing Deployment**

### **Test Frontend:**
1. Visit: `https://YOUR_USERNAME.github.io/cashbook-app`
2. Check browser console for errors
3. Try to login
4. Check if API calls work

### **Test Backend:**
1. Visit: `https://your-backend-url.com/api/`
2. Should see API information
3. Test login endpoint
4. Test transactions endpoint

---

## 🔄 **Part 8: Updating Deployment**

### **Update Frontend:**
```bash
# Make changes
# Commit
git add .
git commit -m "Update frontend"

# Push to GitHub
git push origin main

# Deploy
npm run deploy
```

### **Update Backend:**
```bash
# Make changes
# Commit
git add .
git commit -m "Update backend"

# Push to GitHub (if using Railway/Render, auto-deploys)
git push origin main

# Or manually deploy based on your hosting service
```

---

## 🎯 **Quick Start Commands**

### **First Time Deployment:**

```bash
# 1. Update API URL in src/config/api.js
# 2. Initialize git
git init
git add .
git commit -m "Initial commit"

# 3. Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git
git branch -M main
git push -u origin main

# 4. Deploy frontend
npm run deploy

# 5. Enable GitHub Pages in repository settings
```

---

## 📚 **Resources**

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Railway Docs:** https://docs.railway.app
- **Render Docs:** https://render.com/docs
- **Django Deployment:** https://docs.djangoproject.com/en/stable/howto/deployment/

---

## ⚠️ **Important Notes**

1. **Backend URL:** Make sure to update frontend API URL after deploying backend
2. **CORS:** Configure CORS to allow your GitHub Pages domain
3. **Environment Variables:** Never commit secrets to GitHub
4. **Database:** Use PostgreSQL for production, not SQLite
5. **HTTPS:** Both frontend and backend should use HTTPS in production

---

## 🎉 **You're Done!**

**Your app should now be live at:**
- **Frontend:** `https://YOUR_USERNAME.github.io/cashbook-app`
- **Backend:** `https://your-backend-url.com`

**Happy deploying! 🚀**

