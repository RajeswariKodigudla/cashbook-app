# ⚡ Quick Fix: "Cannot Connect to Server" After Deployment

## **🚨 Problem:**
Your frontend is deployed to GitHub Pages, but it's trying to connect to `localhost:8000` which doesn't work from a live website.

---

## **✅ Solution: Deploy Backend + Update API URL**

### **Step 1: Deploy Backend to Railway (5 minutes)**

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select:** `cashbook-app` repository
5. **Settings:**
   - **Root Directory:** `backend/backend`
   - **Start Command:** `python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`
6. **Variables tab** → Add:
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=*.railway.app
   ```
7. **Get URL:** Settings → Generate Domain
8. **Copy URL:** `https://your-app.railway.app`

---

### **Step 2: Update Frontend API URL**

**Edit `src/config/api.js`:**

```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-app.railway.app/api'  // Replace with your Railway URL
    : 'http://127.0.0.1:8000/api');
```

**Replace `your-app.railway.app` with your actual Railway URL.**

---

### **Step 3: Push and Redeploy**

```bash
# Add changes
git add src/config/api.js backend/backend/backend/settings.py backend/backend/requirements.txt

# Commit
git commit -m "Connect frontend to deployed backend"

# Push
git push

# Redeploy frontend
npm run deploy
```

---

### **Step 4: Test**

1. Visit: `https://rajeswarikodigudla.github.io/cashbook-app`
2. Try to login
3. Should work now! ✅

---

## **📋 What I Updated:**

1. ✅ **src/config/api.js** - Now checks for production and uses deployed backend URL
2. ✅ **backend/backend/requirements.txt** - Added `gunicorn` for production
3. ✅ **backend/backend/backend/settings.py** - Added GitHub Pages URL to CORS

---

## **🎯 Next Steps:**

1. **Deploy backend to Railway** (follow Step 1 above)
2. **Update API URL** in `src/config/api.js` with your Railway URL
3. **Push and redeploy** (follow Step 3 above)

---

**After deploying backend and updating the API URL, your app will work!**


