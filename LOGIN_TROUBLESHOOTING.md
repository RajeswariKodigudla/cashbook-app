# Login Troubleshooting Guide

## 🔍 **Common Login Issues & Fixes**

---

## ❌ **Issue 1: "Failed to login" Error**

### **Possible Causes:**

1. **Backend not running**
2. **Wrong API URL**
3. **CORS error**
4. **Invalid credentials**
5. **Backend authentication endpoint issue**
6. **Token response format mismatch**

---

## 🧪 **Step-by-Step Debugging**

### **Step 1: Check Backend is Running**

```bash
cd backend\backend
python manage.py runserver
```

**Expected:** Server should start on `http://127.0.0.1:8000`

**Check:** Open `http://127.0.0.1:8000/` in browser
- Should see API information JSON
- If not, backend is not running

---

### **Step 2: Check API URL Configuration**

**File:** `src/config/api.js`

**Should be:**
```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
```

**Check:** Open browser console and run:
```javascript
console.log('API URL:', process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api');
```

**Expected:** Should show `http://127.0.0.1:8000/api`

---

### **Step 3: Test Login API Directly**

**Open browser console and run:**

```javascript
// Test login endpoint
fetch('http://127.0.0.1:8000/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'your_username',  // Replace with your username
    password: 'your_password'  // Replace with your password
  })
})
.then(r => r.json())
.then(data => {
  console.log('Login Response:', data);
  if (data.access) {
    console.log('✅ Login successful!');
    localStorage.setItem('authToken', data.access);
  } else {
    console.error('❌ Login failed:', data);
  }
})
.catch(err => console.error('❌ Error:', err));
```

**Expected Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**If you get error:**
- Check backend is running
- Check username/password is correct
- Check Django user exists

---

### **Step 4: Check User Exists in Database**

```bash
cd backend\backend
python manage.py shell
```

```python
from django.contrib.auth.models import User
users = User.objects.all()
for u in users:
    print(f"Username: {u.username}, Email: {u.email}")

# If no users, create one:
# User.objects.create_user('testuser', 'test@example.com', 'testpass123')
```

**Expected:** Should see your user

**If no users:** Create one using `createsuperuser`:
```bash
python manage.py createsuperuser
```

---

### **Step 5: Check CORS Configuration**

**File:** `backend/backend/backend/settings.py`

**Should have:**
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

**Check:** If CORS error in console, update settings.py

---

### **Step 6: Check Browser Console for Errors**

**Open DevTools (F12) → Console tab**

**Look for:**
- ❌ CORS errors
- ❌ Network errors
- ❌ 401/404/500 errors
- ❌ "Failed to fetch" errors

**Common Errors:**
- `CORS policy` → CORS not configured
- `Failed to fetch` → Backend not running
- `401 Unauthorized` → Wrong credentials
- `404 Not Found` → Wrong endpoint URL

---

### **Step 7: Check Network Tab**

**Open DevTools (F12) → Network tab**

1. Try to login
2. Look for request to `/api/auth/login/`
3. Check:
   - **Status:** Should be 200 or 201
   - **Request URL:** Should be `http://127.0.0.1:8000/api/auth/login/`
   - **Request Payload:** Should have `username` and `password`
   - **Response:** Should have `access` and `refresh` tokens

**If 401:** Wrong credentials
**If 404:** Wrong endpoint URL
**If 500:** Backend error (check Django console)

---

## 🔧 **Quick Fixes**

### **Fix 1: Create User (If No Users)**

```bash
cd backend\backend
python manage.py createsuperuser
```

Enter:
- Username: `testuser`
- Email: `test@example.com`
- Password: `testpass123`

---

### **Fix 2: Check Django Authentication Endpoint**

**File:** `backend/backend/backend/urls.py`

**Should have:**
```python
path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
```

**Verify:** Endpoint exists and is correct

---

### **Fix 3: Check Login Request Format**

**Django expects:**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**NOT:**
```json
{
  "email": "...",
  "password": "..."
}
```

**Check:** `src/services/api.js` - login function should send `username`

---

### **Fix 4: Check Token Response Handling**

**Django returns:**
```json
{
  "access": "...",
  "refresh": "..."
}
```

**Check:** `src/services/auth.js` - should handle `response.access`

---

## 🐛 **Common Error Messages**

### **Error: "Network Error" or "Failed to fetch"**
- **Cause:** Backend not running or wrong URL
- **Fix:** Start backend server

### **Error: "CORS policy"**
- **Cause:** CORS not configured
- **Fix:** Update `settings.py` CORS settings

### **Error: "401 Unauthorized"**
- **Cause:** Wrong username/password
- **Fix:** Check credentials or create user

### **Error: "404 Not Found"**
- **Cause:** Wrong endpoint URL
- **Fix:** Check `urls.py` and API URL config

### **Error: "Invalid response from server"**
- **Cause:** Response format mismatch
- **Fix:** Check token response handling

---

## ✅ **Working Login Flow**

```
User enters credentials
  ↓
LoginModal calls login()
  ↓
auth.js calls authAPI.login()
  ↓
api.js makes POST to /api/auth/login/
  ↓
Django validates credentials
  ↓
Returns { access, refresh } tokens
  ↓
auth.js stores tokens
  ↓
AuthContext updates state
  ↓
User logged in ✅
```

---

## 🧪 **Test Login Manually**

**Run this in browser console:**

```javascript
// Step 1: Test backend
fetch('http://127.0.0.1:8000/')
  .then(r => r.json())
  .then(d => console.log('✅ Backend:', d))
  .catch(e => console.error('❌ Backend error:', e));

// Step 2: Test login
fetch('http://127.0.0.1:8000/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'testuser',  // Your username
    password: 'testpass123'  // Your password
  })
})
.then(r => {
  console.log('Status:', r.status);
  return r.json();
})
.then(d => {
  console.log('Response:', d);
  if (d.access) {
    console.log('✅ Login works!');
    localStorage.setItem('authToken', d.access);
  } else {
    console.error('❌ Login failed:', d);
  }
})
.catch(e => console.error('❌ Error:', e));
```

---

## 📋 **Checklist**

- [ ] Backend server running
- [ ] User exists in database
- [ ] API URL is correct
- [ ] CORS configured
- [ ] Login endpoint exists
- [ ] Request format is correct (username, not email)
- [ ] Response handling is correct (access, not token)
- [ ] No console errors
- [ ] Network tab shows request

---

## 🎯 **Most Likely Issues**

1. **Backend not running** - Start Django server
2. **No user created** - Create user with `createsuperuser`
3. **Wrong credentials** - Check username/password
4. **CORS error** - Update Django CORS settings
5. **Wrong API URL** - Check `src/config/api.js`

---

## 💡 **Quick Solution**

**Try this first:**

1. **Start backend:**
   ```bash
   cd backend\backend
   python manage.py runserver
   ```

2. **Create user:**
   ```bash
   python manage.py createsuperuser
   ```

3. **Test login in browser console** (see above)

4. **If works in console but not in app:**
   - Check browser console for errors
   - Check Network tab for failed requests
   - Verify API URL configuration

---

## 📝 **Next Steps**

If login still fails after checking all above:

1. Share the exact error message from browser console
2. Share the Network tab request/response
3. Share Django server console output
4. Check if backend authentication is working

I can help debug further with specific error messages!


