package com.example.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class SignUpRequest {

    @NotBlank
    private String pseudo;

    @Email
    @NotBlank
    private String email;

    @Size(min = 8)
    private String password;

    @NotBlank
    private String phone;
}
