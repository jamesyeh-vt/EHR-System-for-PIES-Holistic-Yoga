import { useForm } from "react-hook-form";
import { TextInput } from "../components/TextInput";
import { CheckBoxGroup } from "../components/CheckBoxGroup";
import { SignaturePadField } from "../components/SignaturePadField";
import { useState, useEffect } from "react";
import { apiFetch } from "../utils/api";

const yogaStyles = [
  "Hatha", "Ashtanga", "Vinyasa/Flow", "Iyengar", "Power", "Anusara",
  "Bikram/Hot", "Forrest", "Kundalini", "Gentle", "Restorative", "Yin"
];

const activityLevels = [
  "Sedentary/Very inactive", "Somewhat inactive", "Average",
  "Somewhat active", "Extremely active"
];

const physicalHistoryConditions = [
  "Broken/Dislocated bones", "Muscle strain/sprain", "Arthritis/Bursitis",
  "Disc problems", "Scoliosis", "Back problems", "Osteoporosis",
  "Diabetes type 1 or 2", "High/Low blood pressure", "Insomnia",
  "Anxiety/Depression", "Asthma / Short breath", "Numbness / Tingling",
  "Cancer", "Seizures", "Stroke", "Heart conditions / Chest pain",
  "Pregnancy", "Auto​-immune condition", "Surgery"
];

