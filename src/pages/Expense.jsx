import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/expense.css";

export default function Expense() {
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

  const saveTransaction = (goBack = false) => {
    if (!amount) {
      alert("Amount is required");
      return;
    }

    const transactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.push({
      id: Date.now(),
      type: "expense",
      date,
      time,
      amount: Number(amount),
      name,
      category,
      remark,
      payment,
      account: localStorage.getItem("currentAccount") || "Cash",
    });

    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );

    if (goBack) {
      navigate("/");
    } else {
      setAmount("");
      setName("");
      setCategory("");
      setRemark("");
    }
  };

  return (
    <div className="expense-page">
      {/* HEADER */}
      <div className="expense-header">
        <span onClick={() => navigate(-1)}>←</span>
        <h3>Expense</h3>
      </div>

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
        />
      </div>

      {/* NAME */}
      <div className="input-box">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* CATEGORY */}
      <div className="input-box">
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* REMARK */}
      <div className="input-box">
        <input
          placeholder="Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
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
          >
            {p}
          </button>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="bottom-actions">
        <button className="continue" onClick={() => saveTransaction(false)}>
          Continue
        </button>
        <button className="save" onClick={() => saveTransaction(true)}>
          Save
        </button>
      </div>
    </div>
  );
}
