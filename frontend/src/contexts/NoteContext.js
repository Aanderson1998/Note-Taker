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
        let temp = [
            {
                "id": "1",
                "title": "Note 1",
                "content": "#### Random gen\nHe turned in the research paper on Friday; otherwise, he would have not passed the class.",
                "tags": ["work", "school"]
            },
            {
                "id": "2",
                "title": "Note 2",
                "content": "Organic marfa portland authentic direct trade semiotics fanny pack tumeric. Cardigan sustainable gochujang readymade. Selfies trust fund taiyaki bespoke meditation cloud bread keytar chicharrones aesthetic master cleanse asymmetrical twee.",
                "tags": ["school"]
            },
            {
                "id": "3",
                "title": "Cat",
                "content": "##### Here is a cat\n![some cat](https://img.waterreporter.org/4140df8813a64373917f50b6fb04bd48_thumbnail.jpg)",
                "tags": []
            }
        ];
        // will be replaced with initial notes from server
        setNotes(temp);
        setFilterResults(temp);
    };

    // holds the notes that matched the filter
    const [filterResults, setFilterResults] = useState([]);

    // is called whenever filterBy is changed
    const filterNotes = (filter) => {
        const results = notes.filter(value => 
            value.title.toLowerCase().includes(filter.search.toLowerCase()) || value.content.toLowerCase().includes(filter.search.toLowerCase())
        )
        
        setFilterResults(results);
    }


    return(
        <NoteContext.Provider value={[note, setNote, filterNotes, filterResults]}>
            {props.children}
        </NoteContext.Provider>
    );
}

export {NoteContext, NoteContextProvider};