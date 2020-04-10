/*
    The FilterNotes is responsible for filtering all notes by
    content, tags, and date
*/

import React from 'react';
import './FilterNotes.css'

function FilterNotes({filter}) {

    const handleOnChange = (e) => {
        const t = {
            search: e.target.value
        };
        filter({
            search: e.target.value
        });
    };

    return(
        <div className="filter-notes">
            <input type="text" placeholder="Start typing to filter by content" onChange={handleOnChange} />
        </div>
    );
}

export default FilterNotes;