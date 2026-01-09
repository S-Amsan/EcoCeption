package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.event.Event;
import com.example.backend.model.event.EventParticipant;
import com.example.backend.repository.event.EventParticipantRepository;
import com.example.backend.repository.event.EventRepository;
import java.util.Date;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventParticipantRepository eventParticipantRepository;

    @Autowired
    private CompetitionService competitionService;

    public void onUserPointsIncrement(User user, int diff) {
        updateCurrentEventStats(user, diff);
        competitionService.updateCurrentCompetitionStats(user, diff);
    }

    private void updateCurrentEventStats(User user, int diff) {
        Event currentEvent = getCurrentEvent();

        if (currentEvent == null) {
            return;
        }

        var maybeParticipantData =
            eventParticipantRepository.findByEventAndUser(currentEvent, user);

        if (maybeParticipantData.isEmpty()) {
            return;
        }

        EventParticipant participantData = maybeParticipantData.get();

        participantData.setPoints(participantData.getPoints() + diff);
        eventParticipantRepository.save(participantData);
    }

    public Event getCurrentEvent() {
        return eventRepository.findFirstByDeadlineAfterOrderByCreationDate(
            new Date()
        );
    }

    public Optional<Integer> getTotalEventPoints(User user, Long eventId) {
        var maybeEvent = eventRepository.findById(eventId);

        if (maybeEvent.isEmpty()) {
            return Optional.empty();
        }

        var event = maybeEvent.get();

        var participants = eventParticipantRepository.findAllByEventAndUser(
            event,
            user
        );

        if (participants.isEmpty()) {
            return Optional.ofNullable(null);
        }

        int total = participants
            .stream()
            .mapToInt(p -> p.getPoints())
            .sum();

        return Optional.of(total);
    }
}
