import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTransactionSummary } from "../utils/apiTransactions";
import "../styles/summaryBar.css";

export default function SummaryBar() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await getTransactionSummary();
        setSummary(data || { totalIncome: 0, totalExpense: 0, balance: 0 });
      } catch (error) {
        console.error("Error loading summary:", error);
        // Keep default values on error
      }
    };

    loadSummary();
  }, []);

  const income = summary.totalIncome || 0;
  const expense = summary.totalExpense || 0;
  const balance = summary.balance || 0;

  return (
    <div className="summary-bar">
      <div className="buttons">
        <button
          className="income-btn"
          onClick={() => navigate("/income")}
        >
          + Income
        </button>

        <button
          className="expense-btn"
          onClick={() => navigate("/expense")}
        >
          - Expense
        </button>
      </div>

      <div className="summary-box">
        <div>
          <p>Income</p>
          <h4 className="green">{income}</h4>
        </div>
        <div>
          <p>Expense</p>
          <h4 className="red">{expense}</h4>
        </div>
        <div>
          <p>Total</p>
          <h4>{balance}</h4>
        </div>
      </div>
    </div>
  );
}
