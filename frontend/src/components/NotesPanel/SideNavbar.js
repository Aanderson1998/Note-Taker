import React, { useState, useRef } from 'react';
import {Modal, Button} from 'react-bootstrap';
import FilterNotes from './FilterNotes';
import NotesContainer from './NotesContainer';
import './SideNavbar.css';

function SideNavbar() {
    // keeps track when to show or hide the help modal
    const [showHelpModal, setShowHelpModal] = useState(false);

    const sidebarRef = useRef(null);
    const sidebarNavRef = useRef(null);

    const [hideSidebar, setHideSidebar] = useState(false);

    const showNote = () => {
        var note = document.getElementById("form");
        note.style.display = "block";
        return;
    };

    const handleHelpWindow = () => {
        setShowHelpModal(!showHelpModal);
    };

    const toggleSidebar = () => {
        console.log('toggle navbar');
        const mobileBtn = document.getElementById("menuBtn");

        if (window.getComputedStyle(mobileBtn).display === "none"){
            console.log("mobile menu btn hidden");
            return;
        } else {
            console.log("mobile menu btn not hidden", mobileBtn.style.display);
        }

        // console.log(sidebarRef.current.classList);
        if (!hideSidebar) {
            sidebarNavRef.current.classList.add('sidebar-nav-hide');
            setHideSidebar(true);
            sidebarRef.current.style.position = "absolute";
            sidebarRef.current.style.visibility = "hidden";
            setTimeout(() => {
                
            }, 500);
        } else {
            setHideSidebar(false);
            sidebarRef.current.style.position = "relative";
            sidebarRef.current.style.visibility = "visible";
            sidebarNavRef.current.classList.remove('sidebar-nav-hide');
        }
    }

    return(
        <div>
            <i onClick={toggleSidebar} id="menuBtn" className="material-icons">menu</i>
            <div ref={sidebarRef} className="sidebar">
                <div ref={sidebarNavRef} className="sidebar-nav">
                    <h1>Notes Taker++</h1>
                    
                    <FilterNotes />
                    <div className="nav-buttons">
                        <button onClick={showNote}>Create Note</button>
                        <button onClick={handleHelpWindow}>Help</button>
                        
                        {/* Help button Modal */}
                        <Modal show={showHelpModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>How to use Notes Taker++</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul>
                                    <li>To create a note, click <strong>create note</strong> fillout the form</li>
                                    <li>The content of a note should be entered in Markdown. <a target="_blank" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">Here is a helpful Markdown Cheatsheet</a></li>
                                    <li>To search for a note by content, simply start typing in the search field. To search by tags, check the
                                        <strong> filter by tags</strong> box and continue typing
                                    </li>
                                    <li>Notes can be viewed by clicking on them in the left pane</li>
                                </ul>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleHelpWindow}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <NotesContainer toggleSidebar={toggleSidebar} />
                </div>
            </div>
        </div>
    );
}

export default SideNavbar;