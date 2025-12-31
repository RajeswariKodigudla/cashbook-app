import { useState } from "react";
import "../styles/addNoteModal.css";
import { addNote } from "../utils/notes";

export default function AddNoteModal({ onClose, onSave }) {
  const [text, setText] = useState("");

  const handleSave = () => {
    if (!text.trim()) return;
    addNote(text.trim());
    onSave();
  };

  return (
    <div className="modal-overlay">
      <div className="note-sheet">
        <div className="note-header">
          <h3>Add Note</h3>
          <span onClick={onClose}>✕</span>
        </div>

        <textarea
          placeholder="Write your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleSave}>Save Note</button>
      </div>
    </div>
  );
}
