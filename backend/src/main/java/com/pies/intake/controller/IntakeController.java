package com.pies.intake.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pies.intake.model.IntakeForm;
import com.pies.intake.model.IntakeFormHealthHistory;
import com.pies.intake.payload.IntakeRequest;
import com.pies.intake.service.IntakeService;
import com.pies.therapist.model.Therapist;
import com.pies.therapist.repository.TherapistRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/intakes")
public class IntakeController {

    private final IntakeService svc;
    private final TherapistRepository therapistRepository;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid IntakeRequest request) {
        try {
            Therapist therapist = therapistRepository.findById(request.getTherapistId())
                    .orElseThrow(() -> new EntityNotFoundException("Therapist not found with ID: " + request.getTherapistId()));

            // Build IntakeForm
            IntakeForm form = new IntakeForm();
            form.setPatient(request.getPatient()); // Will be saved if new
            form.setTherapist(therapist);
            form.setDateSubmitted(request.getIntakeDate());
            form.setPracticedYogaBefore(request.getPracticedYogaBefore());
            form.setLastPracticedDate(request.getLastPracticedDate());
            form.setYogaFrequency(request.getYogaFrequency());

            // Convert List<String> to comma-separated Strings
            form.setYogaStyles(request.getYogaStyles() != null ? String.join(",", request.getYogaStyles()) : null);
            form.setYogaStyleOther(request.getYogaStyleOther());
            form.setYogaGoals(request.getYogaGoals() != null ? String.join(",", request.getYogaGoals()) : null);
            form.setYogaGoalsOther(request.getYogaGoalsOther());
            form.setYogaGoalsExplanation(request.getYogaGoalsExplanation());
            form.setYogaInterests(request.getYogaInterests() != null ? String.join(",", request.getYogaInterests()) : null);
            form.setYogaInterestsOther(request.getYogaInterestsOther());

            form.setActivityLevel(request.getActivityLevel());
            form.setStressLevel(request.getStressLevel());

            // Build Health History
            IntakeFormHealthHistory history = new IntakeFormHealthHistory();
            history.setAnxietyDepression(request.getHealthHistory().getAnxietyDepression());
            history.setArthritisBursitis(request.getHealthHistory().getArthritisBursitis());
            history.setAsthma(request.getHealthHistory().getAsthma());
            history.setAutoimmune(request.getHealthHistory().getAutoimmune());
            history.setBackProblems(request.getHealthHistory().getBackProblems());
            history.setBloodPressure(request.getHealthHistory().getBloodPressure());
            history.setBrokenBones(request.getHealthHistory().getBrokenBones());
            history.setCancer(request.getHealthHistory().getCancer());
            history.setDiabetes(request.getHealthHistory().getDiabetes());
            history.setDiscProblems(request.getHealthHistory().getDiscProblems());
            history.setHeartConditions(request.getHealthHistory().getHeartConditions());
            history.setInsomnia(request.getHealthHistory().getInsomnia());
            history.setMuscleStrain(request.getHealthHistory().getMuscleStrain());
            history.setNumbnessTingling(request.getHealthHistory().getNumbnessTingling());
            history.setOsteoporosis(request.getHealthHistory().getOsteoporosis());
            history.setPregnancy(request.getHealthHistory().getPregnancy());
            history.setPregnancyEdd(request.getHealthHistory().getPregnancyEdd());
            history.setScoliosis(request.getHealthHistory().getScoliosis());
            history.setSeizures(request.getHealthHistory().getSeizures());
            history.setStroke(request.getHealthHistory().getStroke());
            history.setSurgery(request.getHealthHistory().getSurgery());
            history.setMedications(request.getHealthHistory().getMedications());
            history.setMedicationsList(request.getHealthHistory().getMedicationsList());
            history.setAdditionalNotes(request.getHealthHistory().getAdditionalNotes());

            
            IntakeForm savedForm = svc.save(form, history);

            return ResponseEntity.ok(savedForm);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to save intake form: " + e.getMessage());
        }
    }

    @GetMapping("{id}")
    public IntakeForm get(@PathVariable Long id) {
        return svc.findById(id);
    }

    @GetMapping
    public List<IntakeForm> list() {
        return svc.findAll();
    }
}
