import { useState } from "react";
import "../styles/accountSheet.css";
import { addAccount } from "../utils/accounts";

export default function AddAccountSheet({ onClose, onSaved }) {
  const [name, setName] = useState("");

  const save = () => {
    if (!name.trim()) return;
    addAccount(name);
    onSaved(name);
  };

  return (
    <div className="sheet-overlay">
      <div className="sheet">
        <div className="sheet-header">
          <h3>Add Account</h3>
          <span onClick={onClose}>✕</span>
        </div>

        <input
          className="input"
          placeholder="Enter Account Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="primary" onClick={save}>
          Save Account
        </button>
      </div>
    </div>
  );
}
