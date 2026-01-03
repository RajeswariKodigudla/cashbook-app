import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "../utils/apiTransactions";
import { getCurrentAccount } from "../utils/apiAccounts";
import "../styles/income.css";

export default function Income() {
  const navigate = useNavigate();

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  // Initialize time in 24-hour format (HH:MM)
  const getCurrentTime24 = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };
  const [time, setTime] = useState(getCurrentTime24());
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [remark, setRemark] = useState("");
  const [payment, setPayment] = useState("Cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const saveTransaction = async (goBack = false) => {
    if (!amount) {
      setError("Amount is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Validate amount before sending
      const amountValue = parseFloat(amount);
      if (isNaN(amountValue) || amountValue <= 0) {
        setError("Amount must be a positive number");
        setLoading(false);
        return;
      }

      // Format time properly (HH:MM:SS format, 24-hour)
      // HTML5 time input should return 24-hour format (HH:MM), but handle edge cases
      let formattedTime = null;
      
      if (time) {
        // Check if time contains AM/PM (shouldn't happen with HTML5 time input, but handle it)
        if (time.toLowerCase().includes('am') || time.toLowerCase().includes('pm')) {
          // Parse 12-hour format (e.g., "06:40 pm") - fallback for edge cases
          const timeStr = time.toLowerCase().trim();
          const isPM = timeStr.includes('pm');
          const timePart = timeStr.replace(/\s*(am|pm)/i, '').trim();
          const [hours, minutes] = timePart.split(':').map(Number);
          let hour24 = hours;
          if (isPM && hours !== 12) hour24 = hours + 12;
          if (!isPM && hours === 12) hour24 = 0;
          formattedTime = `${String(hour24).padStart(2, '0')}:${String(minutes || 0).padStart(2, '0')}:00`;
        } else {
          // HTML5 time input returns HH:MM format (24-hour)
          const parts = time.split(':');
          if (parts.length >= 2) {
            const hours = String(parseInt(parts[0], 10)).padStart(2, '0');
            const minutes = String(parseInt(parts[1], 10)).padStart(2, '0');
            const seconds = parts[2] ? String(parseInt(parts[2], 10)).padStart(2, '0') : '00';
            formattedTime = `${hours}:${minutes}:${seconds}`;
          } else {
            // Invalid format, use current time
            const now = new Date();
            formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:00`;
          }
        }
      } else {
        // Default to current time in 24-hour format
        const now = new Date();
        formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:00`;
      }
      
      console.log('⏰ Time conversion:', {
        original: time,
        formatted: formattedTime,
        hasAMPM: time && (time.toLowerCase().includes('am') || time.toLowerCase().includes('pm'))
      });

      // Backend expects: type="Income" (capitalized), mode (not payment), amount as number
      // Required fields: type, amount, date
      // Optional fields: time, name, remark, mode
      const transactionData = {
        type: "Income",  // Backend expects capitalized: "Income" or "Expense"
        amount: amountValue,  // Send as number (not string), backend will convert to Decimal
        date: date,  // Format: YYYY-MM-DD (required)
        time: formattedTime || undefined,  // Format: HH:MM:SS (optional, backend defaults to 00:00:00)
        name: name || '',  // Optional string
        remark: remark || '',  // Optional string
        mode: payment || 'Cash',  // Backend expects "mode" not "payment", must be "Cash", "Online", or "Other"
      };
      
      // CRITICAL FIX: Ensure type is always capitalized (safety check)
      if (transactionData.type) {
        const typeLower = transactionData.type.toLowerCase();
        if (typeLower === 'income') {
          transactionData.type = 'Income';
        } else if (typeLower === 'expense') {
          transactionData.type = 'Expense';
        }
      }
      
      // Remove undefined/null values to avoid sending them
      Object.keys(transactionData).forEach(key => {
        if (transactionData[key] === undefined || transactionData[key] === null) {
          delete transactionData[key];
        }
      });
      
      // Remove category and account - backend doesn't expect these fields
      // category is not in the backend model
      // account is not in the serializer fields
      
      console.log('📤 Sending transaction data:', JSON.stringify(transactionData, null, 2));
      console.log('✅ Type field verification:', { type: transactionData.type, isCapitalized: transactionData.type === 'Income' || transactionData.type === 'Expense' });
      console.log('⏰ Time format check:', {
        original: time,
        formatted: formattedTime,
        hasAMPM: time && (time.toLowerCase().includes('am') || time.toLowerCase().includes('pm'))
      });
      
      try {
        const result = await createTransaction(transactionData);
        console.log('✅ Transaction created successfully:', result);
      } catch (createError) {
        console.error('❌ Create transaction error:', createError);
        console.error('❌ Error data:', createError.data);
        console.error('❌ Error status:', createError.status);
        throw createError; // Re-throw to be caught by outer catch
      }

      if (goBack) {
        navigate("/");
      } else {
        setAmount("");
        setName("");
        setCategory("");
        setRemark("");
        setError("");
      }
    } catch (err) {
      console.error("❌ Transaction error:", err);
      console.error("❌ Error details:", {
        message: err.message,
        status: err.status,
        data: err.data,
        responseText: err.responseText
      });
      
      // Log full error data for debugging
      if (err.data) {
        console.error("❌ Full error data:", JSON.stringify(err.data, null, 2));
        // Log each field error
        Object.entries(err.data).forEach(([field, errors]) => {
          if (Array.isArray(errors)) {
            console.error(`❌ Field "${field}" errors:`, errors);
          }
        });
      }
      
      // Better error messages
      let errorMessage = "Error saving transaction. Please try again.";
      
      if (err.isNetworkError || err.message.includes('Failed to fetch') || err.message.includes('Cannot connect')) {
        errorMessage = "Cannot connect to server. Please make sure:\n1. Backend server is running\n2. Check browser console for details";
      } else if (err.status === 401) {
        errorMessage = "Authentication failed. Please login again.";
      } else if (err.status === 400) {
        // Show detailed validation errors
        if (err.data) {
          const fieldErrors = Object.entries(err.data)
            .filter(([key, value]) => Array.isArray(value) && value.length > 0)
            .map(([key, value]) => `${key}: ${value[0]}`)
            .join('\n');
          if (fieldErrors) {
            errorMessage = `Validation Error:\n${fieldErrors}`;
          } else if (err.data.detail) {
            errorMessage = err.data.detail;
          } else if (err.data.message) {
            errorMessage = err.data.message;
          } else {
            errorMessage = JSON.stringify(err.data, null, 2);
          }
        } else {
          errorMessage = err.message || "Invalid data. Please check all fields.";
        }
      } else if (err.status === 403) {
        errorMessage = "Permission denied. Please check your account.";
      } else if (err.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.data) {
        if (err.data.detail) {
          errorMessage = err.data.detail;
        } else if (err.data.message) {
          errorMessage = err.data.message;
        } else if (typeof err.data === 'object') {
          // Format field errors
          const fieldErrors = Object.entries(err.data)
            .filter(([key, value]) => Array.isArray(value) && value.length > 0)
            .map(([key, value]) => `${key}: ${value[0]}`)
            .join(', ');
          if (fieldErrors) {
            errorMessage = fieldErrors;
          }
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="income-page">
      {/* HEADER */}
      <div className="income-header">
        <span onClick={() => navigate(-1)}>←</span>
        <h3>Income</h3>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div style={{ 
          color: "red", 
          padding: "15px", 
          textAlign: "left", 
          backgroundColor: "#ffebee", 
          margin: "10px",
          borderRadius: "4px",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
          fontSize: "12px"
        }}>
          <strong>❌ Error:</strong>
          <br />
          {error}
          <br />
          <br />
          <small>Check browser console (F12) for detailed error information.</small>
        </div>
      )}

      {/* DATE & TIME */}
      <div className="row">
        <div className="input-box">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="input-box">
          <input
            type="time"
            value={time}
            onChange={(e) => {
              // Ensure time is always in 24-hour format (HH:MM)
              const timeValue = e.target.value;
              if (timeValue) {
                setTime(timeValue); // HTML5 time input always returns 24-hour format
              }
            }}
            step="1" // Allow seconds
          />
        </div>
      </div>

      {/* AMOUNT */}
      <div className="input-box">
        <label>Amount*</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* NAME */}
      <div className="input-box">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* CATEGORY */}
      <div className="input-box">
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* REMARK */}
      <div className="input-box">
        <input
          placeholder="Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* PAYMENT MODE */}
      <p className="section-title">Payment Mode</p>
      <div className="payment-row">
        {["Cash", "Online", "Other"].map((p) => (
          <button
            key={p}
            className={payment === p ? "active" : ""}
            onClick={() => setPayment(p)}
            disabled={loading}
          >
            {p}
          </button>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="bottom-actions">
        <button
          className="continue"
          onClick={() => saveTransaction(false)}
          disabled={loading}
        >
          {loading ? "Saving..." : "Continue"}
        </button>
        <button
          className="save"
          onClick={() => saveTransaction(true)}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
