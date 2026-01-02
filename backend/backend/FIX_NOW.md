# IMMEDIATE FIX - Run This Command

The error is still happening because the package version needs to be changed. Run this:

```bash
cd backend\backend
..\venv\Scripts\activate
pip uninstall djangorestframework-simplejwt -y
pip install djangorestframework-simplejwt==5.3.0
```

Then try again:
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Alternative: If the above doesn't work

I've also added a patch in `settings.py` and `urls.py` that should work around the issue. But the cleanest solution is to downgrade the package version as shown above.

