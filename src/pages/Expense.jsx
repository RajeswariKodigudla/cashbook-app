import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "../utils/apiTransactions";
import { getCurrentAccount } from "../utils/apiAccounts";
import "../styles/expense.css";

export default function Expense() {
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
      // HTML5 time input returns value in 24-hour format (HH:MM), but we need HH:MM:SS
      let formattedTime = null;
      
      if (time) {
        // HTML5 time input always returns 24-hour format (HH:MM)
        // Convert to HH:MM:SS format
        const parts = time.split(':');
        if (parts.length >= 2) {
          const hours = parts[0].padStart(2, '0');
          const minutes = parts[1].padStart(2, '0');
          const seconds = parts[2] || '00';
          formattedTime = `${hours}:${minutes}:${seconds.padStart(2, '0')}`;
        } else {
          // Fallback: if format is unexpected, use current time
          const now = new Date();
          formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:00`;
        }
      } else {
        // Default to current time in 24-hour format
        const now = new Date();
        formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:00`;
      }
      
      console.log('⏰ Time conversion:', {
        original: time,
        formatted: formattedTime,
        parts: time ? time.split(':') : null
      });

      // Backend expects: type="Expense" (capitalized), mode (not payment), amount as number
      // Required fields: type, amount, date
      // Optional fields: time, name, remark, mode
      const transactionData = {
        type: "Expense",  // Backend expects capitalized: "Income" or "Expense"
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
      await createTransaction(transactionData);

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
      console.error("Transaction error:", err);
      console.error("Error details:", {
        message: err.message,
        status: err.status,
        data: err.data,
        responseText: err.responseText
      });
      
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
    <div className="expense-page">
      {/* HEADER */}
      <div className="expense-header">
        <span onClick={() => navigate(-1)}>←</span>
        <h3>Expense</h3>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div style={{ color: "red", padding: "10px", textAlign: "center", backgroundColor: "#ffebee", margin: "10px" }}>
          {error}
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
