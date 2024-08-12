package com.example.ProjectWeb.web.controllers;

import java.util.DuplicateFormatFlagsException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ProjectWeb.business.services.PostService;
import com.example.ProjectWeb.dao.entities.Contact;
import com.example.ProjectWeb.dao.entities.Post;
import com.example.ProjectWeb.dao.repositories.ContactRepository;

@RestController
@RequestMapping("/api/posts")

public class PostController {

    private final PostService postService;
    private final ContactRepository contactRepository;

    public PostController(PostService postService, ContactRepository contactRepository) {
        this.postService = postService;
        this.contactRepository = contactRepository;
    }

    @GetMapping()
    public ResponseEntity<?> getAllPosts() {
        List<Post> contacts = this.postService.getAllPosts();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        return new ResponseEntity<>(this.postService.getPostById(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> addPost(@RequestBody Post post) throws DuplicateFormatFlagsException {
        // Create a new Contact object
        Contact contact = new Contact();
        contact.setName(post.getContact().getName());
        contact.setEmail(post.getContact().getEmail());
        contact.setPhone(post.getContact().getPhone());
        // Save the Contact object to the database
        Contact savedContact = contactRepository.save(contact);

        // Set the saved Contact to the Post entity
        post.setContact(savedContact);

        return new ResponseEntity<>(this.postService.addPost(post), HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody Post updatedPost)
            throws DuplicateFormatFlagsException {
        try {
            Post updatedPostWithContact = postService.updatePost(id, updatedPost);
            return ResponseEntity.ok(updatedPostWithContact);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        this.postService.deletePostById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
