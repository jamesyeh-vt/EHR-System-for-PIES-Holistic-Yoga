package com.pies.therapist.repository;

import com.pies.therapist.model.Therapist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/** Data access layer for Therapist entity */
public interface TherapistRepository extends JpaRepository<Therapist, Long> {

    /** Used by authentication & login */
    Optional<Therapist> findByUsername(String username);
}
