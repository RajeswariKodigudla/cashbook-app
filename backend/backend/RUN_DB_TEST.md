# How to Run Database Test - Step by Step

## You're Currently In:
`backend\backend\backend\` ❌ (Wrong directory)

## File Location:
`backend\backend\test_db.py` ✅ (Correct location)

## Solution: Go Up One Directory

### Step 1: Check where you are
```bash
Get-Location
# or
pwd
```

### Step 2: Go up one level
```bash
cd ..
```

### Step 3: Verify you're in the right place
```bash
dir test_db.py
# Should show: test_db.py
```

### Step 4: Run the test
```bash
python test_db.py
```

---

## Alternative: Use Full Path

From anywhere, you can use:
```bash
python backend\backend\test_db.py
```

---

## Or Use Django Shell (Easier)

```bash
# Make sure you're in backend\backend
cd backend\backend
python manage.py shell
```

Then type:
```python
from django.contrib.auth.models import User
print(f"Database working! Users: {User.objects.count()}")
exit()
```

---

## Quick Visual Guide

```
cashbook_app/
└── backend/
    └── backend/          ← YOU NEED TO BE HERE
        ├── test_db.py    ← FILE IS HERE
        ├── manage.py
        └── backend/
            └── ...       ← YOU ARE HERE (WRONG!)
```

Go up one level: `cd ..`

