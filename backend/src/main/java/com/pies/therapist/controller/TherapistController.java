package com.pies.therapist.controller;

import com.pies.therapist.model.Therapist;
import com.pies.therapist.service.TherapistService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

    @PostMapping
    public Therapist create(@RequestBody @Valid Therapist t) {
        return svc.save(t);
    }

    @PutMapping("{id}")
    public Therapist update(@PathVariable Long id, @RequestBody Therapist t) {
        return svc.update(id, t);
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
    public void delete(@PathVariable Long id) {
        svc.delete(id);
    }
}