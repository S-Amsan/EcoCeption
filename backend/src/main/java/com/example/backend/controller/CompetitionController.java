package com.example.backend.controller;

import com.example.backend.model.competition.Competition;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.model.success.SuccessType;
import com.example.backend.service.CompetitionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/competition")
public class CompetitionController {

    @Autowired
    private CompetitionService competitionService;

    @GetMapping("/all")
    public List<Competition> getAllCompetitions() {
        return competitionService.getAllCompetitions();
    }

    @GetMapping("/following")
    public List<Competition> getMyCompetitions(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return competitionService.getCompetitionsForUser(userDetails.getUser());
    }

    @GetMapping("/latest")
    public Competition getLatestCompetition() {
        return competitionService.getLatestCompetition();
    }

    @GetMapping("/success_types")
    public List<SuccessType> getAllSuccessTypes() {
        return competitionService.getAllSuccessTypes();
    }

    @GetMapping("/{competitionId}/participantsCount")
    public ResponseEntity<Integer> getParticipantsCount(
        @PathVariable Long competitionId
    ) {
        var maybeCount = competitionService.getParticipantsCount(competitionId);
        if (maybeCount.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(maybeCount.get());
    }

    @GetMapping("/{competitionId}/qualifiedParticipantsCount")
    public ResponseEntity<Integer> getQualifiedParticipantsCount(
        @PathVariable Long competitionId
    ) {
        var maybeCount = competitionService.getQualifiedParticipantsCount(
            competitionId
        );
        if (maybeCount.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(maybeCount.get());
    }
}
