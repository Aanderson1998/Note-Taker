package com.example.demo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.stereotype.Component;

import com.example.demo.model.Note;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@Component
public class NotesLoader {
	private static final String filename = "notes.json";
	private List<Note> notes;
	
	@PostConstruct
	void loadNotes () {
		try {
			ObjectMapper mapper = new ObjectMapper();
			InputStream input = new FileInputStream(new File(filename));
			TypeReference<List<Note>> typeReference = new TypeReference<List<Note>>() {};
			notes = mapper.readValue(input, typeReference);
			for (Note p : notes) {
				System.out.println(p.getNoteTitle());
			}
			Note note = new Note();
			note.setCreateDate(new Date());
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
		
	}
	
	public List<Note> getAllNotes() {
		return notes;
	}
	
	@PreDestroy
	public void overwriteNotes (List<Note> notes) {
		ObjectMapper mapper = new ObjectMapper();
		mapper.enable(SerializationFeature.INDENT_OUTPUT);
		
		try {
			mapper.writeValue(new File(filename), notes);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
