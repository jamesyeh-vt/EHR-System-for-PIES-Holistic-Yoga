package com.pies.intake.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "intake_form_health_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IntakeFormHealthHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "intake_form_id", nullable = false)
    private IntakeForm intakeForm;
    @JsonIgnore
    public IntakeForm getIntakeForm() {
        return intakeForm;
    }


    private Boolean anxietyDepression;
    private Boolean arthritisBursitis;
    private Boolean asthma;
    private Boolean autoimmune;
    private Boolean backProblems;
    private Boolean bloodPressure;
    private Boolean brokenBones;
    private Boolean cancer;
    private Boolean diabetes;
    private Boolean discProblems;
    private Boolean heartConditions;
    private Boolean insomnia;
    private Boolean muscleStrain;
    private Boolean numbnessTingling;
    private Boolean osteoporosis;
    private Boolean pregnancy;
    private String pregnancyEdd;
    private Boolean scoliosis;
    private Boolean seizures;
    private Boolean stroke;
    private Boolean surgery;
    private Boolean medications;
    private String medicationsList;
    private String additionalNotes;
}
