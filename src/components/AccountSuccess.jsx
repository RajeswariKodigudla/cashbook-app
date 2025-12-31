import "../styles/accountSheet.css";

export default function AccountSuccess({ onDone }) {
  return (
    <div className="sheet-overlay">
      <div className="sheet success">
        <span className="close" onClick={onDone}>✕</span>

        <div className="success-icon">👤✔</div>
        <h2>New Account Created!</h2>
        <p>Start adding transactions to your account</p>

        <button className="primary" onClick={onDone}>
          Start Transactions
        </button>
      </div>
    </div>
  );
}
