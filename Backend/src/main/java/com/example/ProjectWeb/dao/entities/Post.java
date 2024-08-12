package com.example.ProjectWeb.dao.entities;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String title;
    
    @Column(nullable = false)
    private double superficie;
    
    @Column(name = "number_rooms", nullable = true)
    private int numberRooms;
    
    @Column(nullable = false, length = 100)
    private String city;
    
    @Column(nullable = true)
    private String location;
    
    @Column(nullable = false)
    private String offer; // Assuming "Sale" or "Rent"
    
    @Column(nullable = false)
    private double price;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "post_photos",
            joinColumns = @JoinColumn(name = "post_id")
    )
    @Column(name = "photo_url")
    private List<String> photos;
    
    @Column(nullable = false, length = 500)
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "contact_id", nullable = false)
    private Contact contact;
    
    @Column(nullable = false)
    private String type; // Assuming "House" or "Land"
}
