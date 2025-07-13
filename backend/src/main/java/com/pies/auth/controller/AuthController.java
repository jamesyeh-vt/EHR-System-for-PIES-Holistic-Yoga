package com.pies.auth.controller;

import com.pies.auth.JwtService;
import com.pies.therapist.model.Therapist;
import com.pies.therapist.model.TherapistRole;
import com.pies.therapist.repository.TherapistRepository;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@ConditionalOnProperty(
        name = "security.disable",
        havingValue = "false",
        matchIfMissing = true)
@RequiredArgsConstructor
public class AuthController {
    private final TherapistRepository repo;
    private final JwtService jwt;
    private final PasswordEncoder encoder;

    record LoginReq(@NotBlank String username, @NotBlank String password) {}

    record RegisterReq(@NotBlank String username,
                       @NotBlank String password,
                       String firstName,
                       String lastName,
                       String email,
                       TherapistRole role) {}

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginReq req) {
        var u = repo.findByUsername(req.username())
                .orElseThrow(() -> new RuntimeException("user not found"));
        if (!encoder.matches(req.password(), u.getPasswordHash()))
            throw new RuntimeException("bad cred");
        return Map.of("token", jwt.generate(u));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/register")
    public Therapist register(@RequestBody RegisterReq req){
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