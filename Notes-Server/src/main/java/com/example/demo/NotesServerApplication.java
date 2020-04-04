package com.example.demo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.BinaryOperator;
import java.util.function.Supplier;
import java.util.stream.Stream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.example.demo.model.Note;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@SpringBootApplication
@ComponentScan(basePackageClasses = {Note.class})
public class NotesServerApplication {
	static final String filename = "notes.json";
	static List<Note> notes;
	static boolean firstTime = true;
	static AtomicLong atomicLong = new AtomicLong();
	
	
	public static void main(String[] args) throws ParseException {
		try {
			ObjectMapper mapper = new ObjectMapper();
			InputStream input = new FileInputStream(new File(filename));
			TypeReference<List<Note>> typeReference = new TypeReference<List<Note>>() {};
			notes = mapper.readValue(input, typeReference);
			/*
			for (Note p : notes) {
				System.out.println(p.toString());
			}
			*/
			List<String> tags = new ArrayList<>();
			tags.add("test");
			tags.add("helloworld");
			//Note note = createNote(notes, "CIS-4360 TEST AGAIN", new Date(), new Date(), tags);
			
			/*
			List<String> filters = new ArrayList<>();
			filters.add("helloworld");
			List<Note> filteredNotes = filterNotesByTag(notes, filters);
			for (Note p : filteredNotes) {
				System.out.println(p.toString());
			}
			*/
			
			/*
			Optional<Note> obtained = readNotes(notes, 1);
			if (obtained.isPresent()) {
				System.out.println(obtained.get().toString());
			} else {
				System.out.println("Nothing was found");
			}
			*/
			
			/*
			Note note = updateNote(notes, (long) 2, Optional.of("CIS-4360 TEST AGAIN NO MORE PLS"), Optional.empty(), Optional.empty());
			System.out.println(note.toString());
			
			note = updateNote(notes, (long) 2, Optional.empty(), Optional.of("This is some pretty cool stuff right here."), Optional.empty());
			System.out.println(note.toString());
			
			note = updateNote(notes, (long) 2, Optional.empty(), Optional.empty(), Optional.of(tags));
			System.out.println(note.toString());
			
			tags.remove(1);
			tags.add("Spaghetti!"); // Yes, I am aware this will affect the previous note as well. It's just funny lol
			note = updateNote(notes, (long) 4, Optional.of("Arnold Schwarzenegger"), Optional.of("I'll be back"), Optional.of(tags));
			System.out.println(note.toString());
			*/
			
			/*
			deleteNote(notes, 3);
			
			for (Note p : notes) {
				System.out.println(p.toString());
			}
			*/
			
			mapper.enable(SerializationFeature.INDENT_OUTPUT);
			mapper.writeValue(new File(filename), notes);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		//SpringApplication.run(NotesServerApplication.class, args);
	}
	
	public static Note createNote (List<Note> notes, String noteTitle, Date created, Date modified, List<String> tags) throws ParseException {
		if (firstTime) {
			firstTime = false;
			atomicLong.set(notes.size());
		}
		
		Note newNote = new Note();
		newNote.setId(atomicLong.getAndIncrement());
		newNote.setNoteTitle(noteTitle);
		newNote.setCreateDate(created);
		newNote.setModifyDate(modified);
		newNote.setTags(tags);
		newNote.setContents("");
		notes.add(newNote);
		// notesLoader.appendNote(newNote);
		
		return newNote;
	}
	
	public static List<Note> filterNotesByTag (List<Note> notes, List<String> tags) {
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

	public static Optional<Note> readNotes (List<Note> notes, long id) {
		return notes.stream().filter(note -> note.getId() == id).reduce(toOnlyElement());
	}
	
	// Source: https://blog.codefx.org/java/stream-findfirst-findany-reduce/
	public static <T> BinaryOperator<T> toOnlyElement() {
		return toOnlyElementThrowing(IllegalArgumentException::new);
	}
	
	// Source: https://blog.codefx.org/java/stream-findfirst-findany-reduce/
	public static <T, E extends RuntimeException> BinaryOperator<T> toOnlyElementThrowing(Supplier <E> exception) {
		return (element, otherElement) -> {
			throw exception.get();
		};
	}
	
	public static Note updateNote (List <Note> notes, long id, Optional<String> noteTitle, Optional<String> contents, Optional<List<String>> tags) throws ParseException {
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
	
	public static void deleteNote (List <Note> notes, long id) {
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
