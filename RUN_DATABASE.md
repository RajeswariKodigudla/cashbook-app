# How to Run Database

You have **two database options**:

---

## Option 1: SQLite (Django Backend) - Already Running! ✅

SQLite is a **file-based database** - no server needed!

**The database file:** `backend/backend/db.sqlite3`

### To Set Up (First Time Only):

```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py migrate
```

This creates the database file and tables.

### To Verify It's Working:

```bash
python manage.py shell
```

Then in Python shell:
```python
from django.contrib.auth.models import User
print(f"Users: {User.objects.count()}")
exit()
```

**✅ SQLite is already running** - it's just a file, no server needed!

---

## Option 2: MongoDB (Node.js Backend)

MongoDB needs to be **started as a service**.

### Step 1: Check if MongoDB is Installed

```bash
mongod --version
```

### Step 2: Start MongoDB

**Option A: Windows Service (Recommended)**
```bash
# Open Services
Win + R → services.msc

# Find "MongoDB" service
# Right-click → Start
```

**Option B: Command Line**
```bash
mongod --dbpath C:\data\db
```

### Step 3: Verify MongoDB is Running

```bash
mongosh
# or
mongo
```

If you see MongoDB shell prompt, it's working!

### Step 4: Connect from Node.js Backend

The backend will automatically connect when you run:
```bash
cd backend
npm run dev
```

You should see: `Connected to MongoDB`

---

## Quick Check: Which Database Do You Need?

### For Django Backend:
✅ **SQLite is already running** (it's a file)
- Just run: `python manage.py migrate` (if not done)
- No server needed!

### For Node.js Backend:
⚠️ **MongoDB needs to be started**
- Start MongoDB service
- Then run: `npm run dev`

---

## Troubleshooting

### SQLite (Django):
- **File doesn't exist?** → Run `python manage.py migrate`
- **Permission error?** → Check file permissions
- **Database locked?** → Close other processes using it

### MongoDB (Node.js):
- **"Connection refused"** → MongoDB not running
- **"Service not found"** → MongoDB not installed
- **Port 27017 in use** → Another MongoDB instance running

---

## Which One Are You Using?

**Check your backend:**
- **Django** → Uses SQLite (file-based, no server)
- **Node.js** → Uses MongoDB (needs server)

**Current status:**
- ✅ SQLite: Working (file exists at `backend/backend/db.sqlite3`)
- ❓ MongoDB: Need to check if service is running


