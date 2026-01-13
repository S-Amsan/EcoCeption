package com.example.backend.controller;

import com.example.backend.model.http.req.LoginRequest;
import com.example.backend.model.http.req.SignUpRequest;
import com.example.backend.model.http.res.AuthenticationResponse;
import com.example.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // =============================
    //   LOGIN
    // =============================
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
        @Valid LoginRequest request
    ) {
        return authService.login(request);
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponse> signup(
        @Valid SignUpRequest request
    ) {
        return authService.signup(request);
    }

    // =============================
    //   Vérification unicité
    // =============================
    @GetMapping("/check")
    public ResponseEntity<?> check(
        @RequestParam(required = false) String pseudo,
        @RequestParam(required = false) String email,
        @RequestParam(required = false) String phone
    ) {
        return ResponseEntity.ok(
            authService.getAvailabilityStatus(pseudo, email, phone)
        );
    }
}
