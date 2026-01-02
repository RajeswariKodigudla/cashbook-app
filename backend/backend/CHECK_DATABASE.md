# How to Check if Database is Working

## Quick Methods to Verify Database

---

## Method 1: Check Database File Exists

**SQLite creates a file when migrations run:**

```bash
# Navigate to backend folder
cd backend\backend

# Check if db.sqlite3 exists
dir db.sqlite3
```

**If file exists:** ✅ Database file is created  
**If file doesn't exist:** ❌ Run migrations first

---

## Method 2: Run Django Shell (Recommended)

**This is the best way to test database:**

```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py shell
```

**Then in the shell, test database:**

```python
# Test 1: Check if you can import models
from transactions.models import Transaction
from accounts.models import Account
from notes.models import Note
from app_settings.models import UserSettings
print("✅ Models imported successfully")

# Test 2: Check if you can query database
from django.contrib.auth.models import User
user_count = User.objects.count()
print(f"✅ Database working! Found {user_count} users")

# Test 3: Try to create a test query
transactions = Transaction.objects.all()
print(f"✅ Found {transactions.count()} transactions")

# Exit shell
exit()
```

**If no errors:** ✅ Database is working!  
**If errors:** ❌ Check error messages

---

## Method 3: Check Migrations Status

```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py showmigrations
```

**What to look for:**
- `[X]` = Migration applied (database table created)
- `[ ]` = Migration not applied (need to run migrate)

**Example output:**
```
admin
 [X] 0001_initial
 [X] 0002_logentry_remove_auto_add
auth
 [X] 0001_initial
 [X] 0002_alter_permission_name_max_length
...
accounts
 [X] 0001_initial
transactions
 [X] 0001_initial
```

**If all show [X]:** ✅ Database tables created  
**If any show [ ]:** ❌ Run `python manage.py migrate`

---

## Method 4: Access Django Admin Panel

**1. Create superuser (if not done):**
```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py createsuperuser
```

**2. Start server:**
```bash
python manage.py runserver
```

**3. Open browser:**
```
http://127.0.0.1:8000/admin/
```

**4. Login and check:**
- If you can login: ✅ Database working
- If you see models (Accounts, Transactions, etc.): ✅ Tables exist
- If you can add/edit data: ✅ Database fully functional

---

## Method 5: Test via API

**1. Start server:**
```bash
python manage.py runserver
```

**2. Create a user via admin or shell:**
```bash
python manage.py createsuperuser
```

**3. Login via API:**
```bash
POST http://127.0.0.1:8000/api/auth/login/
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

**4. Create a test transaction:**
```bash
POST http://127.0.0.1:8000/api/transactions/
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "expense",
  "amount": "10.00",
  "date": "2025-01-15",
  "time": "12:00",
  "account": "Test Account",
  "payment": "Cash"
}
```

**If successful:** ✅ Database is working and writable!

---

## Method 6: Check Database File Size

**SQLite file grows as you add data:**

```bash
cd backend\backend
dir db.sqlite3
```

**Check file size:**
- **0 bytes or doesn't exist:** ❌ No migrations run
- **Small size (few KB):** ✅ Database created but empty
- **Growing size:** ✅ Database working and storing data

---

## Method 7: Direct SQLite Check (Advanced)

**If you have SQLite installed:**

```bash
cd backend\backend
sqlite3 db.sqlite3
```

**Then run SQL commands:**
```sql
-- List all tables
.tables

-- Check if transactions table exists
SELECT name FROM sqlite_master WHERE type='table';

-- Count records in transactions
SELECT COUNT(*) FROM transactions_transaction;

-- Exit
.quit
```

---

## Quick Diagnostic Script

**Create a test file `test_db.py` in backend/backend:**

```python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.db import connection
from django.contrib.auth.models import User
from transactions.models import Transaction

print("=" * 50)
print("DATABASE DIAGNOSTIC TEST")
print("=" * 50)

# Test 1: Check connection
try:
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        print("✅ Database connection: WORKING")
except Exception as e:
    print(f"❌ Database connection: FAILED - {e}")
    exit()

# Test 2: Check if tables exist
try:
    user_count = User.objects.count()
    print(f"✅ Users table: EXISTS ({user_count} users)")
except Exception as e:
    print(f"❌ Users table: FAILED - {e}")

# Test 3: Check transactions table
try:
    trans_count = Transaction.objects.count()
    print(f"✅ Transactions table: EXISTS ({trans_count} transactions)")
except Exception as e:
    print(f"❌ Transactions table: FAILED - {e}")

# Test 4: Try to create a test record
try:
    from django.contrib.auth.models import User
    test_user = User.objects.first()
    if test_user:
        print(f"✅ Can read from database: YES")
        print(f"   Sample user: {test_user.username}")
    else:
        print("⚠️  Database empty (no users yet)")
except Exception as e:
    print(f"❌ Cannot read from database: {e}")

print("=" * 50)
```

**Run it:**
```bash
cd backend\backend
..\venv\Scripts\activate
python test_db.py
```

---

## Common Issues & Solutions

### Issue 1: "no such table"
**Error:** `django.db.utils.OperationalError: no such table: auth_user`

**Solution:**
```bash
python manage.py migrate
```

### Issue 2: "database is locked"
**Error:** Database file is being used by another process

**Solution:**
- Stop Django server
- Close any database tools
- Try again

### Issue 3: "database file doesn't exist"
**Error:** `db.sqlite3` not found

**Solution:**
```bash
python manage.py migrate
```

### Issue 4: "migration not applied"
**Error:** Tables missing

**Solution:**
```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Quick Checklist

- [ ] Database file (`db.sqlite3`) exists
- [ ] Migrations are applied (`python manage.py showmigrations`)
- [ ] Can import models in shell
- [ ] Can query database in shell
- [ ] Can access admin panel
- [ ] Can create records via API
- [ ] Can read records via API

---

## Recommended: Use Django Shell

**The easiest and most reliable method:**

```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py shell
```

**Then test:**
```python
from django.contrib.auth.models import User
print(f"Users in database: {User.objects.count()}")
```

**If it works:** ✅ Database is working perfectly!

---

## Summary

**Best way to check:**
1. Run `python manage.py shell`
2. Try to query the database
3. If no errors, database is working!

**Quick visual check:**
- File `db.sqlite3` exists in `backend/backend/` folder
- File size > 0 bytes
- Can access admin panel

Your database is working if you can successfully run any of these methods! 🎉

