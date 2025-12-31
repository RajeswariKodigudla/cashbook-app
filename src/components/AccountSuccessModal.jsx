import "../styles/addAccountModal.css";

export default function AccountSuccessModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="success-sheet">
        <span className="close" onClick={onClose}>✕</span>

        <div className="success-icon">👤✔</div>

        <h3>New Account Created!</h3>
        <p>Start adding transactions to your account</p>

        <button className="start-btn" onClick={onClose}>
          Start Transactions
        </button>
      </div>
    </div>
  );
}
