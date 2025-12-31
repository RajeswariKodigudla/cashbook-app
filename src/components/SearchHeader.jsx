import "../styles/search.css";

export default function SearchHeader({ value, onChange, onClose }) {
  return (
    <header className="search-header">
      <span
        className="material-icons-outlined back-icon"
        onClick={onClose}
      >
        arrow_back
      </span>

      <input
        autoFocus
        placeholder="Search by amount, name, category or remark"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </header>
  );
}

