# 🚨 URGENT: Start Backend Server

## **Error: "Cannot connect to server"**

**This means:** Django backend server is **NOT running**

---

## ✅ **QUICK FIX (Choose One)**

### **Option 1: Double-Click Script (EASIEST)**

**Double-click:** `start-backend.bat` in project root

**That's it!** Server will start automatically.

---

### **Option 2: Command Line**

**Open PowerShell and run:**

```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py runserver
```

**Expected Output:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

**Keep this window open!** Server runs until you stop it (CTRL+C).

---

## ✅ **Verify Server is Running**

### **Step 1: Check Terminal**

**You should see:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

**If you see errors:** Check the error message below

---

### **Step 2: Test in Browser**

**Open:** `http://127.0.0.1:8000/`

**Expected:** Should see API information JSON:
```json
{
  "message": "Cashbook API",
  "version": "1.0",
  "endpoints": {...}
}
```

**If you see it:** ✅ Server is running!

**If you see error:** ❌ Server not running - check terminal

---

## ❌ **Common Errors & Fixes**

### **Error 1: "No module named 'django'"**

**Fix:**
```bash
cd backend
pip install -r requirements.txt
```

---

### **Error 2: "Port 8000 already in use"**

**Fix Option 1:** Kill the process using port 8000

**Fix Option 2:** Use different port:
```bash
python manage.py runserver 8001
```

Then update `src/config/api.js`:
```javascript
export const API_BASE_URL = 'http://127.0.0.1:8001/api';
```

---

### **Error 3: "no such table: transactions_transaction"**

**Fix:** Run migrations first:
```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py migrate
```

Then start server:
```bash
python manage.py runserver
```

---

### **Error 4: Virtual Environment Not Activated**

**Error:** `No module named 'django'` or similar

**Fix:** Make sure you see `(venv)` in prompt:
```bash
..\venv\Scripts\activate
```

---

## 🧪 **Quick Test After Starting**

**After starting server, test in browser console:**

```javascript
// Test 1: Backend accessible?
fetch('http://127.0.0.1:8000/')
  .then(r => r.json())
  .then(d => console.log('✅ Backend working:', d))
  .catch(e => console.error('❌ Backend error:', e));

// Test 2: API endpoint accessible?
fetch('http://127.0.0.1:8000/api/transactions/')
  .then(r => console.log('✅ API accessible, Status:', r.status))
  .catch(e => console.error('❌ API error:', e));
```

**If both work:** ✅ Server is running correctly!

---

## 📋 **Complete Setup Steps**

1. **Start Backend:**
   ```bash
   cd backend\backend
   ..\venv\Scripts\activate
   python manage.py runserver
   ```

2. **Verify Server:**
   - Open `http://127.0.0.1:8000/` in browser
   - Should see API info

3. **Start Frontend (in another terminal):**
   ```bash
   npm start
   ```

4. **Test:**
   - Login
   - Try saving income
   - Should work now!

---

## ✅ **Once Server is Running**

- ✅ Frontend can connect
- ✅ Can login
- ✅ Can save income/expense
- ✅ All API calls work

**Keep the server terminal window open while using the app!**

---

## 🎯 **Quick Checklist**

- [ ] Backend server started (`python manage.py runserver`)
- [ ] See "Starting development server at http://127.0.0.1:8000/"
- [ ] Can access `http://127.0.0.1:8000/` in browser
- [ ] See API information JSON
- [ ] Try saving income - should work now!

---

## 💡 **Remember**

**The backend server MUST be running for the frontend to work!**

- Keep terminal window open
- Server runs until you press CTRL+C
- If you close terminal, server stops
- Restart server if you close it

**START THE SERVER NOW!**


