# Django Backend Setup Guide

## Quick Start

### 1. Activate Virtual Environment
```bash
cd backend
venv\Scripts\activate
```

### 2. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 3. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser (Optional - for admin panel)
```bash
python manage.py createsuperuser
```

### 5. Run Server
```bash
python manage.py runserver
```

Server will run on: `http://127.0.0.1:8000/`

## API Endpoints

- **Login**: `POST /api/auth/login/`
- **Accounts**: `/api/accounts/`
- **Transactions**: `/api/transactions/`
- **Notes**: `/api/notes/`
- **Settings**: `/api/settings/`
- **Backup**: `GET /api/backup/`
- **Restore**: `POST /api/backup/restore/`

## Testing the API

### 1. Login to get token:
```bash
POST http://127.0.0.1:8000/api/auth/login/
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

### 2. Use token in requests:
```
Authorization: Bearer <your_access_token>
```

## Admin Panel

Access at: `http://127.0.0.1:8000/admin/`

Login with superuser credentials created in step 4.

