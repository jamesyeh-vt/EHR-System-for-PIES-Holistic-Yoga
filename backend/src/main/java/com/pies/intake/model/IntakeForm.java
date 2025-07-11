package com.pies.intake.model;

import java.time.LocalDate;

import com.pies.patient.model.Patient;
import com.pies.therapist.model.Therapist;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
    private Long id;

    @OneToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;

    private LocalDate dateSubmitted;
    private Boolean practicedYogaBefore;
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

    @OneToOne(mappedBy = "intakeForm", cascade = CascadeType.ALL)
    private IntakeFormHealthHistory healthHistory;
}

