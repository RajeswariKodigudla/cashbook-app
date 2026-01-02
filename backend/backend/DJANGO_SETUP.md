# Django Backend Setup

## Current Status
You have a Django project but no apps/models created yet. You need to create Django apps first before running migrations.

## Step 1: Activate Virtual Environment

Navigate to the backend folder and activate the virtual environment:

**Windows (Command Prompt):**
```bash
cd backend
venv\Scripts\activate
```

**Windows (PowerShell):**
```bash
cd backend
venv\Scripts\Activate.ps1
```

## Step 2: Navigate to Django Project
```bash
cd backend
```

## Step 3: Create Django Apps

You need to create apps for your models. Run these commands:

```bash
python manage.py startapp accounts
python manage.py startapp transactions
python manage.py startapp notes
python manage.py startapp settings
```

## Step 4: Create Models

After creating apps, you need to define models in each app's `models.py` file.

## Step 5: Register Apps in settings.py

Add your apps to `INSTALLED_APPS` in `backend/settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # If using Django REST Framework
    'accounts',
    'transactions',
    'notes',
    'settings',
]
```

## Step 6: Run Makemigrations

Once you have models defined:

```bash
python manage.py makemigrations
```

## Step 7: Run Migrate

```bash
python manage.py migrate
```

## Quick Command Reference

```bash
# Activate virtual environment
cd backend
venv\Scripts\activate

# Navigate to Django project
cd backend

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Run server
python manage.py runserver
```

