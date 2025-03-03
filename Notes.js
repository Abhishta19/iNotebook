import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "../AddNote";

const Notes = ({ showAlert }) => { 
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote } = context; // Include deleteNote from context

  useEffect(() => {
    getNotes();
  }, []); 

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
    ref.current.click(); // Open modal
  };

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  const handleClick = async () => {
    await editNote(note.id, note.title, note.description, note.tag);
    getNotes(); 
    refClose.current.click(); // Close modal after updating
    showAlert("Note updated successfully!", "success"); // Show success alert
  };

  // Delete note function
  const handleDelete = async (noteId) => {
    await deleteNote(noteId); // Delete note
    getNotes(); // Refresh notes
    showAlert("Note deleted successfully!", "danger"); // Show delete success alert
  };

  return (
    <>
      <AddNote showAlert={showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>
              <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" name="title" value={note.title} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input type="text" className="form-control" name="description" value={note.description} onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tag</label>
                  <input type="text" className="form-control" name="tag" value={note.tag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.length === 0 ? (
          <p>No notes available</p>
        ) : (
          notes.map((note) => (
            <Noteitem 
              key={note._id} 
              updateNote={updateNote} 
              note={note} 
              handleDelete={handleDelete} // Pass delete function to Noteitem
            />
          ))
        )}
      </div>
    </>
  );
};

export default Notes;
