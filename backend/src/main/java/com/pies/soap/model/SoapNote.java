package com.pies.soap.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pies.patient.model.Patient;
import com.pies.therapist.model.Therapist;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "soap_notes")
@Getter
@Setter
@NoArgsConstructor
public class SoapNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;

    private LocalDate dateOfSession;
    private String sessionLength;
    private String typeOfSession;
    private String sNotes;
    private String oNotes;
    private String aNotes;
    private String pNotes;

    private boolean activeStatus = true;
}