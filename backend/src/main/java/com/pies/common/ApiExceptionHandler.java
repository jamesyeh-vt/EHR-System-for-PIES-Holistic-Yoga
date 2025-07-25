package com.pies.common;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.persistence.EntityNotFoundException;

/**
 * Global API Exception Handler for standardized error responses.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    /**
     * Standard API error response structure.
     *
     * @param status  HTTP status code
     * @param message Error message for the client
     */
    record ApiError(int status, String message) {
    }

    /**
     * Handles cases where an entity is not found (HTTP 404).
     */
    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiError handleNotFound(EntityNotFoundException ex) {
        return new ApiError(404, ex.getMessage());
    }

    /**
     * Handles data integrity violations, such as duplicate keys (HTTP 409).
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiError handleConflict(DataIntegrityViolationException ex) {
        String detailedMessage = ex.getMostSpecificCause() != null
            ? ex.getMostSpecificCause().getMessage()
            : ex.getMessage();
        return new ApiError(409, "Data Integrity Violation: " + detailedMessage);
    }

    /**
     * Handles invalid arguments from client requests (HTTP 400).
     */
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleBadRequest(IllegalArgumentException ex) {
        return new ApiError(400, ex.getMessage());
    }

    /**
     * Handles all uncaught exceptions (HTTP 500).
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiError handleInternal(Exception ex) {
        return new ApiError(500, "Internal server error");
    }
}