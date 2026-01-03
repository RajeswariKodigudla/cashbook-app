import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/summaryPage.css";
import { getTransactionSummary } from "../utils/apiTransactions";

const filters = ["All", "Daily", "Week", "Month", "Year"];

export default function Summary() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [totals, setTotals] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSummary(activeFilter);
  }, [activeFilter]);

  const fetchSummary = async (filter) => {
    try {
      setLoading(true);
      setError("");
      
      const now = new Date();
      let startDate = null;
      let endDate = null;

      // Calculate date range based on filter
      if (filter === "Daily") {
        const today = now.toISOString().split('T')[0];
        startDate = today;
        endDate = today;
      } else if (filter === "Week") {
        const firstDayOfWeek = new Date(now);
        firstDayOfWeek.setDate(now.getDate() - now.getDay());
        startDate = firstDayOfWeek.toISOString().split('T')[0];
        
        const lastDayOfWeek = new Date(now);
        lastDayOfWeek.setDate(now.getDate() - now.getDay() + 6);
        endDate = lastDayOfWeek.toISOString().split('T')[0];
      } else if (filter === "Month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
      } else if (filter === "Year") {
        startDate = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];
        endDate = new Date(now.getFullYear(), 11, 31).toISOString().split('T')[0];
      }
      // For "All", startDate and endDate remain null

      // Fetch summary from API with filters
      const summaryData = await getTransactionSummary({ startDate, endDate });
      
      setTotals({
        totalIncome: summaryData.totalIncome || 0,
        totalExpense: summaryData.totalExpense || 0,
        balance: summaryData.balance || 0
      });
    } catch (error) {
      console.error("Error fetching summary:", error);
      setError("Failed to load summary. Please try again.");
      setTotals({ totalIncome: 0, totalExpense: 0, balance: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summary-page">

      {/* HEADER */}
      <div className="summary-header">
        <span className="back" onClick={() => navigate("/")}>‹</span>
        <h2>Summary</h2>
        <span className="calendar-icon">📅</span>
      </div>

      {/* FILTERS */}
      <div className="summary-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={activeFilter === f ? "active" : ""}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LABEL */}
      <p className="summary-label">{activeFilter}</p>

      {/* LOADING STATE */}
      {loading && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading summary...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {error && !loading && (
        <div style={{ color: "red", padding: "20px", textAlign: "center", backgroundColor: "#ffebee", margin: "20px" }}>
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && totals.totalIncome === 0 && totals.totalExpense === 0 && (
        <p className="no-summary">No summary available for {activeFilter}</p>
      )}

      {/* BOTTOM TOTALS */}
      {!loading && !error && (
        <div className="summary-bottom">
          <div>
            <p className="green">Income</p>
            <h3 className="green">{totals.totalIncome || 0}</h3>
          </div>
          <div>
            <p className="red">Expense</p>
            <h3 className="red">{totals.totalExpense || 0}</h3>
          </div>
          <div>
            <p>Balance</p>
            <h3>{totals.balance || 0}</h3>
          </div>
        </div>
      )}

    </div>
  );
}
