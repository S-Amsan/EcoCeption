package com.example.backend.model.http.res;

import lombok.Data;

@Data
public class UserResponse {

    private Long id;
    private String email;
    private String pseudo;
    private String phone;
    private String photoProfile;
    private boolean actif;
}
