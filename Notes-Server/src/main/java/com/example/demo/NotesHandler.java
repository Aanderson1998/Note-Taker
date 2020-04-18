package com.example.demo;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.function.BinaryOperator;
import java.util.function.Supplier;

import org.springframework.stereotype.Component;

import com.example.demo.model.Note;

@Component
public class NotesHandler {
	
	// Used to Search for Notes
	public List<Note> filterNotesByTag (List<Note> notes, List<String> tags) {
		List<Note> filteredNotes = new ArrayList<>();
		filteredNotes.addAll(notes);
		
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
	public Optional<Note> readNotes (List<Note> notes, String id) {
		//return notes.stream().filter(note -> note.getId() == id).findFirst();
		return notes.stream().filter(note -> note.getId().equals(id)).reduce(toOnlyElement());
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
	public Note createNote (List<Note> notes, String id, String noteTitle, List<String> tags, String contents) throws ParseException {
		Note newNote = new Note();
		Date date = new Date();
		
		newNote.setId(id);
		newNote.setNoteTitle(noteTitle);
		newNote.setCreateDate(date);
		newNote.setModifyDate(date);
		newNote.setTags(tags);
		newNote.setContents(contents);
		
		notes.add(newNote);
		
		return newNote;
	}
	
	// Used to Update Notes
	public Note updateNote (List <Note> notes, String id, String noteTitle, String contents, List<String> tags) throws ParseException {
		Optional<Note> toChange = readNotes(notes, id);
		
		if (toChange.isPresent()) {
			toChange.get().setNoteTitle(noteTitle);
			toChange.get().setContents(contents);
			toChange.get().setTags(tags);
			toChange.get().setModifyDate(new Date());
			return toChange.get();
		} else {
			throw new NoSuchElementException("This Note doesn't exist.");
		}
	}
	
	// Used to Delete Notes
	public void deleteNote (List <Note> notes, String id) {
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
