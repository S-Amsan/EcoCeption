package com.example.backend.service;

import com.example.backend.repository.UserRepository;
import java.security.SecureRandom;
import org.springframework.stereotype.Service;

@Service
public class ParrainageService {

    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 6;

    private final SecureRandom random = new SecureRandom();
    private final UserRepository userRepository;

    public ParrainageService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String generateUniqueCode() {
        String code;

        do {
            code = generateCode();
        } while (userRepository.existsByCodeParrainage(code));

        return code;
    }

    private String generateCode() {
        StringBuilder sb = new StringBuilder(CODE_LENGTH);

        for (int i = 0; i < CODE_LENGTH; i++) {
            int index = random.nextInt(ALPHABET.length());
            sb.append(ALPHABET.charAt(index));
        }

        return sb.toString();
    }

    public boolean existsCode(String code) {

        if (code == null || code.length() != 6) {
            return false;
        }

        String normalized = code.trim().toUpperCase();

        return userRepository.existsByCodeParrainage(normalized);
    }

}
