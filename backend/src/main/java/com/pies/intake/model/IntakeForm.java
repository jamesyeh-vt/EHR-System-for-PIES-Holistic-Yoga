package com.pies.intake.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pies.patient.model.Patient;
import com.pies.therapist.model.Therapist;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "intake_forms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IntakeForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY) // id is only included in responses, not in requests
    private Long id;

    @OneToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateSubmitted;

    private Boolean practicedYogaBefore;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
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

    @OneToOne(mappedBy = "intakeForm", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private IntakeFormHealthHistory healthHistory;

    private boolean activeStatus = true;

    public IntakeFormHealthHistory getHealthHistory() {
        return healthHistory;
    }

    public void setHealthHistory(IntakeFormHealthHistory healthHistory) {
        this.healthHistory = healthHistory;
    }
}
