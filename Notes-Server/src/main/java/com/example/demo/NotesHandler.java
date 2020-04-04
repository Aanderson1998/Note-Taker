package com.example.demo;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.example.demo.model.Note;

public class NotesHandler {
	
	AtomicLong atomicLong = new AtomicLong();
	boolean firstTime = true;
	NotesLoader notesLoader = new NotesLoader();
	
	// Used to Search for Notes
	public List<Note> filterNotesByTag (List<Note> notes, List<String> tags) {
		List<Note> filteredNotes = new ArrayList<>();
		Collections.copy(filteredNotes, notes); // Get a temporary list to remove elements from
		
		for (int i = 0; i < tags.size(); i++) {
			String tag = tags.get(i);
			
			for (int j = 0; j < filteredNotes.size(); j++) {
				Note note = filteredNotes.get(j);
				
				if (!note.getTags().contains(tag)) {
					filteredNotes.remove(j);
					j--;
				}
			}
		}
		
		return filteredNotes;
	}
	
	// Used to Read Notes
	public Note readNotes (List<Note> notes, long id) {
		Stream<Note> records = notes.stream();
		Note toRead = (Note) records.filter(note -> matchesID(note, id)).findFirst().get();
		return toRead;
	}
	
	private boolean matchesID (Note note, long id) {
		return note.getId() == id;
	}
	
	// Used to Create Notes
	public Note createNote (List<Note> notes, String noteTitle, Date created, List<String> tags) throws ParseException {
		if (firstTime) {
			firstTime = false;
			atomicLong.set(notes.size());
		}
		
		Note newNote = new Note();
		newNote.setId(atomicLong.getAndIncrement());
		newNote.setNoteTitle(noteTitle);
		newNote.setCreateDate(created);
		newNote.setModifyDate(created);
		newNote.setTags(tags);
		newNote.setContents("");
		notes.add(newNote);
		// notesLoader.appendNote(newNote);
		
		return newNote;
	}
	
	// Used to Update Notes
	public Note updateNote (List <Note> notes, long id, Date modified, Optional<String> noteTitle, Optional<String> contents, Optional<List<String>> tags) throws ParseException {
		Note toChange = readNotes(notes, id);
		if (noteTitle.isPresent()) {
			toChange.setNoteTitle(noteTitle.get());
		}
		
		if (contents.isPresent()) {
			toChange.setContents(contents.get());
		}
		
		if (tags.isPresent()) {
			toChange.setTags(tags.get());
		}
		
		toChange.setModifyDate(modified);
		
		return toChange;
	}
	
	// Used to Delete Notes
	public void deleteNote (List <Note> notes, long id) {
		Note toDelete = readNotes(notes, id);
		int position = notes.indexOf(toDelete);
		notes.remove(position);
		
		
	}
	
}
