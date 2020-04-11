/*
    This component is responsible for rendering the contents of a specific note
    and allow editing in markdown. It will also allow for deletion of the note or
    tags.
*/

import React, { useState, useEffect, useContext } from 'react';
import MarkdownViewer from './MarkdownViewer';
import MarkdownEditor from './MarkdownEditor';
import './ContentArea.css';
import { NoteContext } from '../../contexts/NoteContext';

function ContentArea() {
    const [note] = useContext(NoteContext);

    const saveNote = () => {
        // call api to update current note and hide the update button
        console.log("save the current working note in the context");
    };

    // Only shows the button if a change was made
    // let saveButton = "";
    // if (wasChangeMade) {
    //     saveButton = <button onClick={saveNote} className="btn-save">Save</button>
    // }

    return(note !== undefined ? (
        <div className="content-area">
            <h2>{note.title}</h2>
            <MarkdownViewer />
            <MarkdownEditor />

            {/* tags would go here */}
            <div className="tags-container">
                <p>Tags: </p>
                {note.tags.map((tag, index) => (
                    <span className="tags" key={index}>{tag}</span>
                ))}
                
            </div>
            <button onClick={saveNote} className="btn-save">Save</button>
        </div>
    ) : <p className="no-note">No note currently selected</p>)

    return(
        <div className="content-area">
            <h2>{note.title}</h2>
            <MarkdownViewer />
            <MarkdownEditor />

            {/* tags would go here */}
            <div className="tags-container">
                <p>Tags: </p>
                {note.tags.map((tag, index) => (
                    <span className="tags" key={index}>{tag}</span>
                ))}
                
            </div>
            <button onClick={saveNote} className="btn-save">Save</button>
        </div>
    );

    
}

export default ContentArea;