# 🔧 Fix Login Error - Frontend Not Connecting

## ⚠️ Problem

Error shows old Render URL: `https://cashbook-backend-8jvt.onrender.com/api`  
But config shows PythonAnywhere: `https://rajeswari.pythonanywhere.com/api`

**This means the frontend hasn't been rebuilt/redeployed with the new URL!**

---

## ✅ Solution: Rebuild and Redeploy Frontend

### Step 1: Clear Build Cache
```powershell
cd C:\Users\rajes\OneDrive\Dokumen\Desktop\React\cashbook_app
rm -r build  # Remove old build (if exists)
# Or on Windows:
if (Test-Path build) { Remove-Item -Recurse -Force build }
```

### Step 2: Rebuild Frontend
```powershell
npm run build
```

### Step 3: Deploy to GitHub Pages
```powershell
npm run deploy
```

### Step 4: Clear Browser Cache

**Important:** Your browser might be caching the old version!

1. **Hard refresh:** `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Or clear cache:**
   - Open DevTools (F12)
   - Right-click refresh button
   - Select "Empty Cache and Hard Reload"

---

## 🔍 Verify Backend is Working

### Test 1: Check PythonAnywhere Backend

Open in browser: `https://rajeswari.pythonanywhere.com/api/`

**Should return JSON:**
```json
{
  "message": "Cashbook API",
  "version": "1.0",
  "endpoints": {...}
}
```

**If you see HTML or error:** Backend needs configuration

### Test 2: Test Registration Endpoint

```bash
curl -X POST https://rajeswari.pythonanywhere.com/api/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123",
    "password_confirm": "test123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

---

## ⚠️ Important: PythonAnywhere CORS Settings

Your PythonAnywhere backend MUST allow CORS from your frontend!

### Update on PythonAnywhere:

1. **Log in:** https://www.pythonanywhere.com
2. **Files tab** → Open `cashbook_backend/settings.py`
3. **Update CORS:**

```python
# CORS settings
CORS_ALLOW_ALL_ORIGINS = True  # Temporarily allow all

# Or specific origins:
CORS_ALLOWED_ORIGINS = [
    "https://rajeswarikodigudla.github.io",
    "https://rajeswarikodigudla.github.io/cashbook-app",
]

CORS_ALLOW_CREDENTIALS = True
```

4. **Update ALLOWED_HOSTS:**

```python
ALLOWED_HOSTS = [
    'rajeswari.pythonanywhere.com',
]
```

5. **Reload web app:**
   - Go to **Web** tab
   - Click **"Reload"** button

---

## 🚀 Complete Fix Steps

### 1. Rebuild Frontend
```powershell
cd C:\Users\rajes\OneDrive\Dokumen\Desktop\React\cashbook_app
npm run build
npm run deploy
```

### 2. Update PythonAnywhere CORS
- Log in to PythonAnywhere
- Update `settings.py` with CORS settings
- Reload web app

### 3. Clear Browser Cache
- Hard refresh: `Ctrl + Shift + R`
- Or clear cache in DevTools

### 4. Test Login
- Open: `https://rajeswarikodigudla.github.io/cashbook-app/`
- Try to login with "testuser"
- Should connect to PythonAnywhere backend

---

## 🔍 Debug Steps

### Check Current API URL

Open browser console on your frontend and run:
```javascript
console.log('API URL:', import.meta.env.VITE_API_URL || 'https://rajeswari.pythonanywhere.com/api');
```

**Should show:** `https://rajeswari.pythonanywhere.com/api`

### Test Backend Connection

```javascript
fetch('https://rajeswari.pythonanywhere.com/api/')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

**Should return JSON without CORS error.**

---

## ✅ Checklist

- [ ] Frontend rebuilt (`npm run build`)
- [ ] Frontend redeployed (`npm run deploy`)
- [ ] Browser cache cleared
- [ ] PythonAnywhere CORS configured
- [ ] PythonAnywhere web app reloaded
- [ ] Backend API accessible (returns JSON)
- [ ] Test login works

---

## 🎯 Quick Commands

```powershell
# Rebuild and deploy
npm run build
npm run deploy

# Then clear browser cache and test!
```

Your login should work after rebuilding and fixing CORS! 🎉

