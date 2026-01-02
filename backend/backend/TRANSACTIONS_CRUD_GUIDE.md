# Step-by-Step Guide: Transaction CRUD APIs

## ✅ Good News: CRUD APIs Already Exist!

The transaction CRUD APIs are already implemented in your project. This guide will:
1. Show you what's already there
2. Explain how each part works
3. Show you how to test them
4. Explain the step-by-step process (in case you want to create similar APIs)

---

## 📋 What's Already Implemented

Your transaction APIs include:
- ✅ **CREATE** - Add new transactions
- ✅ **READ** - Get all transactions or a single transaction
- ✅ **UPDATE** - Update existing transactions
- ✅ **DELETE** - Delete transactions
- ✅ **FILTERING** - Filter by account, type, date range
- ✅ **SUMMARY** - Get income/expense summary

---

## 🏗️ Step-by-Step: How It Was Built

### Step 1: Create the Model (Database Structure)

**File:** `transactions/models.py`

```python
from django.db import models
from django.contrib.auth.models import User

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]

    PAYMENT_MODES = [
        ('Cash', 'Cash'),
        ('Online', 'Online'),
        ('Other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    date = models.CharField(max_length=20)
    time = models.CharField(max_length=10)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    name = models.CharField(max_length=255, blank=True, default='')
    category = models.CharField(max_length=255, blank=True, default='')
    remark = models.CharField(max_length=500, blank=True, default='')
    payment = models.CharField(max_length=10, choices=PAYMENT_MODES, default='Cash')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

**What this does:**
- Defines the database table structure
- Sets up fields (amount, date, type, etc.)
- Links each transaction to a user
- Adds automatic timestamps

---

### Step 2: Create the Serializer (Data Conversion)

**File:** `transactions/serializers.py`

```python
from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'id', 'account', 'type', 'date', 'time', 'amount', 
            'name', 'category', 'remark', 'payment', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
