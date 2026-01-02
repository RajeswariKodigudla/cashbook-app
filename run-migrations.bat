@echo off
echo Creating and Applying Database Migrations...
echo.
cd backend\backend
echo Activating virtual environment...
call ..\venv\Scripts\activate
echo.
echo Creating migrations...
python manage.py makemigrations
echo.
echo Applying migrations...
python manage.py migrate
echo.
echo Done! Database tables should now be created.
echo.
pause

