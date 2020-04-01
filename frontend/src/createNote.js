/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from "react";
import "./createNoteStyle.css";

//hook created to handle resetting values to empty after submission of note
import { useInput } from "./inputHook";


//function that takes input and sends it to server 
function makeRequest(title, content, tags) {
    console.log(title);
    console.log(content);
    console.log(tags);
    //parse tags string by , and put values into an array
    tags = tags.split(" ").join("");
    let tagsList = tags.split(",");
    console.log(tagsList);
    //create unique id
    //make request 
}

export default function NoteForm() {
    //initializing title, content, and tag values
    const {value: Title, bind: bindTitle, reset: resetTitle} = useInput("");
    const {value: Content, bind: bindContent, reset: resetContent} = useInput("");
    const {value: Tags, bind: bindTags, reset: resetTags} = useInput("");

    const handleClose = evt => {
        evt.preventDefault();
        resetTitle();
        resetContent();
        resetTags();
        document.getElementById("form").style.display = "none";
        return;
    }

    //event handler for onsubmit 
    const handleSubmit = evt => {
        evt.preventDefault();
        //checking to see if title was entered
        if (Title === "") {
            alert(`Error: note needs a title`);
            return;
        }
        //checking to see if content was entered
        else if (Content === "") {
            alert(`Error: note needs content`);
            return;
        }
        //sending note to function that will handle request
        else {
            alert(`Submitting Note: ${Title}`);
            makeRequest(Title, Content, Tags);
        }
        //resetting content in input boxes
        resetTitle();
        resetContent();
        resetTags();
        document.getElementById("form").style.display = "none";
    };


    //returning note form
    return (
            <div id="form">
                <h1> Create New Note</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Title:</span>
                        <input
                            className="title"
                            type="text"
                            {...bindTitle}
                            placeholder="Title"
                            />
                    </label>
                    <label>
                        <span>Content:</span>
                        <textarea
                            className="content"
                            rows="20"
                            cols="30"
                            type="text"
                            {...bindContent}
                            />
                    </label>
                    <label>
                        <span>Tags (seperate tags by commas):</span>
                        <input
                            className="tags"
                            type="text"
                            {...bindTags}
                            placeholder="Add tags"
                            />
                    </label>
                    <input type="submit" value="Submit" />
                    <button id="close" onClick={handleClose}>&times;</button>
                </form>
            </div>
            );
}

