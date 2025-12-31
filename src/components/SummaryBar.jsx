import { useNavigate } from "react-router-dom";
import "../styles/summaryBar.css";

export default function SummaryBar() {
  const navigate = useNavigate();

  const transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

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
          <h4>{income - expense}</h4>
        </div>
      </div>
    </div>
  );
}
