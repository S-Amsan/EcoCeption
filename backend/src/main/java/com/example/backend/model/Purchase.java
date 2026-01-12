package com.example.backend.model;

import com.example.backend.model.donation.Donation;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "purchases")
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer pointsUsed;

    @ManyToOne(optional = true)
    @JoinColumn(name = "donation_id", nullable = true)
    private Donation donation = null;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime purchaseDate;

    @Column(nullable = false)
    private String code;

    public Purchase() {}
}
