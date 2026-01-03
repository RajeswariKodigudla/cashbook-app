# ✅ Backend URL Updated to PythonAnywhere

## 🎉 Success!

Your backend is now deployed to PythonAnywhere:
```
https://rajeswari.pythonanywhere.com
```

API endpoints are at:
```
https://rajeswari.pythonanywhere.com/api/
```

---

## ✅ What's Updated

1. **Frontend API Configuration** - Updated to use PythonAnywhere backend
2. **File:** `src/config/api.js` - Now points to PythonAnywhere URL

---

## 🚀 Next Steps: Rebuild and Redeploy Frontend

### Step 1: Rebuild Frontend
```powershell
cd C:\Users\rajes\OneDrive\Dokumen\Desktop\React\cashbook_app
npm run build
```

### Step 2: Deploy to GitHub Pages
```powershell
npm run deploy
```

### Step 3: Test Connection

1. **Open your frontend:** `https://rajeswarikodigudla.github.io/cashbook-app/`
2. **Try to login/register**
3. **Should connect to:** `https://rajeswari.pythonanywhere.com/api/`

---

## 🔍 Verify Backend is Working

### Test 1: API Root
Open in browser: `https://rajeswari.pythonanywhere.com/api/`

**Should return JSON:**
```json
{
  "message": "Cashbook API",
  "version": "1.0",
  "endpoints": {...}
}
```

### Test 2: Test Registration
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

## 📋 Current Setup

- ✅ **Backend:** `https://rajeswari.pythonanywhere.com/api/`
- ✅ **Frontend:** `https://rajeswarikodigudla.github.io/cashbook-app/`
- ✅ **API Config:** Updated to use PythonAnywhere backend

---

## ⚠️ Important: Update Backend CORS Settings

Make sure your PythonAnywhere backend allows requests from your frontend:

**In `cashbook_backend/settings.py` on PythonAnywhere:**

```python
CORS_ALLOWED_ORIGINS = [
    "https://rajeswarikodigudla.github.io",
    "https://rajeswarikodigudla.github.io/cashbook-app",
]

# Or temporarily allow all (for testing)
CORS_ALLOW_ALL_ORIGINS = True
```

**Also update ALLOWED_HOSTS:**
```python
ALLOWED_HOSTS = ['rajeswari.pythonanywhere.com']
```

---

## 🎯 Quick Commands

```powershell
# Rebuild frontend
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Your frontend will now connect to your PythonAnywhere backend! 🎉

