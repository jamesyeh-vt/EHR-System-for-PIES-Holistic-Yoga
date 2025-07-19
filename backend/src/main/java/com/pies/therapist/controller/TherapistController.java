package com.pies.therapist.controller;

import com.pies.therapist.model.Therapist;
import com.pies.therapist.service.TherapistService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST endpoints for Therapist CRUD operations.
 */
@Tag(name = "Therapists")
@RestController
@RequestMapping("/therapists")
@RequiredArgsConstructor
public class TherapistController {

    private final TherapistService svc;

    /** Simple response structure for standardized success messages. */
    public record SimpleResponse(String message) {
    }

    /**
     * Creates a new therapist.
     * 
     * @param t Therapist payload.
     * @return SimpleResponse or error message.
     */
    @PostMapping
    public ResponseEntity<SimpleResponse> create(@RequestBody @Valid Therapist t) {
        svc.save(t);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SimpleResponse("Therapist created successfully"));
    }

    /**
     * Updates an existing therapist by ID.
     * 
     * @param id Therapist ID.
     * @param t  Therapist payload.
     * @return SimpleResponse.
     */
    @PutMapping("{id}")
    public ResponseEntity<SimpleResponse> update(@PathVariable Long id, @RequestBody Therapist t) {
        svc.update(id, t);
        return ResponseEntity.ok(new SimpleResponse("Therapist updated successfully"));
    }

    /**
     * Retrieves a therapist by ID.
     * 
     * @param id Therapist ID.
     * @return Therapist entity.
     */
    @GetMapping("{id}")
    public Therapist get(@PathVariable Long id) {
        return svc.findById(id);
    }

    /**
     * Retrieves a paginated list of active therapists, with optional search.
     * 
     * @param page Page number.
     * @param size Page size.
     * @param q    Search query (optional).
     * @return Page of Therapist entities.
     */
    @GetMapping
    public Page<Therapist> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String q) {
        Pageable pageable = PageRequest.of(page, size);
        return svc.findActive(q, pageable);
    }

    /**
     * Soft-deletes a therapist by ID.
     * 
     * @param id Therapist ID.
     * @return SimpleResponse.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<SimpleResponse> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.ok(new SimpleResponse("Therapist deleted successfully"));
    }
}
