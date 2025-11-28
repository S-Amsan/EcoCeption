package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "pseudo", unique = true, nullable = false, length = 50)
    private String pseudo;

    @Column(name = "email", unique = true, nullable = false, length = 255)
    private String email;

    @Column(name = "pswd", nullable = false, length = 255)
    private String password;

    @Column(name = "num_tel", unique = true, nullable = false, length = 20)
    private String phone;

    @Column(name = "photo_profile")
    private String photoProfile;

    @CreationTimestamp
    @Column(name = "date_creation", updatable = false)
    private LocalDateTime dateCreation;

    @UpdateTimestamp
    @Column(name = "date_modification")
    private LocalDateTime dateModification;

    @Column(name = "actif")
    private boolean actif = true;
}
