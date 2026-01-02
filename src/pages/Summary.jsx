import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/summaryPage.css";
import { getTransactions } from "../utils/apiTransactions";

const filters = ["All", "Daily", "Week", "Month", "Year"];

export default function Summary() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [totals, setTotals] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    calculateSummary(activeFilter);
  }, [activeFilter]);

  const calculateSummary = async (filter) => {
    try {
      const transactions = await getTransactions();
      let income = 0;
      let expense = 0;

      const now = new Date();

      transactions.forEach((t) => {
        const d = new Date(t.date);

        let include = false;

        if (filter === "All") include = true;

        if (filter === "Daily") {
          include = d.toDateString() === now.toDateString();
        }

        if (filter === "Week") {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          include = d >= weekAgo && d <= now;
        }

        if (filter === "Month") {
          include =
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear();
        }

        if (filter === "Year") {
          include = d.getFullYear() === now.getFullYear();
        }

        if (include) {
          if (t.type === "income") {
            income += Number(t.amount);
          } else if (t.type === "expense") {
            expense += Number(t.amount);
          }
        }
      });

      setTotals({ income, expense });
    } catch (error) {
      console.error("Error calculating summary:", error);
      setTotals({ income: 0, expense: 0 });
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

      {/* EMPTY STATE */}
      {totals.income === 0 && totals.expense === 0 && (
        <p className="no-summary">No summary available</p>
      )}

      {/* BOTTOM TOTALS */}
      <div className="summary-bottom">
        <div>
          <p className="green">Income</p>
          <h3 className="green">{totals.income}</h3>
        </div>
        <div>
          <p className="red">Expense</p>
          <h3 className="red">{totals.expense}</h3>
        </div>
        <div>
          <p>Total</p>
          <h3>{totals.income - totals.expense}</h3>
        </div>
      </div>

    </div>
  );
}
