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
    const {v4: uuidv4} = require('uuid');
    var id = uuidv4();
    console.log(id);
    //creating jsonData to send to request
    let data = {"id": id, 
        "noteTitle": title,
        "tags": tagsList,
        "contents": content};
    console.log(data);
    //setting request url
    let url = 'http://localhost:8080/create';
    //doing fetch request to create new note in server
    fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    }).then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            });
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
                <h1>New Note</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <h4>Title:</h4>
                        <input
                            className="title"
                            type="text"
                            {...bindTitle}
                            placeholder="Title"
                            />
                    </label>
                    <label>
                        <h4>Content:</h4>
                        <textarea
                            className="content"
                            rows="8"
                            cols="30"
                            type="text"
                            {...bindContent}
                            />
                    </label>
                    <label>
                        <h4>Tags (seperate tags by commas):</h4>
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

