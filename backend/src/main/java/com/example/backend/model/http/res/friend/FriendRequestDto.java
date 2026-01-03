package com.example.backend.model.http.res.friend;

import com.example.backend.model.User;
import com.example.backend.model.friend.Friendship;
import com.example.backend.model.friend.FriendshipStatus;
import java.time.Instant;
import lombok.Data;

/**
 * Response DTO representing a friend request / friendship relation.
 *
 * Note: This intentionally avoids embedding full User entities to prevent
 * circular references and over-sharing of fields.
 */
@Data
public class FriendRequestDto {

    private Long id;

    private Long requesterId;
    private String requesterPseudo;

    private Long addresseeId;
    private String addresseePseudo;

    private FriendshipStatus status;

    private Instant requestedAt;
    private Instant updatedAt;

    public FriendRequestDto() {}

    public FriendRequestDto(Friendship friendship) {
        this.id = friendship.getId();

        User requester = friendship.getRequester();
        if (requester != null) {
            this.requesterId = requester.getId();
            this.requesterPseudo = requester.getPseudo();
        }

        User addressee = friendship.getAddressee();
        if (addressee != null) {
            this.addresseeId = addressee.getId();
            this.addresseePseudo = addressee.getPseudo();
        }

        this.status = friendship.getStatus();
        this.requestedAt = friendship.getRequestedAt();
        this.updatedAt = friendship.getUpdatedAt();
    }
}