export default function IntakeFormPage() {
  const { register, handleSubmit, reset, watch } = useForm();
  const [therapists, setTherapists] = useState([]);
  const practicedBefore = watch("practicedBefore");

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await apiFetch("http://localhost:8080/therapists/active");
        if (!res.ok) throw new Error("Failed to load therapists");
        const data = await res.json();
        setTherapists(data);
      } catch (err) {
        console.error("Error loading therapists:", err);
      }
    };
    fetchTherapists();
  }, []);

  const onSubmit = async (data) => {
    const today = new Date().toISOString().split("T")[0];
    const getSelectedOptions = (prefix, options) => {
      return options.filter(opt => data[`${prefix}.${opt.replace(/\s+/g, "_")}`]);
    };

    const selectedYogaStyles = getSelectedOptions("styles", [...yogaStyles, "Other"]);
    const selectedYogaGoals = getSelectedOptions("goals", [
      "Improve fitness", "Increase well​-being", "Injury rehabilitation",
      "Positive reinforcement", "Strength training", "Weight management", "Other"
    ]);
    const selectedYogaInterests = getSelectedOptions("interests", [
      "Asana (postures)", "Pranayama (breath work)", "Meditation",
      "Yoga Philosophy", "Eastern energy systems", "Other"
    ]);

    console.log("Raw form data:", data)

    const payload = {
      patient: {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        dateOfBirth: data.dob,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        email: data.email,
        homePhoneNumber: data.homePhone,
        cellPhoneNumber: data.cellPhone,
        workPhoneNumber: data.workPhone,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        referredBy: data.referredBy,
        dateCreated: today
      },
      therapistId: parseInt(data.therapistId) || null,
      intakeDate: today,
      practicedYogaBefore: data.practicedBefore === "yes",
      lastPracticedDate: data.lastPracticeDate || null,
      yogaFrequency: data.practiceFrequency || null,
      yogaStyles: selectedYogaStyles,
      yogaStyleOther: data.styles?.Other || "",
      yogaGoals: selectedYogaGoals,
      yogaGoalsOther: data.goals?.Other || "",
      yogaGoalsExplanation: data.goalExplanation || "",
      yogaInterests: selectedYogaInterests,
      yogaInterestsOther: data.interests?.Other || "",
      activityLevel: data.activityLevel,
      stressLevel: parseInt(data.stressLevel) || 0,
      healthHistory: {
        anxietyDepression: !!data["physicalHistory.Anxiety_Depression"],
        arthritisBursitis: !!data["physicalHistory.Arthritis_Bursitis"],
        asthma: !!data["physicalHistory.Asthma___Short_breath"],
        autoimmune: !!data["physicalHistory.Auto__immune_condition"],
        backProblems: !!data["physicalHistory.Back_problems"],
        bloodPressure: !!data["physicalHistory.High_Low_blood_pressure"],
        brokenBones: !!data["physicalHistory.Broken_Dislocated_bones"],
        cancer: !!data["physicalHistory.Cancer"],
        diabetes: !!data["physicalHistory.Diabetes_type_1_or_2"],
        discProblems: !!data["physicalHistory.Disc_problems"],
        heartConditions: !!data["physicalHistory.Heart_conditions___Chest_pain"],
        insomnia: !!data["physicalHistory.Insomnia"],
        muscleStrain: !!data["physicalHistory.Muscle_strain_sprain"],
        numbnessTingling: !!data["physicalHistory.Numbness___Tingling"],
        osteoporosis: !!data["physicalHistory.Osteoporosis"],
        pregnancy: !!data["physicalHistory.Pregnancy"],
        pregnancyEdd: data.pregnancyEdd || null,
        scoliosis: !!data["physicalHistory.Scoliosis"],
        seizures: !!data["physicalHistory.Seizures"],
        stroke: !!data["physicalHistory.Stroke"],
        surgery: !!data["physicalHistory.Surgery"],
        medications: !!data.medications,
        medicationsList: data.medications || "",
        additionalNotes: data.additionalDetails || "",
      }

    };
    console.log("Submitting payload:", JSON.stringify(payload, null, 2));


    try {
      const res = await apiFetch("http://localhost:8080/intakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to submit intake form");
      alert("Form submitted successfully!");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting intake form.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
      {/* --- Personal Info --- */}
      <h2 className="text-xl font-semibold text-brandLavender">Confidential Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <TextInput label="First Name" name="firstName" register={register} required />
        <TextInput label="Last Name" name="lastName" register={register} required />
        <TextInput label="Date of Birth" name="dob" type="date" register={register} required />
        <TextInput label="Address" name="address" register={register} required className="md:col-span-2" />
        <TextInput label="City" name="city" register={register} required />
        <TextInput label="State" name="state" register={register} required />
        <TextInput label="Zip Code" name="zipCode" register={register} required />
        <TextInput label="Home Phone" name="homePhone" register={register} />
        <TextInput label="Cell Phone" name="cellPhone" register={register} />
        <TextInput label="Work Phone" name="workPhone" register={register} />
        <TextInput label="Email" name="email" type="email" register={register} />
        <TextInput label="Occupation" name="occupation" register={register} />
        <TextInput label="Emergency Contact Name" name="emergencyContactName" register={register} required />
        <TextInput label="Emergency Contact Phone" name="emergencyContactPhone" register={register} required />
        <TextInput label="Referred By" name="referredBy" register={register} className="md:col-span-2" />
      </div>

      {/* --- Therapist --- */}
      <h3 className="text-lg font-semibold text-brandLavender">Therapist Assignment</h3>
      <label className="block mb-2 font-medium">Select Therapist (optional)</label>
      <select {...register("therapistId")} className="border rounded p-2 mb-6">
        <option value="">-- No Therapist Assigned --</option>
        {therapists.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>

      {/* --- Yoga Experience --- */}
      <h3 className="text-lg font-semibold text-brandLavender">Yoga Experience & Goals</h3>
      <label className="block mb-2 font-medium">Have you practiced yoga before?</label>
      <div className="flex items-center space-x-4">
        <label className="inline-flex items-center space-x-2">
          <input type="radio" value="no" {...register("practicedBefore")} />
          <span>No</span>
        </label>
        <label className="inline-flex items-center space-x-2">
          <input type="radio" value="yes" {...register("practicedBefore")} />
          <span>Yes (provide date)</span>
        </label>
        {practicedBefore === "yes" && (
          <input type="date" {...register("lastPracticeDate")} className="border rounded p-1" />
        )}
      </div>

      {practicedBefore === "yes" && (
        <>
          <label className="block font-medium mt-4 mb-2">How often do you practice?</label>
          <select {...register("practiceFrequency")} className="border rounded p-2">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <CheckBoxGroup title="Styles Practiced Most Frequently" namePrefix="styles" options={[...yogaStyles, "Other"]} register={register} />
        </>
      )}

      <CheckBoxGroup title="Goals / Expectations" namePrefix="goals" options={["Improve fitness", "Increase well​-being", "Injury rehabilitation", "Positive reinforcement", "Strength training", "Weight management", "Other"]} register={register} />
      <CheckBoxGroup title="Personal Yoga Interests" namePrefix="interests" options={["Asana (postures)", "Pranayama (breath work)", "Meditation", "Yoga Philosophy", "Eastern energy systems", "Other"]} register={register} />

      {/* --- Lifestyle & Fitness --- */}
      <h3 className="text-lg font-semibold text-brandLavender">Lifestyle & Fitness</h3>
      <label className="block mb-2 font-medium">Current activity level</label>
      <select {...register("activityLevel")} className="border rounded p-2 mb-4">
        {activityLevels.map((lvl) => (
          <option key={lvl} value={lvl}>{lvl}</option>
        ))}
      </select>
      <TextInput label="Stress level (1​-10)" name="stressLevel" type="number" min="1" max="10" register={register} />
      <CheckBoxGroup title="Physical History" namePrefix="physicalHistory" options={physicalHistoryConditions} register={register} />
      <TextInput label="Other / Explain" name="otherExplain" register={register} className="md:col-span-2" />

      <label className="block font-medium mb-1">Are you currently taking any medications?</label>
      <textarea {...register("medications")} className="w-full border rounded p-2 mb-4" rows="3" />

      <label className="block font-medium mb-1">Additional details / Anything else to share</label>
      <textarea {...register("additionalDetails")} className="w-full border rounded p-2 mb-6" rows="4" />

      <p className="text-sm leading-relaxed border-l-4 border-brandLavender pl-4 italic">
        We believe that yoga is more than physical exercise. It is a transformative practice…
      </p>

      <SignaturePadField label="Client Signature" onEnd={(sig) => register("signature").onChange({ target: { value: sig } })} />
      <button type="submit" className="bg-brandLavender text-white px-6 py-2 rounded-md">Save</button>
      <button type="button" onClick={() => reset()} className="ml-4 underline text-brandLavender">Reset</button>
    </form>
  );
}
