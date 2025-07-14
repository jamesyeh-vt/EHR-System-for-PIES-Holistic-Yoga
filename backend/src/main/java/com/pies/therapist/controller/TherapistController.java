package com.pies.therapist.controller;

import com.pies.therapist.model.Therapist;
import com.pies.therapist.service.TherapistService;
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
 * REST endpoints for Therapist CRUD
 */
@Tag(name = "Therapists")
@RestController
@RequestMapping("/therapists")
@RequiredArgsConstructor
public class TherapistController {

    private final TherapistService svc;

    public record SimpleResponse(String message) {
    }

    @PostMapping
    public ResponseEntity<SimpleResponse> create(@RequestBody @Valid Therapist t) {
        svc.save(t);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SimpleResponse("Therapist created successfully"));
    }

    @PutMapping("{id}")
    public ResponseEntity<SimpleResponse> update(@PathVariable Long id, @RequestBody Therapist t) {
        svc.update(id, t);
        return ResponseEntity.ok(new SimpleResponse("Therapist updated successfully"));
    }

    @GetMapping("{id}")
    public Therapist get(@PathVariable Long id) {
        return svc.findById(id);
    }

    @GetMapping
    public Page<Therapist> list(@RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "10") int size,
                                @RequestParam(required = false) String q) {
        Pageable pageable = PageRequest.of(page, size);
        return svc.findActive(q, pageable);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<SimpleResponse> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.ok(new SimpleResponse("Therapist deleted successfully"));
    }
}