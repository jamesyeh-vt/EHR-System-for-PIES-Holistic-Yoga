package com.pies.therapist.service;

import com.pies.audit.service.AuditLogService;
import com.pies.therapist.model.Therapist;
import com.pies.therapist.repository.TherapistRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TherapistService {

    private final TherapistRepository repo;
    private final PasswordEncoder encoder;
    private final AuditLogService audit;

    @Transactional
    public Therapist save(Therapist t) {
        t.setPasswordHash(encoder.encode(t.getRawPassword()));
        var saved = repo.save(t);
        audit.record("CREATE", "Therapist", saved.getId());
        return saved;
    }

    @Transactional
    public Therapist update(Long id, Therapist in) {
        var t = findById(id);
        if (in.getFirstName() != null) t.setFirstName(in.getFirstName());
        if (in.getLastName() != null) t.setLastName(in.getLastName());
        if (in.getEmail() != null) t.setEmail(in.getEmail());
        if (in.getPhoneNumber() != null) t.setPhoneNumber(in.getPhoneNumber());
        if (in.getRawPassword() != null)
            t.setPasswordHash(encoder.encode(in.getRawPassword()));
        var saved = repo.save(t);
        audit.record("UPDATE", "Therapist", saved.getId());
        return saved;
    }

    public Therapist findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Therapist " + id + " not found"));
    }

    public Page<Therapist> findActive(String q, Pageable pageable) {
        if (q == null || q.isBlank()) return repo.findByActiveStatusTrue(pageable);
        return repo.search(q, pageable);
    }

    @Transactional
    public void delete(Long id) {
        var t = findById(id);
        t.setActiveStatus(false);
        repo.save(t);
        audit.record("DELETE", "Therapist", id);
    }
}