package com.example.backend.controller;

import com.example.backend.http.LoginRequest;
import com.example.backend.http.SignUpRequest;
import com.example.backend.http.UserResponse;
import com.example.backend.model.User;
import com.example.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public User register(@Valid @RequestBody SignUpRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public UserResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
