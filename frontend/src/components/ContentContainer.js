/*
    The ContentContainer is in charge of containing all of the
    notes and note editing area in a responsive way.
*/
import React, { useState, useEffect } from 'react';
import FilterNotes from './NotesPanel/FilterNotes';
import NotesContainer from './NotesPanel/NotesContainer';
import ContentArea from './NotesEditor/ContentArea';
import {NoteContextProvider} from '../contexts/NoteContext';
import NoteForm from '../components/NotesCreator/createNote';
import DeleteForm from '../components/NotesRemover/deleteNote';
import './ContentContainer.css';

function ContentContainer() {
    
    const showNote = () => {
        var note = document.getElementById("form");
        note.style.display = "block";
        return;
    };
    
    return(
        <div className="content-container">
            <NoteContextProvider>
                <div>
                    <FilterNotes />
                    <button onClick={showNote}>Create Note</button>
                    <NotesContainer />
                    <NoteForm/>
                    <DeleteForm/>
                </div>
                <ContentArea  />
            </NoteContextProvider>
        </div>
    );
}
export default ContentContainer;