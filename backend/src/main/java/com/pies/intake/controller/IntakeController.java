package com.pies.intake.controller;

import com.pies.intake.model.IntakeForm;
import com.pies.intake.service.IntakeService;
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
 * REST endpoints for IntakeForm CRUD
 */
@Tag(name = "IntakeForms")
@RestController
@RequestMapping("/intakes")
@RequiredArgsConstructor
public class IntakeController {

    private final IntakeService svc;

    /**
     * Simple response structure for success messages.
     */
    public record SimpleResponse(String message) {
    }

    /**
     * Create a new intake form.
     * Returns HTTP 201 Created with a success message.
     */
    @PostMapping
    public ResponseEntity<SimpleResponse> create(@RequestBody @Valid IntakeForm f) {
        svc.save(f);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SimpleResponse("Intake form created successfully"));
    }

    /**
     * Update an existing intake form by ID.
     */
    @PutMapping("{id}")
    public ResponseEntity<SimpleResponse> update(@PathVariable Long id, @RequestBody IntakeForm f) {
        svc.update(id, f);
        return ResponseEntity.ok(new SimpleResponse("Intake form updated successfully"));
    }

    /**
     * Get an intake form by ID.
     */
    @GetMapping("{id}")
    public IntakeForm get(@PathVariable Long id) {
        return svc.findById(id);
    }

    /**
     * List all active intake forms, with optional search and pagination.
     */
    @GetMapping
    public Page<IntakeForm> list(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size,
                                 @RequestParam(required = false) String q) {
        Pageable pageable = PageRequest.of(page, size);
        return svc.findActive(q, pageable);
    }

    /**
     * Soft-delete an intake form by ID.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<SimpleResponse> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.ok(new SimpleResponse("Intake form deleted successfully"));
    }
}
