package com.pies.intake.controller;

import com.pies.intake.model.IntakeForm;
import com.pies.intake.service.IntakeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** REST endpoints for IntakeForm CRUD */
@Tag(name = "IntakeForms")
@RestController
@RequestMapping("/intakes")
@RequiredArgsConstructor
public class IntakeController {

    private final IntakeService svc;

    @PostMapping
    public IntakeForm create(@RequestBody @Valid IntakeForm f){
        return svc.save(f);
    }

    @GetMapping("{id}")
    public IntakeForm get(@PathVariable Long id){
        return svc.findById(id);
    }

    @GetMapping
    public List<IntakeForm> list(){
        return svc.findAll();
    }
}
