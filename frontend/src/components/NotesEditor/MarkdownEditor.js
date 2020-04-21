import React, {useContext} from 'react';
import { Form} from 'react-bootstrap';
import './MarkdownEditor.css';
import { NoteContext } from '../../contexts/NoteContext';

function MarkdownEditor() {
    const [note, setNote] = useContext(NoteContext);

    const handleContentOnChange = (e) => {
        setNote({
            id: note.id,
            title: note.title,
            content: e.target.value,
            tags: note.tags
        });
    };
    
    const handleTitleOnChange = (e) => {
        setNote({
            id: note.id,
            title: e.target.value,
            content: note.content,
            tags: note.tags
        });
    };

    return(
        <div className="markdown-editor">
            <Form.Group >
                <Form.Label>Edit</Form.Label>
                <Form.Control onChange={handleTitleOnChange} as="input" placeholder="text" value={note.title}></Form.Control>
                <Form.Control onChange={handleContentOnChange} as="textarea" placeholder="text" value={note.content}></Form.Control>
            </Form.Group>
        </div>
    );
}

export default MarkdownEditor;