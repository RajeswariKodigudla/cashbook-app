export default function DeleteAccountSheet({
  account,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div
        className="sort-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ color: "#d32f2f" }}>
          Delete Account
        </h3>

        <p>
          Are you sure you want to permanently delete
          <strong> "{account}"</strong>?
        </p>

        <p style={{ fontSize: 14, color: "#666" }}>
          This will remove the account and all its
          transactions. This action cannot be undone.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            style={{
              flex: 1,
              padding: 10,
              background: "#eee",
              border: "none",
              borderRadius: 8,
            }}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            style={{
              flex: 1,
              padding: 10,
              background: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: 8,
            }}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
