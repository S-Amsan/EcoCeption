package com.example.backend.security;

import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.MyUserDetailsService;
import com.example.backend.service.security.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private HandlerExceptionResolver handlerExceptionResolver;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        String token = readToken(request);

        Authentication authentication =
            SecurityContextHolder.getContext().getAuthentication();

        try {
            if (token != null && authentication == null) {
                String email = jwtService.extractEmail(token);
                MyUserDetails user = myUserDetailsService.loadUserByUsername(
                    email
                );
                // Verify the JWT if one is provided
                if (jwtService.verifyJwt(token, user)) {
                    // Tell spring the authentication is valid if no exception was thrown

                    UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            user.getAuthorities()
                        );

                    authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(
                            request
                        )
                    );
                    SecurityContextHolder.getContext().setAuthentication(
                        authToken
                    );
                }
            }

            // Resume request filtering
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            handlerExceptionResolver.resolveException(
                request,
                response,
                null,
                e
            );
        }
    }

    private String readToken(HttpServletRequest request) {
        final String tokenPrefix = "Bearer ";
        final String value = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (value == null || !value.startsWith(tokenPrefix)) {
            return null;
        }

        return value.substring(tokenPrefix.length());
    }
}
