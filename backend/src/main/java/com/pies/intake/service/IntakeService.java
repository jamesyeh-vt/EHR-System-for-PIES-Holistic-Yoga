package com.pies.intake.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pies.intake.model.IntakeForm;
import com.pies.intake.model.IntakeFormHealthHistory;
import com.pies.intake.repository.IntakeFormHealthHistoryRepository;
import com.pies.intake.repository.IntakeRepository;
import com.pies.patient.model.Patient;
import com.pies.patient.repository.PatientRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IntakeService {

    private final IntakeRepository repo;
    private final IntakeFormHealthHistoryRepository healthRepo;
    private final PatientRepository patientRepository;

    @Transactional
    public IntakeForm save(IntakeForm form, IntakeFormHealthHistory history) {
        // Save the patient if not already persisted
        if (form.getPatient() != null && form.getPatient().getId() == null) {
            Patient savedPatient = patientRepository.save(form.getPatient());
            form.setPatient(savedPatient);
        }

        // Save the intake form
        IntakeForm savedForm = repo.save(form);

        // Save the health history (link to intake form)
        if (history != null) {
            history.setIntakeForm(savedForm);
            healthRepo.save(history);
        }

    return savedForm;
}

    @Transactional
    public void saveHealthHistory(IntakeFormHealthHistory history) {
        healthRepo.save(history);
    }

    public IntakeForm findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Intake " + id + " not found"));
    }

    public List<IntakeForm> findAll() {
        return repo.findAll();
    }
}

