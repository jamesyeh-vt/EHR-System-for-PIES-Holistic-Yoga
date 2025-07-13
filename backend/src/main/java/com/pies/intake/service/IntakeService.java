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
    private final PatientRepository patientRepo;

    @Transactional
    public IntakeForm save(IntakeForm form, Patient patient) {
        // Save the patient first so we have a valid ID
        Patient savedPatient = patientRepo.save(patient);

        // Attach saved patient to the intake form
        form.setPatient(savedPatient);

        // Save the intake form
        return repo.save(form);
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

