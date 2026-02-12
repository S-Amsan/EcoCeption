package com.example.backend.service;

import com.example.backend.exceptions.AccountAlreadyExistsException;
import com.example.backend.exceptions.LoginException;
import com.example.backend.model.User;
import com.example.backend.model.http.req.LoginRequest;
import com.example.backend.model.http.req.SignUpRequest;
import com.example.backend.model.http.res.AuthenticationResponse;
import com.example.backend.model.http.res.FileUploadResponse;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.security.JwtService;
import java.io.IOException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.repository.UserStatsRepository;
import com.example.backend.model.UserStats;

@Service
public class AuthService {

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserStatsRepository userStatsRepository;

    @Autowired
    private ParrainageService parrainageService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthenticationResponse login(LoginRequest request) {
        User user = userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() -> new LoginException("Utilisateur non trouvé"));

        boolean ok = passwordEncoder.matches(
            request.getPassword(),
            user.getPasswordHash()
        );

        if (!ok) {
            throw new LoginException("Mot de passe incorrect");
        }

        String token = jwtService.generateToken(request.getEmail());

        return new AuthenticationResponse(
            user.getId(),
            user.getPseudo(),
            token
        );
    }

    @Transactional
    public AuthenticationResponse signup(SignUpRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AccountAlreadyExistsException(
                AccountAlreadyExistsException.Type.EMAIL,
                request.getEmail()
            );
        }

        if (userRepository.existsByPseudo(request.getPseudo())) {
            throw new AccountAlreadyExistsException(
                AccountAlreadyExistsException.Type.PSEUDO,
                request.getPseudo()
            );
        }

        User user = new User(request.getPseudo(), request.getEmail());
        user.setPhone(request.getPhone());
        user.setName(request.getName());
        user.setAge(request.getAge());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        FileUploadResponse fileUploadResponse;

        try {
            fileUploadResponse = fileUploadService.upload(request.getAvatarImage());
        } catch (IOException e) {
            throw new LoginException("Failed to upload avatar image", e);
        }

        if (fileUploadResponse.getError() != null) {
            throw new LoginException(
                "Error uploading avatar image: " + fileUploadResponse.getError()
            );
        }

        user.setPhotoProfileUrl(
            FileUploadService.endpoint + "/" + fileUploadResponse.getFilename()
        );

        user.setCodeParrainage(parrainageService.generateUniqueCode());

        userRepository.save(user);

        UserStats userStats = new UserStats(user);
        userStatsRepository.save(userStats);

        String codeAssocie = request.getCodeParrainageAssocie();

        if (codeAssocie != null && !codeAssocie.isBlank()) {

            String normalizedCode = codeAssocie.trim().toUpperCase();

            User parrain = userRepository
                .findByCodeParrainage(normalizedCode)
                .orElseThrow(() -> new LoginException("Code parrainage invalide"));

            user.setCodeParrainageAssocie(normalizedCode);

            // +500 filleul
            userStats.setPoints(500);

            // +500 parrain
            UserStats parrainStats = userStatsRepository
                .findByUserId(parrain.getId())
                .orElseThrow(() -> new LoginException("Stats parrain introuvables"));

            parrainStats.setPoints(parrainStats.getPoints() + 500);

            userStatsRepository.save(parrainStats);
        }

        String token = jwtService.generateToken(request.getEmail());

        return new AuthenticationResponse(
            user.getId(),
            user.getPseudo(),
            token
        );
    }


    public boolean pseudoExists(String pseudo) {
        return userRepository.existsByPseudo(pseudo);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean phoneExists(String phone) {
        return userRepository.existsByPhone(phone);
    }

    public Map<String, Boolean> getAvailabilityStatus(
        String pseudo,
        String email,
        String phone
    ) {
        return Map.of(
            "pseudoTaken",
            pseudo != null && pseudoExists(pseudo),
            "emailTaken",
            email != null && emailExists(email),
            "phoneTaken",
            phone != null && phoneExists(phone)
        );
    }
}
