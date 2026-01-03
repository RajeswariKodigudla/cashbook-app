# Server Not Running - Quick Fix

## 🚨 **Error: "Cannot connect to server"**

**This means:** Django backend server is **NOT running**

---

## ✅ **Quick Fix (30 seconds)**

### **Step 1: Start Server**

**Double-click:** `start-backend.bat`

**OR run:**
```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py runserver
```

---

### **Step 2: Verify**

**Open browser:** `http://127.0.0.1:8000/`

**Should see:** API information JSON

---

### **Step 3: Try Again**

**Now try saving income - should work!**

---

## ✅ **Server is Running When:**

- ✅ Terminal shows: "Starting development server at http://127.0.0.1:8000/"
- ✅ Can access `http://127.0.0.1:8000/` in browser
- ✅ See API information

---

## ❌ **If Server Won't Start**

### **Error: "No module named 'django'"**

```bash
cd backend
pip install -r requirements.txt
```

### **Error: "Port already in use"**

```bash
python manage.py runserver 8001
```

---

## 🎯 **Important**

**The backend server MUST be running for:**
- ✅ Login to work
- ✅ Saving income/expense to work
- ✅ All API calls to work

**Keep the server terminal open while using the app!**

---

## 📝 **Quick Command**

```bash
cd backend\backend && ..\venv\Scripts\activate && python manage.py runserver
```

**Run this, then try saving income again!**


