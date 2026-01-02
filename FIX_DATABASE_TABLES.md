# Fix: Database Tables Missing

## 🚨 **Error: "no such table: transactions_transaction"**

**This means:** Database tables haven't been created yet.

---

## ✅ **Quick Fix**

### **Step 1: Navigate to Backend**

```bash
cd backend\backend
```

### **Step 2: Activate Virtual Environment**

```bash
..\venv\Scripts\activate
```

### **Step 3: Run Migrations**

```bash
python manage.py migrate
```

**Expected Output:**
```
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions, accounts, transactions, notes, app_settings
Running migrations:
  Applying accounts.0001_initial... OK
  Applying transactions.0001_initial... OK
  Applying notes.0001_initial... OK
  Applying app_settings.0001_initial... OK
```

---

## 🔍 **If Migrations Don't Exist**

### **Step 1: Create Migration Files**

```bash
python manage.py makemigrations
```

**Expected Output:**
```
Migrations for 'accounts':
  accounts\migrations\0001_initial.py
    - Create model Account
Migrations for 'transactions':
  transactions\migrations\0001_initial.py
    - Create model Transaction
...
```

### **Step 2: Apply Migrations**

```bash
python manage.py migrate
```

---

## ✅ **Complete Fix (All Steps)**

**Run these commands in order:**

```bash
# 1. Navigate to backend
cd backend\backend

# 2. Activate virtual environment
..\venv\Scripts\activate

# 3. Create migrations (if needed)
python manage.py makemigrations

# 4. Apply migrations
python manage.py migrate

# 5. Start server
python manage.py runserver
```

---

## 🧪 **Verify Tables Created**

**After running migrations, test in browser:**

1. **Start server:** `python manage.py runserver`
2. **Open:** `http://127.0.0.1:8000/api/transactions/`
3. **Should see:** Empty list `[]` (not error)

**OR check database directly:**

```bash
python manage.py dbshell
```

Then:
```sql
.tables
```

**Should see:**
- `accounts_account`
- `transactions_transaction`
- `notes_note`
- `app_settings_usersettings`
- And other Django tables

---

## 📋 **What Migrations Do**

**Migrations:**
1. Create database tables based on models
2. Set up relationships between tables
3. Create indexes for performance
4. Set up Django's built-in tables (auth, sessions, etc.)

**Without migrations:**
- ❌ Tables don't exist
- ❌ API calls fail with "no such table" errors
- ❌ Can't save data

**After migrations:**
- ✅ All tables created
- ✅ API calls work
- ✅ Can save/load data

---

## 🎯 **Quick Command**

**Run this single command:**

```bash
cd backend\backend && ..\venv\Scripts\activate && python manage.py makemigrations && python manage.py migrate
```

**This will:**
1. Navigate to backend
2. Activate venv
3. Create migrations
4. Apply migrations

**Then start server:**
```bash
python manage.py runserver
```

---

## ✅ **After Fix**

**Once migrations are done:**
- ✅ Database tables exist
- ✅ API endpoints work
- ✅ Can save transactions
- ✅ Can save accounts
- ✅ No more "no such table" errors

**Run the migrations now and the errors will be fixed!**

