/*
    The FilterNotes is responsible for filtering all notes by
    content, tags, and date
*/

import React, { useContext, useRef } from 'react';
import {Form} from 'react-bootstrap';
import './FilterNotes.css';
import { NoteContext } from '../../contexts/NoteContext';

function FilterNotes({filter}) {

    const [note, setNote, filterNotes] = useContext(NoteContext);

    // holds a reference to the checkbox for filtering
    const inputEl = useRef(null);

    const handleOnChange = (e) => {
        filterNotes({search: e.target.value, tags: inputEl.current.checked});
    };

    return(
        <Form className="filter-form">
            <Form.Group>
                <Form.Control onChange={handleOnChange} type="text" placeholder="Start typing to filter by content" />
                <Form.Check ref={inputEl} type="checkbox" label="Filter by tags" />
            </Form.Group>
        </Form>
    );
}

export default FilterNotes;