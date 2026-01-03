# Check Frontend-Backend Connection Guide

## 🔍 Current Status Analysis

### Issues Found:

1. ❌ **API URL Mismatch**
   - Frontend configured for: `http://localhost:5000/api` (Node.js)
   - Django backend runs on: `http://127.0.0.1:8000/api`

2. ❌ **Components Still Using localStorage**
   - `Income.jsx` - Still using localStorage
   - `Expense.jsx` - Still using localStorage
   - `Home.jsx` - Still using localStorage

3. ❌ **JWT Token Format Mismatch**
   - Django returns: `{ access: "...", refresh: "..." }`
   - Frontend expects: `{ token: "...", user: {...} }`

4. ❌ **No Authentication in App.js**
   - LoginModal not integrated
   - No auth check on app load

---

## 🔧 Step-by-Step Fix

### Step 1: Fix API Configuration

**Update `src/config/api.js`:**

```javascript
// Change from Node.js to Django
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
```

**Create `.env` file in project root:**

```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

---

### Step 2: Fix Authentication Service

**Update `src/services/auth.js` to handle Django JWT format:**

```javascript
import { authAPI } from './api';
import { setAuthToken, removeAuthToken } from '../config/api';

export const login = async (username, password) => {
  try {
    const response = await authAPI.login(username, password);
    
    // Django returns { access, refresh } not { token }
    if (response.access) {
      setAuthToken(response.access);
      // Store refresh token too
      localStorage.setItem('refreshToken', response.refresh);
      
      // Get user info (Django doesn't return user in login, need to fetch)
      const userResponse = await authAPI.getCurrentUser();
      
      return { 
        success: true, 
        user: userResponse.user, 
        token: response.access,
        refreshToken: response.refresh
      };
    }
    return { success: false, message: 'Invalid response from server' };
  } catch (error) {
    return { success: false, message: error.message || 'Login failed' };
  }
};
```

---

### Step 3: Update API Service for Django

**Update `src/services/api.js` - Fix auth endpoints:**

```javascript
// Auth API - Django format
export const authAPI = {
  register: async (username, email, password) => {
    // Django doesn't have register endpoint by default
    // You'll need to create one or use admin to create users
    throw new Error('Registration not implemented. Use Django admin to create users.');
  },

  login: async (username, password) => {
    // Django uses username, not email
    return apiCall('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  refresh: async (refreshToken) => {
    return apiCall('/auth/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
  },

  getCurrentUser: async () => {
    // Django doesn't have /auth/me, need to create or use accounts endpoint
    return apiCall('/accounts/'); // This will return user's accounts, not user info
  },
};
```

---

### Step 4: Add Authentication to App.js

**Update `src/App.js`:**

```javascript
import { useState, useEffect } from 'react';
import { isAuthenticated } from './services/auth';
import LoginModal from './components/LoginModal';

export default function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      setShowLogin(true);
    }
  }, []);

  const handleLoginSuccess = (user, token) => {
    setUser(user);
    setShowLogin(false);
  };

  return (
    <>
      {/* LOGIN MODAL */}
      {showLogin && (
        <LoginModal 
          onClose={() => {}} 
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* Rest of your app */}
      {/* ... */}
    </>
  );
}
```

---

## 🧪 Testing the Connection

### Test 1: Check API URL Configuration

**Open browser console and run:**

```javascript
// Check API URL
console.log('API URL:', process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api');
```

**Expected:** Should show Django backend URL

---

### Test 2: Test Backend is Running

**Open browser and go to:**
```
http://127.0.0.1:8000/
```

**Expected:** Should see API information JSON

---

### Test 3: Test Login API

**In browser console:**

```javascript
// Test login
fetch('http://127.0.0.1:8000/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'your_username',
    password: 'your_password'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Expected Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### Test 4: Test Authenticated API Call

**In browser console (after login):**

```javascript
// Get token from localStorage
const token = localStorage.getItem('authToken');

// Test getting accounts
fetch('http://127.0.0.1:8000/api/accounts/', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Expected:** Should return accounts array or empty array

---

### Test 5: Test Creating Transaction

**In browser console:**

```javascript
const token = localStorage.getItem('authToken');

fetch('http://127.0.0.1:8000/api/transactions/', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'expense',
    amount: '10.00',
    date: '2025-01-15',
    time: '12:00',
    account: 'Cashbook',
    payment: 'Cash'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Expected:** Should return created transaction object

---

## 🔍 Verification Checklist

### Backend Check:
- [ ] Django server running on `http://127.0.0.1:8000`
- [ ] Can access `http://127.0.0.1:8000/` (see API info)
- [ ] Can login via `/api/auth/login/`
- [ ] Get access and refresh tokens
- [ ] Can access protected endpoints with token

### Frontend Check:
- [ ] `.env` file has correct API URL
- [ ] `src/config/api.js` points to Django backend
- [ ] Login modal appears if not authenticated
- [ ] Can login successfully
- [ ] Token stored in localStorage
- [ ] Can make API calls with token
- [ ] Components use API instead of localStorage

---

## 🐛 Common Issues & Fixes

### Issue 1: CORS Error

**Error:** `Access to fetch at 'http://127.0.0.1:8000/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Fix:** Django CORS is already configured, but verify:
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

**Fix:**
- Check if token exists: `localStorage.getItem('authToken')`
- Check token format: Should start with `eyJ`
- Verify token is sent in header: `Authorization: Bearer <token>`

---

### Issue 3: 404 Not Found

**Error:** `404 Not Found`

**Fix:**
- Check API URL in `.env`
- Verify Django server is running
- Check endpoint path matches Django URLs

---

### Issue 4: Login Returns Wrong Format

**Error:** `Invalid response from server`

**Fix:**
- Django returns `{ access, refresh }` not `{ token }`
- Update `src/services/auth.js` to handle Django format

---

## 📝 Quick Test Script

**Create `test-connection.html` in project root:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test API Connection</title>
</head>
<body>
    <h1>Test Django API Connection</h1>
    <button onclick="testLogin()">Test Login</button>
    <button onclick="testGetAccounts()">Test Get Accounts</button>
    <div id="result"></div>

    <script>
        const API_URL = 'http://127.0.0.1:8000/api';
        
        async function testLogin() {
            const result = document.getElementById('result');
            try {
                const response = await fetch(`${API_URL}/auth/login/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: 'testuser',  // Change to your username
                        password: 'testpass'   // Change to your password
                    })
                });
                const data = await response.json();
                if (data.access) {
                    localStorage.setItem('authToken', data.access);
                    result.innerHTML = '<p style="color:green">✅ Login successful! Token saved.</p>';
                } else {
                    result.innerHTML = '<p style="color:red">❌ Login failed: ' + JSON.stringify(data) + '</p>';
                }
            } catch (error) {
                result.innerHTML = '<p style="color:red">❌ Error: ' + error.message + '</p>';
            }
        }

        async function testGetAccounts() {
            const result = document.getElementById('result');
            const token = localStorage.getItem('authToken');
            if (!token) {
                result.innerHTML = '<p style="color:red">❌ No token. Login first!</p>';
                return;
            }
            try {
                const response = await fetch(`${API_URL}/accounts/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                result.innerHTML = '<p style="color:green">✅ Accounts retrieved: ' + JSON.stringify(data) + '</p>';
            } catch (error) {
                result.innerHTML = '<p style="color:red">❌ Error: ' + error.message + '</p>';
            }
        }
    </script>
</body>
</html>
```

Open this file in browser to test!

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ Login modal appears on app load
2. ✅ Can login with Django credentials
3. ✅ Token stored in localStorage
4. ✅ Can create transactions via API
5. ✅ Can fetch transactions from API
6. ✅ No localStorage errors in console
7. ✅ Network tab shows API calls to Django backend
8. ✅ Data persists after page refresh

---

## 🚀 Next Steps

1. Fix API URL configuration
2. Update auth service for Django format
3. Update components to use API
4. Test login flow
5. Test CRUD operations
6. Verify data persistence

See detailed fixes in the sections above!


