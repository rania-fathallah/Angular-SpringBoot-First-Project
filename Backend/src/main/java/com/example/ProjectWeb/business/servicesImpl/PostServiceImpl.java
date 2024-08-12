package com.example.ProjectWeb.business.servicesImpl;

import java.util.List;
import org.springframework.stereotype.Service;

import com.example.ProjectWeb.business.services.PostService;
import com.example.ProjectWeb.dao.entities.Post;
import com.example.ProjectWeb.dao.repositories.ContactRepository;
import com.example.ProjectWeb.dao.repositories.PostRepository;

import jakarta.el.PropertyNotFoundException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final ContactRepository contactRepository;

    public PostServiceImpl(PostRepository postRepository, ContactRepository contactRepository) {
        this.postRepository = postRepository;
        this.contactRepository = contactRepository;
    }

    @Override
    public List<Post> getAllPosts() {
        return this.postRepository.findAll();
    }

    @Override
    public Post getPostById(Long id) {
        if (id == null) {
            return null;
        }
        return this.postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Contact with id "+id+" not found"));
    }

    @Override
    public Post addPost(Post contact) {
        return this.postRepository.save(contact);
    }

    @Override
    public Post updatePost(Long id, Post post) {
        // Fetch the post by ID
        Post postToUpdate = postRepository.findById(id)
                .orElseThrow(() -> new PropertyNotFoundException("Post not found with id: " + id));
    
        postToUpdate.getContact().setName(post.getContact().getName());
        postToUpdate.getContact().setEmail(post.getContact().getEmail());
        postToUpdate.getContact().setPhone(post.getContact().getPhone());

        contactRepository.save(postToUpdate.getContact());

        postToUpdate.setTitle(post.getTitle());
        postToUpdate.setSuperficie(post.getSuperficie());
        postToUpdate.setNumberRooms(post.getNumberRooms());
        postToUpdate.setCity(post.getCity());
        postToUpdate.setLocation(post.getLocation());
        postToUpdate.setOffer(post.getOffer());
        postToUpdate.setPrice(post.getPrice());
        postToUpdate.setDescription(post.getDescription());
        postToUpdate.setType(post.getType());
    
        if (post.getPhotos() != null && !post.getPhotos().isEmpty()) {
            postToUpdate.setPhotos(post.getPhotos());
        }

        return postRepository.save(postToUpdate);
    }
    

    @Override
    public void deletePostById(Long id) {
       if(this.postRepository.existsById(id)){
        this.postRepository.deleteById(id);
       }
    }

}