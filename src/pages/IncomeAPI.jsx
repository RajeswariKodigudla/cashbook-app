// Example: Updated Income.jsx using API instead of localStorage
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "../utils/apiTransactions";
import { getCurrentAccount } from "../utils/apiAccounts";
import "../styles/income.css";

export default function IncomeAPI() {
  const navigate = useNavigate();

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
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
      setError(err.message || "Error saving transaction");
      console.error("Transaction error:", err);
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
        <div style={{ color: "red", padding: "10px", textAlign: "center" }}>
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
            onChange={(e) => setTime(e.target.value)}
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


