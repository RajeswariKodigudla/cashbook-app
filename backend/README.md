# Cashbook Backend API

Backend REST API for the Cashbook expense tracking application.

## Features

- User authentication (JWT)
- Account management (multiple cashbooks)
- Transaction management (income/expense)
- Notes management
- Settings management
- Backup and restore functionality
- App lock password protection

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cashbook
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

4. Make sure MongoDB is running on your system or update `MONGODB_URI` with your MongoDB connection string.

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/app-lock` - Set app lock password (requires auth)
- `POST /api/auth/verify-app-lock` - Verify app lock password (requires auth)
- `DELETE /api/auth/app-lock` - Remove app lock password (requires auth)

### Accounts

- `GET /api/accounts` - Get all accounts (requires auth)
- `GET /api/accounts/:id` - Get single account (requires auth)
- `POST /api/accounts` - Create new account (requires auth)
- `PUT /api/accounts/:id` - Update account (requires auth)
- `DELETE /api/accounts/:id` - Delete account (requires auth)

### Transactions

- `GET /api/transactions` - Get all transactions with optional filters (requires auth)
  - Query params: `account`, `type`, `startDate`, `endDate`, `limit`, `skip`
- `GET /api/transactions/summary` - Get transaction summary (requires auth)
  - Query params: `account`, `startDate`, `endDate`
- `GET /api/transactions/:id` - Get single transaction (requires auth)
- `POST /api/transactions` - Create new transaction (requires auth)
- `PUT /api/transactions/:id` - Update transaction (requires auth)
- `DELETE /api/transactions/:id` - Delete transaction (requires auth)

### Notes

- `GET /api/notes` - Get all notes (requires auth)
- `GET /api/notes/:id` - Get single note (requires auth)
- `POST /api/notes` - Create new note (requires auth)
- `PUT /api/notes/:id` - Update note (requires auth)
- `DELETE /api/notes/:id` - Delete note (requires auth)

### Settings

- `GET /api/settings` - Get user settings (requires auth)
- `PUT /api/settings` - Update user settings (requires auth)

### Backup

- `GET /api/backup` - Get all user data for backup (requires auth)
- `POST /api/backup/restore` - Restore user data from backup (requires auth)

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Example Requests

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Transaction
```bash
POST /api/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "expense",
  "amount": 50.00,
  "date": "2025-01-15",
  "time": "14:30",
  "account": "Cashbook",
  "name": "Lunch",
  "category": "Food",
  "remark": "Restaurant",
  "payment": "Cash"
}
```

### Get Transactions with Filters
```bash
GET /api/transactions?account=Cashbook&type=expense&startDate=2025-01-01&endDate=2025-01-31
Authorization: Bearer <token>
```

## Database Models

### User
- username, email, password, appLockPassword

### Account
- userId, name, created

### Transaction
- userId, account, type, date, time, amount, name, category, remark, payment

### Note
- userId, text, createdAt

### Settings
- userId, language, reminder, currency, theme, keepScreenOn, numberFormat, timeFormat, firstDay, version

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error responses follow this format:
```json
{
  "message": "Error message"
}
```

## Security Notes

- Change `JWT_SECRET` in production
- Use HTTPS in production
- Implement rate limiting for production
- Consider adding input sanitization
- Use environment variables for sensitive data