```

**What this does:**
- Converts database objects to JSON (for API responses)
- Converts JSON to database objects (for API requests)
- Defines which fields can be read/written
- Makes `id`, `created_at`, `updated_at` read-only (auto-generated)

---

### Step 3: Create the ViewSet (API Logic)

**File:** `transactions/views.py`

```python
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Transaction
from .serializers import TransactionSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Only return transactions for the logged-in user
        queryset = Transaction.objects.filter(user=self.request.user)
        
        # Add filtering support
        account = self.request.query_params.get('account', None)
        type_filter = self.request.query_params.get('type', None)
        start_date = self.request.query_params.get('startDate', None)
        end_date = self.request.query_params.get('endDate', None)
        
        if account:
            queryset = queryset.filter(account=account)
        if type_filter:
            queryset = queryset.filter(type=type_filter)
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        
        return queryset

    def perform_create(self, serializer):
        # Automatically set the user when creating
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get transaction summary"""
        queryset = self.get_queryset()
        total_income = sum(t.amount for t in queryset.filter(type='income'))
        total_expense = sum(t.amount for t in queryset.filter(type='expense'))
        balance = total_income - total_expense
        
        return Response({
            'totalIncome': float(total_income),
            'totalExpense': float(total_expense),
            'balance': float(balance)
        })
```

**What this does:**
- `ModelViewSet` automatically provides CRUD operations:
  - `list()` → GET /api/transactions/ (get all)
  - `create()` → POST /api/transactions/ (create new)
  - `retrieve()` → GET /api/transactions/{id}/ (get one)
  - `update()` → PUT /api/transactions/{id}/ (update)
  - `destroy()` → DELETE /api/transactions/{id}/ (delete)
- `get_queryset()` filters to show only user's transactions
- `perform_create()` automatically assigns the user
- `summary()` is a custom action for getting totals

---

### Step 4: Create URL Routes

**File:** `transactions/urls.py`

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet

router = DefaultRouter()
router.register(r'', TransactionViewSet, basename='transaction')

urlpatterns = [
    path('', include(router.urls)),
]
```

**What this does:**
- Registers the ViewSet with Django REST Framework router
- Automatically creates all CRUD routes

---

### Step 5: Register in Main URLs

**File:** `backend/urls.py`

```python
from transactions.views import TransactionViewSet

router = routers.DefaultRouter()
router.register(r'transactions', TransactionViewSet, basename='transaction')

urlpatterns = [
    path('api/', include(router.urls)),
]
```

**What this does:**
- Includes transaction routes under `/api/transactions/`

---

### Step 6: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

**What this does:**
- Creates the database table for transactions

---

## 🧪 Testing the APIs

### 1. First, Get Authentication Token

**Login:**
```bash
POST http://127.0.0.1:8000/api/auth/login/
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### 2. CREATE Transaction

**Request:**
```bash
POST http://127.0.0.1:8000/api/transactions/
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "type": "expense",
  "amount": "50.00",
  "date": "2025-01-15",
  "time": "14:30",
  "account": "Cashbook",
  "name": "Lunch",
  "category": "Food",
  "remark": "Restaurant meal",
  "payment": "Cash"
}
```

**Response:**
```json
{
  "id": 1,
  "account": "Cashbook",
  "type": "expense",
  "date": "2025-01-15",
  "time": "14:30",
  "amount": "50.00",
  "name": "Lunch",
  "category": "Food",
  "remark": "Restaurant meal",
  "payment": "Cash",
  "created_at": "2025-01-15T14:30:00Z",
  "updated_at": "2025-01-15T14:30:00Z"
}
```

---

### 3. READ All Transactions

**Request:**
```bash
GET http://127.0.0.1:8000/api/transactions/
Authorization: Bearer <your_access_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "account": "Cashbook",
    "type": "expense",
    "amount": "50.00",
    ...
  },
  {
    "id": 2,
    "account": "Cashbook",
    "type": "income",
    "amount": "100.00",
    ...
  }
]
```

**With Filters:**
```bash
GET http://127.0.0.1:8000/api/transactions/?type=expense&account=Cashbook&startDate=2025-01-01&endDate=2025-01-31
Authorization: Bearer <your_access_token>
```

---

### 4. READ Single Transaction

**Request:**
```bash
GET http://127.0.0.1:8000/api/transactions/1/
Authorization: Bearer <your_access_token>
```

**Response:**
```json
{
  "id": 1,
  "account": "Cashbook",
  "type": "expense",
  "amount": "50.00",
  ...
}
```

---

### 5. UPDATE Transaction

**Request:**
```bash
PUT http://127.0.0.1:8000/api/transactions/1/
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "type": "expense",
  "amount": "75.00",
  "date": "2025-01-15",
  "time": "14:30",
  "account": "Cashbook",
  "name": "Dinner",
  "category": "Food",
  "remark": "Updated restaurant meal",
  "payment": "Online"
}
```

**Response:**
```json
{
  "id": 1,
  "amount": "75.00",
  "name": "Dinner",
  ...
}
```

**Partial Update (PATCH):**
```bash
PATCH http://127.0.0.1:8000/api/transactions/1/
Authorization: Bearer <your_access_token>
Content-Type: application/json

{
  "amount": "80.00"
}
```

---

### 6. DELETE Transaction

**Request:**
```bash
DELETE http://127.0.0.1:8000/api/transactions/1/
Authorization: Bearer <your_access_token>
```

**Response:**
```
HTTP 204 No Content
```

---

### 7. GET Summary

**Request:**
```bash
GET http://127.0.0.1:8000/api/transactions/summary/
Authorization: Bearer <your_access_token>
```

**With Filters:**
```bash
GET http://127.0.0.1:8000/api/transactions/summary/?account=Cashbook&startDate=2025-01-01&endDate=2025-01-31
Authorization: Bearer <your_access_token>
```

**Response:**
```json
{
  "totalIncome": 1000.00,
  "totalExpense": 500.00,
  "balance": 500.00
}
```

---

## 📝 Summary of Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions/` | List all transactions |
| POST | `/api/transactions/` | Create new transaction |
| GET | `/api/transactions/{id}/` | Get single transaction |
| PUT | `/api/transactions/{id}/` | Update transaction (full) |
| PATCH | `/api/transactions/{id}/` | Update transaction (partial) |
| DELETE | `/api/transactions/{id}/` | Delete transaction |
| GET | `/api/transactions/summary/` | Get income/expense summary |

---

## 🔍 Query Parameters for Filtering

You can filter transactions using query parameters:

- `?type=expense` - Filter by type (income/expense)
- `?account=Cashbook` - Filter by account name
- `?startDate=2025-01-01` - Filter from date
- `?endDate=2025-01-31` - Filter to date
- Combine: `?type=expense&account=Cashbook&startDate=2025-01-01`

---

## 🎯 Key Concepts

### ModelViewSet
- Automatically provides all CRUD operations
- No need to write separate functions for each operation
- Uses Django REST Framework's built-in functionality

### Serializer
- Converts between database format and JSON
- Validates data before saving
- Handles read/write permissions

### ViewSet
- Groups related views together
- Provides consistent API structure
- Easy to add custom actions (like `summary`)

---

## 🚀 Next Steps

1. **Test the APIs** using the examples above
2. **Use Django Admin** to view transactions: `http://127.0.0.1:8000/admin/`
3. **Connect your React frontend** to these APIs
4. **Customize** by adding more fields or filters as needed

---

## 💡 Tips

- All endpoints require authentication (JWT token)
- Transactions are automatically filtered by user
- Use the browsable API at `http://127.0.0.1:8000/api/transactions/` to test interactively
- Check Django admin panel to see all transactions in the database

---

Your transaction CRUD APIs are fully functional and ready to use! 🎉

