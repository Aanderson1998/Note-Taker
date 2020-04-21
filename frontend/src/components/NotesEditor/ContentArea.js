/*
 This component is responsible for rendering the contents of a specific note
 and allow editing in markdown. It will also allow for deletion of the note or
 tags.
 */

import React, { useState, useContext, useRef, useEffect } from 'react';
import MarkdownViewer from './MarkdownViewer';
import MarkdownEditor from './MarkdownEditor';
import './ContentArea.css';
import { NoteContext } from '../../contexts/NoteContext';

function handleUpdateErrors(response) {
    if (!response.ok) {
        console.log("error calling api");
        alertify.error('Note could not be updated');
    }
    return response;
};
    
function handleDeleteErrors(response) {
    if (!response.ok) {
        console.log("error calling api");
        alertify.error('Note could not be deleted');
    }
    return response;
};
    
    
function ContentArea() {
    const [note, setNote, filterNotes, filterResults, fetchNotes] = useContext(NoteContext);
    const [noteSaving, setNoteSaving] = useState(false);

    const contentAreaRef = useRef(null);

    // update the content area height
    // helps for mobile so nothing gets cut off
    useEffect(() => {
        if (contentAreaRef.current !== null) {
            let height = window.innerHeight + "px";
            contentAreaRef.current.style.height = height;
        }
        
    }, [note]);

    const saveNote = () => {
        // call api to update current note and hide the update button
        setNoteSaving(true);
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
                    alertify.success("Note has been saved");
                    console.log(data);
                    // updates the local copy of notes
                    fetchNotes();
                    return data;
                }).finally(() => {setNoteSaving(false)});
    };
    
    const deleteNote = () => {
        let deleteAlert = document.getElementById("deleteModal");
        deleteAlert.style.display = "block";
        
        let body = document.getElementById("app");
        body.style.pointerEvents="none";
        deleteAlert.style.pointerEvents = "all";
           
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
            body.style.pointerEvents="all";
            deleteAlert.style.display = "none";
            fetchNotes();
        };
        
        closeBtn.onclick = () => {
            console.log("closing function");
            body.style.pointerEvents="all";
            deleteAlert.style.display = "none";
        };
    };
    
    const addTag = () => {
        console.log("in tag function");
        let tagModal = document.getElementById("tagModal");
        console.log(tagModal);
        tagModal.style.display = "block";
        
        let body = document.getElementById("app");
        body.style.pointerEvents="none";
        tagModal.style.pointerEvents = "all";
        
        let children = tagModal.childNodes;
        let addBtn = children[2];
        let closeBtn = children[3];
        
        addBtn.onclick = () => {
            let tag = children[1].value;
            tag = tag.trim();
            console.log('adding tag:', tag);
            let newTags = note.tags;
            console.log(newTags);
            if(newTags.indexOf(tag) === -1) {
                newTags.push(tag);
            }
            
            note.tags = newTags;

            let temp = {
                id: note.id,
                title: note.title,
                content: note.content,
                tags: newTags
            };
            setNote(temp);
            children[1].value = "";
            body.style.pointerEvents="all";
            tagModal.style.display = "none";
        };
        
        closeBtn.onclick = () => {
            console.log("closing function");
            children[1].value = "";
            body.style.pointerEvents="all";
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
            <div ref={contentAreaRef} className="content-area">
                <h2>{note.title}</h2>
                <MarkdownViewer />
                <MarkdownEditor saveNote={saveNote} />
                <div className="tags-container">
                    <p>Tags: </p>
                    {note.tags.map((tag, index) => (
                            <span className="tags" key={index}>{tag} <i onClick={() => removeTag(tag)} className="material-icons delete-tag-btn">clear</i></span>
                        ))}
                </div>

                {/* update and delete buttons */}
                <div className="buttons">
                    <button onClick={addTag} className="btn-tag">Add Tag</button>
                    {noteSaving ? (
                        <button onClick={saveNote} className="btn-save" disabled={noteSaving}>Saving...</button>
                    ) : (
                        <button onClick={saveNote} className="btn-save" disabled={noteSaving}>Save</button>
                    )}
                    
                    <button className="btn-delete" onClick={deleteNote}>delete</button>
                </div>
            </div>
            ) : <p className="no-note">No note currently selected</p>);
}

export default ContentArea;
