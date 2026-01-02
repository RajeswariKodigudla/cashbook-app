# How to Run the Backend

You have **TWO backend options**. Choose one:

---

## Option 1: Node.js/Express Backend (Recommended - Already Complete)

### Quick Start:

1. **Open Terminal** (VS Code: `Ctrl + `` or Command Prompt)

2. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

3. **Install dependencies (first time only):**
   ```bash
   npm install
   ```

4. **Create `.env` file** in `backend` folder:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cashbook
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

5. **Start MongoDB:**
   - Press `Win + R`, type `services.msc`
   - Find "MongoDB" service → Right-click → Start

6. **Run the server:**
   ```bash
   npm run dev
   ```

7. **You'll see:**
   ```
   Connected to MongoDB
   Server is running on port 5000
   ```

8. **Test it:**
   - Open browser: `http://localhost:5000/api/health`
   - Should see: `{"status":"OK","message":"Cashbook API is running"}`

---

## Option 2: Django Backend (Python)

### Quick Start:

1. **Open Terminal**

2. **Navigate to Django project:**
   ```bash
   cd backend\backend
   ```

3. **Activate virtual environment:**
   ```bash
   ..\venv\Scripts\activate
   ```
   (You should see `(venv)` in your terminal)

4. **Run migrations (if you have models):**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run the server:**
   ```bash
   python manage.py runserver
   ```

6. **You'll see:**
   ```
   Starting development server at http://127.0.0.1:8000/
   ```

7. **Test it:**
   - Open browser: `http://127.0.0.1:8000/`

---

## Which One to Use?

- **Node.js Backend**: ✅ Already complete with all APIs, models, and routes
- **Django Backend**: ⚠️ Basic setup only, needs apps/models/views to be created

**Recommendation:** Use the **Node.js backend** as it's fully functional.

---

## Troubleshooting

### Node.js Backend:
- **"npm is not recognized"** → Install Node.js from nodejs.org
- **"MongoDB connection error"** → Start MongoDB service
- **"Port 5000 in use"** → Change PORT in .env file

### Django Backend:
- **"python is not recognized"** → Install Python from python.org
- **"No module named django"** → Activate virtual environment first
- **"No changes detected"** → Need to create Django apps and models first

---

## Quick Commands Summary

### Node.js:
```bash
cd backend
npm install          # First time only
npm run dev          # Run server
```

### Django:
```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py runserver
```

