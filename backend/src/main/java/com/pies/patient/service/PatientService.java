package com.pies.patient.service;

import com.pies.patient.model.Patient;
import com.pies.patient.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository repo;

    @Transactional
    public Patient save(Patient p) { return repo.save(p); }

    public Patient findById(Long id){
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient " + id + " not found"));
    }

    public List<Patient> findAll(){ return repo.findAll(); }
}
