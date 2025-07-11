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

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "IntakeForms")
@RestController
@RequestMapping("/intakes")
@RequiredArgsConstructor
public class IntakeController {

    private final IntakeService svc;

    @PostMapping
    public ResponseEntity<IntakeForm> create(@RequestBody @Valid IntakeRequest request) {
        // Convert request to IntakeForm and HealthHistory
        IntakeForm form = new IntakeForm();
        form.setPatient(request.getPatient());
        // form.setTherapistId(request.getTherapistId());
        form.setTherapist(null);  // Skip therapist for now
        form.setDateSubmitted(request.getIntakeDate());
        form.setPracticedYogaBefore(request.getPracticedYogaBefore());
        form.setLastPracticedDate(request.getLastPracticedDate());
        form.setYogaFrequency(request.getYogaFrequency());
        form.setYogaStyles(request.getYogaStyles());
        form.setYogaStyleOther(request.getYogaStyleOther());
        form.setYogaGoals(request.getYogaGoals());
        form.setYogaGoalsOther(request.getYogaGoalsOther());
        form.setYogaGoalsExplanation(request.getYogaGoalsExplanation());
        form.setYogaInterests(request.getYogaInterests());
        form.setYogaInterestsOther(request.getYogaInterestsOther());
        form.setActivityLevel(request.getActivityLevel());
        form.setStressLevel(request.getStressLevel());

        IntakeForm savedForm = svc.save(form);

        // Health history
        IntakeFormHealthHistory history = new IntakeFormHealthHistory();
        history.setIntakeForm(savedForm);
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

        svc.saveHealthHistory(history);

        return ResponseEntity.ok(savedForm);
    }

    @GetMapping("{id}")
    public IntakeForm get(@PathVariable Long id){
        return svc.findById(id);
    }

    @GetMapping
    public List<IntakeForm> list(){
        return svc.findAll();
    }
}
