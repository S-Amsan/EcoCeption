package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@NoArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Table(
    name = "reports",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = { "post_id", "user_id" }),
    }
)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false)
    private String reason;

    @OneToOne
    @JoinColumn(name = "summary_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ReportSummary summary = null;

    @Column(nullable = true)
    private Boolean checked = null;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
