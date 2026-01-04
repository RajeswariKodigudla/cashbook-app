# Quick Setup: Connect Frontend to Backend

## ✅ Files Created

All API service files have been created! Now follow these steps:

---

## Step 1: Create Environment File

Create `.env` file in project root:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**For Django backend:**
```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

---

## Step 2: Start Backend

**Node.js Backend:**
```bash
cd backend
npm run dev
```

**OR Django Backend:**
```bash
cd backend\backend
python manage.py runserver
```

---

## Step 3: Update Components (One at a Time)

### Example: Update Income.jsx

**Replace the import:**
```javascript
// OLD
// (no import needed for localStorage)

// NEW
import { createTransaction } from '../utils/apiTransactions';
import { getCurrentAccount } from '../utils/apiAccounts';
```

**Update saveTransaction function:**
```javascript
// OLD
const saveTransaction = (goBack = false) => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.push({...});
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

// NEW
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
    alert("Error: " + error.message);
  }
};
```

---

## Step 4: Add Authentication (Optional but Recommended)

Update `App.js` to include login:

```javascript
import { useState, useEffect } from 'react';
import { isAuthenticated } from './services/auth';
import LoginModal from './components/LoginModal';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      setShowLogin(true);
    }
  }, []);

  return (
    <>
      {showLogin && (
        <LoginModal 
          onClose={() => {}} 
          onSuccess={() => setShowLogin(false)}
        />
      )}
      {/* Your existing app content */}
    </>
  );
}
```

---

## Step 5: Test Connection

1. **Start backend** (Node.js or Django)
2. **Start frontend:** `npm start`
3. **Try creating a transaction**
4. **Check browser console** for any errors

---

## 📋 Available API Functions

### Transactions
```javascript
import { 
  getTransactions, 
  createTransaction, 
  updateTransaction, 
  deleteTransaction,
  getTransactionSummary 
} from '../utils/apiTransactions';
```

### Accounts
```javascript
import { 
  getAccounts, 
  addAccount, 
  updateAccount, 
  deleteAccount 
} from '../utils/apiAccounts';
```

### Notes
```javascript
import { 
  getNotes, 
  addNote, 
  updateNote, 
  deleteNote 
} from '../utils/apiNotes';
```

### Settings
```javascript
import { 
  getSettings, 
  saveSettings 
} from '../utils/apiSettings';
```

---

## 🔧 Troubleshooting

### CORS Error
- Make sure backend CORS is enabled (already configured)
- Check API URL in `.env` file

### 401 Unauthorized
- User needs to login first
- Token might be expired

### Network Error
- Backend not running
- Wrong API URL

### Data Not Showing
- Check if API returns data correctly
- Check browser console for errors
- Verify authentication token exists

---

## 🚀 Next Steps

1. ✅ Create `.env` file
2. ✅ Start backend
3. ✅ Update one component (start with Income.jsx)
4. ✅ Test it works
5. ✅ Update other components one by one

See `FRONTEND_BACKEND_CONNECTION.md` for detailed guide!




