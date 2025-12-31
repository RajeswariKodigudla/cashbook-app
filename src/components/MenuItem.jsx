export default function MenuItem({ icon, text, onClick, danger }) {
  return (
    <div
      className={`menu-item ${danger ? "danger" : ""}`}
      onClick={onClick}
    >
      <span className="material-icons-outlined">{icon}</span>
      <span className="menu-text">{text}</span>
    </div>
  );
}
