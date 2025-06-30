package com.pies.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final Key key;
    private static final long EXP_MILLIS = 3600_000; // 1 hour

    public JwtService(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    /** Generate JWT string (HS256) */
    public String generate(UserDetails user) {
        long expAt = System.currentTimeMillis() + EXP_MILLIS;
        String role = user.getAuthorities()
                .stream()
                .findFirst()
                .map(a -> a.getAuthority())
                .orElse("UNKNOWN");

        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role", role)
                .setExpiration(new Date(expAt))
                .signWith(key, SignatureAlgorithm.HS256) // <─ 0.11.x signature
                .compact();
    }

    /** Extract subject (username) */
    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
