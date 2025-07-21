package com.pies.intake.controller;

import com.pies.intake.model.IntakeForm;
import com.pies.intake.model.IntakeFormHealthHistory;
import com.pies.intake.payload.IntakeRequest;
import com.pies.intake.service.IntakeService;
import com.pies.therapist.model.Therapist;
import com.pies.therapist.repository.TherapistRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "IntakeForms")
@RestController
@RequestMapping("/intakes")
@RequiredArgsConstructor
public class IntakeController {

    private final IntakeService svc;
    private final TherapistRepository therapistRepository;

    /** Simple response structure for success messages. */
    public record SimpleResponse(String message) {
    }

    /**
     * Create a new intake form with full field mapping logic.
     * Returns HTTP 201 Created with the saved object.
     */
    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid IntakeRequest request) {
        Therapist therapist = therapistRepository.findById(request.getTherapistId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Therapist not found with ID: " + request.getTherapistId()));

        IntakeForm form = new IntakeForm();
        form.setPatient(request.getPatient());
        form.setTherapist(therapist);
        form.setDateSubmitted(request.getIntakeDate());
        form.setPracticedYogaBefore(request.getPracticedYogaBefore());
        form.setLastPracticedDate(request.getLastPracticedDate());
        form.setYogaFrequency(request.getYogaFrequency());
        form.setYogaStyles(
                request.getYogaStyles() != null && !request.getYogaStyles().isEmpty()
                        ? String.join(",", request.getYogaStyles())
                        : null);
        form.setYogaStyleOther(request.getYogaStyleOther());
        form.setYogaGoals(
                request.getYogaGoals() != null && !request.getYogaGoals().isEmpty()
                        ? String.join(",", request.getYogaGoals())
                        : null);
        form.setYogaGoalsOther(request.getYogaGoalsOther());
        form.setYogaGoalsExplanation(request.getYogaGoalsExplanation());
        form.setYogaInterests(
                request.getYogaInterests() != null && !request.getYogaInterests().isEmpty()
                        ? String.join(",", request.getYogaInterests())
                        : null);
        form.setYogaInterestsOther(request.getYogaInterestsOther());
        form.setActivityLevel(request.getActivityLevel());
        form.setStressLevel(request.getStressLevel());

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
        return ResponseEntity.status(HttpStatus.CREATED).body(savedForm);
    }

    /** Update an existing intake form by ID. */
    @PutMapping("{id}")
    public ResponseEntity<SimpleResponse> update(@PathVariable Long id, @RequestBody IntakeForm f) {
        svc.update(id, f);
        return ResponseEntity.ok(new SimpleResponse("Intake form updated successfully"));
    }

    /** Get an intake form by ID. */
    @GetMapping("{id}")
    public IntakeForm get(@PathVariable Long id) {
        return svc.findById(id);
    }

    /** List all active intake forms, with optional search and paging. */
    @GetMapping
    public Page<IntakeForm> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String q) {
        Pageable pageable = PageRequest.of(page, size);
        return svc.findActive(q, pageable);
    }

    /** Soft-delete an intake form by ID. */
    @DeleteMapping("{id}")
    public ResponseEntity<SimpleResponse> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.ok(new SimpleResponse("Intake form deleted successfully"));
    }
}
