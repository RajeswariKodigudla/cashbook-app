# 🔧 Fix CORS Error - PythonAnywhere Backend

## ⚠️ Current Error

```
Cannot connect to backend server.
CORS error detected - backend needs CORS headers
Backend URL: https://rajeswari.pythonanywhere.com/api
```

**Problem:** PythonAnywhere backend is not allowing requests from your GitHub Pages frontend.

---

## ✅ Solution: Update PythonAnywhere Settings

### Step 1: Log in to PythonAnywhere

1. Go to: **https://www.pythonanywhere.com**
2. Log in
3. Click **Files** tab

### Step 2: Open settings.py

Navigate to:
```
/home/rajeswari/mysite/cashbook_backend/settings.py
```
*(Path might be slightly different - look for your Django project folder)*

### Step 3: Find and Update CORS Section

**Find this section (around line 175):**
```python
# CORS settings
```

**Replace with:**
```python
# CORS settings
CORS_ALLOW_ALL_ORIGINS = True  # Allow all origins
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

### Step 4: Update ALLOWED_HOSTS

**Find ALLOWED_HOSTS and update:**
```python
ALLOWED_HOSTS = [
    'rajeswari.pythonanywhere.com',
    '127.0.0.1',
    'localhost',
]
```

### Step 5: Save and Reload

1. **Click Save** in PythonAnywhere editor
2. Go to **Web** tab
3. Click **"Reload"** button (green button)
4. Wait 30-60 seconds for reload

---

## 🔍 Verify Fix

### Test 1: Check API
Open: `https://rajeswari.pythonanywhere.com/api/`

**Should return JSON** (not HTML)

### Test 2: Test from Frontend
1. Open: `https://rajeswarikodigudla.github.io/cashbook-app/`
2. Open browser console (F12)
3. Try to login
4. **Should NOT see CORS errors**

---

## 📋 Quick Copy-Paste

**Copy this entire section to your settings.py:**

```python
# CORS settings
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE', 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept', 'accept-encoding', 'authorization', 'content-type',
    'dnt', 'origin', 'user-agent', 'x-csrftoken', 'x-requested-with',
]

ALLOWED_HOSTS = ['rajeswari.pythonanywhere.com', '127.0.0.1', 'localhost']
```

---

## ✅ After Updating

1. ✅ CORS configured
2. ✅ Web app reloaded
3. ✅ Frontend can connect
4. ✅ Login works!

Update PythonAnywhere settings and reload! 🎉

