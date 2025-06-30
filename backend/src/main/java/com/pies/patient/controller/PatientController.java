package com.pies.patient.controller;

import com.pies.patient.model.Patient;
import com.pies.patient.service.PatientService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** REST endpoints for Patient CRUD */
@Tag(name = "Patients")
@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService svc;

    @PostMapping
    public Patient create(@RequestBody @Valid Patient p){
        return svc.save(p);
    }

    @GetMapping("{id}")
    public Patient get(@PathVariable Long id){
        return svc.findById(id);
    }

    @GetMapping
    public List<Patient> list(){
        return svc.findAll();
    }
}
