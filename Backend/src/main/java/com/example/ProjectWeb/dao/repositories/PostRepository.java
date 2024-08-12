package com.example.ProjectWeb.dao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ProjectWeb.dao.entities.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
