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
    const [note, setNote, filterNotes, filterResults, fetchNotes] = useContext(NoteContext);

    const [title, setTitle] = useState("");

    const saveNote = () => {
        // call api to update current note and hide the update button
        console.log("save the current working note in the context");
        let data = {"noteTitle": note.title,
            "tags": note.tags,
            "contents": note.content
        };
        console.log(data);
        //setting request url
        let url = 'http://3.16.13.233:8080/update/' + note.id;
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
                    alert("note has been saved");
                    console.log(data);
                    // updates the local copy of notes
                    fetchNotes();
                    return data;
                });
    };
    
    const deleteNote = () => {
        let deleteAlert = document.getElementById("deleteModal");
        deleteAlert.style.display = "block";
        let children = deleteAlert.childNodes;
        
        let okBtn = children[1];
        let closeBtn = children[2];
        
        okBtn.onclick = () => {
            console.log("removing note " + note.id);
            let url = 'http://3.16.13.233:8080/delete/' + note.id;
            console.log("url: " + url);
            fetch(url, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(handleDeleteErrors)
                    .then(data => {
                        console.log(data);
                        fetchNotes();
                        return data;
                    });
            deleteAlert.style.display = "none";
        };
        
        closeBtn.onclick = () => {
            console.log("closing function");
            deleteAlert.style.display = "none";
        };
    };
    
    const addTag = () => {
        console.log("in tag function");
        let tagModal = document.getElementById("tagModal");
        console.log(tagModal);
        tagModal.style.display = "block";
        let children = tagModal.childNodes;

        let addBtn = children[2];
        let closeBtn = children[3];
        
        addBtn.onclick = () => {
            let tag = children[1].value;
            console.log('adding tag:', tag);
            let newTags = note.tags;
            newTags.push(tag);
            
            note.tags = newTags;

            let temp = {
                id: note.id,
                title: note.title,
                content: note.content,
                tags: newTags
            };
            setNote(temp);
            children[1].value = "";
            children[1].value = "";
            tagModal.style.display = "none";
        };
        
        closeBtn.onclick = () => {
            console.log("closing function");
            children[1].value = "";
            tagModal.style.display = "none";
        };
    };

    const removeTag = (tag) => {
        console.log('remove tag:', tag);
        let newTags = note.tags.filter(t => t !== tag);
        note.tags = newTags;

        let temp = {
            id: note.id,
            title: note.title,
            content: note.content,
            tags: newTags
        };
        setNote(temp);
    };

    return(note !== undefined ? (
            <div className="content-area">
                <div className="update-title">
                    <input type="text" value={note.title} disabled={true} />
                    <i onClick={editTitle} className="material-icons">edit</i>
                </div>
                
                {/* <h2>{note.title} <i className="material-icons update-title">edit</i></h2> */}
                <MarkdownViewer />
                <MarkdownEditor />
                <div className="tags-container">
                    <p>Tags: </p>
                    {note.tags.map((tag, index) => (
                            <span className="tags" key={index}>{tag} <i onClick={() => removeTag(tag)} className="material-icons delete-tag-btn">clear</i></span>
                        ))}
                </div>

                {/* update and delete buttons */}
                <div className="buttons">
                    <button onClick={addTag} className="btn-tag">Add Tag</button>
                    <button onClick={saveNote} className="btn-save">Save</button>
                    <button className="btn-delete" onClick={deleteNote}>delete</button>
                </div>
            </div>
            ) : <p className="no-note">No note currently selected</p>);
}

export default ContentArea;