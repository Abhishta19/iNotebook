import React, { useState, useEffect } from "react";
import NoteContext from "./noteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const navigate = useNavigate();
  const [notes, setNotes] = useState(notesInitial);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
  }, []);

  const getNotes = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notes. Please try again later.');
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error('Failed to add note. Please try again later.');
      }

      const newNote = await response.json();
      setNotes([...notes, newNote]);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete note. Please try again later.');
      }

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error('Failed to update note. Please try again later.');
      }

      setNotes(
        notes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
      {error && <div className="error-message">{error}</div>}
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
