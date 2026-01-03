package com.example.backend.model.http.req.friend;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

/**
 * Request body for creating/sending a friend request.
 */
@Data
public class FriendRequestCreateRequest {

    /**
     * The id of the user you want to send a friend request to.
     */
    @NotNull(message = "toUserId is required")
    @Positive(message = "toUserId must be a positive number")
    private Long toUserId;
}
