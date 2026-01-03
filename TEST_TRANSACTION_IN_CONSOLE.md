# 🧪 Test Transaction in Browser Console

## Quick Test to See Exact Validation Error

### Step 1: Open Browser Console

1. Open your frontend: `https://rajeswarikodigudla.github.io/cashbook-app/`
2. Press **F12** to open Developer Tools
3. Go to **Console** tab

### Step 2: Run This Test

Copy and paste this into the console:

```javascript
// Test transaction creation
async function testTransaction() {
  const API_URL = 'https://rajeswari.pythonanywhere.com/api';
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    console.error('❌ No auth token found. Please login first.');
    return;
  }
  
  const testData = {
    type: "Income",
    amount: 100.50,
    date: "2024-01-15",
    time: "18:40:00",
    name: "Test",
    remark: "Test remark",
    mode: "Cash"
  };
  
  console.log('📤 Sending test data:', JSON.stringify(testData, null, 2));
  
  try {
    const response = await fetch(`${API_URL}/transactions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testData)
    });
    
    const responseText = await response.text();
    console.log('📥 Response status:', response.status);
    console.log('📥 Response text:', responseText);
    
    if (response.ok) {
      const data = JSON.parse(responseText);
      console.log('✅ Success! Transaction created:', data);
    } else {
      const errorData = JSON.parse(responseText);
      console.error('❌ Validation Error:');
      Object.entries(errorData).forEach(([field, errors]) => {
        if (Array.isArray(errors)) {
          console.error(`  ❌ ${field}:`, errors);
        } else {
          console.error(`  ❌ ${field}:`, errors);
        }
      });
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testTransaction();
```

### Step 3: Check the Output

**If successful:**
- ✅ You'll see "Success! Transaction created"

**If validation fails:**
- ❌ You'll see exact field errors like:
  - `amount: ["Amount must be greater than zero"]`
  - `type: ["Type must be one of: Income, Expense"]`
  - `time: ["Time must be in HH:MM:SS format"]`

---

## 🔍 What to Look For

After running the test, check for:

1. **Field errors** - Which field is failing?
2. **Error messages** - What's the exact error?
3. **Data format** - Is the data in the correct format?

---

## 📋 Common Issues

### Issue 1: "Amount must be greater than zero"
**Fix:** Make sure amount is a positive number

### Issue 2: "Type must be one of: Income, Expense"
**Fix:** Use exactly `"Income"` or `"Expense"` (capitalized)

### Issue 3: "Mode must be one of: Cash, Online, Other"
**Fix:** Use exactly `"Cash"`, `"Online"`, or `"Other"` (capitalized)

### Issue 4: "Time must be in HH:MM:SS format"
**Fix:** Use 24-hour format: `"18:40:00"` not `"06:40 PM"`

---

## 🎯 After Running Test

**Share the exact error output** from the console, and I can fix it!

---

**Run this test in browser console to see the exact validation error!** 🔍

