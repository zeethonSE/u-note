import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log("API URL:", API_URL);

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from PostgreSQL when the app loads
  // useEffect(() => {
  //   fetch(`${API_URL}/notes`)
  //     .then((res) => res.json())
  //     .then((data) => setNotes(data))
  //     .catch((err) => console.error("Error fetching notes:", err));
  // }, []);
  useEffect(() => {
    fetch("https://u-note.onrender.com/api/notes")
      .then((res) => {
        if (!res.ok) throw new Error("Response not ok");
        return res.json();
      })
      .then((data) => console.log("Notes:", data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  
  // Add a new note to PostgreSQL
  async function addNote(newNote) {
    try {
      const res = await fetch(`${API_URL}/notes`, {
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
      await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" });
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
