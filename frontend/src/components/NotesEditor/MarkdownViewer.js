import React, { useState, useContext } from 'react';
import marked from 'marked';
import './MarkdownViewer.css'
import { NoteContext } from '../../contexts/NoteContext';

function MarkdownViewer() {
    const [note] = useContext(NoteContext);

    const parseMarkdown = () => {
        return {__html: marked.parse(note.content)};
    }
    return(
        <div dangerouslySetInnerHTML={parseMarkdown()}></div>
    );
}

export default MarkdownViewer;