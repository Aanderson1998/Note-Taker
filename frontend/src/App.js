import React from 'react';
import './App.css';
import NoteForm from './createNote';
import Navbar from './components/Navbar';
import ContentContainer from './components/ContentContainer';

export default function App() {
    
    const showNote = () => {
        var note = document.getElementById("form");
        note.style.display = "block";
        return;
    }

        return(
                <div id="app">
                    <Navbar />
                    <ContentContainer />
                    <button onClick={showNote}>Create Note</button>
                </div>
                );
    }
    ;



