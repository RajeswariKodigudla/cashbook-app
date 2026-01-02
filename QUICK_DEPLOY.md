# 🚀 Quick Deploy Guide

## **Deploy Frontend to GitHub Pages (5 minutes)**

### **Step 1: Create GitHub Repository**
1. Go to: https://github.com/new
2. Name: `cashbook-app`
3. Make it **Public**
4. Click "Create repository"

---

### **Step 2: Update API URL**

**Edit `src/config/api.js`:**

```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  'https://your-backend-url.com/api';  // Change this after deploying backend
```

**For now, you can use a placeholder or your local backend for testing.**

---

### **Step 3: Push to GitHub**

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git
git branch -M main
git push -u origin main
```

---

### **Step 4: Deploy**

```bash
npm run deploy
```

---

### **Step 5: Enable GitHub Pages**

1. Go to repository → **Settings**
2. Scroll to **Pages**
3. Source: `gh-pages` branch
4. Click **Save**

**Done!** Your app is live at:
```
https://YOUR_USERNAME.github.io/cashbook-app
```

---

## **Deploy Backend (Choose One)**

### **Option 1: Railway (Easiest)**

1. Go to: https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repo
5. Root Directory: `backend/backend`
6. Deploy!

**Get URL:** `https://your-app.railway.app`

---

### **Option 2: Render**

1. Go to: https://render.com
2. Sign up with GitHub
3. New Web Service
4. Connect repo
5. Root Directory: `backend/backend`
6. Deploy!

**Get URL:** `https://your-app.onrender.com`

---

## **Update Frontend After Backend Deploy**

1. Update `src/config/api.js` with backend URL
2. Run: `npm run deploy`

**That's it! 🎉**

