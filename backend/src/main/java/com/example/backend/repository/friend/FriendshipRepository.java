package com.example.backend.repository.friend;

import com.example.backend.model.friend.Friendship;
import com.example.backend.model.friend.FriendshipStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    /**
     * Finds a friendship between two users, regardless of direction:
     * (requester=a AND addressee=b) OR (requester=b AND addressee=a)
     */
    @Query(
        """
        select f
        from Friendship f
        where (f.requester.id = :userAId and f.addressee.id = :userBId)
           or (f.requester.id = :userBId and f.addressee.id = :userAId)
        """
    )
    Optional<Friendship> findBetweenUsers(
        @Param("userAId") Long userAId,
        @Param("userBId") Long userBId
    );

    /**
     * List all accepted friendships for a given user (either direction).
     */
    @Query(
        """
        select f
        from Friendship f
        where f.status = :status
          and (f.requester.id = :userId or f.addressee.id = :userId)
        order by f.requestedAt desc
        """
    )
    List<Friendship> findByUserAndStatus(
        @Param("userId") Long userId,
        @Param("status") FriendshipStatus status
    );

    /**
     * Pending requests received by a user.
     */
    @Query(
        """
        select f
        from Friendship f
        where f.status = :status
          and f.addressee.id = :userId
        order by f.requestedAt desc
        """
    )
    List<Friendship> findIncomingByUserAndStatus(
        @Param("userId") Long userId,
        @Param("status") FriendshipStatus status
    );

    /**
     * Pending requests sent by a user.
     */
    @Query(
        """
        select f
        from Friendship f
        where f.status = :status
          and f.requester.id = :userId
        order by f.requestedAt desc
        """
    )
    List<Friendship> findOutgoingByUserAndStatus(
        @Param("userId") Long userId,
        @Param("status") FriendshipStatus status
    );

    /**
     * Convenience: true if an accepted friendship exists between two users (either direction).
     */
    @Query(
        """
        select (count(f) > 0)
        from Friendship f
        where f.status = :status
          and (
                (f.requester.id = :userAId and f.addressee.id = :userBId)
             or (f.requester.id = :userBId and f.addressee.id = :userAId)
          )
        """
    )
    boolean existsBetweenUsersWithStatus(
        @Param("userAId") Long userAId,
        @Param("userBId") Long userBId,
        @Param("status") FriendshipStatus status
    );
}
