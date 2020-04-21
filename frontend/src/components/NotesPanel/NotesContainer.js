/*
    Holds all of the notes in the left bar that were created and
    allows for a note to be selected to be viewed
*/
import React, {useContext} from 'react';
import Note from '../NotesEditor/Note';
import './NotesContainer.css';
import { NoteContext } from '../../contexts/NoteContext';

function NotesContainer({toggleSidebar}) {
    const MAX_CONTENT_LENGTH = 70;
    const [note, setNote, filterNotes, filterResults] = useContext(NoteContext);

    const handleClick = (n) => {
        setNote(n);
        toggleSidebar();
    };

    if (filterResults.length > 0) {
        return(
            <div className="notes-container" id='scrollbar' >
                <h2>Notes</h2>
                {filterResults.map((data, index) => {
                    return(
                        <div className='note-tab' key={index}>
                            <Note  index={index} note={data} updateIndex={() => handleClick({id: data.id, title: data.noteTitle, content: data.contents, tags: data.tags})} />
                        </div>
                    )
                })}
            </div>
        );
    } else {
        return(
            <div className="notes-container-no-notes" >
                <span>¯\_(ツ)_/¯</span>
                <p>No notes could be found</p>
            </div>
        );
    }
}

export default NotesContainer;