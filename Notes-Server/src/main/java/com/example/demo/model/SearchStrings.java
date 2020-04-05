package com.example.demo.model;

import java.util.List;

// Wrapper Class
public class SearchStrings {
	private List<String> tags;

	public SearchStrings(List<String> tags) {
		this.tags = tags;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}
}
