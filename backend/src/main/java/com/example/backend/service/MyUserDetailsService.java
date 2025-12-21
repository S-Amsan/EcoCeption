package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public MyUserDetails loadUserByUsername(String email)
        throws UsernameNotFoundException {
        User user = userRepository
            .findByEmail(email)
            .orElseThrow(() ->
                new UsernameNotFoundException(
                    "No account found for email " + email
                )
            );

        return new MyUserDetails(user);
    }
}
