import { useState } from "react";
import "../styles/addAccountModal.css";
import { addAccount } from "../utils/accounts";

export default function AddAccountModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (!name.trim()) return;
    addAccount(name.trim());
    onSuccess();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-sheet">
        <div className="modal-header">
          <h3>Add Account</h3>
          <span className="close" onClick={onClose}>✕</span>
        </div>

        <input
          type="text"
          placeholder="Enter Account Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="save-btn" onClick={handleSave}>
          Save Account
        </button>
      </div>
    </div>
  );
}
