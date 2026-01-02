# Fix: Cannot Connect to Server

## 🚨 **Problem: "Cannot connect to server"**

This means the **Django backend server is not running**.

---

## ✅ **Solution: Start Backend Server**

### **Method 1: Double-Click Script (Easiest)**

**Double-click:** `start-backend.bat`

**That's it!** Server will start automatically.

---

### **Method 2: Command Line**

**Open PowerShell or Command Prompt:**

```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py runserver
```

**Expected Output:**
```
Starting development server at http://127.0.0.1:8000/
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

**If you see errors:** Check the error message

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

### **Step 3: Test Connection from Frontend**

**After server starts, try saving income again.**

**Should work now!**

---

## ❌ **Common Issues**

### **Issue 1: "No module named 'django'"**

**Error in terminal:** `ModuleNotFoundError: No module named 'django'`

**Fix:**
```bash
cd backend
pip install -r requirements.txt
```

---

### **Issue 2: "Port 8000 already in use"**

**Error:** `Error: That port is already in use`

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

### **Issue 3: "Database locked"**

**Error:** `OperationalError: database is locked`

**Fix:**
- Close other processes using database
- Restart computer if needed

---

### **Issue 4: Virtual Environment Not Activated**

**Error:** `No module named 'django'` or similar

**Fix:** Make sure you see `(venv)` in prompt:
```bash
..\venv\Scripts\activate
```

---

## 🧪 **Quick Test**

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

3. **Start Frontend:**
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

**The backend server must be running for the frontend to work!**

- Keep terminal window open
- Server runs until you press CTRL+C
- If you close terminal, server stops
- Restart server if you close it

**Start the server now and try again!**

