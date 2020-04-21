/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {useContext} from "react";
import { NoteContext } from '../../contexts/NoteContext';
import './addTags.css';


function AddTagsForm() {
    return (
            <div id="tagModal">
                <h4 id="header">Add Tag:</h4>
                <input
                    className="tag"
                    type="text"
                    placeholder="New Tag"
                    />
                <button id="add">add</button>
                <button id="close">&times;</button>
            </div>
            );
}



export default AddTagsForm;

