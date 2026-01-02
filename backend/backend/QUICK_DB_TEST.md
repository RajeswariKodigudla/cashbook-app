# Quick Database Test - Correct Path

## You're in the wrong directory!

The file is in `backend/backend/` not `backend/backend/backend/`

## Correct Command:

```bash
# Go back to the right directory
cd ..\..
# Or from project root:
cd backend\backend

# Then run
python test_db.py
```

## Or use Django Shell (Easier):

```bash
# Make sure you're in backend\backend
cd backend\backend
..\venv\Scripts\activate
python manage.py shell
```

Then type:
```python
from django.contrib.auth.models import User
print(f"Database working! Users: {User.objects.count()}")
exit()
```

## Quick Check - Just verify file exists:

```bash
# From backend\backend directory
dir test_db.py
```

If it shows the file, you're in the right place!

