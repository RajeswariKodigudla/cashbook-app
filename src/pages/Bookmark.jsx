import { useNavigate } from "react-router-dom";
import "../styles/bookmark.css";
import { getTransactions } from "../utils/transactions";

export default function Bookmark() {
  const navigate = useNavigate();
  const data = getTransactions();

  // For now, bookmarks are empty
  // (Later we can mark transactions as bookmarked)
  const bookmarked = [];

  let income = 0;
  let expense = 0;

  bookmarked.forEach((t) => {
    income += t.income || 0;
    expense += t.expense || 0;
  });

  return (
    <div className="bookmark-page">

      {/* HEADER */}
      <div className="bookmark-header">
        <span className="back" onClick={() => navigate(-1)}>‹</span>
        <h2>Bookmark</h2>
      </div>

      {/* EMPTY STATE */}
      {bookmarked.length === 0 && (
        <div className="bookmark-empty">
          <div className="bookmark-icon">🔖</div>
          <p>No Bookmarked transaction</p>
        </div>
      )}

      {/* BOTTOM SUMMARY */}
      <div className="bookmark-bottom">
        <div>
          <p className="green">Income</p>
          <h3 className="green">{income}</h3>
        </div>
        <div>
          <p className="red">Expense</p>
          <h3 className="red">{expense}</h3>
        </div>
        <div>
          <p>Total</p>
          <h3>{income - expense}</h3>
        </div>
      </div>

    </div>
  );
}
