# Run Migrations to Create Database Tables

The error "no such table: auth_user" means the database hasn't been set up yet.

## Quick Fix:

Run these commands:

```bash
cd backend\backend
..\venv\Scripts\activate
python manage.py migrate
```

This will:
1. Create all Django default tables (auth_user, etc.)
2. Create tables for your custom apps (accounts, transactions, notes, app_settings)

After running migrate, the error should be fixed!

## If you need to create migrations first:

```bash
python manage.py makemigrations
python manage.py migrate
```

