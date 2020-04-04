package com.example.demo.model;

import java.util.Date;
import java.util.List;

import org.springframework.context.annotation.PropertySource;
import com.fasterxml.jackson.annotation.JsonFormat;

@PropertySource(value = "classpath:notes.json")
public class Note {
	
	private long id;
	private String noteTitle;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "E MMM dd HH:mm:ss yyyy")
	private Date createDate;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "E MMM dd HH:mm:ss yyyy")
	private Date modifyDate;
	private List<String> tags;
	private String contents;
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getNoteTitle() {
		return noteTitle;
	}
	
	public void setNoteTitle(String noteTitle) {
		this.noteTitle = noteTitle;
	}
	
	public Date getCreateDate() {
		return createDate;
	}
	
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	public Date getModifyDate() {
		return modifyDate;
	}
	
	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}
	
	public List<String> getTags() {
		return tags;
	}
	
	public void setTags(List<String> tags) {
		this.tags = tags;
	}
	
	public String getContents() {
		return contents;
	}
	
	public void setContents(String contents) {
		this.contents = contents;
	}
	
	@Override
	public String toString () {
		return noteTitle + " ID = " + id + " " + createDate + " " + modifyDate + " " + tags.toString() + " " + contents;
	}
	
}
