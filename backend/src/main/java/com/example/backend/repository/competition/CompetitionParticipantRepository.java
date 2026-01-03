package com.example.backend.repository.competition;

import com.example.backend.model.User;
import com.example.backend.model.competition.Competition;
import com.example.backend.model.competition.CompetitionParticipant;
import com.example.backend.model.competition.CompetitionParticipantId;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetitionParticipantRepository
    extends JpaRepository<CompetitionParticipant, CompetitionParticipantId> {
    List<CompetitionParticipant> findAllByCompetition(Competition competition);

    List<CompetitionParticipant> findAllByUser(User user);
    List<CompetitionParticipant> findAllByCompetitionAndUser(
        Competition competition,
        User user
    );

    List<CompetitionParticipant> findAllByCompetitionAndPointsGreaterThanEqual(
        Competition competition,
        Integer points
    );

    List<CompetitionParticipant> findAllByCompetitionAndPointsGreaterThanEqual(
        Competition competition,
        int pointsIsGreaterThan
    );

    Optional<CompetitionParticipant> findByCompetitionAndUser(
        Competition competition,
        User user
    );

    boolean existsByCompetitionAndUser(Competition competition, User user);
}
