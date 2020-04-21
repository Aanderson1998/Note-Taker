import React from 'react';
import './Note.css';

function Note({note, updateIndex, index}) {
    return(
        <div onClick={() => updateIndex(index)} id={note.id} data-index={index} className="note">
            <h3>{note.title}</h3>
            <p>{note.contents}</p>
        </div>
    );
}

export default Note;