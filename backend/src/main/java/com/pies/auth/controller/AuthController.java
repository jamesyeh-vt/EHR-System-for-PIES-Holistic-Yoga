package com.pies.auth.controller;

import com.pies.auth.JwtService;
import com.pies.therapist.repository.TherapistRepository;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
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

    record LoginReq(@NotBlank String username, @NotBlank String password) {
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginReq req) {
        var u = repo.findByUsername(req.username())
                .orElseThrow(() -> new RuntimeException("user not found"));
        if (!encoder.matches(req.password(), u.getPasswordHash()))
            throw new RuntimeException("bad cred");
        return Map.of("token", jwt.generate(u));
    }
}
