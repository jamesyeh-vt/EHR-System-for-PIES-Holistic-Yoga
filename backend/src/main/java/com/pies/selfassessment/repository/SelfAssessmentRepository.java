package com.pies.selfassessment.repository;

import com.pies.selfassessment.model.SelfAssessment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SelfAssessmentRepository extends JpaRepository<SelfAssessment, Long> {
    Page<SelfAssessment> findByActiveStatusTrue(Pageable pageable);

    @Query("select s from SelfAssessment s where s.activeStatus=true" +
            " and (:q is null or lower(s.patient.firstName) like lower(concat('%', :q, '%'))" +
            " or lower(s.patient.lastName) like lower(concat('%', :q, '%'))) ")
    Page<SelfAssessment> search(@Param("q") String q, Pageable pageable);
}