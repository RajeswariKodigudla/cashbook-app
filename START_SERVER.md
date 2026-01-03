# Start Backend Server - Quick Guide

## 🚀 **How to Start Django Backend Server**

### **Step 1: Navigate to Backend Directory**

```bash
cd backend\backend
```

### **Step 2: Activate Virtual Environment**

```bash
..\venv\Scripts\activate
```

**Expected:** Should see `(venv)` in your prompt

### **Step 3: Start Server**

```bash
python manage.py runserver
```

**Expected Output:**
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
January 15, 2025 - 12:00:00
Django version X.X.X, using settings 'backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### **Step 4: Verify Server is Running**

**Open browser and go to:**
```
http://127.0.0.1:8000/
```

**Expected:** Should see API information JSON

---

## ✅ **Server is Running When You See:**

- ✅ "Starting development server at http://127.0.0.1:8000/"
- ✅ No errors in console
- ✅ Can access `http://127.0.0.1:8000/` in browser

---

## ❌ **Common Issues**

### **Issue 1: "No module named 'django'"**

**Fix:**
```bash
cd backend
pip install -r requirements.txt
```

### **Issue 2: "Port 8000 already in use"**

**Fix:** Use different port:
```bash
python manage.py runserver 8001
```

Then update `src/config/api.js`:
```javascript
export const API_BASE_URL = 'http://127.0.0.1:8001/api';
```

### **Issue 3: "ModuleNotFoundError"**

**Fix:** Make sure virtual environment is activated:
```bash
..\venv\Scripts\activate
```

### **Issue 4: "Database locked"**

**Fix:** Close other processes using database, or restart

---

## 🧪 **Quick Test**

**After starting server, test in browser:**

```
http://127.0.0.1:8000/
```

**Should return:**
```json
{
  "message": "Cashbook API",
  "version": "1.0",
  "endpoints": {...}
}
```

---

## 📝 **Complete Command Sequence**

```bash
# Navigate to backend
cd backend\backend

# Activate virtual environment
..\venv\Scripts\activate

# Start server
python manage.py runserver
```

**Keep this terminal window open!** The server runs until you stop it (CTRL+C).

---

## 🎯 **Once Server is Running**

1. ✅ Server running on `http://127.0.0.1:8000/`
2. ✅ Frontend can connect to API
3. ✅ Can save income/expense transactions
4. ✅ Can login and use app

**Now try saving income data again!**


