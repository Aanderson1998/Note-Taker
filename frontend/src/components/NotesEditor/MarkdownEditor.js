import React, {useState, useContext} from 'react';
import { Form} from 'react-bootstrap';
import './MarkdownEditor.css';
import { NoteContext } from '../../contexts/NoteContext';

function MarkdownEditor() {
    const [note, setNote] = useContext(NoteContext);

    const handleOnChange = (e) => {
        setNote({
            id: note.id,
            title: note.title,
            content: e.target.value,
            tags: note.tags
        });
    }

    return(
        <div className="markdown-editor">
            <Form.Group >
                <Form.Label>Edit</Form.Label>
                <Form.Control onChange={handleOnChange} as="textarea" placeholder="text" value={note.content}></Form.Control>
            </Form.Group>
        </div>
    );
}

export default MarkdownEditor;