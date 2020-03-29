package com.example.demo.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource(value = "classpath:notes.json")
@ConfigurationProperties
public class Note {
	
	private long id;
	private String noteTitle;
	private Date createDate;
	private Date modifyDate;
	private List<String> tags;
	private String contents;
	
	private static SimpleDateFormat date = new SimpleDateFormat("E MMM dd HH:mm:ss z yyyy");
	
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
	
	public void setCreateDate(String createDate) throws ParseException {
		this.createDate = date.parse(createDate);
	}
	
	public Date getModifyDate() {
		return modifyDate;
	}
	
	public void setModifyDate(String modifyDate) throws ParseException {
		this.modifyDate = date.parse(modifyDate);
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
	
}
