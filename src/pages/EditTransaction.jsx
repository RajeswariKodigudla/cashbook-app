import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTransactionById, updateTransaction, deleteTransaction } from "../utils/apiTransactions";
import "../styles/editTransaction.css";

export default function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [txn, setTxn] = useState(null);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load transaction from API
  useEffect(() => {
    const loadTransaction = async () => {
      try {
        setLoading(true);
        const transaction = await getTransactionById(id);
        if (transaction) {
          setTxn(transaction);
          setAmount(transaction.amount || "");
          setName(transaction.name || "");
          setCategory(transaction.category || "");
          setRemark(transaction.remark || "");
        } else {
          setError("Transaction not found");
        }
      } catch (err) {
        console.error("Error loading transaction:", err);
        setError("Failed to load transaction");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTransaction();
    }
  }, [id]);

  const save = async () => {
    if (!txn) return;

    setError("");
    setSaving(true);

    try {
      await updateTransaction(id, {
        ...txn,
        amount: Number(amount),
        name,
        category,
        remark,
      });
      navigate("/");
    } catch (err) {
      setError(err.message || "Error updating transaction");
      console.error("Update error:", err);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("Delete this transaction permanently?")) return;
    if (!txn) return;

    setError("");
    setSaving(true);

    try {
      await deleteTransaction(id);
      navigate("/");
    } catch (err) {
      setError(err.message || "Error deleting transaction");
      console.error("Delete error:", err);
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p>Loading transaction...</p>
      </div>
    );
  }

  // Error or not found state
  if (error || !txn) {
    return (
      <div style={{ padding: 20 }}>
        <p style={{ color: "red" }}>{error || "Transaction not found"}</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-header">
        <span onClick={() => navigate(-1)}>←</span>
        <h3>
          Edit {txn.type === "income" ? "Income" : "Expense"}
        </h3>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div style={{ color: "red", padding: "10px", textAlign: "center", backgroundColor: "#ffebee", margin: "10px" }}>
          {error}
        </div>
      )}

      <div className="input-box">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={saving}
        />
      </div>

      <div className="input-box">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={saving}
        />
      </div>

      <div className="input-box">
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={saving}
        />
      </div>

      <div className="input-box">
        <input
          placeholder="Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          disabled={saving}
        />
      </div>

      <div className="edit-actions">
        <button
          className="delete"
          onClick={remove}
          disabled={saving}
        >
          {saving ? "Deleting..." : "Delete"}
        </button>
        <button
          className="save"
          onClick={save}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
