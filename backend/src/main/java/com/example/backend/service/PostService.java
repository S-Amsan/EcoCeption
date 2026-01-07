package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.model.User;
import com.example.backend.model.UserStats;
import com.example.backend.model.action.Action;
import com.example.backend.model.action.ActionType;
import com.example.backend.model.http.req.PostPublishRequest;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.UserStatsRepository;
import com.example.backend.repository.action.ActionRepository;
import com.example.backend.repository.action.ActionTypeRepository;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private ActionTypeRepository actionTypeRepository;

    @Autowired
    private UserStatsRepository userStatsRepository;

    public Post publish(PostPublishRequest request, User user)
        throws IOException {
        var response = imageUploadService.upload(request.getImage());

        if (response.getError() != null) {
            throw new RuntimeException(
                "Error uploading post image: " + response.getError()
            );
        }

        Post post = new Post();

        post.setUser(user);
        post.setName(request.getName());
        post.setDescription(request.getDescription());
        post.setImageUrl(
            ImageUploadService.endpoint.toString() +
                '/' +
                response.getFilename()
        );

        return postRepository.save(post);
    }

    private void incrementVotesIfNeededAndUpdateAction(Post post, User user) {
        if (
            !post.getLikes().contains(user) &&
            !post.getDislikes().contains(user)
        ) {
            user.setVotes(user.getVotes() + 1);

            updateActions(user);
        }
    }

    private void updateActions(User user) {
        if (user.getVotes() == 5) {
            user.setVotes(0);
            ActionType actionType = actionTypeRepository
                .findById(ActionService.ActionType.VOTE_5_POSTS.getId())
                .get();

            Action action = new Action();

            action.setUser(user);
            action.setActionType(actionType);
            action = actionRepository.save(action);

            UserStats stats = userStatsRepository
                .findByUserId(user.getId())
                .get();

            stats.setLastActionDate(action.getAcquiredAt());
            userStatsRepository.save(stats);
        }
    }

    public ResponseEntity<Void> like(Long postId, User user) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var post = maybePost.get();
        incrementVotesIfNeededAndUpdateAction(post, user);
        post.like(user);

        postRepository.save(post);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> dislike(Long postId, User user) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var post = maybePost.get();
        incrementVotesIfNeededAndUpdateAction(post, user);
        post.dislike(user);

        postRepository.save(post);

        return ResponseEntity.ok().build();
    }
}
