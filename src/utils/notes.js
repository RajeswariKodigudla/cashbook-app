const KEY = "cashbook_notes";

export function getNotes() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function addNote(text) {
  const notes = getNotes();
  notes.push({
    id: Date.now(),
    text,
    createdAt: new Date().toLocaleString()
  });
  localStorage.setItem(KEY, JSON.stringify(notes));
}
