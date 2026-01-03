# 🔧 Fix: "Cannot Connect to Server" After GitHub Deployment

## **Problem:**
Your frontend is deployed to GitHub Pages, but it's trying to connect to `localhost:8000` which doesn't work from a live website.

---

## **✅ Solution: Deploy Backend and Update API URL**

### **Step 1: Deploy Backend to Railway (Free & Easy)**

#### **A. Sign Up for Railway**
1. Go to: https://railway.app
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (easiest way)
4. Authorize Railway to access your repositories

#### **B. Deploy Your Backend**
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Select your `cashbook-app` repository
4. Click **"Deploy Now"**

#### **C. Configure Backend**
1. Click on the service that was created
2. Go to **"Settings"** tab
3. **Root Directory:** Set to `backend/backend`
4. **Start Command:** 
   ```
   python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
   ```

**First, add gunicorn to requirements.txt:**
```bash
# Edit backend/backend/requirements.txt
# Add this line:
gunicorn
```

#### **D. Set Environment Variables**
1. Go to **"Variables"** tab
2. Add these variables:

```
SECRET_KEY=your-secret-key-here-make-it-long-and-random
DEBUG=False
ALLOWED_HOSTS=*.railway.app
```

**To generate SECRET_KEY:**
```python
# Run in Python:
import secrets
print(secrets.token_urlsafe(50))
```

#### **E. Get Your Backend URL**
1. Go to **"Settings"** tab
2. Find **"Domains"** section
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://cashbook-app-production.up.railway.app`)

**Your backend URL will be something like:**
```
https://your-app-name.railway.app
```

---

### **Step 2: Update Frontend API URL**

#### **A. Update src/config/api.js**

**Edit the file:**

```javascript
// API Configuration
// For production (deployed):
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  'https://your-app-name.railway.app/api';  // Replace with your Railway URL

// For local development, you can comment this out:
// export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
```

**Replace `your-app-name.railway.app` with your actual Railway URL.**

---

#### **B. Update CORS in Backend**

**Edit `backend/backend/backend/settings.py`:**

```python
# CORS settings - Add your GitHub Pages URL
CORS_ALLOWED_ORIGINS = [
    "https://rajeswarikodigudla.github.io",  # Your GitHub Pages URL
    "http://localhost:3000",                  # Local development
]

# Or for testing (less secure, but works):
CORS_ALLOW_ALL_ORIGINS = True  # Only for testing
```

---

### **Step 3: Commit and Push Changes**

```bash
# Add changes
git add src/config/api.js backend/backend/backend/settings.py backend/backend/requirements.txt

# Commit
git commit -m "Update API URL for production deployment"

# Push
git push
```

---

### **Step 4: Redeploy Frontend**

```bash
# Build and deploy
npm run deploy
```

**Wait a few minutes for GitHub Pages to update.**

---

### **Step 5: Test**

1. Visit: `https://rajeswarikodigudla.github.io/cashbook-app`
2. Try to login
3. Should work now! ✅

---

## **🔧 Alternative: Quick Fix (Temporary)**

**If you want to test quickly without deploying backend:**

**Update `src/config/api.js` to use a temporary backend URL:**

```javascript
// Temporary: Use a public test backend (if you have one)
export const API_BASE_URL = 'https://your-test-backend.com/api';
```

**But this is not recommended for production. Deploy your own backend instead.**

---

## **📋 Quick Checklist**

- [ ] Backend deployed to Railway
- [ ] Backend URL obtained
- [ ] Frontend API URL updated in `src/config/api.js`
- [ ] CORS updated in Django settings
- [ ] Changes committed and pushed
- [ ] Frontend redeployed with `npm run deploy`
- [ ] Test login on live site

---

## **🚀 Complete Command Sequence**

**After deploying backend to Railway:**

```bash
# 1. Update API URL
# Edit src/config/api.js (replace with your Railway URL)

# 2. Update CORS
# Edit backend/backend/backend/settings.py

# 3. Add gunicorn to requirements.txt
# Edit backend/backend/requirements.txt

# 4. Commit and push
git add .
git commit -m "Connect frontend to deployed backend"
git push

# 5. Redeploy frontend
npm run deploy
```

---

## **✅ After Fix**

**Your app should work:**
- Frontend: `https://rajeswarikodigudla.github.io/cashbook-app`
- Backend: `https://your-app.railway.app`
- Login should work! ✅

---

## **🔍 Troubleshooting**

### **Still getting "Cannot connect to server"?**

1. **Check backend is running:**
   - Visit: `https://your-app.railway.app/api/`
   - Should see API information

2. **Check API URL in frontend:**
   - Open browser console (F12)
   - Check Network tab
   - See what URL it's trying to connect to

3. **Check CORS:**
   - Make sure GitHub Pages URL is in `CORS_ALLOWED_ORIGINS`
   - Or use `CORS_ALLOW_ALL_ORIGINS = True` for testing

4. **Check Railway logs:**
   - Go to Railway dashboard
   - Check deployment logs
   - Look for errors

---

**Deploy your backend to Railway and update the API URL - that's the fix!**


