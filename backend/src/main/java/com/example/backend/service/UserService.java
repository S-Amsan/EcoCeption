package com.example.backend.service;

import com.example.backend.model.Notification;
import com.example.backend.model.User;
import com.example.backend.model.UserStats;
import com.example.backend.model.action.Action;
import com.example.backend.model.http.req.AccountUpdateRequest;
import com.example.backend.model.http.res.UserStatsResponse;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.UserStatsRepository;
import com.example.backend.repository.action.ActionRepository;
import com.example.backend.repository.competition.CompetitionParticipantRepository;
import com.example.backend.repository.competition.CompetitionRepository;
import com.example.backend.repository.event.EventParticipantRepository;
import com.example.backend.repository.event.EventRepository;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserStatsRepository userStatsRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private CompetitionParticipantRepository competitionParticipantRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventParticipantRepository eventParticipantRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<UserStatsResponse> getUserStats(Long userId) {
        var maybeUser = userRepository.findById(userId);

        if (maybeUser.isEmpty()) {
            return Optional.empty();
        }

        User user = maybeUser.get();

        Optional<UserStats> maybeStats = userStatsRepository.findByUserId(
            user.getId()
        );

        if (maybeStats.isEmpty()) {
            maybeStats = Optional.of(
                userStatsRepository.save(new UserStats(user))
            );
        }

        UserStats stats = maybeStats.get();

        UserStatsResponse response = UserStatsResponse.builder()
            .points(stats.getPoints())
            .trophies(stats.getTrophies())
            .flames(stats.getFlames())
            .ecoActions(postRepository.countByUserAndValidatedTrue(user))
            .recoveredObjects(
                postRepository.countByUserAndValidatedTrueAndObjectIsNotNull(
                    user
                )
            )
            .build();

        return Optional.of(response);
    }

    public List<Notification> getNotificationsForUser(Long userId) {
        return notificationRepository.findByUserIdOrderByReceivedAtDesc(userId);
    }

    public List<Action> getActionsForUser(User user) {
        return actionRepository.findAllByUser(user);
    }

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

    public boolean updateAccount(User user, AccountUpdateRequest request)
        throws IOException {
        boolean update = false;

        if (request.getPseudo() != null) {
            if (!request.getPseudo().equals(user.getPseudo())) {
                // Pseudo update needed
                update = true;
                user.setPseudo(request.getPseudo());
            }
        }

        if (request.getEmail() != null) {
            if (!request.getEmail().equals(user.getEmail())) {
                // Email update needed
                update = true;
                user.setEmail(request.getEmail());
            }
        }

        if (request.getName() != null) {
            if (!request.getName().equals(user.getName())) {
                // Name update needed
                update = true;
                user.setName(request.getName());
            }
        }

        if (request.getPassword() != null) {
            String newHash = passwordEncoder.encode(request.getPassword());
            String oldHash = user.getPasswordHash();

            if (!newHash.equals(oldHash)) {
                // Password update needed
                update = true;
                user.setPasswordHash(newHash);
            }
        }

        if (request.getPhone() != null) {
            if (!request.getPhone().equals(user.getPhone())) {
                // Phone update needed
                update = true;
                user.setPhone(request.getPhone());
            }
        }

        if (request.getAge() != null) {
            if (!request.getAge().equals(user.getAge())) {
                // Age update needed
                update = true;
                user.setAge(request.getAge());
            }
        }

        if (request.getAvatarImage() != null) {
            String oldUrl = user.getPhotoProfileUrl();
            String newUrl = fileUploadService
                .upload(request.getAvatarImage())
                .getUrl();

            if (!oldUrl.equals(newUrl)) {
                // Photo update needed
                fileUploadService.delete(oldUrl);
                user.setPhotoProfileUrl(newUrl);
            } else {
                fileUploadService.delete(newUrl);
            }
        }

        if (update) {
            userRepository.save(user);
        }

        return update;
    }
}
