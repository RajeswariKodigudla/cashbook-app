"""
Quick database diagnostic script
Run: python test_db.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.db import connection
from django.contrib.auth.models import User
from transactions.models import Transaction
from accounts.models import Account

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

# Test 4: Check accounts table
try:
    account_count = Account.objects.count()
    print(f"✅ Accounts table: EXISTS ({account_count} accounts)")
except Exception as e:
    print(f"❌ Accounts table: FAILED - {e}")

# Test 5: Try to read from database
try:
    test_user = User.objects.first()
    if test_user:
        print(f"✅ Can read from database: YES")
        print(f"   Sample user: {test_user.username}")
    else:
        print("⚠️  Database empty (no users yet - this is OK)")
except Exception as e:
    print(f"❌ Cannot read from database: {e}")

# Test 6: Check database file
import os
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent
db_file = BASE_DIR / 'db.sqlite3'

if db_file.exists():
    size = db_file.stat().st_size
    print(f"✅ Database file exists: {db_file}")
    print(f"   File size: {size} bytes")
else:
    print(f"❌ Database file not found: {db_file}")
    print("   Run: python manage.py migrate")

print("=" * 50)
print("TEST COMPLETE")
print("=" * 50)

