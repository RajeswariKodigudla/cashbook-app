import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterTabs from "../components/FilterTabs";
import SummaryBar from "../components/SummaryBar";
import { filterByRange } from "../utils/dateFilters";
import { getTransactions } from "../utils/apiTransactions";
import "../styles/home.css";

export default function Home({ search }) {
  const navigate = useNavigate();
  const [range, setRange] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch transactions from API
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await getTransactions();
        console.log('Loaded transactions:', data);
        // Ensure data is an array
        const transactionsArray = Array.isArray(data) ? data : [];
        setTransactions(transactionsArray);
        setError("");
      } catch (err) {
        console.error("Error loading transactions:", err);
        setError("Failed to load transactions. Please refresh the page.");
        // Fallback to empty array
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Refresh transactions when component mounts or after save
  // You can add a refresh trigger here if needed

  // Filter transactions by date range
  const filtered = filterByRange(transactions, range);

  // Filter by search if provided
  const searchFiltered = search
    ? filtered.filter(
        (t) =>
          (t.name && t.name.toLowerCase().includes(search.toLowerCase())) ||
          (t.category && t.category.toLowerCase().includes(search.toLowerCase())) ||
          (t.remark && t.remark.toLowerCase().includes(search.toLowerCase()))
      )
    : filtered;

  return (
    <>
      {/* FILTER TABS */}
      <FilterTabs active={range} onChange={setRange} />

      {/* LOADING STATE */}
      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Loading transactions...
        </div>
      )}

      {/* ERROR STATE */}
      {error && !loading && (
        <div style={{ color: "red", padding: "10px", textAlign: "center", backgroundColor: "#ffebee", margin: "10px" }}>
          {error}
        </div>
      )}

      {/* ✅ EMPTY STATE */}
      {!loading && !error && searchFiltered.length === 0 && (
        <div className="empty-state">
          {/* BOOK ICON WITH C */}
          <div className="book-icon-wrapper">
            <span className="material-symbols-outlined book-icon">
              menu_book
            </span>
            <span className="book-c">C</span>
          </div>

          {/* TEXT */}
          <p className="empty-text">No Transaction Yet</p>

          {/* JUMPING ARROW BELOW TEXT */}
          <span className="material-symbols-outlined down-arrow">
            arrow_downward
          </span>
        </div>
      )}

      {/* ✅ TRANSACTIONS LIST */}
      {!loading && !error && searchFiltered.length > 0 && (
        <div className="transaction-list">
          {searchFiltered.map((t) => (
            <div 
              key={t.id} 
              className="transaction-row"
              onClick={() => navigate(`/edit/${t.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="left">
                <div className="name">{t.name || t.type}</div>
                <div className="time">
                  {t.date} · {t.time}
                </div>
              </div>

              <div className="center">{t.account}</div>

              <div
                className={`right ${
                  t.type === "income" ? "income" : "expense"
                }`}
              >
                {t.type === "income" ? "+" : "-"}
                {t.amount}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUMMARY BAR */}
      <SummaryBar />
    </>
  );
}
