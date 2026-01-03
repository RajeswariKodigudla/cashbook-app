import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../utils/apiTransactions";
import "../styles/home.css";

export default function AllTransactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all transactions from API
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await getTransactions();
        console.log('Loaded all transactions:', data);
        // Ensure data is an array
        const transactionsArray = Array.isArray(data) ? data : [];
        // Sort by date and time (newest first)
        const sortedTransactions = transactionsArray.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateB - dateA;
        });
        setTransactions(sortedTransactions);
        setError("");
      } catch (err) {
        console.error("Error loading transactions:", err);
        setError("Failed to load transactions. Please refresh the page.");
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* HEADER */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        padding: "10px",
        borderBottom: "1px solid #eee"
      }}>
        <span 
          onClick={() => navigate(-1)}
          style={{ fontSize: "24px", cursor: "pointer", marginRight: "10px" }}
        >
          ←
        </span>
        <h2 style={{ margin: 0, flex: 1 }}>All Transactions</h2>
        <span style={{ color: "#666", fontSize: "14px" }}>
          {transactions.length} transactions
        </span>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading transactions...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {error && !loading && (
        <div style={{ 
          color: "red", 
          padding: "20px", 
          textAlign: "center", 
          backgroundColor: "#ffebee", 
          margin: "20px" 
        }}>
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && transactions.length === 0 && (
        <div className="empty-state">
          <div className="book-icon-wrapper">
            <span className="material-symbols-outlined book-icon">
              menu_book
            </span>
            <span className="book-c">C</span>
          </div>
          <p className="empty-text">No Transactions Yet</p>
          <span className="material-symbols-outlined down-arrow">
            arrow_downward
          </span>
        </div>
      )}

      {/* TRANSACTIONS LIST */}
      {!loading && !error && transactions.length > 0 && (
        <div className="transaction-list">
          {transactions.map((t) => (
            <div 
              key={t.id} 
              className="transaction-row"
              onClick={() => navigate(`/edit/${t.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="left">
                <div className="name">{t.name || t.type || "Transaction"}</div>
                <div className="time">
                  {t.date || "-"} · {t.time || "-"}
                </div>
              </div>

              <div className="center">{t.account || "-"}</div>

              <div
                className={`right ${
                  t.type === "income" ? "income" : "expense"
                }`}
              >
                {t.type === "income" ? "+" : "-"}
                {t.amount || 0}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
