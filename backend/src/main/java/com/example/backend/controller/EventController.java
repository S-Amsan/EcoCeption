package com.example.backend.controller;

import com.example.backend.model.event.Event;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.EventService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/all")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/following")
    public List<Event> getMyEvents(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return eventService.getEventsForUser(userDetails.getUser());
    }

    @GetMapping("/latest")
    public Event getLatestEvent() {
        return eventService.getCurrentEvent();
    }

    @GetMapping("/{eventId}/participantsCount")
    public ResponseEntity<Integer> getParticipantsCount(
        @PathVariable Long eventId
    ) {
        var maybeCount = eventService.getParticipantsCount(eventId);
        if (maybeCount.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(maybeCount.get());
    }

    @GetMapping("/{eventId}/qualifiedParticipantsCount")
    public ResponseEntity<Integer> getQualifiedParticipantsCount(
        @PathVariable Long eventId
    ) {
        var maybeCount = eventService.getQualifiedParticipantsCount(eventId);
        if (maybeCount.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(maybeCount.get());
    }
}
