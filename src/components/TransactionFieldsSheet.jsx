import { useState } from "react";
import { getFields, saveFields } from "../utils/transactionFields";

export default function TransactionFieldsSheet({ onClose }) {
  const [fields, setFields] = useState(getFields());

  const toggle = (key) => {
    const updated = { ...fields, [key]: !fields[key] };
    setFields(updated);
    saveFields(updated);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sort-sheet" onClick={(e) => e.stopPropagation()}>
        <h3>Transaction Fields</h3>

        <label>
          <input
            type="checkbox"
            checked={fields.name}
            onChange={() => toggle("name")}
          />
          Name
        </label>

        <label>
          <input
            type="checkbox"
            checked={fields.category}
            onChange={() => toggle("category")}
          />
          Category
        </label>

        <label>
          <input
            type="checkbox"
            checked={fields.remark}
            onChange={() => toggle("remark")}
          />
          Remark
        </label>

        <label>
          <input
            type="checkbox"
            checked={fields.time}
            onChange={() => toggle("time")}
          />
          Time
        </label>
      </div>
    </div>
  );
}
