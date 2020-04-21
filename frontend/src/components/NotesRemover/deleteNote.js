/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from "react";
import "./deleteNote.css";




 function DeleteForm() {
    return (
            <div id="deleteModal">
            <h3 id="msg">Are you sure you want to delete this note?</h3>
            <button id="submit">yes</button>
            <button id="close">&times;</button>
            </div>
            );
}



export default DeleteForm;

