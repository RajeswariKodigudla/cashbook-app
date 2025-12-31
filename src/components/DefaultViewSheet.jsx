export default function DefaultViewSheet({ onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sort-sheet" onClick={e => e.stopPropagation()}>
        <h3>Set Default View</h3>
        <label><input type="radio" name="view" /> Daily</label>
        <label><input type="radio" name="view" /> Weekly</label>
        <label><input type="radio" name="view" /> Monthly</label>
      </div>
    </div>
  );
}

