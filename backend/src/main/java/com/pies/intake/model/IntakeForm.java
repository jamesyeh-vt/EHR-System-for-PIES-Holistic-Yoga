package com.pies.intake.model;

import com.pies.patient.model.Patient;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "intake_forms")
public class IntakeForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    private Boolean practicedYogaBefore;
    private String yogaFrequency;

    private boolean activeStatus = true;
}