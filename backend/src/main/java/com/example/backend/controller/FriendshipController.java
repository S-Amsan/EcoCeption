package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.model.http.req.friend.FriendRequestCreateRequest;
import com.example.backend.model.http.res.UserResponse;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.friend.FriendshipService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Friendship endpoints.
 *
 * This controller assumes the current authenticated user is taken from
 * {@link MyUserDetails} and friendship operations are performed relative to them.
 *
 * Endpoints:
 * - POST   /friends/requests              send a friend request
 * - POST   /friends/requests/{id}/accept  accept an incoming request
 * - POST   /friends/requests/{id}/reject  reject an incoming request
 * - POST   /friends/requests/{id}/cancel  cancel an outgoing request
 * - GET    /friends                       list accepted friends
 * - GET    /friends/requests/incoming     list incoming pending requests
 * - GET    /friends/requests/outgoing     list outgoing pending requests
 * - DELETE /friends/{friendId}            unfriend an existing friend
 */
@RestController
@RequestMapping("/friends")
public class FriendshipController {

    @Autowired
    private FriendshipService friendshipService;

    private User requireCurrentUser(MyUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            throw new IllegalStateException(
                "No authenticated user found in security context"
            );
        }
        return userDetails.getUser();
    }

    private UserResponse toUserResponse(User u) {
        return new UserResponse(u);
    }

    @PostMapping("/requests")
    public ResponseEntity<?> sendFriendRequest(
        @AuthenticationPrincipal MyUserDetails userDetails,
        @Valid @RequestBody FriendRequestCreateRequest request
    ) {
        User me = requireCurrentUser(userDetails);

        friendshipService.sendRequest(me.getId(), request.getToUserId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/requests/{requestId}/accept")
    public ResponseEntity<?> acceptFriendRequest(
        @AuthenticationPrincipal MyUserDetails userDetails,
        @PathVariable Long requestId
    ) {
        User me = requireCurrentUser(userDetails);

        friendshipService.acceptRequest(me.getId(), requestId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/requests/{requestId}/reject")
    public ResponseEntity<?> rejectFriendRequest(
        @AuthenticationPrincipal MyUserDetails userDetails,
        @PathVariable Long requestId
    ) {
        User me = requireCurrentUser(userDetails);

        friendshipService.rejectRequest(me.getId(), requestId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/requests/{requestId}/cancel")
    public ResponseEntity<?> cancelFriendRequest(
        @AuthenticationPrincipal MyUserDetails userDetails,
        @PathVariable Long requestId
    ) {
        User me = requireCurrentUser(userDetails);

        friendshipService.cancelRequest(me.getId(), requestId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my")
    public ResponseEntity<List<UserResponse>> listFriends(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        User me = requireCurrentUser(userDetails);

        List<User> friends = friendshipService.listFriends(me.getId());
        return ResponseEntity.ok(
            friends.stream().map(this::toUserResponse).toList()
        );
    }

    @GetMapping("/requests/incoming")
    public ResponseEntity<List<UserResponse>> listIncomingRequests(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        User me = requireCurrentUser(userDetails);

        List<User> users = friendshipService.listIncomingRequests(me.getId());
        return ResponseEntity.ok(
            users.stream().map(this::toUserResponse).toList()
        );
    }

    @GetMapping("/requests/outgoing")
    public ResponseEntity<List<UserResponse>> listOutgoingRequests(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        User me = requireCurrentUser(userDetails);

        List<User> users = friendshipService.listOutgoingRequests(me.getId());
        return ResponseEntity.ok(
            users.stream().map(this::toUserResponse).toList()
        );
    }

    @DeleteMapping("/friends/{friendId}")
    public ResponseEntity<?> removeFriend(
        @AuthenticationPrincipal MyUserDetails userDetails,
        @PathVariable Long friendId
    ) {
        User me = requireCurrentUser(userDetails);

        friendshipService.unfriend(me.getId(), friendId);
        return ResponseEntity.ok().build();
    }
}
