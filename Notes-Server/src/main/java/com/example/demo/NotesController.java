package com.example.demo;

import java.net.URI;
import java.text.ParseException;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.demo.model.Note;
import com.example.demo.model.SearchStrings;

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
		return "Welcome to the Notes Server";
	}
	
	@GetMapping("/search")
	public List<Note> searchNotes (@RequestBody SearchStrings tagList) {
		return handler.filterNotesByTag(loader.getAllNotes(), tagList.getTags());
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
		Note note = handler.createNote(loader.getAllNotes(), noteBody.getId(), noteBody.getNoteTitle(), Optional.of(noteBody.getTags()), Optional.of(noteBody.getContents()));
		if (note == null) {
			return ResponseEntity.notFound().build();
		} else {
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/read/{id}").buildAndExpand(note.getId()).toUri();
			return ResponseEntity.created(uri).body(note);
		}
	}
	
	@PutMapping(path="/update/{id}")
	public ResponseEntity<Note> updateNote (@PathVariable String id, @RequestBody(required=false) Note noteBody) throws ParseException {
		Note note = handler.updateNote(loader.getAllNotes(), id, Optional.of(noteBody.getNoteTitle()), Optional.of(noteBody.getContents()), Optional.of(noteBody.getTags()));
		if (note == null) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(note);
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteNote (@PathVariable String id) {
		handler.deleteNote(loader.getAllNotes(), id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/overwrite")
	public ResponseEntity<Object> saveAllNotes () {
		loader.overwriteNotes();
		return ResponseEntity.ok().build();
	}
}
