# Django Backend Project Structure - Simple Explanation

## 📁 Overall Structure

```
backend/backend/
├── backend/          # Main Django project configuration
├── accounts/         # App for managing cashbook accounts
├── transactions/    # App for managing income/expense transactions
├── notes/           # App for managing user notes
├── app_settings/    # App for managing user settings
├── manage.py        # Django's command-line tool
└── db.sqlite3       # Database file (created after migrations)
```

---

## 🎯 What Each Part Does

### 1. **backend/** (Main Project Folder)
This is the "settings center" of your Django project.

**Files inside:**
- `settings.py` - All configuration (database, apps, security, etc.)
- `urls.py` - Routes/URLs (like a map: "when user goes to /api/accounts, show this")
- `wsgi.py` - How to run the server in production
- `views.py` - Root API endpoint that shows available routes

**Think of it as:** The brain of your application - it controls everything.

---

### 2. **accounts/** (Cashbook Accounts App)
Manages multiple cashbooks/accounts (like "Personal", "Business", etc.)

**What's inside:**
- `models.py` - Database structure for accounts (name, created date, etc.)
- `views.py` - API endpoints (GET all accounts, CREATE account, etc.)
- `serializers.py` - Converts database data to JSON format
- `urls.py` - Routes for this app (/api/accounts/)
- `admin.py` - Admin panel configuration

**Think of it as:** A folder that handles everything about cashbook accounts.

---

### 3. **transactions/** (Transactions App)
Manages income and expense entries.

**What's inside:**
- `models.py` - Database structure (amount, type, date, category, etc.)
- `views.py` - API endpoints (list, create, update, delete transactions + summary)
- `serializers.py` - Converts transaction data to/from JSON
- `urls.py` - Routes (/api/transactions/)
- `admin.py` - Admin panel for transactions

**Think of it as:** A folder that handles all money transactions (income/expense).

---

### 4. **notes/** (Notes App)
Manages user notes.

**What's inside:**
- `models.py` - Database structure for notes (text, created date)
- `views.py` - API endpoints (CRUD operations for notes)
- `serializers.py` - JSON conversion
- `urls.py` - Routes (/api/notes/)

**Think of it as:** A folder for storing and managing notes.

---

### 5. **app_settings/** (Settings App)
Manages user preferences (theme, currency, language, app lock password, etc.)

**What's inside:**
- `models.py` - Database structure for settings
- `views.py` - API endpoints (get/update settings, app lock management)
- `serializers.py` - JSON conversion
- `urls.py` - Routes (/api/settings/)

**Think of it as:** A folder that stores user preferences and settings.

---

## 🔄 How It All Works Together

### Request Flow:
```
1. User makes request → http://127.0.0.1:8000/api/accounts/
2. Django checks urls.py → Finds the route
3. urls.py calls views.py → Gets the right function
4. views.py uses models.py → Fetches data from database
5. views.py uses serializers.py → Converts to JSON
6. Response sent back → User gets JSON data
```

### Example: Getting All Accounts
```
User Request: GET /api/accounts/
    ↓
backend/urls.py → Routes to accounts app
    ↓
accounts/urls.py → Routes to AccountViewSet
    ↓
accounts/views.py → AccountViewSet.get_queryset()
    ↓
accounts/models.py → Account.objects.filter(user=request.user)
    ↓
accounts/serializers.py → Converts to JSON
    ↓
Response: [{id: 1, name: "Cashbook", ...}]
```

---

## 📊 Database Models (What Data is Stored)

### Account Model:
- `user` - Which user owns this account
- `name` - Account name (e.g., "Personal Cashbook")
- `created` - When it was created

### Transaction Model:
- `user` - Owner
- `account` - Which account it belongs to
- `type` - "income" or "expense"
- `amount` - Money amount
- `date` & `time` - When it happened
- `name`, `category`, `remark` - Details
- `payment` - Payment method (Cash/Online/Other)

### Note Model:
- `user` - Owner
- `text` - Note content
- `created_at_str` - Creation date as string

### UserSettings Model:
- `user` - Owner
- `theme`, `currency`, `language` - Preferences
- `app_lock_password` - Lock password
- Other settings...

---

## 🛣️ API Routes (URLs)

All routes start with `/api/`:

- `/api/auth/login/` - Login and get token
- `/api/auth/refresh/` - Refresh token
- `/api/accounts/` - List/create accounts
- `/api/accounts/{id}/` - Get/update/delete specific account
- `/api/transactions/` - List/create transactions
- `/api/transactions/summary/` - Get income/expense summary
- `/api/notes/` - List/create notes
- `/api/settings/` - Get/update settings
- `/api/backup/` - Get all user data
- `/api/backup/restore/` - Restore data

---

## 🔐 Authentication

- Uses **JWT (JSON Web Tokens)** for authentication
- User logs in → Gets a token
- Token is sent with every request → Django verifies it
- Only authenticated users can access the API

---

## 📝 Key Files Explained

### `manage.py`
- Django's command-line tool
- Run commands like: `python manage.py migrate`, `python manage.py runserver`

### `settings.py`
- Database connection
- Installed apps
- Security settings
- API configuration

### `urls.py`
- Maps URLs to views
- Like a router: "This URL goes to that function"

### `models.py` (in each app)
- Defines database structure
- Like a blueprint: "An Account has these fields"

### `views.py` (in each app)
- Contains the logic
- "When user requests accounts, do this..."

### `serializers.py` (in each app)
- Converts between database format and JSON
- Like a translator

---

## 🎯 Simple Summary

**Think of it like a restaurant:**
- `backend/` = The restaurant building (infrastructure)
- `accounts/`, `transactions/`, etc. = Different departments (kitchen, service, etc.)
- `models.py` = Menu (what's available)
- `views.py` = Chefs (they prepare the food/response)
- `urls.py` = Waiters (they route orders/requests)
- `serializers.py` = Plating (how food/response is presented)
- `db.sqlite3` = Storage room (database)

**When a customer (user) orders:**
1. Waiter (urls.py) takes the order (request)
2. Goes to the right department (app)
3. Chef (views.py) prepares it using ingredients (models.py)
4. Plates it nicely (serializers.py)
5. Serves it (response)

---

## 🚀 How to Use

1. **Start server**: `python manage.py runserver`
2. **Create user**: `python manage.py createsuperuser`
3. **Access API**: `http://127.0.0.1:8000/api/`
4. **Login**: POST to `/api/auth/login/` with username/password
5. **Use token**: Include `Authorization: Bearer <token>` in requests

That's it! The structure is organized so each app handles its own responsibility, making it easy to maintain and extend.

