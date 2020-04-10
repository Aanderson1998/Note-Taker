import React from 'react';
import Note from './Note';
import './NotesContainer.css';

function NotesContainer({notes, updateNoteToDisplay}) {
    const MAX_CONTENT_LENGTH = 100;

    const handleClick = (index) => {
        // gets the index in local notes array of the current not to display
        // console.log(e);
        updateNoteToDisplay(index);
    };

    const trimContent = (content) => {
        let result = "";
        let trimmed = false;

        // add dots since the content of the note was trimmed
        if (content.length > MAX_CONTENT_LENGTH) {
            trimmed = true;
            for (let i = 0; i < MAX_CONTENT_LENGTH-3; i++) {
                result += content.charAt(i);
            }
            result += "...";
        }

        return trimmed? result: content;
    };

    if (notes.length > 0) {
        return(
            <div className="notes-container" >
                {notes.map((data, index) => {
                    if (!data.contentTrimmed)
                        data.contentTrimmed = trimContent(data.content);
    
                    return <Note key={index} index={index} note={data} updateIndex={handleClick} />;
                })}
            </div>
        );
    } else {
        return(
            <div className="notes-container" >
                <p>No notes could be found</p>
            </div>
        );
    }
}

export default NotesContainer;