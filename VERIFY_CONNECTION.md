# Verify Frontend-Backend Connection

## 🔍 Quick Verification Steps

### Step 1: Check Configuration

**1. Verify API URL in `.env` file:**
```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

**2. Check `src/config/api.js`:**
```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
```

---

### Step 2: Start Backend

```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py runserver
```

**Verify:** Open `http://127.0.0.1:8000/` - should see API info

---

### Step 3: Test Login

**Option A: Using Browser Console**

1. Open your React app: `http://localhost:3000`
2. Open browser console (F12)
3. Run:

```javascript
// Test login
fetch('http://127.0.0.1:8000/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'your_username',  // Use your Django username
    password: 'your_password'   // Use your Django password
  })
})
.then(r => r.json())
.then(data => {
  console.log('Login Response:', data);
  if (data.access) {
    localStorage.setItem('authToken', data.access);
    console.log('✅ Token saved!');
  }
})
.catch(err => console.error('❌ Error:', err));
```

**Expected:** Should return `{ access: "...", refresh: "..." }`

---

**Option B: Using Login Modal**

1. Start React app: `npm start`
2. Login modal should appear
3. Enter Django username and password
4. Check browser console for errors
5. Check Network tab for API calls

---

### Step 4: Test API Call

**After login, test getting accounts:**

```javascript
const token = localStorage.getItem('authToken');
console.log('Token:', token);

fetch('http://127.0.0.1:8000/api/accounts/', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => {
  console.log('✅ Accounts:', data);
})
.catch(err => console.error('❌ Error:', err));
```

**Expected:** Should return accounts array (may be empty)

---

### Step 5: Check Network Tab

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Try to login or make an API call
4. Look for requests to `127.0.0.1:8000`
5. Check:
   - ✅ Request URL is correct
   - ✅ Request has `Authorization: Bearer ...` header
   - ✅ Response status is 200 (not 401, 404, 500)
   - ✅ Response contains data

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ **Backend accessible:** `http://127.0.0.1:8000/` shows API info
2. ✅ **Login works:** Can login and get tokens
3. ✅ **Token stored:** `localStorage.getItem('authToken')` returns token
4. ✅ **API calls work:** Can fetch accounts/transactions
5. ✅ **No CORS errors:** Network tab shows successful requests
6. ✅ **No 401 errors:** Authenticated requests work

---

## 🐛 Common Issues

### Issue 1: CORS Error

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Fix:** Check Django CORS settings:
```python
# backend/backend/backend/settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

---

### Issue 2: 401 Unauthorized

**Error:** `401 Unauthorized`

**Possible causes:**
- Token not sent in header
- Token expired
- Token format wrong

**Fix:**
```javascript
// Check token exists
console.log('Token:', localStorage.getItem('authToken'));

// Check token in request
// Should be: Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

---

### Issue 3: 404 Not Found

**Error:** `404 Not Found`

**Fix:**
- Check API URL is correct
- Check Django server is running
- Check endpoint path matches Django URLs

---

### Issue 4: Wrong Response Format

**Error:** `Invalid response from server`

**Fix:** Django returns different format than Node.js:
- Django: `{ access: "...", refresh: "..." }`
- Node.js: `{ token: "...", user: {...} }`

Update `src/services/auth.js` to handle Django format (already fixed above)

---

## 🧪 Automated Test

**Use the test script:**

```javascript
// In browser console
import { testConnection } from './src/utils/testConnection';
testConnection();
```

Or create a test page - see `CHECK_FRONTEND_BACKEND_CONNECTION.md`

---

## 📋 Verification Checklist

- [ ] Backend running on `http://127.0.0.1:8000`
- [ ] Frontend API URL points to Django backend
- [ ] `.env` file has correct URL
- [ ] Can login and get tokens
- [ ] Token stored in localStorage
- [ ] Can make authenticated API calls
- [ ] No CORS errors
- [ ] No 401/404 errors
- [ ] Data persists after refresh

---

## 🎯 Next Steps After Verification

Once connection is verified:

1. Update components to use API (replace localStorage)
2. Add error handling
3. Add loading states
4. Add token refresh mechanism
5. Test all CRUD operations

See `CHECK_FRONTEND_BACKEND_CONNECTION.md` for detailed fixes!

