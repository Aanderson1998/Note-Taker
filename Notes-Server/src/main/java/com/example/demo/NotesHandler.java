package com.example.demo;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.BinaryOperator;
import java.util.function.Supplier;

import org.springframework.stereotype.Component;

import com.example.demo.model.Note;

@Component
public class NotesHandler {
	
	AtomicLong atomicLong = new AtomicLong();
	boolean firstTime = true;
	
	// Used to Search for Notes
	public List<Note> filterNotesByTag (List<Note> notes, List<String> tags) {
		for (int i = 0; i < tags.size(); i++) {
			String tag = tags.get(i);
			
			for (int j = 0; j < notes.size(); j++) {
				Note note = notes.get(j);
				
				if (!note.getTags().contains(tag)) {
					notes.remove(j);
					j--;
				}
			}
		}
		
		return notes;
	}
	
	// Used to Read Notes
	public Optional<Note> readNotes (List<Note> notes, long id) {
		//return notes.stream().filter(note -> note.getId() == id).findFirst();
		return notes.stream().filter(note -> note.getId() == id).reduce(toOnlyElement());
	}
	
	// Source: https://blog.codefx.org/java/stream-findfirst-findany-reduce/
	private <T> BinaryOperator<T> toOnlyElement() {
		return toOnlyElementThrowing(IllegalArgumentException::new);
	}
	
	// Source: https://blog.codefx.org/java/stream-findfirst-findany-reduce/
	private <T, E extends RuntimeException> BinaryOperator<T> toOnlyElementThrowing(Supplier <E> exception) {
		return (element, otherElement) -> {
			throw exception.get();
		};
	}
	
	// Used to Create Notes
	public Note createNote (List<Note> notes, String noteTitle, Optional<List<String>> tags) throws ParseException {
		if (firstTime) {
			firstTime = false;
			atomicLong.set(notes.size());
		}
		
		Note newNote = new Note();
		Date date = new Date();
		
		newNote.setId(atomicLong.getAndIncrement());
		newNote.setNoteTitle(noteTitle);
		newNote.setCreateDate(date);
		newNote.setModifyDate(date);
		
		if (tags.isPresent()) {
			newNote.setTags(tags.get());
		} else {
			List<String> noTags = new ArrayList<>();
			newNote.setTags(noTags);
		}
		
		newNote.setContents("");
		notes.add(newNote);
		
		return newNote;
	}
	
	// Used to Update Notes
	public Note updateNote (List <Note> notes, long id, Optional<String> noteTitle, Optional<String> contents, Optional<List<String>> tags) throws ParseException {
		Optional<Note> toChange = readNotes(notes, id);
		
		if (toChange.isPresent()) {
			if (noteTitle.isPresent()) {
				toChange.get().setNoteTitle(noteTitle.get());
			}
			
			if (contents.isPresent()) {
				toChange.get().setContents(contents.get());
			}
			
			if (tags.isPresent()) {
				toChange.get().setTags(tags.get());
			}
			
			toChange.get().setModifyDate(new Date());
			return toChange.get();
		}
		
		throw new NoSuchElementException("This Note doesn't exist.");
	}
	
	// Used to Delete Notes
	public void deleteNote (List <Note> notes, long id) {
		Optional<Note> toDelete = readNotes(notes, id);
		if (toDelete.isPresent()) {
			int position = notes.indexOf(toDelete.get());
			notes.remove(position);
			System.out.println("Deleted Note");
		} else {
			throw new NoSuchElementException("This Note doesn't exist.");
		}
	}
	
}
