package com.pies.therapist.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pies.therapist.model.Therapist;
import com.pies.therapist.service.TherapistService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/** REST endpoints for Therapist CRUD */
@Tag(name = "Therapists")
@RestController
@RequestMapping("/therapists")
@RequiredArgsConstructor
public class TherapistController {

    private final TherapistService svc;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid Therapist t) {
        if (t == null) {
            return ResponseEntity.badRequest().body("Therapist payload is missing.");
        }

        try {
            System.out.println("Creating therapist: " + t.getUsername()); // basic debug
            Therapist saved = svc.save(t);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to create therapist: " + e.getMessage());
        }
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


