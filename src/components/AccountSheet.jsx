import "../styles/accountSheet.css";
import { getAccounts, setCurrentAccount } from "../utils/accounts";

export default function AccountSheet({
  current,
  onClose,
  onAddNew,
  onSelect
}) {
  const accounts = getAccounts();

  return (
    <div className="sheet-overlay">
      <div className="sheet">
        <div className="sheet-header">
          <h3>Add Account</h3>
          <span onClick={onClose}>✕</span>
        </div>

        {accounts.map((a, i) => (
          <div
            key={i}
            className="account-row"
            onClick={() => {
              setCurrentAccount(a.name);
              onSelect(a.name);
              onClose();
            }}
          >
            <div className="avatar">👤</div>
            <div className="info">
              <div className="name">{a.name}</div>
              <div className="date">{a.created}</div>
            </div>
            {a.name === current && <span className="check">✔</span>}
          </div>
        ))}

        <button className="primary" onClick={onAddNew}>
          Add New Account
        </button>
      </div>
    </div>
  );
}
