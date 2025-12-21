package com.example.backend.service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    @Value("${jwt.privatekey}")
    private String privateKey;

    @Value("${jwt.durationms}")
    private Long tokenDuration;

    public String generateToken(String email) {
        long currentTimeMillis = System.currentTimeMillis();
        Date issuedDate = new Date(currentTimeMillis);
        Date expireDate = new Date(currentTimeMillis + tokenDuration);

        return Jwts.builder()
            .setIssuedAt(issuedDate)
            .setExpiration(expireDate)
            .signWith(getKeySigner(), SignatureAlgorithm.HS256)
            .setSubject(email)
            .compact();
    }

    private SecretKey getKeySigner() {
        return Keys.hmacShaKeyFor(privateKey.getBytes());
    }

    public boolean verifyJwt(String token, UserDetails user) {
        String email = extractEmail(token);

        return !isTokenExpired(token) && email.equals(user.getUsername());
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(
        String token,
        Function<Claims, T> claimsResolver
    ) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getKeySigner())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
}
