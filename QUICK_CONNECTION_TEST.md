# Quick Connection Test Guide

## 🚀 Fastest Way to Test Connection

### Method 1: Use Test HTML Page (Easiest)

1. **Open `test-api.html` in your browser**
2. **Click "Test Backend"** - Should show API info
3. **Enter username/password** and click "Test Login"
4. **Click "Get Accounts"** - Should return accounts (may be empty)

**If all tests pass:** ✅ Connection is working!

---

### Method 2: Browser Console Test

1. **Start Django backend:**
   ```bash
   cd backend\backend
   python manage.py runserver
   ```

2. **Open React app:** `http://localhost:3000`

3. **Open browser console (F12)**

4. **Run this test:**

```javascript
// Test 1: Backend running?
fetch('http://127.0.0.1:8000/')
  .then(r => r.json())
  .then(d => console.log('✅ Backend:', d))
  .catch(e => console.error('❌ Backend error:', e));

// Test 2: Login (replace with your credentials)
fetch('http://127.0.0.1:8000/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'your_username',
    password: 'your_password'
  })
})
.then(r => r.json())
.then(d => {
  if (d.access) {
    localStorage.setItem('authToken', d.access);
    console.log('✅ Login successful! Token:', d.access.substring(0, 50));
  } else {
    console.error('❌ Login failed:', d);
  }
})
.catch(e => console.error('❌ Login error:', e));

// Test 3: Get accounts (after login)
const token = localStorage.getItem('authToken');
if (token) {
  fetch('http://127.0.0.1:8000/api/accounts/', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(r => r.json())
  .then(d => console.log('✅ Accounts:', d))
  .catch(e => console.error('❌ Accounts error:', e));
}
```

---

### Method 3: Check Network Tab

1. **Open React app**
2. **Open DevTools (F12) → Network tab**
3. **Try to login or make API call**
4. **Look for:**
   - ✅ Requests to `127.0.0.1:8000`
   - ✅ Status 200 (not 401, 404, 500)
   - ✅ Response contains data

---

## ✅ Success Checklist

- [ ] Backend accessible at `http://127.0.0.1:8000/`
- [ ] Can login and get `access` and `refresh` tokens
- [ ] Token stored in localStorage
- [ ] Can make authenticated API calls
- [ ] No CORS errors in console
- [ ] No 401/404 errors

---

## 🔧 If Tests Fail

### CORS Error?
→ Check Django CORS settings in `settings.py`

### 401 Unauthorized?
→ Check token is being sent: `Authorization: Bearer <token>`

### 404 Not Found?
→ Check API URL matches Django URLs

### Wrong Response Format?
→ Django uses `{ access, refresh }` not `{ token }`

See `CHECK_FRONTEND_BACKEND_CONNECTION.md` for detailed fixes!

