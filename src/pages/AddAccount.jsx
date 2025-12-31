import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addAccount.css";
import { getAccounts, addAccount } from "../utils/accounts";

export default function AddAccount() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    setAccounts(getAccounts());
  }, []);

  const handleAdd = () => {
    const name = window.prompt("Enter Account Name");
    if (!name) return;
    addAccount(name);
    setAccounts(getAccounts());
  };

  return (
    <div className="add-account-page">

      {/* HEADER */}
      <div className="add-header">
        <span className="back" onClick={() => navigate("/")}>‹</span>
        <h2>Add Account</h2>
        <span className="search">🔍</span>
      </div>

      {/* ACCOUNT LIST */}
      <div className="account-list">
        {accounts.map((acc, index) => (
          <div
            key={acc.id}
            className={`account-card ${index === 0 ? "active" : ""}`}
          >
            <span className="name">{acc.name}</span>
            <span className="dots">⋮</span>
          </div>
        ))}
      </div>

      {/* FLOATING ADD BUTTON */}
      <button className="fab" onClick={handleAdd}>+</button>

    </div>
  );
}
