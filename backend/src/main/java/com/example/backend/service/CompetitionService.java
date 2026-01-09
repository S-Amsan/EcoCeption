package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.competition.Competition;
import com.example.backend.model.competition.CompetitionParticipant;
import com.example.backend.repository.competition.CompetitionParticipantRepository;
import com.example.backend.repository.competition.CompetitionRepository;
import java.util.Date;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompetitionService {

    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private CompetitionParticipantRepository competitionParticipantRepository;

    public Competition getLatestCompetition() {
        return competitionRepository.findFirstByDeadlineAfterOrderByCreationDate(
            new Date()
        );
    }

    /**
     * Computes the total points of a given user for a given competition.
     *
     * <p>Returns {@link Optional#empty()} if the competition doesn't exist.
     * <p>Returns {@code Optional.ofNullable(null)} (i.e. a present Optional with null)
     * when the user is not registered as a participant in that competition, to preserve
     * the current API behavior where the controller returns {@code 200 null}.
     */
    public Optional<Integer> getTotalCompetitionPoints(
        User user,
        Long competitionId
    ) {
        var maybeCompetition = competitionRepository.findById(competitionId);

        if (maybeCompetition.isEmpty()) {
            return Optional.empty();
        }

        var competition = maybeCompetition.get();

        var participants =
            competitionParticipantRepository.findAllByCompetitionAndUser(
                competition,
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

    public void updateCurrentCompetitionStats(User user, int diff) {
        Competition currentCompetition = getLatestCompetition();

        if (currentCompetition == null) {
            return;
        }

        var maybeParticipantData =
            competitionParticipantRepository.findByCompetitionAndUser(
                currentCompetition,
                user
            );

        if (maybeParticipantData.isEmpty()) {
            return;
        }

        CompetitionParticipant participantData = maybeParticipantData.get();

        participantData.setPoints(participantData.getPoints() + diff);
        competitionParticipantRepository.save(participantData);
    }
}
