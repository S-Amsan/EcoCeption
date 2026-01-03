package com.example.backend.repository.event;

import com.example.backend.model.User;
import com.example.backend.model.event.Event;
import com.example.backend.model.event.EventParticipant;
import com.example.backend.model.event.EventParticipantId;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventParticipantRepository
    extends JpaRepository<EventParticipant, EventParticipantId> {
    List<EventParticipant> findAllByEvent(Event event);

    List<EventParticipant> findAllByUser(User user);

    List<EventParticipant> findAllByEventAndUser(Event event, User user);

    List<EventParticipant> findAllByEventAndPointsGreaterThanEqual(
        Event event,
        Integer points
    );

    List<EventParticipant> findAllByEventAndPointsGreaterThanEqual(
        Event event,
        int pointsIsGreaterThan
    );

    Optional<EventParticipant> findByEventAndUser(Event event, User user);

    boolean existsByEventAndUser(Event event, User user);
}
