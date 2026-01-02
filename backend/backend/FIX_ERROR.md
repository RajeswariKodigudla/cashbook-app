# Fix for rest_framework_simplejwt Error

The error is caused by `rest_framework_simplejwt` trying to import an optional `token_blacklist` module.

## Solution 1: Reinstall simplejwt (Recommended)

```bash
cd backend\backend
..\venv\Scripts\activate
pip uninstall djangorestframework-simplejwt
pip install djangorestframework-simplejwt==5.3.0
```

## Solution 2: Install token_blacklist (Alternative)

```bash
cd backend\backend
..\venv\Scripts\activate
pip install djangorestframework-simplejwt[token_blacklist]
```

## Solution 3: Use a workaround in settings

The settings.py has been updated to handle this. If the error persists, try:

1. Comment out the JWT authentication temporarily:
   - In `settings.py`, change `'rest_framework_simplejwt.authentication.JWTAuthentication'` to `'rest_framework.authentication.SessionAuthentication'`
   - Run migrations
   - Then change it back

2. Or downgrade to a stable version:
   ```bash
   pip install djangorestframework-simplejwt==5.3.0
   ```

After fixing, run:
```bash
python manage.py makemigrations
python manage.py migrate
```

