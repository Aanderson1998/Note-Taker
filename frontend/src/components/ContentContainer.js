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
import SideNavbar from './NotesPanel/SideNavbar';
import AddTagsForm from './NotesEditor/addTags';
import './ContentContainer.css';

function ContentContainer() {
    
    return(
        <div className="content-container">
            <NoteContextProvider>
                <div>
                    <SideNavbar />               
                    <NoteForm/>
                    <DeleteForm/>
                    <AddTagsForm/>
                </div>
                <ContentArea  />
            </NoteContextProvider>
        </div>
    );
}
export default ContentContainer;
