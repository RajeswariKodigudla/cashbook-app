# Quick Start Backend Server

## 🚀 **Fastest Way to Start Server**

### **Option 1: Double-Click Script (Easiest)**

**Double-click:** `start-backend.bat`

**That's it!** Server will start automatically.

---

### **Option 2: Command Line**

**Open PowerShell or Command Prompt and run:**

```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py runserver
```

---

## ✅ **Verify Server is Running**

**Open browser:** `http://127.0.0.1:8000/`

**Should see:** API information JSON

**If you see it:** ✅ Server is running!

**If you see error:** ❌ Server not running - check terminal for errors

---

## 🎯 **After Server Starts**

1. ✅ Keep terminal window open
2. ✅ Server runs until you press CTRL+C
3. ✅ Now frontend can connect
4. ✅ Try saving income data again

---

## ❌ **If Server Won't Start**

### **Error: "No module named 'django'"**

**Fix:**
```bash
cd backend
pip install -r requirements.txt
```

### **Error: "Port already in use"**

**Fix:** Kill process using port 8000, or use different port:
```bash
python manage.py runserver 8001
```

### **Error: "Database locked"**

**Fix:** Close other processes, restart computer if needed

---

## 📝 **Quick Checklist**

- [ ] Navigate to `backend\backend`
- [ ] Activate venv: `..\venv\Scripts\activate`
- [ ] Run: `python manage.py runserver`
- [ ] See: "Starting development server at http://127.0.0.1:8000/"
- [ ] Test: Open `http://127.0.0.1:8000/` in browser
- [ ] Should see: API information

---

## 🎯 **Once Running**

**Now your frontend can:**
- ✅ Connect to backend
- ✅ Save income/expense data
- ✅ Login and authenticate
- ✅ All API calls will work

**Try saving income data again - it should work now!**


