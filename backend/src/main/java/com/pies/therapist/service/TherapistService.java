package com.pies.therapist.service;

import com.pies.therapist.model.Therapist;
import com.pies.therapist.repository.TherapistRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TherapistService {

    private final TherapistRepository repo;

    @Transactional
    public Therapist save(Therapist t) { return repo.save(t); }

    public Therapist findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Therapist " + id + " not found"));
    }

    public List<Therapist> findAll() { return repo.findAll(); }
}
