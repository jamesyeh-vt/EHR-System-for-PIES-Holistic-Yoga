package com.pies.soap.controller;

import com.pies.soap.model.SoapNote;
import com.pies.soap.service.SoapNoteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "SoapNotes")
@RestController
@RequestMapping("/soap-notes")
@RequiredArgsConstructor
public class SoapNoteController {

    private final SoapNoteService svc;

    public record SimpleResponse(String message) {
    }

    @PostMapping
    public ResponseEntity<SimpleResponse> create(@RequestBody @Valid SoapNote n) {
        svc.save(n);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SimpleResponse("SOAP note created successfully"));
    }

    @PutMapping("{id}")
    public ResponseEntity<SimpleResponse> update(@PathVariable Long id, @RequestBody SoapNote n) {
        svc.update(id, n);
        return ResponseEntity.ok(new SimpleResponse("SOAP note updated successfully"));
    }

    @GetMapping("{id}")
    public SoapNote get(@PathVariable Long id) {
        return svc.findById(id);
    }

    @GetMapping
    public Page<SoapNote> list(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "10") int size,
                               @RequestParam(required = false) String q) {
        Pageable pageable = PageRequest.of(page, size);
        return svc.findActive(q, pageable);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<SimpleResponse> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.ok(new SimpleResponse("SOAP note deleted successfully"));
    }
}