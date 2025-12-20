package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
        throws UsernameNotFoundException {
        User user = userRepository
            .findByPseudo(username)
            .orElseThrow(() ->
                new UsernameNotFoundException(
                    "No account found for username " + username
                )
            );

        return new MyUserDetails(user);
    }
}
