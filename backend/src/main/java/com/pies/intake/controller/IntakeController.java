package com.pies.intake.controller;

import com.pies.intake.model.IntakeForm;
import com.pies.intake.service.IntakeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

    @PostMapping
    public IntakeForm create(@RequestBody @Valid IntakeForm f) {
        return svc.save(f);
    }

    @PutMapping("{id}")
    public IntakeForm update(@PathVariable Long id, @RequestBody IntakeForm f) {
        return svc.update(id, f);
    }

    @GetMapping("{id}")
    public IntakeForm get(@PathVariable Long id) {
        return svc.findById(id);
    }

    @GetMapping
    public Page<IntakeForm> list(@RequestParam(defaultValue = "0") int page,
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