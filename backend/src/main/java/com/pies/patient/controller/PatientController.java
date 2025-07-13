package com.pies.patient.controller;

import com.pies.patient.model.Patient;
import com.pies.patient.service.PatientService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

/**
 * REST endpoints for Patient CRUD
 */
@Tag(name = "Patients")
@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService svc;

    @PostMapping
    public Patient create(@RequestBody @Valid Patient p) {
        return svc.save(p);
    }

    @PutMapping("{id}")
    public Patient update(@PathVariable Long id, @RequestBody Patient p) {
        return svc.update(id, p);
    }

    @GetMapping("{id}")
    public Patient get(@PathVariable Long id) {
        return svc.findById(id);
    }

    @GetMapping
    public Page<Patient> list(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size,
                              @RequestParam(required = false) String q) {
        Pageable pageable = PageRequest.of(page, size);
        return svc.findActive(q, pageable);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        svc.delete(id);
    }
}