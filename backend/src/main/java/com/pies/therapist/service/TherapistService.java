package com.pies.therapist.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pies.therapist.model.Therapist;
import com.pies.therapist.repository.TherapistRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class TherapistService {

    private final TherapistRepository repo;
    private final PasswordEncoder passwordEncoder;


    @Transactional
    public Therapist save(Therapist t) {
        if (t.getRawPassword() != null && !t.getRawPassword().isBlank()) {
            t.setPasswordHash(passwordEncoder.encode(t.getRawPassword())); // hashes the transient password
        } else {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        return repo.save(t);
    }


    public Therapist findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Therapist " + id + " not found"));
    }

    public List<Therapist> findAll() {
        return repo.findAll();
    }
}
