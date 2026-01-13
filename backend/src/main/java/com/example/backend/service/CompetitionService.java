package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.competition.Competition;
import com.example.backend.model.competition.CompetitionParticipant;
import com.example.backend.model.http.req.CompetitionPublishRequest;
import com.example.backend.model.success.SuccessType;
import com.example.backend.repository.competition.CompetitionParticipantRepository;
import com.example.backend.repository.competition.CompetitionRepository;
import com.example.backend.repository.success.SuccessTypeRepository;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompetitionService {

    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private CompetitionParticipantRepository competitionParticipantRepository;

    @Autowired
    private SuccessTypeRepository successTypeRepository;

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

    public Competition publish(CompetitionPublishRequest request) {
        Competition competition = new Competition();

        competition.setName(request.getName());
        competition.setDeadline(request.getDeadline());
        competition.setGoalPoints(request.getGoalPoints());
        competition.setInscriptionCost(request.getInscriptionCost());

        return competitionRepository.save(competition);
    }

    public Competition deleteCompetition(Long competitionId) {
        Competition competition = competitionRepository
            .findById(competitionId)
            .orElseThrow();

        competitionRepository.delete(competition);

        return competition;
    }

    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }

    public List<Competition> getCompetitionsForUser(User user) {
        return competitionRepository.findAllByParticipantsUser(user);
    }

    public List<SuccessType> getAllSuccessTypes() {
        return successTypeRepository.findAll();
    }

    public Optional<Integer> getParticipantsCount(Long competitionId) {
        var maybeCompetition = competitionRepository.findById(competitionId);
        if (maybeCompetition.isEmpty()) {
            return Optional.empty();
        }
        var competition = maybeCompetition.get();
        return Optional.of(competition.getParticipants().size());
    }

    public Optional<Integer> getQualifiedParticipantsCount(Long competitionId) {
        var maybeCompetition = competitionRepository.findById(competitionId);
        if (maybeCompetition.isEmpty()) {
            return Optional.empty();
        }
        var competition = maybeCompetition.get();
        int count = competitionParticipantRepository
            .findAllByCompetitionAndPointsGreaterThanEqual(
                competition,
                competition.getGoalPoints()
            )
            .size();
        return Optional.of(count);
    }
}
