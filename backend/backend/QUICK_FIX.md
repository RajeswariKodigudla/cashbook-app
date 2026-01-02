# Quick Fix for the Error

Run these commands in order:

```bash
cd backend\backend
..\venv\Scripts\activate
pip uninstall djangorestframework-simplejwt -y
pip install djangorestframework-simplejwt==5.3.0
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

This will:
1. Uninstall the problematic version
2. Install a stable version (5.3.0)
3. Create migrations
4. Apply migrations
5. Start the server

