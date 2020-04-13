/*
    The ContentContainer is in charge of containing all of the
    notes and note editing area in a responsive way.
*/
import React, { useState, useEffect } from 'react';
import FilterNotes from './NotesPanel/FilterNotes';
import NotesContainer from './NotesPanel/NotesContainer';
import ContentArea from './NotesEditor/ContentArea';
import {NoteContextProvider} from '../contexts/NoteContext';
import './ContentContainer.css';

function ContentContainer() {
    
    const showNote = () => {
        var note = document.getElementById("form");
        note.style.display = "block";
        return;
    };
    
    return(
        <div className="content-container">
            <NoteContextProvider>
                <div>
                    <FilterNotes />
                    <button onClick={showNote}>Create Note</button>
                    <NotesContainer />
                </div>
                <ContentArea  />
            </NoteContextProvider>
        </div>
    );
}




// Works

// function ContentContainer() {
//     const FETCH_URL = "the api";

//     // a local working copy of notes - temporary
//     const [notes, setNotes] = useState([
//         {
//             "id": "1",
//             "title": "Note 1",
//             "content": "The content of a note",
//             "tags": ["work", "school"]
//         },
//         {
//             "id": "2",
//             "title": "Note 2",
//             "content": "Organic marfa portland authentic direct trade semiotics fanny pack tumeric. Cardigan sustainable gochujang readymade. Selfies trust fund taiyaki bespoke meditation cloud bread keytar chicharrones aesthetic master cleanse asymmetrical twee.",
//             "tags": ["school"]
//         },
//         {
//             "id": "3",
//             "title": "Note 3",
//             "content": "I have to do my homework",
//             "tags": []
//         }
//     ]);

//     const fetchNotes = () => {
//         console.log("getting notes from:", FETCH_URL);
//     };

//     const updateNote = (note) => {
//         // temporary for local notes
//         let newNotes = null;
//         notes.filter((n, i) => {
//             if (n.id === note.id) {
//                 notes[i] = note;
//                 console.log("updating the note:");
//             }
//         });
        
//         // setNotes(newNotes);
//     };

//     // holds an array of notes that match the filter critera
//     const [filterResults, setFilterResults] = useState(notes);
//     // the criter to filter by
//     const [filterBy, setFilterBy] = useState({search: ""});
//     // is used to keep track of the note index that was clicked on to render its information in the content area
//     const [currentNoteIndex, setCurrentNoteIndex] = useState(null);


//     // Get notes on first page load
//     useEffect(() => {
//         fetchNotes();
//     }, []);

//     // is called whenever filterBy is changed
    // useEffect(() => {
    //     const results = notes.filter(value => 
    //         value.title.toLowerCase().includes(filterBy.search.toLowerCase()) || value.content.toLowerCase().includes(filterBy.search.toLowerCase())
    //     )
    //     setFilterResults(results);
    // }, [filterBy]);


//     return(
//         <div className="content-container">
//             <div>
//                 <FilterNotes filter={setFilterBy} />
//                 <NotesContainer notes={filterResults} updateNoteToDisplay={setCurrentNoteIndex} />
//             </div>
//             <ContentArea note={filterResults[currentNoteIndex]} updateNote={updateNote} />
//         </div>
//     );
// }

export default ContentContainer;