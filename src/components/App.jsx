import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from PostgreSQL when the app loads
  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  // Add a new note to PostgreSQL
  async function addNote(newNote) {
    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });
      const savedNote = await res.json();
      setNotes((prevNotes) => [savedNote, ...prevNotes]); // Update UI
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  // Delete a note from PostgreSQL
  async function deleteNote(id) {
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, { method: "DELETE" });
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
