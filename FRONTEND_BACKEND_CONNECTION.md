# Frontend-Backend Connection Guide

## ✅ What's Been Created

I've created API service files to connect your React frontend to the backend:

### New Files Created:

1. **`src/config/api.js`** - API configuration and auth token management
2. **`src/services/api.js`** - All API service functions
3. **`src/services/auth.js`** - Authentication functions
4. **`src/utils/apiAccounts.js`** - API-based accounts utility
5. **`src/utils/apiTransactions.js`** - API-based transactions utility
6. **`src/utils/apiNotes.js`** - API-based notes utility
7. **`src/utils/apiSettings.js`** - API-based settings utility
8. **`src/components/AuthGuard.jsx`** - Authentication guard component
9. **`src/components/LoginModal.jsx`** - Login/Register modal

---

## 🔧 Setup Steps

### Step 1: Install Axios (Optional - we're using fetch)

The code uses native `fetch`, but you can install axios if preferred:

```bash
npm install axios
```

### Step 2: Create Environment File

Create `.env` file in project root:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**For Django backend:**
```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

### Step 3: Update Components to Use API

Replace localStorage calls with API calls in your components.

---

## 📝 How to Update Components

### Example: Update Income.jsx

**Before (localStorage):**
```javascript
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
transactions.push({...});
localStorage.setItem("transactions", JSON.stringify(transactions));
```

**After (API):**
```javascript
import { createTransaction } from '../utils/apiTransactions';

const saveTransaction = async (goBack = false) => {
  if (!amount) {
    alert("Amount is required");
    return;
  }

  try {
    await createTransaction({
      type: "income",
      date,
      time,
      amount: Number(amount),
      name,
      category,
      remark,
      payment,
      account: getCurrentAccount(),
    });
    
    if (goBack) navigate("/");
    else {
      setAmount("");
      setName("");
      setCategory("");
      setRemark("");
    }
  } catch (error) {
    alert("Error saving transaction: " + error.message);
  }
};
```

---

## 🔐 Authentication Setup

### Add Login to App.js

```javascript
import { useState, useEffect } from 'react';
import { isAuthenticated } from './services/auth';
import LoginModal from './components/LoginModal';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      setShowLogin(true);
    }
  }, []);

  const handleLoginSuccess = (user, token) => {
    setUser(user);
    setShowLogin(false);
  };

  return (
    <>
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onSuccess={handleLoginSuccess}
        />
      )}
      {/* Your existing app content */}
    </>
  );
}
```

---

## 🔄 Migration Strategy

### Option 1: Gradual Migration (Recommended)

1. Keep both localStorage and API versions
2. Add feature flag to switch between them
3. Test thoroughly
4. Remove localStorage code once stable

### Option 2: Complete Migration

1. Replace all localStorage calls with API calls
2. Update all components
3. Test everything

---

## 📋 Component Update Checklist

- [ ] **Income.jsx** - Use `createTransaction` from `apiTransactions`
- [ ] **Expense.jsx** - Use `createTransaction` from `apiTransactions`
- [ ] **Home.jsx** - Use `getTransactions` from `apiTransactions`
- [ ] **AllTransactions.jsx** - Use `getTransactions` from `apiTransactions`
- [ ] **EditTransaction.jsx** - Use `updateTransaction` from `apiTransactions`
- [ ] **AddAccount.jsx** - Use `addAccount` from `apiAccounts`
- [ ] **Notebook.jsx** - Use `getNotes` and `addNote` from `apiNotes`
- [ ] **Settings.jsx** - Use `getSettings` and `saveSettings` from `apiSettings`
- [ ] **BackupRestore.jsx** - Use `backupAPI` from `services/api`

---

## 🧪 Testing the Connection

### 1. Start Backend

**Node.js:**
```bash
cd backend
npm run dev
```

**Django:**
```bash
cd backend\backend
python manage.py runserver
```

### 2. Start Frontend

```bash
npm start
```

### 3. Test API Connection

Open browser console and test:

```javascript
// Test API connection
import { accountsAPI } from './services/api';
accountsAPI.getAll().then(console.log).catch(console.error);
```

---

## 🔍 Debugging

### Check API URL

Make sure `.env` file has correct URL:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Check CORS

Backend should have CORS enabled (already configured in both backends).

### Check Authentication

Make sure token is being saved:
```javascript
localStorage.getItem('authToken')
```

### Common Issues

1. **CORS Error**: Backend CORS not configured
2. **401 Unauthorized**: Token not sent or expired
3. **404 Not Found**: Wrong API URL
4. **Network Error**: Backend not running

---

## 📚 API Functions Available

### Accounts
- `getAccounts()` - Get all accounts
- `addAccount(name)` - Create account
- `updateAccount(id, name)` - Update account
- `deleteAccount(id)` - Delete account

### Transactions
- `getTransactions(filters)` - Get all transactions
- `createTransaction(data)` - Create transaction
- `updateTransaction(id, data)` - Update transaction
- `deleteTransaction(id)` - Delete transaction
- `getTransactionSummary(filters)` - Get summary

### Notes
- `getNotes()` - Get all notes
- `addNote(text)` - Create note
- `updateNote(id, text)` - Update note
- `deleteNote(id)` - Delete note

### Settings
- `getSettings()` - Get settings
- `saveSettings(data)` - Update settings

---

## 🚀 Next Steps

1. **Create `.env` file** with API URL
2. **Add LoginModal** to your App.js
3. **Update one component** at a time (start with Income.jsx)
4. **Test thoroughly** before moving to next component
5. **Handle errors** gracefully with try-catch

---

## 💡 Tips

- Use async/await for API calls
- Show loading states while fetching
- Handle errors with user-friendly messages
- Cache data when appropriate
- Clear cache after mutations

Your frontend is now ready to connect to the backend! 🎉


