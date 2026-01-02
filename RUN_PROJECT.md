# How to Run the Cashbook Project

You have **3 parts** to run:
1. **Node.js Backend** (Port 5000)
2. **Django Backend** (Port 8000)
3. **React Frontend** (Port 3000)

---

## 🚀 Quick Start - Run Everything

### Option 1: Run Node.js Backend (Recommended - Already Complete)

**Terminal 1:**
```bash
cd backend
npm install
npm run dev
```

Server runs on: `http://localhost:5000`

---

### Option 2: Run Django Backend

**Terminal 1:**
```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py migrate
python manage.py runserver
```

Server runs on: `http://127.0.0.1:8000`

---

### Option 3: Run React Frontend

**Terminal 2:**
```bash
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 📋 Detailed Steps

### Step 1: Choose Your Backend

#### A. Node.js Backend (MongoDB)

**1. Start MongoDB:**
- Open Services (`Win + R` → `services.msc`)
- Find "MongoDB" → Right-click → Start

**2. Create `.env` file in `backend/` folder:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cashbook
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**3. Run backend:**
```bash
cd backend
npm install
npm run dev
```

**4. Test:**
- Open: `http://localhost:5000/api/health`
- Should see: `{"status":"OK","message":"Cashbook API is running"}`

---

#### B. Django Backend (SQLite)

**1. Activate virtual environment:**
```bash
cd backend\backend
..\venv\Scripts\activate
```

**2. Install dependencies (if not done):**
```bash
pip install -r requirements.txt
```

**3. Run migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

**4. Create superuser (optional):**
```bash
python manage.py createsuperuser
```

**5. Run server:**
```bash
python manage.py runserver
```

**6. Test:**
- Open: `http://127.0.0.1:8000/`
- Should see API information

---

### Step 2: Run React Frontend

**1. Install dependencies (if not done):**
```bash
npm install
```

**2. Start frontend:**
```bash
npm start
```

**3. Open browser:**
- Automatically opens: `http://localhost:3000`

---

## 🎯 Recommended Setup

### For Development:

**Terminal 1 - Node.js Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - React Frontend:**
```bash
npm start
```

**Then:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api/`

---

## 🔧 Troubleshooting

### MongoDB not running (Node.js backend):
- Start MongoDB service
- Or use MongoDB Atlas (cloud)

### Port already in use:
- Change PORT in `.env` file
- Or stop the process using the port

### Django migrations error:
```bash
python manage.py migrate
```

### Dependencies not installed:
```bash
# Node.js
npm install

# Django
pip install -r requirements.txt
```

---

## 📝 Quick Commands Summary

### Node.js Backend:
```bash
cd backend
npm install          # First time
npm run dev          # Run server
```

### Django Backend:
```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py migrate    # First time
python manage.py runserver  # Run server
```

### React Frontend:
```bash
npm install    # First time
npm start      # Run frontend
```

---

## ✅ Verify Everything is Running

1. **Node.js Backend:** `http://localhost:5000/api/health`
2. **Django Backend:** `http://127.0.0.1:8000/`
3. **React Frontend:** `http://localhost:3000`

All should show content without errors!

---

## 🎉 You're Ready!

Once all services are running, you can:
- Access the React app in your browser
- Test APIs using Postman or browser
- Start developing!

