package com.pies.intake.repository;

import com.pies.intake.model.IntakeForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IntakeRepository extends JpaRepository<IntakeForm, Long> {}
