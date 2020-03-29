package com.example.demo;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.example.demo.model.Note;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
@ComponentScan(basePackageClasses = {Note.class})
public class NotesServerApplication {
	static final String filename = "notes.json";
	static List<Note> notes;

	
	
	public static void main(String[] args) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			InputStream input = new FileInputStream(new File(filename));
			TypeReference<List<Note>> typeReference = new TypeReference<List<Note>>() {};
			notes = mapper.readValue(input, typeReference);
			for (Note p : notes) {
				System.out.println(p.getNoteTitle());
			}
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

}
