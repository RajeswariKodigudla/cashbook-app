@echo off
echo Checking database status...
cd backend\backend
..\venv\Scripts\activate
python test_db.py
pause

