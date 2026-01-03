# 🔧 Troubleshooting Login Errors

## 🚨 If Login Still Fails After Updating Frontend

### Step 1: Check Browser Console

1. Open your frontend: `https://rajeswarikodigudla.github.io/cashbook-app/`
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Try to login
5. **Look for error messages** - they will tell you exactly what's wrong

---

## 🧪 Step 2: Run Diagnostic Tools

### Test CORS Connection

In browser console, run:

```javascript
testCorsConnection()
```

**Expected:** Should see ✅ success messages

**If you see ❌ CORS errors:**
- PythonAnywhere CORS is NOT configured
- Follow: `cashbook-backend/CRITICAL_UPDATE_REQUIRED.md`

---

### Diagnose Login

In browser console, run:

```javascript
diagnoseLogin('your_username', 'your_password')
```

Replace `your_username` and `your_password` with actual credentials.

**This will test:**
1. API accessibility
2. CORS headers
3. Login endpoint
4. Response format

---

## 🔍 Common Errors and Solutions

### Error 1: "Cannot connect to backend server"

**Cause:** CORS not configured on PythonAnywhere

**Solution:**
1. Go to PythonAnywhere
2. Open `cashbook_backend/settings.py`
3. Copy CORS code from `cashbook-backend/EXACT_CODE_TO_COPY_PYTHONANYWHERE.txt`
4. Save and reload web app

---

### Error 2: "401 Unauthorized" or "Invalid credentials"

**Cause:** Wrong username/password

**Solution:**
1. Verify username and password are correct
2. Try registering a new account
3. Check if account exists in Django admin

---

### Error 3: "Failed to fetch" or Network Error

**Cause:** Backend is down or unreachable

**Solution:**
1. Check if backend is running: `https://rajeswari.pythonanywhere.com/api/`
2. Should return JSON (not HTML)
3. If HTML, backend is not running
4. Reload PythonAnywhere web app

---

### Error 4: "Invalid JSON response"

**Cause:** Backend returning HTML instead of JSON

**Solution:**
1. Backend might be showing error page
2. Check PythonAnywhere error logs
3. Verify Django is running correctly

---

### Error 5: "No access token in response"

**Cause:** Backend response format doesn't match expected format

**Solution:**
1. Backend should return: `{ "access": "...", "refresh": "..." }`
2. Check PythonAnywhere error logs
3. Verify JWT is configured correctly

---

## 📋 Step-by-Step Diagnosis

### 1. Test API Root

```javascript
fetch('https://rajeswari.pythonanywhere.com/api/')
  .then(r => r.json())
  .then(data => console.log('✅ API Working:', data))
  .catch(err => console.error('❌ API Error:', err));
```

**Expected:** JSON response with API endpoints

---

### 2. Test CORS Headers

```javascript
fetch('https://rajeswari.pythonanywhere.com/api/')
  .then(r => {
    console.log('CORS Header:', r.headers.get('access-control-allow-origin'));
    return r.json();
  })
  .then(data => console.log('✅ CORS Working'))
  .catch(err => console.error('❌ CORS Error:', err));
```

**Expected:** Should see `access-control-allow-origin: *`

---

### 3. Test Login Endpoint

```javascript
fetch('https://rajeswari.pythonanywhere.com/api/token/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'test', password: 'test' })
})
.then(r => {
  console.log('Status:', r.status);
  return r.json();
})
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));
```

**Expected:** 
- Status 200 = Success (with access/refresh tokens)
- Status 401 = Wrong credentials (but CORS is working)

---

## ✅ Verification Checklist

- [ ] Backend API root returns JSON: `https://rajeswari.pythonanywhere.com/api/`
- [ ] CORS headers present (check with `testCorsConnection()`)
- [ ] Login endpoint accessible: `https://rajeswari.pythonanywhere.com/api/token/`
- [ ] Correct username/password
- [ ] No browser console errors
- [ ] Frontend rebuilt and deployed (if you made changes)

---

## 🚀 Quick Fixes

### Fix 1: Clear Browser Cache

1. Press **Ctrl+Shift+Delete**
2. Clear cache and cookies
3. Hard refresh: **Ctrl+Shift+R**
4. Try login again

---

### Fix 2: Rebuild Frontend

If you updated frontend code:

```bash
cd cashbook_app
npm run build
```

Then deploy to GitHub Pages.

---

### Fix 3: Check PythonAnywhere

1. Log in to PythonAnywhere
2. Go to **Web** tab
3. Check **Error log**
4. Look for Django errors
5. Reload web app if needed

---

## 📞 Still Not Working?

1. **Run diagnostics:** `diagnoseLogin('username', 'password')` in console
2. **Check error logs:** PythonAnywhere → Web → Error log
3. **Verify CORS:** Run `testCorsConnection()` in console
4. **Check network tab:** F12 → Network → Look for failed requests

**Share the exact error message from browser console for more help!**

