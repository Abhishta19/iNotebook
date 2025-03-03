import React from 'react';

const Noteitem = ({ note, updateNote, handleDelete }) => {

  return (
    <div className="col-md-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text"><small className="text-muted">{note.tag}</small></p>
          
      
          <button className="btn btn-primary mx-2" onClick={() => updateNote(note)}>
          <i class="fa-solid fa-pen-to-square"></i>
          </button>

          <button className="btn btn-danger" onClick={() => handleDelete(note._id)}>
            <i className="fa fa-trash"></i> {/* Your delete icon stays the same */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
