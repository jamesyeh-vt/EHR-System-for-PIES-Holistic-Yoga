package com.pies.patient.controller;

import com.pies.patient.model.Patient;
import com.pies.patient.service.PatientService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    /**
     * Simple response structure for success messages.
     */
    public record SimpleResponse(String message) {
    }

    /**
     * Create a new patient.
     * Returns HTTP 201 Created with a success message.
     */
    @PostMapping
    public ResponseEntity<SimpleResponse> create(@RequestBody @Valid Patient p) {
        svc.save(p);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SimpleResponse("Patient created successfully"));
    }

    /**
     * Update an existing patient by ID.
     */
    @PutMapping("{id}")
    public ResponseEntity<SimpleResponse> update(@PathVariable Long id, @RequestBody Patient p) {
        svc.update(id, p);
        return ResponseEntity.ok(new SimpleResponse("Patient updated successfully"));
    }

    /**
     * Get a patient by ID.
     */
    @GetMapping("{id}")
    public Patient get(@PathVariable Long id) {
        return svc.findById(id);
    }

    /**
     * List all active patients, with optional search and pagination.
     */
    @GetMapping
    public Page<Patient> list(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size,
                              @RequestParam(required = false) String q) {
        Pageable pageable = PageRequest.of(page, size);
        return svc.findActive(q, pageable);
    }

    /**
     * Soft-delete a patient by ID.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<SimpleResponse> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.ok(new SimpleResponse("Patient deleted successfully"));
    }
}
