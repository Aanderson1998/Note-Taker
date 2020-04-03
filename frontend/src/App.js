import React from 'react';
import './App.css';
import NoteForm from './createNote';

export default function App() {
    
    const showNote = () => {
        var note = document.getElementById("form");
        note.style.display = "block";
        return;
    }

        return(
                <div id="app">
                    <h1>React is Working</h1>
                    <button onClick={showNote}>Create Note</button>
                </div>
                );
    }
    ;



