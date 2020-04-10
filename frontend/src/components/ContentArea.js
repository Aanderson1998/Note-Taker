/*
    This component is responsible for rendering the contents of a specific note
    and allow editing in markdown. It will also allow for deletion of the note or
    tags.
*/

import React from 'react';
import './ContentArea.css';

function ContentArea({note}) {
    let result = {content: ''};
    

    const handleOnChange = () => {
        // parse the markdown to text
        // attempt to send request to server to update note
        // if request to server is unavailable save to local storage for update later (maybe)
        console.log("note change");
    };

    // CHecks to see if the note is defined and if so render it
    return (note !== undefined ? (
        <div className="content-area">
            <h2>{note.title}</h2>
            <textarea onChange={handleOnChange} placeholder="No note currently selected" value={note.content}></textarea>
            {/* tags would go here */}
            <div>
                {note.tags.map((tag, index) => (
                    <p key={index}>{tag}</p>
                ))}
            </div>
        </div>
    ) : "");
}

export default ContentArea;