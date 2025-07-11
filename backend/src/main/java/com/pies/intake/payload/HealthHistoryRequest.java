package com.pies.intake.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HealthHistoryRequest {
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
