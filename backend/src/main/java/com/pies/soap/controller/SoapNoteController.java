package com.pies.soap.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pies.soap.model.SoapNote;
import com.pies.soap.service.SoapNoteService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "SoapNotes")
@RestController
@RequestMapping("/soap-notes")
@RequiredArgsConstructor
public class SoapNoteController {

    private final SoapNoteService svc;

    /** Simple response structure for success messages. */
    public record SimpleResponse(String message) {
    }

    /** Create a new SOAP note. JUNIOR, SENIOR, and ADMIN roles allowed. */
    @PreAuthorize("hasAnyRole('JUNIOR', 'SENIOR', 'ADMIN')")
    @PostMapping
    public ResponseEntity<SimpleResponse> create(@RequestBody @Valid SoapNote n) {
        svc.save(n);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SimpleResponse("SOAP note created successfully"));
    }

    /** Update an existing SOAP note. Only SENIOR and ADMIN allowed. */
    @PreAuthorize("hasAnyRole('SENIOR', 'ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<SimpleResponse> update(@PathVariable Long id, @RequestBody SoapNote n) {
        svc.update(id, n);
        return ResponseEntity.ok(new SimpleResponse("SOAP note updated successfully"));
    }

    /** Get a SOAP note by ID. All roles can view. */
    @PreAuthorize("hasAnyRole('JUNIOR', 'SENIOR', 'ADMIN')")
    @GetMapping("{id}")
    public SoapNote get(@PathVariable Long id) {
        return svc.findById(id);
    }

    /** List all active SOAP notes. All roles can view their assigned data. */
    @PreAuthorize("hasAnyRole('JUNIOR', 'SENIOR', 'ADMIN')")
    @GetMapping
    public Page<SoapNote> list(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "10") int size,
                               @RequestParam(required = false) String q) {
        Pageable pageable = PageRequest.of(page, size);
        return svc.findActive(q, pageable);
    }

    /** Soft-delete a SOAP note by ID. Only SENIOR and ADMIN allowed. */
    @PreAuthorize("hasAnyRole('SENIOR', 'ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<SimpleResponse> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.ok(new SimpleResponse("SOAP note deleted successfully"));
    }
}
