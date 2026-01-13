package com.example.backend.model.event;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.Date;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Join-entity relationship to store per-user, per-event data (e.g. points).
     * Backed by table: event_participants
     *
     * Marked as @JsonIgnore to avoid serializing a potentially large graph and/or
     * triggering lazy-loading / recursive structures in API responses.
     */
    @JsonIgnore
    @OneToMany(
        mappedBy = "event",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<EventParticipant> participants;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Date deadline;

    @Column(nullable = false)
    private int goalPoints;

    @Column(nullable = false)
    private int inscriptionCost;

    @CreationTimestamp
    @Column(nullable = false)
    private Date creationDate;

    public Event() {}
}
