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

    private boolean anxietyDepression;
    private boolean arthritisBursitis;
    private boolean asthma;
    private boolean autoimmune;
    private boolean backProblems;
    private boolean bloodPressure;
    private boolean brokenBones;
    private boolean cancer;
    private boolean diabetes;
    private boolean discProblems;
    private boolean heartConditions;
    private boolean insomnia;
    private boolean muscleStrain;
    private boolean numbnessTingling;
    private boolean osteoporosis;
    private boolean pregnancy;
    private String pregnancyEdd;
    private boolean scoliosis;
    private boolean seizures;
    private boolean stroke;
    private boolean surgery;
    private boolean medications;
    private String medicationsList;
    private String additionalNotes;

    public void setIntakeForm(IntakeForm intakeForm) {
        this.intakeForm = intakeForm;
    }

}
