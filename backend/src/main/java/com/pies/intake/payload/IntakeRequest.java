package com.pies.intake.payload;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pies.patient.model.Patient;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IntakeRequest {
    private Patient patient;
    private Long therapistId;
    private LocalDate intakeDate;

    private Boolean practicedYogaBefore;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastPracticedDate;
    private String yogaFrequency;
    private String yogaStyles;
    private String yogaStyleOther;
    private String yogaGoals;
    private String yogaGoalsOther;
    private String yogaGoalsExplanation;
    private String yogaInterests;
    private String yogaInterestsOther;
    private String activityLevel;
    private Integer stressLevel;

    private HealthHistoryRequest healthHistory;
}
