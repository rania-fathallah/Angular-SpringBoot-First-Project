package com.example.ProjectWeb.business.services;

import java.util.List;

import com.example.ProjectWeb.dao.entities.Post;

public interface PostService {
    public List<Post> getAllPosts();
    public Post getPostById(Long id);
    public Post addPost(Post post);
    public  Post updatePost(Long id, Post post);
    public void  deletePostById(Long id); 

}
