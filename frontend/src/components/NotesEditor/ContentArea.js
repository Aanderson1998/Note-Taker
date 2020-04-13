/*
 This component is responsible for rendering the contents of a specific note
 and allow editing in markdown. It will also allow for deletion of the note or
 tags.
 */

import React, { useState, useEffect, useContext } from 'react';
import MarkdownViewer from './MarkdownViewer';
import MarkdownEditor from './MarkdownEditor';
import './ContentArea.css';
import { NoteContext } from '../../contexts/NoteContext';

function handleUpdateErrors(response) {
        if (!response.ok) {
            console.log("error calling api");
            alert("note could not be updated");
        }
        return response;
    };
    
    function handleDeleteErrors(response) {
        if (!response.ok) {
            console.log("error calling api");
            alert("note could not be deleted");
        }
        return response;
    };
    
    
function ContentArea() {
    const [note] = useContext(NoteContext);

    const saveNote = () => {
        // call api to update current note and hide the update button
        console.log("save the current working note in the context");
        let data = {"noteTitle": note.title,
            "tags": note.tags,
            "contents": note.content
        };
        console.log(data);
        //setting request url
        let url = 'http://localhost:8080/update/' + note.id;
        console.log("url: " + url);
        fetch(url, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }).then(handleUpdateErrors)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    return data;
                });
        alert("note has been saved");
    };
    
    const deleteNote = () => {
        let deleteAlert = document.getElementById("deleteModal");
        deleteAlert.style.display = "block";
        let children = deleteAlert.childNodes;
        
        let okBtn = children[1];
        let closeBtn = children[2];
        
        okBtn.onclick = () => {
            console.log("removing note " + note.id);
            let url = 'http://localhost:8080/delete/' + note.id;
            console.log("url: " + url);
            fetch(url, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(handleDeleteErrors)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        return data;
                    });
            deleteAlert.style.display = "none";
            alert("note has been deleted");
        };
        
        closeBtn.onclick = () => {
            console.log("closing function");
            deleteAlert.style.display = "none";
        };
    };

    // Only shows the button if a change was made
    // let saveButton = "";
    // if (wasChangeMade) {
    //     saveButton = <button onClick={saveNote} className="btn-save">Save</button>
    // }
    
    return(note !== undefined ? (
            <div className="content-area">
                <h2>{note.title}</h2>
                <MarkdownViewer />
                <button className="btn-delete" onClick={deleteNote}>delete</button>
                <MarkdownEditor />
                <div className="tags-container">
                    <p>Tags: </p>
                    {note.tags.map((tag, index) => (
                                        <span className="tags" key={index}>{tag}</span>
                                            ))}
            
                </div>
                <button onClick={saveNote} className="btn-save">Save</button>
            </div>
            ) : <p className="no-note">No note currently selected</p>);

    return(
            <div className="content-area">
                <h2>{note.title}</h2>
                <MarkdownViewer />
                <button className="btn-delete" onClick="{deleteNote}">delete</button>
                <MarkdownEditor />
                <div className="tags-container">
                    <p>Tags: </p>
                    {note.tags.map((tag, index) => (
                                        <span className="tags" key={index}>{tag}</span>
                                            ))}
            
                </div>
                <button onClick={saveNote} className="btn-save">Save</button>
            </div>
            );


}

export default ContentArea;