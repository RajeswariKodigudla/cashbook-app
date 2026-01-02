export default function MenuItem({ icon, text, onClick, danger }) {
  return (
    <div
      className={`menu-item ${danger ? "danger" : ""}`}
      onClick={onClick}
    >
      {/* ICON */}
      <span className="material-symbols-outlined menu-icon">
        {icon}
      </span>

      {/* TEXT */}
      <span className="menu-text">{text}</span>
    </div>
  );
}
