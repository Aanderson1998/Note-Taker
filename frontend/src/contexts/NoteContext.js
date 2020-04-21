import React, { useState, useEffect } from 'react';

const NoteContext = React.createContext([{}, () => {}]);

const NoteContextProvider = (props) => {
    // holds the current note that is selected
    const [note, setNote] = useState();
    // holds all of the notes
    const [notes, setNotes] = useState([]);
    
    // is called only once on initial page load
    useEffect(() => {
        fetchNotes();
    }, []);
    

    const fetchNotes = () => {
        console.log('fetch notes');
        fetch('http://3.16.13.233:8080/get_all')
        .then(res => res.json())
        .then(data => {
            setNotes(data);
            setFilterResults(data);
        })
        .catch(err => {
            // unable to get notes
            throw err;
        });
    };

    // holds the notes that matched the filter
    const [filterResults, setFilterResults] = useState([]);

    // is called whenever filterBy is changed
    const filterNotes = (filter) => {
        let results = [];
        // check each tag for a match
        if (filter.tags) {
            for (let i = 0; i < notes.length; i++) {
                let note = notes[i];
                for (let j = 0; j < notes[i].tags.length; j++) {
                    if (note.tags[j].toLowerCase().includes(filter.search.toLowerCase())) {
                        results.push(note);
                    }
                }
            }
        } else {
            // check the note title and contents for a match
            results = notes.filter(value => 
                value.noteTitle.toLowerCase().includes(filter.search.toLowerCase()) || 
                value.contents.toLowerCase().includes(filter.search.toLowerCase())
            );
        }
        setFilterResults(results);
    };


    return(
        <NoteContext.Provider value={[note, setNote, filterNotes, filterResults, fetchNotes, notes]}>
            {props.children}
        </NoteContext.Provider>
    );
};

export {NoteContext, NoteContextProvider};