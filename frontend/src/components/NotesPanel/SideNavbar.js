import React, { useState, useRef, useEffect } from 'react';
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

    useEffect(() => {
        updateHeight();

        window.addEventListener('resize', () => {
            // make sure the sidebar is open
            if (window.innerWidth > 750) {
                setHideSidebar(false);
                sidebarRef.current.style.position = "relative";
                sidebarRef.current.style.visibility = "visible";
                sidebarNavRef.current.classList.remove('sidebar-nav-hide');
            }
            updateHeight();
        });
    }, []);

    const updateHeight = () => {
        let height = window.innerHeight + "px";
        sidebarNavRef.current.style.height = height;

        let contentArea = document.getElementsByClassName('content-area');
        if (contentArea[0] !== undefined) {
            contentArea[0].style.height = height;
            
        }
    };

    const showNote = () => {
        let note = document.getElementById("form");
        note.style.display = "block";
        let body = document.getElementById("app");
        body.style.pointerEvents="none";
        note.style.pointerEvents = "all";
        return;
    };

    const toggleSidebar = () => {
        // only allow the sidebar to close on mobile whena note is clicked
        if (window.innerWidth > 750) return;

        // hides and shows the sidebar when the mobile button is clicked
        if (!hideSidebar) {
            sidebarNavRef.current.classList.add('sidebar-nav-hide');
            setHideSidebar(true);
            sidebarRef.current.style.position = "absolute";
            sidebarRef.current.style.visibility = "hidden";
            
            let mobileBtn = document.getElementById('menuBtn');
            mobileBtn.style.color = "rgb(49, 49, 49)";
        } else {
            setHideSidebar(false);
            sidebarRef.current.style.position = "relative";
            sidebarRef.current.style.visibility = "visible";
            sidebarNavRef.current.classList.remove('sidebar-nav-hide');

            let mobileBtn = document.getElementById('menuBtn');
            mobileBtn.style.color = "rgb(238, 238, 238)";
        }
    };

    return(
        <div className="sidebar-container">
            <i onClick={toggleSidebar} id="menuBtn" className="material-icons">menu</i>
            <div ref={sidebarRef} className="sidebar">
                <div ref={sidebarNavRef} className="sidebar-nav">
                    <h1>Notes Taker++</h1>
                    
                    <FilterNotes />
                    <div className="nav-buttons">
                        <button onClick={showNote}>Create Note</button>
                        <button onClick={() => setShowHelpModal(true)}>Help</button>
                        
                        {/* Help button Modal */}
                        <Modal show={showHelpModal} onHide={() => setShowHelpModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>How to use Notes Taker++</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul>
                                    <li>To create a note, click <strong>create note</strong> fillout the form</li>
                                    <li>The content of a note should be entered in Markdown. <a target="_blank" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">Here is a helpful Markdown Cheatsheet</a></li>
                                    <li>To <strong>search</strong> for a note by content, simply start typing in the search field. To search by tags, check the
                                        <strong> filter by tags</strong> box and continue typing
                                    </li>
                                    <li>Notes can be <strong>viewed</strong> by clicking on them in the left pane</li>
                                    <li>Changes made to a note is <strong>only</strong> saved once the <strong>save</strong> button is clicked</li>
                                    <li>To delete a note, simply press the <strong>delete</strong> button when viewing a note</li>
                                </ul>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => setShowHelpModal(false)}>Close</Button>
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