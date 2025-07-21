package com.pies.selfassessment.controller;

import com.pies.selfassessment.model.SelfAssessment;
import com.pies.selfassessment.service.SelfAssessmentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "SelfAssessments")
@RestController
@RequestMapping("/self-assessments")
@RequiredArgsConstructor
public class SelfAssessmentController {

    private final SelfAssessmentService svc;

    public record SimpleResponse(String message) {
    }

    @PostMapping
    public ResponseEntity<SimpleResponse> create(@RequestBody @Valid SelfAssessment a) {
        svc.save(a);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SimpleResponse("Self assessment created successfully"));
    }

    @PutMapping("{id}")
    public ResponseEntity<SimpleResponse> update(@PathVariable Long id, @RequestBody SelfAssessment a) {
        svc.update(id, a);
        return ResponseEntity.ok(new SimpleResponse("Self assessment updated successfully"));
    }

    @GetMapping("{id}")
    public SelfAssessment get(@PathVariable Long id) {
        return svc.findById(id);
    }

    @GetMapping
    public Page<SelfAssessment> list(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "10") int size,
                                     @RequestParam(required = false) String q) {
        Pageable pageable = PageRequest.of(page, size);
        return svc.findActive(q, pageable);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<SimpleResponse> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.ok(new SimpleResponse("Self assessment deleted successfully"));
    }
}