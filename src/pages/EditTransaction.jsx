import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/editTransaction.css";

export default function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  const txn = transactions.find(
    (t) => String(t.id) === String(id)
  );

  // ✅ SAFE DEFAULTS (HOOKS ALWAYS RUN)
  const [amount, setAmount] = useState(txn?.amount || "");
  const [name, setName] = useState(txn?.name || "");
  const [category, setCategory] = useState(txn?.category || "");
  const [remark, setRemark] = useState(txn?.remark || "");

  // ✅ CONDITIONAL UI AFTER HOOKS
  if (!txn) {
    return (
      <div style={{ padding: 20 }}>
        <p>Transaction not found</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const save = () => {
    const updated = transactions.map((t) =>
      t.id === txn.id
        ? { ...t, amount, name, category, remark }
        : t
    );

    localStorage.setItem(
      "transactions",
      JSON.stringify(updated)
    );

    navigate("/");
  };

  const remove = () => {
    if (!window.confirm("Delete this transaction permanently?")) return;

    const updated = transactions.filter(
      (t) => t.id !== txn.id
    );

    localStorage.setItem(
      "transactions",
      JSON.stringify(updated)
    );

    navigate("/");
  };

  return (
    <div className="edit-page">
      <div className="edit-header">
        <span onClick={() => navigate(-1)}>←</span>
        <h3>
          Edit {txn.type === "income" ? "Income" : "Expense"}
        </h3>
      </div>

      <div className="input-box">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <div className="input-box">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-box">
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="input-box">
        <input
          placeholder="Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
      </div>

      <div className="edit-actions">
        <button className="delete" onClick={remove}>
          Delete
        </button>
        <button className="save" onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
}
