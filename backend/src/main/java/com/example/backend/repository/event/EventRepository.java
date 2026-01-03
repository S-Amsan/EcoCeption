package com.example.backend.repository.event;

import com.example.backend.model.User;
import com.example.backend.model.event.Event;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Event findFirstByDeadlineAfterOrderByCreationDate(Date deadlineAfter);

    /**
     * With the join-entity mapping (Event.participants is a Set<EventParticipant>),
     * the derived query must traverse the association: participants.user
     */
    List<Event> findAllByParticipantsUser(User user);
}
