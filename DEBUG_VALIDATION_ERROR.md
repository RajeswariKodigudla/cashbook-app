# 🔍 Debug Validation Error

## 🐛 If Still Getting Validation Error

### Step 1: Check Browser Console

1. Open frontend
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Try to save a transaction
5. **Look for the error message** - it will show the exact validation error

---

## 📋 Common Validation Errors

### Error 1: "Amount is required"
**Cause:** Amount field is empty or invalid

**Fix:** Make sure amount is a positive number

---

### Error 2: "Type must be one of: Income, Expense"
**Cause:** Type is not capitalized or wrong value

**Fix:** Use exactly `"Income"` or `"Expense"` (capitalized)

---

### Error 3: "Mode must be one of: Cash, Online, Other"
**Cause:** Payment mode is wrong value

**Fix:** Use exactly `"Cash"`, `"Online"`, or `"Other"` (capitalized)

---

### Error 4: "Date is required"
**Cause:** Date field is empty

**Fix:** Make sure date is selected

---

### Error 5: "Time must be in HH:MM:SS format"
**Cause:** Time format is incorrect

**Fix:** Time should be in format: `HH:MM` or `HH:MM:SS`

---

### Error 6: "Amount must be greater than zero"
**Cause:** Amount is 0 or negative

**Fix:** Enter a positive amount

---

### Error 7: "Amount cannot have more than 2 decimal places"
**Cause:** Amount has more than 2 decimals

**Fix:** Round amount to 2 decimal places (e.g., 100.50 not 100.555)

---

## 🧪 Test Transaction Data

In browser console, run:

```javascript
// Test transaction data format
const testData = {
  type: "Income",
  amount: 100.50,
  date: "2024-01-15",
  time: "10:30:00",
  name: "Test",
  remark: "Test remark",
  mode: "Cash"
};

console.log('Test data:', testData);
console.log('Type:', typeof testData.amount);
console.log('Date format:', testData.date);
console.log('Time format:', testData.time);
```

**Expected:**
- `type`: "Income" or "Expense" (capitalized)
- `amount`: number (not string)
- `date`: "YYYY-MM-DD" format
- `time`: "HH:MM:SS" or "HH:MM" format
- `mode`: "Cash", "Online", or "Other" (capitalized)

---

## ✅ Correct Transaction Format

```javascript
{
  type: "Income",        // ✅ Capitalized
  amount: 100.50,       // ✅ Number (not string)
  date: "2024-01-15",   // ✅ YYYY-MM-DD format
  time: "10:30:00",     // ✅ HH:MM:SS format
  name: "Salary",       // ✅ String (can be empty)
  remark: "Monthly",    // ✅ String (can be empty)
  mode: "Cash"         // ✅ Capitalized: "Cash", "Online", or "Other"
}
```

---

## 🔧 If Error Persists

1. **Check browser console** for exact error message
2. **Check Network tab** (F12 → Network) to see the request/response
3. **Share the exact error message** from console
4. **Check if backend is running** and accessible

---

## 📝 Backend Requirements Summary

- `type`: **"Income"** or **"Expense"** (exact capitalization)
- `amount`: **Number** (positive, max 2 decimals)
- `date`: **"YYYY-MM-DD"** format
- `time`: **"HH:MM:SS"** or **"HH:MM"** format
- `mode`: **"Cash"**, **"Online"**, or **"Other"** (exact capitalization)
- `name`: String (optional, max 255 chars)
- `remark`: String (optional, max 1000 chars)

---

**Check the browser console for the exact validation error message!**

