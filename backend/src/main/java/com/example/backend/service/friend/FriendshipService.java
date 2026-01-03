package com.example.backend.service.friend;

import com.example.backend.model.User;
import com.example.backend.model.friend.Friendship;
import com.example.backend.model.friend.FriendshipStatus;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.friend.FriendshipRepository;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Business logic for friend requests / friendships.
 *
 * <p>This service uses a {@link Friendship} join entity that stores:
 * - requester (User)
 * - addressee (User)
 * - status (PENDING/ACCEPTED/DECLINED/BLOCKED)
 * - timestamps
 */
@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public FriendshipService(
        FriendshipRepository friendshipRepository,
        UserRepository userRepository
    ) {
        this.friendshipRepository = friendshipRepository;
        this.userRepository = userRepository;
    }

    /**
     * Send a friend request from {@code requesterId} to {@code addresseeId}.
     *
     * <p>Rules:
     * - cannot friend yourself
     * - cannot create duplicates (in either direction) if a friendship already exists
     */
    @Transactional
    public Friendship sendRequest(Long requesterId, Long addresseeId) {
        if (requesterId == null || addresseeId == null) {
            throw new IllegalArgumentException(
                "requesterId and addresseeId are required."
            );
        }
        if (requesterId.equals(addresseeId)) {
            throw new IllegalArgumentException(
                "You cannot send a friend request to yourself."
            );
        }

        User requester = requireUser(requesterId);
        User addressee = requireUser(addresseeId);

        Optional<Friendship> existingOpt =
            friendshipRepository.findBetweenUsers(requesterId, addresseeId);

        if (existingOpt.isPresent()) {
            Friendship existing = existingOpt.get();

            if (existing.getStatus() == FriendshipStatus.PENDING) {
                throw new IllegalStateException(
                    "A friend request is already pending between these users."
                );
            }
            if (existing.getStatus() == FriendshipStatus.ACCEPTED) {
                throw new IllegalStateException(
                    "These users are already friends."
                );
            }
            if (existing.getStatus() == FriendshipStatus.BLOCKED) {
                throw new IllegalStateException(
                    "A friendship cannot be requested because one of the users is blocked."
                );
            }

            // REJECTED: allow re-request by reusing the same row and setting direction + status
            if (existing.getStatus() == FriendshipStatus.REJECTED) {
                existing.setRequester(requester);
                existing.setAddressee(addressee);
                existing.setStatus(FriendshipStatus.PENDING);
                existing.setRespondedAt(null);
                return friendshipRepository.save(existing);
            }
        }

        Friendship friendship = new Friendship();
        friendship.setRequester(requester);
        friendship.setAddressee(addressee);
        friendship.setStatus(FriendshipStatus.PENDING);
        friendship.setRespondedAt(null);

        return friendshipRepository.save(friendship);
    }

    /**
     * Accept a pending friend request.
     *
     * @param currentUserId The user performing the accept action (must be the addressee)
     * @param requestId     The friendship/request id
     */
    @Transactional
    public Friendship acceptRequest(Long currentUserId, Long requestId) {
        Friendship friendship = requireFriendship(requestId);

        if (friendship.getStatus() != FriendshipStatus.PENDING) {
            throw new IllegalStateException(
                "Only pending requests can be accepted."
            );
        }
        if (
            friendship.getAddressee() == null ||
            friendship.getAddressee().getId() == null
        ) {
            throw new IllegalStateException(
                "Invalid friendship: addressee is missing."
            );
        }
        if (!friendship.getAddressee().getId().equals(currentUserId)) {
            throw new IllegalStateException(
                "Only the addressee can accept this friend request."
            );
        }

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        friendship.setRespondedAt(Instant.now());
        return friendshipRepository.save(friendship);
    }

    /**
     * Reject (decline) a pending friend request.
     *
     * @param currentUserId The user declining (must be the addressee)
     * @param requestId     The friendship/request id
     */
    @Transactional
    public Friendship rejectRequest(Long currentUserId, Long requestId) {
        Friendship friendship = requireFriendship(requestId);

        if (friendship.getStatus() != FriendshipStatus.PENDING) {
            throw new IllegalStateException(
                "Only pending requests can be rejected."
            );
        }
        if (
            friendship.getAddressee() == null ||
            friendship.getAddressee().getId() == null
        ) {
            throw new IllegalStateException(
                "Invalid friendship: addressee is missing."
            );
        }
        if (!friendship.getAddressee().getId().equals(currentUserId)) {
            throw new IllegalStateException(
                "Only the addressee can reject this friend request."
            );
        }

        friendship.setStatus(FriendshipStatus.REJECTED);
        friendship.setRespondedAt(Instant.now());
        return friendshipRepository.save(friendship);
    }

    /**
     * Cancel a request that you previously sent (only while PENDING).
     *
     * @param currentUserId requester id (must be the requester)
     * @param requestId     friendship/request id
     */
    @Transactional
    public void cancelRequest(Long currentUserId, Long requestId) {
        Friendship friendship = requireFriendship(requestId);

        if (friendship.getStatus() != FriendshipStatus.PENDING) {
            throw new IllegalStateException(
                "Only pending requests can be canceled."
            );
        }
        if (
            friendship.getRequester() == null ||
            friendship.getRequester().getId() == null
        ) {
            throw new IllegalStateException(
                "Invalid friendship: requester is missing."
            );
        }
        if (!friendship.getRequester().getId().equals(currentUserId)) {
            throw new IllegalStateException(
                "Only the requester can cancel this friend request."
            );
        }

        friendshipRepository.delete(friendship);
    }

    /**
     * Unfriend: remove an existing accepted friendship between two users (either direction).
     *
     * <p>This deletes the row. If you prefer audit/history, you could set a status instead.
     */
    @Transactional
    public void unfriend(Long currentUserId, Long friendUserId) {
        if (currentUserId == null || friendUserId == null) {
            throw new IllegalArgumentException(
                "currentUserId and friendUserId are required."
            );
        }
        if (currentUserId.equals(friendUserId)) {
            throw new IllegalArgumentException("You cannot unfriend yourself.");
        }

        Friendship friendship = friendshipRepository
            .findBetweenUsers(currentUserId, friendUserId)
            .orElseThrow(() ->
                new IllegalStateException(
                    "No friendship exists between these users."
                )
            );

        if (friendship.getStatus() != FriendshipStatus.ACCEPTED) {
            throw new IllegalStateException(
                "Only accepted friendships can be removed."
            );
        }

        friendshipRepository.delete(friendship);
    }

    /**
     * List accepted friends for a user.
     */
    @Transactional(readOnly = true)
    public List<User> listFriends(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("userId is required.");
        }

        return friendshipRepository
            .findByUserAndStatus(userId, FriendshipStatus.ACCEPTED)
            .stream()
            .map(f -> otherUser(f, userId))
            .toList();
    }

    /**
     * List incoming pending requests (requests where user is addressee).
     * Returns the users who sent you a request.
     */
    @Transactional(readOnly = true)
    public List<User> listIncomingRequests(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("userId is required.");
        }

        return friendshipRepository
            .findIncomingByUserAndStatus(userId, FriendshipStatus.PENDING)
            .stream()
            .map(Friendship::getRequester)
            .toList();
    }

    /**
     * List outgoing pending requests (requests where user is requester).
     * Returns the users you requested.
     */
    @Transactional(readOnly = true)
    public List<User> listOutgoingRequests(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("userId is required.");
        }

        return friendshipRepository
            .findOutgoingByUserAndStatus(userId, FriendshipStatus.PENDING)
            .stream()
            .map(Friendship::getAddressee)
            .toList();
    }

    @Transactional(readOnly = true)
    public Optional<Friendship> getFriendshipBetween(
        Long userIdA,
        Long userIdB
    ) {
        if (userIdA == null || userIdB == null) {
            throw new IllegalArgumentException("Both user ids are required.");
        }
        return friendshipRepository.findBetweenUsers(userIdA, userIdB);
    }

    private User requireUser(Long id) {
        return userRepository
            .findById(id)
            .orElseThrow(() ->
                new IllegalArgumentException("User not found: id=" + id)
            );
    }

    private Friendship requireFriendship(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("requestId is required.");
        }
        return friendshipRepository
            .findById(id)
            .orElseThrow(() ->
                new IllegalArgumentException(
                    "Friend request not found: id=" + id
                )
            );
    }

    private User otherUser(Friendship friendship, Long selfUserId) {
        if (friendship == null) {
            return null;
        }
        User requester = friendship.getRequester();
        User addressee = friendship.getAddressee();

        if (
            requester != null &&
            requester.getId() != null &&
            requester.getId().equals(selfUserId)
        ) {
            return addressee;
        }
        return requester;
    }
}
