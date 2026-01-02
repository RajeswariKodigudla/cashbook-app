# Quick Database Status Check

## ✅ Fastest Way to Check

### Method 1: Run Test Script

```bash
cd backend\backend
..\venv\Scripts\activate
python test_db.py
```

This will show you:
- ✅ Database connection status
- ✅ Which tables exist
- ✅ How many records in each table
- ✅ Database file status

---

### Method 2: Django Shell (Quick Check)

```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py shell
```

Then type:
```python
from django.contrib.auth.models import User
print(f"✅ Database working! Users: {User.objects.count()}")
exit()
```

**If it prints a number (even 0):** ✅ Database is working!

---

### Method 3: Check Migrations

```bash
cd backend\backend
python manage.py showmigrations
```

**Look for `[X]` marks** - means tables are created

---

### Method 4: Check Database File

```bash
cd backend\backend
dir db.sqlite3
```

**If file exists and has size > 0:** ✅ Database file exists

---

## 🎯 Quick Status Check

**Run this one command:**

```bash
cd backend\backend && ..\venv\Scripts\activate && python test_db.py
```

This will tell you everything about your database status!

