package com.pies.intake.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pies.intake.model.IntakeForm;


public interface IntakeRepository extends JpaRepository<IntakeForm, Long> {

    Page<IntakeForm> findByActiveStatusTrue(Pageable pageable);
    
    Optional<IntakeForm> findTopByPatientIdAndActiveStatusTrueOrderByIdDesc(Long patientId);

    @Query("select i from IntakeForm i where i.activeStatus=true" +
            " and (:q is null or lower(i.patient.firstName) like lower(concat('%', :q, '%'))" +
            " or lower(i.patient.lastName) like lower(concat('%', :q, '%'))) ")
    Page<IntakeForm> search(@Param("q") String q, Pageable pageable);
}