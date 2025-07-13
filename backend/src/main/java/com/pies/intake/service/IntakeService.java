package com.pies.intake.service;

import com.pies.audit.service.AuditLogService;
import com.pies.intake.model.IntakeForm;
import com.pies.intake.repository.IntakeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class IntakeService {

    private final IntakeRepository repo;
    private final AuditLogService audit;

    @Transactional
    public IntakeForm save(IntakeForm f) {
        var saved = repo.save(f);
        audit.record("CREATE", "IntakeForm", saved.getId());
        return saved;
    }

    @Transactional
    public IntakeForm update(Long id, IntakeForm in) {
        var f = findById(id);
        if (in.getPracticedYogaBefore() != null) f.setPracticedYogaBefore(in.getPracticedYogaBefore());
        if (in.getYogaFrequency() != null) f.setYogaFrequency(in.getYogaFrequency());
        var saved = repo.save(f);
        audit.record("UPDATE", "IntakeForm", saved.getId());
        return saved;
    }

    public IntakeForm findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Intake " + id + " not found"));
    }

    public Page<IntakeForm> findActive(String q, Pageable pageable) {
        if (q == null || q.isBlank()) return repo.findByActiveStatusTrue(pageable);
        return repo.search(q, pageable);
    }

    @Transactional
    public void delete(Long id) {
        var f = findById(id);
        f.setActiveStatus(false);
        repo.save(f);
        audit.record("DELETE", "IntakeForm", id);
    }
}