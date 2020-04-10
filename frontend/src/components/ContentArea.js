/*
    This component is responsible for rendering the contents of a specific note
    and allow editing in markdown. It will also allow for deletion of the note or
    tags.
*/

import React, { useState, useEffect } from 'react';
import './ContentArea.css';

function ContentArea({note, updateNote}) {
    const [workingNote, setWorkingNote] = useState({title:"", content: "", tags:[]});
    const [wasChangeMade, setWasChangeMade] = useState(false);

    useEffect(() => {
        if (note) {
            setWorkingNote({
                title: note.title,
                content: note.content,
                tags: note.tags
            });
        }
    }, [note]);

    const handleOnChange = (e, type) => {
        // parse the markdown to text
        // attempt to send request to server to update note
        // if request to server is unavailable save to local storage for update later (maybe)
        console.log("note change");
        const temp = workingNote;
        setWasChangeMade(true);

        switch(type) {
            case "title":
                temp.title = e.target.value;
                break;
            case "content":
                temp.content = e.target.value;
                break;
            case "tags":
                
                break;
        }
        setWorkingNote({
            title: temp.title,
            content: temp.content,
            tags: temp.tags
        });

        //updateNote(note);
    };

    const saveNote = () => {
        // call api to update current note and hide the update button
        setWasChangeMade(false);
    };

    // Only shows the button if a change was made
    let saveButton = "";
    if (wasChangeMade) {
        saveButton = <button onClick={saveNote}>Save</button>
    }

    // Checks to see if the note is defined and if so render it
    return (
        <div className="content-area">
            <h2>{workingNote.title}</h2>
            <textarea onChange={(e) => handleOnChange(e,"content")} placeholder="No note currently selected" value={workingNote.content}></textarea>
            {/* tags would go here */}
            <div className="tags-container">
                <p>Tags: </p>
                {workingNote.tags.map((tag, index) => (
                    <span className="tags" key={index}>{tag}</span>
                ))}
                
            </div>
            {saveButton}
        </div>
    );
}

export default ContentArea;