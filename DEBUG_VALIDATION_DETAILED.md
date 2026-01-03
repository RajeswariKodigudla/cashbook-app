# 🔍 Debug Validation Error - Detailed Guide

## 🐛 If Still Getting "Validation failed"

### Step 1: Check Browser Console for Exact Error

1. Open frontend
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Try to save a transaction
5. **Look for these logs:**
   - `📤 Sending transaction data:` - Shows what's being sent
   - `❌ Transaction error:` - Shows the error
   - `❌ Full error data:` - Shows exact validation errors
   - `❌ Field "field_name" errors:` - Shows specific field errors

---

## 📋 Common Validation Errors

### Error 1: Field "amount" errors
**Possible causes:**
- Amount is 0 or negative
- Amount has more than 2 decimal places
- Amount is not a number

**Fix:** Enter a positive number with max 2 decimals (e.g., 100.50)

---

### Error 2: Field "type" errors
**Possible causes:**
- Type is not exactly "Income" or "Expense" (case-sensitive)
- Type is missing

**Fix:** Use exactly `"Income"` or `"Expense"` (capitalized)

---

### Error 3: Field "mode" errors
**Possible causes:**
- Mode is not exactly "Cash", "Online", or "Other" (case-sensitive)
- Mode field name is wrong (should be "mode" not "payment")

**Fix:** Use exactly `"Cash"`, `"Online"`, or `"Other"` (capitalized)

---

### Error 4: Field "date" errors
**Possible causes:**
- Date is missing
- Date format is wrong (should be YYYY-MM-DD)
- Date is too far in future/past

**Fix:** Use format `YYYY-MM-DD` (e.g., "2024-01-15")

---

### Error 5: Field "time" errors
**Possible causes:**
- Time format is wrong (should be HH:MM:SS or HH:MM)
- Time is in 12-hour format (e.g., "06:40 PM")
- Time is missing

**Fix:** Use 24-hour format: `HH:MM:SS` or `HH:MM` (e.g., "18:40:00")

---

## 🧪 Test Transaction Data Format

In browser console, run:

```javascript
// Test the exact format backend expects
const testData = {
  type: "Income",        // ✅ Must be capitalized
  amount: 100.50,        // ✅ Number (positive, max 2 decimals)
  date: "2024-01-15",    // ✅ YYYY-MM-DD format
  time: "18:40:00",      // ✅ HH:MM:SS format (24-hour)
  name: "Test",          // ✅ String (optional)
  remark: "Test remark", // ✅ String (optional)
  mode: "Cash"          // ✅ Must be "Cash", "Online", or "Other"
};

console.log('Test data:', JSON.stringify(testData, null, 2));
```

---

## 🔍 Check Network Request

1. Press **F12** → **Network** tab
2. Try to save transaction
3. Find the request to `/api/transactions/`
4. Click on it
5. Go to **Payload** or **Request** tab
6. **Check the exact data being sent**

**Compare with:**
- Type: Should be `"Income"` or `"Expense"` (capitalized)
- Amount: Should be a number (not string)
- Date: Should be `"YYYY-MM-DD"`
- Time: Should be `"HH:MM:SS"` (24-hour format)
- Mode: Should be `"Cash"`, `"Online"`, or `"Other"` (capitalized)

---

## ✅ Correct Transaction Format

```json
{
  "type": "Income",
  "amount": 100.50,
  "date": "2024-01-15",
  "time": "18:40:00",
  "name": "Salary",
  "remark": "Monthly salary",
  "mode": "Cash"
}
```

---

## ❌ Common Mistakes

```json
{
  "type": "income",        // ❌ Wrong: lowercase
  "amount": "100.50",      // ❌ Wrong: string instead of number
  "date": "15-01-2024",    // ❌ Wrong: DD-MM-YYYY format
  "time": "06:40 PM",      // ❌ Wrong: 12-hour format
  "payment": "Cash",       // ❌ Wrong: field name should be "mode"
  "category": "Food",      // ❌ Wrong: field doesn't exist
  "account": "Cashbook"    // ❌ Wrong: field doesn't exist
}
```

---

## 🎯 Quick Fix Checklist

- [ ] Type is exactly `"Income"` or `"Expense"` (capitalized)
- [ ] Amount is a number (not string), positive, max 2 decimals
- [ ] Date is in `YYYY-MM-DD` format
- [ ] Time is in `HH:MM:SS` format (24-hour)
- [ ] Mode is exactly `"Cash"`, `"Online"`, or `"Other"` (capitalized)
- [ ] Field name is `mode` not `payment`
- [ ] No `category` or `account` fields

---

## 📞 Share Error Details

If still failing, share:
1. **Exact error message** from console (look for `❌ Field "field_name" errors:`)
2. **Transaction data** being sent (look for `📤 Sending transaction data:`)
3. **Network request payload** (F12 → Network → Request payload)

---

**Check the browser console for the exact validation error!** 🔍

