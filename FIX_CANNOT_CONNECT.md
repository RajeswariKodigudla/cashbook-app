# 🔧 Fix: "Cannot Connect to Server" Error

## **🚨 Problem:**
You're seeing "Cannot connect to server" because:
- Your **deployed frontend** (on GitHub Pages) is trying to connect to `localhost:8000`
- `localhost` only works on your computer, not on the internet
- The deployed site can't reach your local backend

---

## **✅ Solution Options:**

### **Option 1: Deploy Backend (Recommended - Permanent Fix)**

**This is the proper solution for a deployed app.**

#### **A. Deploy Backend to Railway**

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

#### **B. Update Frontend API URL**

**Edit `src/config/api.js`:**

```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-app.railway.app/api'  // Replace with your Railway URL
    : 'http://127.0.0.1:8000/api');
```

#### **C. Push and Redeploy**

```bash
git add src/config/api.js
git commit -m "Update API URL for deployed backend"
git push
npm run deploy
```

---

### **Option 2: Test Locally (Temporary)**

**If you want to test locally instead of using the deployed site:**

1. **Run backend locally:**
   ```bash
   cd backend\backend
   ..\venv\Scripts\activate
   python manage.py runserver
   ```

2. **Run frontend locally:**
   ```bash
   npm start
   ```

3. **Access at:** `http://localhost:3000` (not the GitHub Pages URL)

**This way, both frontend and backend run on your computer.**

---

### **Option 3: Use Environment Variable (Advanced)**

**Create `.env.production` file:**

```env
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

**Then rebuild:**
```bash
npm run build
npm run deploy
```

---

## **🔍 How to Check Which Site You're Using:**

### **Deployed Site (GitHub Pages):**
- URL: `https://rajeswarikodigudla.github.io/cashbook-app`
- **Problem:** Can't connect to `localhost:8000`
- **Solution:** Deploy backend to Railway

### **Local Site:**
- URL: `http://localhost:3000`
- **Works:** If backend is running on `localhost:8000`
- **Solution:** Run both frontend and backend locally

---

## **📋 Quick Decision Guide:**

**Are you accessing the deployed site?**
- ✅ **Yes** → Deploy backend to Railway (Option 1)
- ❌ **No** → Test locally (Option 2)

**Do you want a permanent solution?**
- ✅ **Yes** → Deploy backend to Railway (Option 1)
- ❌ **No** → Test locally (Option 2)

---

## **🚀 Recommended: Deploy Backend**

**This is the proper solution for a production app:**

1. **Deploy backend to Railway** (5 minutes)
2. **Update API URL** in `src/config/api.js`
3. **Push and redeploy frontend**
4. **Your app will work on the live site!**

---

## **⚡ Quick Fix Right Now:**

**If you just want to test locally:**

```bash
# Terminal 1: Start backend
cd backend\backend
..\venv\Scripts\activate
python manage.py runserver

# Terminal 2: Start frontend
npm start
```

**Then access:** `http://localhost:3000` (not the GitHub Pages URL)

---

## **✅ After Deploying Backend:**

**Your app will work at:**
- **Frontend:** `https://rajeswarikodigudla.github.io/cashbook-app`
- **Backend:** `https://your-app.railway.app`
- **Login will work!** ✅

---

**Choose Option 1 for permanent fix, or Option 2 for local testing!**


