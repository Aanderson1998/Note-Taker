import React from 'react';
import NoteForm from './createNote';
import {Navbar} from 'react-bootstrap';
import ContentContainer from './components/ContentContainer';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


export default function App() {
    
    const showNote = () => {
        var note = document.getElementById("form");
        note.style.display = "block";
        return;
    }

        return(
            <div id="app">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Note Taker++</Navbar.Brand>
                </Navbar>
                <ContentContainer />
                <button onClick={showNote}>Create Note</button>
            </div>
            );
    }
    ;



