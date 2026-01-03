package com.example.backend.model.http.res.friend;

import com.example.backend.model.User;

/**
 * Lightweight friend representation to avoid returning full JPA entities
 * (and to prevent cyclic serialization issues).
 */
public class FriendDto {

    private Long id;
    private String pseudo;
    private String photoProfileUrl;

    public FriendDto() {}

    public FriendDto(Long id, String pseudo, String photoProfileUrl) {
        this.id = id;
        this.pseudo = pseudo;
        this.photoProfileUrl = photoProfileUrl;
    }

    public static FriendDto fromUser(User user) {
        if (user == null) {
            return null;
        }
        return new FriendDto(user.getId(), user.getPseudo(), user.getPhotoProfileUrl());
    }

    public Long getId() {
        return id;
    }

    public String getPseudo() {
        return pseudo;
    }

    public String getPhotoProfileUrl() {
        return photoProfileUrl;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public void setPhotoProfileUrl(String photoProfileUrl) {
        this.photoProfileUrl = photoProfileUrl;
    }
}
