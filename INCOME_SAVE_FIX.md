# Income Data Not Saving - "Failed to Fetch" Fix

## 🚨 **Problem: "Failed to fetch" Error**

This error means the frontend cannot connect to the backend server.

---

## 🔧 **Quick Fixes**

### **Fix 1: Start Backend Server** (Most Common)

**The backend must be running for API calls to work!**

```bash
cd backend\backend
python manage.py runserver
```

**Expected:** Should see:
```
Starting development server at http://127.0.0.1:8000/
```

**Verify:** Open `http://127.0.0.1:8000/` in browser - should see API info

---

### **Fix 2: Check API URL**

**File:** `src/config/api.js`

**Should be:**
```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
```

**Check in browser console:**
```javascript
console.log('API URL:', process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api');
```

---

### **Fix 3: Check Authentication**

**"Failed to fetch" can also mean authentication failed.**

1. **Check if logged in:**
   ```javascript
   console.log('Token:', localStorage.getItem('authToken'));
   ```

2. **If no token:** Login first!

3. **If token exists:** Check if it's valid

---

### **Fix 4: Check CORS**

**If you see CORS error in console:**

**File:** `backend/backend/backend/settings.py`

**Should have:**
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

---

## 🧪 **Step-by-Step Debugging**

### **Step 1: Check Backend is Running**

```bash
cd backend\backend
python manage.py runserver
```

**Open:** `http://127.0.0.1:8000/`

**Expected:** Should see API information JSON

**If not:** Backend is not running - start it!

---

### **Step 2: Test API Endpoint Directly**

**Open browser console and run:**

```javascript
// Test if backend is accessible
fetch('http://127.0.0.1:8000/')
  .then(r => r.json())
  .then(d => console.log('✅ Backend working:', d))
  .catch(e => console.error('❌ Backend error:', e));
```

**Expected:** Should return API info

**If error:** Backend not running or wrong URL

---

### **Step 3: Test Transaction Creation**

**In browser console (after login):**

```javascript
const token = localStorage.getItem('authToken');
console.log('Token:', token ? 'Found' : 'Missing');

if (!token) {
  console.error('❌ No token - please login first!');
} else {
  fetch('http://127.0.0.1:8000/api/transactions/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'income',
      amount: '100.00',
      date: '2025-01-15',
      time: '12:00',
      account: 'Cashbook',
      payment: 'Cash'
    })
  })
  .then(r => {
    console.log('Status:', r.status);
    return r.json();
  })
  .then(d => {
    console.log('✅ Response:', d);
  })
  .catch(e => {
    console.error('❌ Error:', e);
  });
}
```

**Expected:** Should create transaction

**If error:** Check error message

---

### **Step 4: Check Network Tab**

1. Open DevTools (F12) → Network tab
2. Try to save income transaction
3. Look for request to `/api/transactions/`
4. Check:
   - **Status:** Should be 200 or 201
   - **Request URL:** Should be `http://127.0.0.1:8000/api/transactions/`
   - **Request Headers:** Should have `Authorization: Bearer ...`
   - **Response:** Should have transaction data

**If request shows "failed":**
- Backend not running
- Wrong URL
- Network issue

---

## 🐛 **Common Error Scenarios**

### **Error 1: "Failed to fetch"**
- **Cause:** Backend not running
- **Fix:** Start Django server

### **Error 2: "401 Unauthorized"**
- **Cause:** Not logged in or token expired
- **Fix:** Login again

### **Error 3: "CORS policy"**
- **Cause:** CORS not configured
- **Fix:** Update Django CORS settings

### **Error 4: "404 Not Found"**
- **Cause:** Wrong endpoint URL
- **Fix:** Check API URL configuration

### **Error 5: "Network Error"**
- **Cause:** Backend not accessible
- **Fix:** Check backend is running and URL is correct

---

## ✅ **Quick Checklist**

- [ ] Backend server running (`python manage.py runserver`)
- [ ] Backend accessible at `http://127.0.0.1:8000/`
- [ ] User is logged in (token exists)
- [ ] API URL is correct: `http://127.0.0.1:8000/api`
- [ ] No CORS errors in console
- [ ] Network tab shows request (not "failed")

---

## 🎯 **Most Likely Issue**

**90% of "failed to fetch" errors are because:**

**Backend server is not running!**

**Solution:**
```bash
cd backend\backend
python manage.py runserver
```

**Then try saving income again!**

---

## 💡 **Quick Test**

**Run this in browser console:**

```javascript
// Test 1: Backend running?
fetch('http://127.0.0.1:8000/')
  .then(r => r.json())
  .then(d => console.log('✅ Backend OK'))
  .catch(e => console.error('❌ Backend NOT running:', e));

// Test 2: Token exists?
console.log('Token:', localStorage.getItem('authToken') ? '✅ Found' : '❌ Missing');

// Test 3: API endpoint accessible?
fetch('http://127.0.0.1:8000/api/transactions/', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  }
})
.then(r => console.log('✅ API accessible, Status:', r.status))
.catch(e => console.error('❌ API error:', e));
```

**This will tell you exactly what's wrong!**

---

## 📝 **Improved Error Messages**

I've updated the error handling to show better messages:

- **Network errors:** Now show "Cannot connect to server" with helpful tips
- **Authentication errors:** Show "Session expired" message
- **Server errors:** Show actual error from backend

**Check the error message in the Income page - it should now be more helpful!**

---

## 🚀 **Next Steps**

1. **Start backend server** (if not running)
2. **Login** (if not logged in)
3. **Try saving income again**
4. **Check error message** - should be more helpful now
5. **Check browser console** for detailed errors

**The improved error handling will now tell you exactly what's wrong!**

