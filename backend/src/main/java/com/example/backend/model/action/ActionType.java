package com.example.backend.model.action;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "action_types")
public class ActionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String imageUrl;

    public ActionType() {}
}
