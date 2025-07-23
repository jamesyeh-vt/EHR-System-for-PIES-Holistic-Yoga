package com.pies.patient.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pies.patient.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Page<Patient> findByActiveStatusTrue(Pageable pageable);

    @Query("select p from Patient p where p.activeStatus=true and " +
            "(lower(p.firstName) like lower(concat('%', :q, '%')) " +
            "or lower(p.lastName) like lower(concat('%', :q, '%')))")
    Page<Patient> search(@Param("q") String q, Pageable pageable);
}