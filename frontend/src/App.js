import React from 'react';
import {Navbar} from 'react-bootstrap';
import ContentContainer from './components/ContentContainer';
import NoteForm from './components/NotesCreator/createNote';
import DeleteForm from './components/NotesRemover/deleteNote';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


export default function App() {
    return(
            <div id="app">
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand>Note Taker++</Navbar.Brand>
                </Navbar>
                <ContentContainer />
                <NoteForm/>
                <DeleteForm/>
            </div>
            );
}
;



