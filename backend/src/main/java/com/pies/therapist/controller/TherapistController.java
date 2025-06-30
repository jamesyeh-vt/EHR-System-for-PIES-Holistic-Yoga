package com.pies.therapist.controller;

import com.pies.therapist.model.Therapist;
import com.pies.therapist.service.TherapistService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** REST endpoints for Therapist CRUD */
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

    @GetMapping("{id}")
    public Therapist get(@PathVariable Long id) {
        return svc.findById(id);
    }

    @GetMapping
    public List<Therapist> list() {
        return svc.findAll();
    }
}
