import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/notebook.css";
import { getNotes } from "../utils/notes";
import AddNoteModal from "../components/AddNoteModal";

export default function Notebook() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const refreshNotes = () => {
    setNotes(getNotes());
    setShowAdd(false);
  };

  return (
    <div className="notebook-page">

      {/* HEADER */}
      <div className="notebook-header">
        <span onClick={() => navigate(-1)}>‹</span>
        <h2>Notebook</h2>
        <div className="icons">
          <span>🔍</span>
          <span>⋮</span>
        </div>
      </div>

      {/* EMPTY STATE */}
      {notes.length === 0 && (
        <div className="notebook-empty">
          <img
            src="https://illustrations.popsy.co/gray/reading.svg"
            alt="empty"
          />
          <p>Tap + to add your first note</p>
        </div>
      )}

      {/* NOTES LIST */}
      {notes.map((n) => (
        <div key={n.id} className="note-card">
          <p>{n.text}</p>
          <span>{n.createdAt}</span>
        </div>
      ))}

      {/* FLOATING + */}
      <button className="fab" onClick={() => setShowAdd(true)}>
        +
      </button>

      {/* ADD NOTE MODAL */}
      {showAdd && (
        <AddNoteModal
          onClose={() => setShowAdd(false)}
          onSave={refreshNotes}
        />
      )}
    </div>
  );
}
