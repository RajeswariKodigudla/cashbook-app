# Quick Login Fix Guide

## 🚨 **Most Common Issues**

### **Issue 1: Backend Not Running**
**Symptom:** "Failed to fetch" or "Network error"

**Fix:**
```bash
cd backend\backend
python manage.py runserver
```

**Verify:** Open `http://127.0.0.1:8000/` - should see API info

---

### **Issue 2: No User Created**
**Symptom:** "401 Unauthorized" or "Invalid credentials"

**Fix:**
```bash
cd backend\backend
python manage.py createsuperuser
```

Enter:
- Username: `testuser`
- Email: `test@example.com`  
- Password: `testpass123`

---

### **Issue 3: Wrong Credentials**
**Symptom:** "401 Unauthorized"

**Fix:**
- Check username/password
- Use the user you created with `createsuperuser`

---

### **Issue 4: CORS Error**
**Symptom:** "CORS policy" error in console

**Fix:** Check `backend/backend/backend/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

---

## 🧪 **Quick Test**

**Open `test-login.html` in browser:**
1. Click "Test Backend Connection" - Should work
2. Enter username/password
3. Click "Test Login" - Should work
4. Check results

---

## 🔍 **Debug Steps**

### **Step 1: Check Browser Console**
- Open DevTools (F12) → Console
- Look for errors
- Check what error message appears

### **Step 2: Check Network Tab**
- Open DevTools (F12) → Network
- Try to login
- Look for request to `/api/auth/login/`
- Check status code and response

### **Step 3: Test Manually**
**In browser console:**
```javascript
fetch('http://127.0.0.1:8000/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'your_username',
    password: 'your_password'
  })
})
.then(r => r.json())
.then(d => console.log('Response:', d))
.catch(e => console.error('Error:', e));
```

---

## ✅ **Expected Behavior**

**Successful Login:**
- Status: 200 OK
- Response: `{ access: "...", refresh: "..." }`
- Token saved to localStorage
- Login modal closes
- App content shows

**Failed Login:**
- Status: 401 or 400
- Response: `{ detail: "..." }` or `{ message: "..." }`
- Error message shown in modal

---

## 🎯 **Quick Fix Checklist**

- [ ] Backend server running
- [ ] User created with `createsuperuser`
- [ ] Using correct username (not email)
- [ ] Using correct password
- [ ] No CORS errors
- [ ] API URL is correct: `http://127.0.0.1:8000/api`

---

## 💡 **If Still Not Working**

1. **Share the exact error message** from browser console
2. **Share the Network tab** request/response
3. **Share Django console** output
4. **Check** if backend authentication endpoint is working

Use `test-login.html` to debug step by step!

