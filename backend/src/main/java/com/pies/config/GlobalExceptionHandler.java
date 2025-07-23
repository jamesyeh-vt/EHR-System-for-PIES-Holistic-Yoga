package com.pies.config;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  

     @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleException(Exception e) {
        logger.error("Global exception caught", e);  // This will log full trace

        Map<String, Object> response = new HashMap<>();
        response.put("status", 500);
        response.put("message", e.getMessage());

        List<String> trace = Arrays.stream(e.getStackTrace())
                .map(StackTraceElement::toString)
                .toList();
        response.put("stackTrace", trace);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
