package com.pies.patient.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pies.audit.service.AuditLogService;
import com.pies.patient.model.Patient;
import com.pies.patient.payload.PatientRequest;
import com.pies.patient.repository.PatientRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository repo;
    private final AuditLogService audit;

    @Transactional
    public Patient save(Patient p) {
        var saved = repo.save(p);
        audit.record("CREATE", "Patient", saved.getId());
        return saved;
    }

    @Transactional
    public Patient update(Long id, Patient in) {
        var p = findById(id);
        if (in.getFirstName() != null) p.setFirstName(in.getFirstName());
        if (in.getLastName() != null) p.setLastName(in.getLastName());
        if (in.getDateOfBirth() != null) p.setDateOfBirth(in.getDateOfBirth());
        if (in.getEmail() != null) p.setEmail(in.getEmail());
        var saved = repo.save(p);
        audit.record("UPDATE", "Patient", saved.getId());
        return saved;
    }

    public Patient findById(Long id) {
        var p = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient " + id + " not found"));
        if (!p.isActiveStatus()) {
            throw new EntityNotFoundException("Patient " + id + " not found");
        }
        return p;
    }

    public Page<Patient> findActive(String q, Pageable pageable) {
        if (q == null || q.isBlank()) return repo.findByActiveStatusTrue(pageable);
        return repo.search(q, pageable);
    }

    @Transactional
    public void delete(Long id) {
        var p = findById(id);
        p.setActiveStatus(false);
        repo.save(p);
        audit.record("DELETE", "Patient", id);
    }
    @Transactional
    public Patient createFromRequest(PatientRequest req) {
        Patient p = new Patient();
        mapRequestToEntity(req, p);
        var saved = repo.save(p);
        audit.record("CREATE", "Patient", saved.getId());
        return saved;
    }

    @Transactional
    public Patient updateFromRequest(Long id, PatientRequest req) {
        var p = findById(id);
        mapRequestToEntity(req, p);
        var saved = repo.save(p);
        audit.record("UPDATE", "Patient", saved.getId());
        return saved;
    }

    private void mapRequestToEntity(PatientRequest req, Patient p) {
        p.setFirstName(req.getFirstName());
        p.setLastName(req.getLastName());
        p.setDateOfBirth(req.getDateOfBirth());
        p.setAddress(req.getAddress());
        p.setCity(req.getCity());
        p.setState(req.getState());
        p.setZipCode(req.getZipCode());
        p.setEmail(req.getEmail());
        p.setHomePhoneNumber(req.getHomePhoneNumber());
        p.setCellPhoneNumber(req.getCellPhoneNumber());
        p.setWorkPhoneNumber(req.getWorkPhoneNumber());
        p.setEmergencyContactName(req.getEmergencyContactName());
        p.setEmergencyContactPhone(req.getEmergencyContactPhone());
        p.setReferredBy(req.getReferredBy());
    }
}