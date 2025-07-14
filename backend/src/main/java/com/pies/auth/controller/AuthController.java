package com.pies.auth.controller;

import com.pies.auth.JwtService;
import com.pies.therapist.model.Therapist;
import com.pies.therapist.model.TherapistRole;
import com.pies.therapist.repository.TherapistRepository;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Authentication endpoints for login and registration.
 * In development profile, login auto-registers unknown users.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final TherapistRepository repo;
    private final JwtService jwt;
    private final PasswordEncoder encoder;
    private final Environment env;

    record LoginReq(@NotBlank String username, @NotBlank String password) {
    }

    record RegisterReq(@NotBlank String username,
                       @NotBlank String password,
                       String firstName,
                       String lastName,
                       String email,
                       TherapistRole role) {
    }

    /**
     * User login endpoint.
     * In dev profile, missing users are auto-registered. In prod, password is always verified.
     */
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginReq req) {
        Therapist u = repo.findByUsername(req.username()).orElse(null);

        // In dev: auto-register user if not found
        if (env.acceptsProfiles(Profiles.of("dev"))) {
            if (u == null) {
                u = new Therapist();
                u.setUsername(req.username());
                u.setPasswordHash("dummy");
                u.setFirstName("Dev");
                u.setLastName("User");
                u.setEmail(req.username() + "@dev.local");
                u.setRole(TherapistRole.ADMIN);
                u.setActiveStatus(true);
                u = repo.save(u);
            }
            return Map.of("token", jwt.generate(u));
        }

        // In prod: must exist and password must match
        if (u == null)
            throw new RuntimeException("user not found");
        if (!encoder.matches(req.password(), u.getPasswordHash()))
            throw new RuntimeException("bad credentials");
        return Map.of("token", jwt.generate(u));
    }

    /**
     * Admin-only endpoint for registering new users.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/register")
    public Therapist register(@RequestBody RegisterReq req) {
        Therapist t = new Therapist();
        t.setUsername(req.username());
        t.setPasswordHash(encoder.encode(req.password()));
        t.setFirstName(req.firstName());
        t.setLastName(req.lastName());
        t.setEmail(req.email());
        t.setRole(req.role() == null ? TherapistRole.JUNIOR : req.role());
        return repo.save(t);
    }
}
