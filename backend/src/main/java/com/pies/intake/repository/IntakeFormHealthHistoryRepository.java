package com.pies.intake.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pies.intake.model.IntakeFormHealthHistory;

public interface IntakeFormHealthHistoryRepository extends JpaRepository<IntakeFormHealthHistory, Long> {
    
}
