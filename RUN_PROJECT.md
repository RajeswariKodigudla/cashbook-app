# 🚀 How to Run the Full-Stack Cashbook Project

## **Quick Start:**

### **Option 1: Using Batch Scripts (Easiest)**

1. **Start Backend:**
   - Double-click `start-backend.bat`
   - Or run: `start-backend.bat`
   - Backend runs on: `http://127.0.0.1:8000/`

2. **Start Frontend:**
   - Open a new terminal
   - Run: `npm start`
   - Frontend runs on: `http://localhost:3000/`

---

### **Option 2: Manual Start**

#### **Step 1: Start Django Backend**

```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py runserver
```

**Backend URL:** `http://127.0.0.1:8000/`

#### **Step 2: Start React Frontend**

Open a **new terminal window** and run:

```bash
npm start
```

**Frontend URL:** `http://localhost:3000/`

---

## **✅ Verify Everything is Running:**

### **1. Check Backend:**
- Open browser: `http://127.0.0.1:8000/api/`
- Should see API root page

### **2. Check Frontend:**
- Open browser: `http://localhost:3000/`
- Should see login page

### **3. Test Login:**
- Register a new user or login
- Should see the cashbook dashboard

---

## **🔧 Troubleshooting:**

### **Backend Not Starting:**
- ✅ Check if virtual environment is activated
- ✅ Check if migrations are run: `python manage.py migrate`
- ✅ Check if port 8000 is available

### **Frontend Not Starting:**
- ✅ Check if Node.js is installed: `node --version`
- ✅ Install dependencies: `npm install`
- ✅ Check if port 3000 is available

### **Cannot Connect to Backend:**
- ✅ Verify backend is running on `http://127.0.0.1:8000/`
- ✅ Check `src/config/api.js` has correct `API_BASE_URL`
- ✅ Check CORS settings in Django `settings.py`

---

## **📋 Running Order:**

1. **First:** Start Backend (Django)
2. **Then:** Start Frontend (React)
3. **Finally:** Open browser to `http://localhost:3000/`

---

## **🛑 To Stop:**

- **Backend:** Press `CTRL+C` in backend terminal
- **Frontend:** Press `CTRL+C` in frontend terminal

---

**Your full-stack cashbook app is now running!**
