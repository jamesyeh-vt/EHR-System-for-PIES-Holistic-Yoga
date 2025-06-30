package com.pies.intake.service;

import com.pies.intake.model.IntakeForm;
import com.pies.intake.repository.IntakeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IntakeService {

    private final IntakeRepository repo;

    @Transactional
    public IntakeForm save(IntakeForm f){ return repo.save(f); }

    public IntakeForm findById(Long id){
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Intake " + id + " not found"));
    }

    public List<IntakeForm> findAll(){ return repo.findAll(); }
}
