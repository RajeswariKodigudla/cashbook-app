@echo off
echo Starting Django Backend Server...
echo.
cd backend\backend
echo Activating virtual environment...
call ..\venv\Scripts\activate
echo.
echo Starting server on http://127.0.0.1:8000/
echo Press CTRL+C to stop the server
echo.
python manage.py runserver
pause

