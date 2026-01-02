# Django Cashbook Backend API

Django REST Framework backend for the Cashbook expense tracking application.

## Features

- User authentication with JWT tokens
- Account management (multiple cashbooks)
- Transaction management (income/expense) with filtering
- Notes management
- User settings management
- App lock password protection
- Backup and restore functionality

## Installation

1. **Activate virtual environment:**
   ```bash
   cd backend
   venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

5. **Run server:**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login and get JWT token
- `POST /api/auth/refresh/` - Refresh JWT token

### Accounts
- `GET /api/accounts/` - List all accounts
- `POST /api/accounts/` - Create account
- `GET /api/accounts/{id}/` - Get account details
- `PUT /api/accounts/{id}/` - Update account
- `DELETE /api/accounts/{id}/` - Delete account

### Transactions
- `GET /api/transactions/` - List transactions (with filters)
  - Query params: `account`, `type`, `startDate`, `endDate`
- `POST /api/transactions/` - Create transaction
- `GET /api/transactions/{id}/` - Get transaction details
- `PUT /api/transactions/{id}/` - Update transaction
- `DELETE /api/transactions/{id}/` - Delete transaction
- `GET /api/transactions/summary/` - Get summary (income, expense, balance)

### Notes
- `GET /api/notes/` - List all notes
- `POST /api/notes/` - Create note
- `GET /api/notes/{id}/` - Get note details
- `PUT /api/notes/{id}/` - Update note
- `DELETE /api/notes/{id}/` - Delete note

### Settings
- `GET /api/settings/` - Get user settings
- `PUT /api/settings/` - Update settings
- `POST /api/settings/set_app_lock/` - Set app lock password
- `POST /api/settings/verify_app_lock/` - Verify app lock password
- `DELETE /api/settings/remove_app_lock/` - Remove app lock

## Authentication

All endpoints (except login) require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

## Example Usage

### 1. Login
```bash
POST /api/auth/login/
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

Response:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### 2. Create Transaction
```bash
POST /api/transactions/
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "expense",
  "amount": "50.00",
  "date": "2025-01-15",
  "time": "14:30",
  "account": "Cashbook",
  "name": "Lunch",
  "category": "Food",
  "remark": "Restaurant",
  "payment": "Cash"
}
```

### 3. Get Transaction Summary
```bash
GET /api/transactions/summary/?account=Cashbook&startDate=2025-01-01&endDate=2025-01-31
Authorization: Bearer <token>
```

## Database

Uses SQLite by default (`db.sqlite3`). To use PostgreSQL or MySQL, update `DATABASES` in `settings.py`.

## Development

- Server runs on: `http://127.0.0.1:8000/`
- Admin panel: `http://127.0.0.1:8000/admin/`

