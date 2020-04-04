package com.example.demo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

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
			for (Note p : notes) {
				System.out.println(p.toString());
			}
			
			List<String> tags = new ArrayList<>();
			tags.add("test");
			Note note = createNote(notes, "CIS-4360 TEST AGAIN", new Date(), new Date(), tags);
			System.out.println(note.toString());
			
			mapper.enable(SerializationFeature.INDENT_OUTPUT);
			mapper.writeValue(new File("test.json"), notes);
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
	
}
