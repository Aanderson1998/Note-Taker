/*
    The FilterNotes is responsible for filtering all notes by
    content, tags, and date
*/

import React, { useContext } from 'react';
import {Form} from 'react-bootstrap';
import './FilterNotes.css';
import { NoteContext } from '../../contexts/NoteContext';

function FilterNotes({filter}) {

    const [note, setNote, filterNotes] = useContext(NoteContext);

    const handleOnChange = (e) => {
        // const t = {
        //     search: e.target.value
        // };
        // filter({
        //     search: e.target.value
        // });
        filterNotes({search: e.target.value});
    };

    return(
        <Form>
            <Form.Group>
                <Form.Control onChange={handleOnChange} type="text" placeholder="Start typing to filter by content" />
            </Form.Group>
            {/* TODO: add filter by tags and dates */}
        </Form>
    );
}

export default FilterNotes;