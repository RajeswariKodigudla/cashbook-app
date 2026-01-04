// API-based notes utility (replaces localStorage version)
import { notesAPI } from '../services/api';

let notesCache = null;

export async function getNotes() {
  try {
    if (!notesCache) {
      notesCache = await notesAPI.getAll();
    }
    return notesCache;
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}

export async function addNote(text) {
  try {
    const newNote = await notesAPI.create(text);
    notesCache = null; // Clear cache
    return newNote;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
}

export async function updateNote(id, text) {
  try {
    const updated = await notesAPI.update(id, text);
    notesCache = null; // Clear cache
    return updated;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
}

export async function deleteNote(id) {
  try {
    await notesAPI.delete(id);
    notesCache = null; // Clear cache
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}

export function clearNotesCache() {
  notesCache = null;
}




