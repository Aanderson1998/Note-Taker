package com.example.demo;

import java.net.URI;
import java.text.ParseException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.demo.model.Note;

@RestController
@CrossOrigin(origins = "*")
public class NotesController {
	private NotesLoader loader;
	private NotesHandler handler;
	
	@Autowired
	public NotesController (NotesLoader loader, NotesHandler handler) {
		this.loader = loader;
		this.handler = handler;
	}
	
	@RequestMapping("/")
	public String home () {
		return "Welcome to the Notes Server. Send a Request to '/help' to see the available HTTP Requests.";
	}
	
	@RequestMapping("/help")
	public String getHelp () {
		List<String> commands = Arrays.asList("/ - Access the Home Page", "/help - Pull up the help page...like what you are doing right now", 
				"/search'?tagList=tag1&tagList=tag2' - Perform a search of all the notes that contains the tags in your query", 
				"/get_all - Gets all the notes", "/read/{id} - Read a note with a given ID", "/create - Create a note when provided with a request body", 
				"/update/{id} - Updates a note with a given id with the request body", "/delete/{id} - Deletes a note with a given id", 
				"/overwrite - Implicitly called after calling create, update, and delete, this is used to save your notes. Can be called directly if you want to save it explicitly");
		String result = String.join("\n", commands);
		
		return result;
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<Note>> searchNotes (@RequestParam List<String> tagList) {
		List<Note> filteredNotes = handler.filterNotesByTag(loader.getAllNotes(), tagList);
		if (filteredNotes.size() > 0) {
			return ResponseEntity.ok(filteredNotes);
		} else {
			return ResponseEntity.noContent().build();
		}
	}
	
	@GetMapping(path="/get_all")
	public List<Note> getAllNotes () {
		return loader.getAllNotes();
	}
	
	@GetMapping(path="/read/{id}")
	public ResponseEntity<Note> readNote (@PathVariable("id") String id) {
		Optional<Note> note = handler.readNotes(loader.getAllNotes(), id);
		if (note.isPresent()) {
			return ResponseEntity.ok(note.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping(path="/create")
	public ResponseEntity<Note> createNote (@RequestBody Note noteBody) throws ParseException {
		Note note = handler.createNote(loader.getAllNotes(), noteBody.getId(), noteBody.getNoteTitle(), noteBody.getTags(), noteBody.getContents());
		if (note == null) {
			return ResponseEntity.notFound().build();
		} else {
			loader.overwriteNotes();
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/read/{id}").buildAndExpand(note.getId()).toUri();
			return ResponseEntity.created(uri).body(note);
		}
	}
	
	@PutMapping(path="/update/{id}")
	public ResponseEntity<Note> updateNote (@PathVariable String id, @RequestBody Note noteBody) throws ParseException {
		Note note = handler.updateNote(loader.getAllNotes(), id, noteBody.getNoteTitle(), noteBody.getContents(), noteBody.getTags());
		if (note == null) {
			return ResponseEntity.notFound().build();
		} else {
			loader.overwriteNotes();
			return ResponseEntity.ok(note);
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteNote (@PathVariable String id) {
		handler.deleteNote(loader.getAllNotes(), id);
		loader.overwriteNotes();
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/overwrite")
	public ResponseEntity<Object> saveAllNotes () {
		loader.overwriteNotes();
		return ResponseEntity.ok().build();
	}
}
