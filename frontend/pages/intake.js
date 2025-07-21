import { useForm } from "react-hook-form";
import { TextInput } from "../components/TextInput";
import { CheckBoxGroup } from "../components/CheckBoxGroup";
import { SignaturePadField } from "../components/SignaturePadField";
import { useState } from 'react';
import { apiFetch } from "../utils/api";


// Helper data arrays used by multiple forms
const yogaStyles = [
  "Hatha",
  "Ashtanga",
  "Vinyasa/Flow",
  "Iyengar",
  "Power",
  "Anusara",
  "Bikram/Hot",
  "Forrest",
  "Kundalini",
  "Gentle",
  "Restorative",
  "Yin",
];

const activityLevels = [
  "Sedentary/Very inactive",
  "Somewhat inactive",
  "Average",
  "Somewhat active",
  "Extremely active",
];

const physicalHistoryConditions = [
  "Broken/Dislocated bones",
  "Muscle strain/sprain",
  "Arthritis/Bursitis",
  "Disc problems",
  "Scoliosis",
  "Back problems",
  "Osteoporosis",
  "Diabetes type 1 or 2",
  "High/Low blood pressure",
  "Insomnia",
  "Anxiety/Depression",
  "Asthma / Short breath",
  "Numbness / Tingling",
  "Cancer",
  "Seizures",
  "Stroke",
  "Heart conditions / Chest pain",
  "Pregnancy",
  "Auto‑immune condition",
  "Surgery",
];

const fieldNameMap = {
  "Broken/Dislocated bones": "brokenBones",
  "Muscle strain/sprain": "muscleStrain",
  "Arthritis/Bursitis": "arthritisBursitis",
  "Disc problems": "discProblems",
  "Scoliosis": "scoliosis",
  "Back problems": "backProblems",
  "Osteoporosis": "osteoporosis",
  "Diabetes type 1 or 2": "diabetes",
  "High/Low blood pressure": "bloodPressure",
  "Insomnia": "insomnia",
  "Anxiety/Depression": "anxietyDepression",
  "Asthma / Short breath": "asthma",
  "Numbness / Tingling": "numbnessTingling",
  "Cancer": "cancer",
  "Seizures": "seizures",
  "Stroke": "stroke",
  "Heart conditions / Chest pain": "heartConditions",
  "Pregnancy": "pregnancy",
  "Auto‑immune condition": "autoimmune",
  "Surgery": "surgery",
};



export default function IntakeFormPage() {
  const { register, handleSubmit, reset, watch } = useForm();

  const [selectedYogaStyles, setSelectedYogaStyles] = useState([]);
  const [selectedYogaGoals, setSelectedYogaGoals] = useState([]);
  const [selectedYogaInterests, setSelectedYogaInterests] = useState([]);

  const practicedBefore = watch("practicedBefore");

  const onSubmit = async (data) => {
    const today = new Date().toISOString().split("T")[0];

    const payload = {
      patient: {
        //id: 0,
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
      therapistId: 1,
      intakeDate: today,
      practicedYogaBefore: data.practicedBefore === "yes",
      lastPracticedDate: data.lastPracticeDate || null,
      yogaFrequency: data.practiceFrequency,
      yogaStyles: selectedYogaStyles.length ? selectedYogaStyles : [],
      yogaStyleOther: data.styles?.Other || "",
      yogaGoals: selectedYogaGoals.length ? selectedYogaGoals : [],
      yogaGoalsOther: data.goals?.Other || "",
      yogaGoalsExplanation: data.goalExplanation || "",
      yogaInterests: selectedYogaInterests.length ? selectedYogaInterests : [],
      yogaInterestsOther: data.interests?.Other || "",
      activityLevel: data.activityLevel,
      stressLevel: parseInt(data.stressLevel) || 0,
      healthHistory: {
        anxietyDepression: !!data["physicalHistory.Anxiety/Depression"],
        arthritisBursitis: !!data["physicalHistory.Arthritis/Bursitis"],
        asthma: !!data["physicalHistory.Asthma / Short breath"],
        autoimmune: !!data["physicalHistory.Auto‑immune condition"],
        backProblems: !!data["physicalHistory.Back problems"],
        bloodPressure: !!data["physicalHistory.High/Low blood pressure"],
        brokenBones: !!data["physicalHistory.Broken/Dislocated bones"],
        cancer: !!data["physicalHistory.Cancer"],
        diabetes: !!data["physicalHistory.Diabetes type 1 or 2"],
        discProblems: !!data["physicalHistory.Disc problems"],
        heartConditions: !!data["physicalHistory.Heart conditions / Chest pain"],
        insomnia: !!data["physicalHistory.Insomnia"],
        muscleStrain: !!data["physicalHistory.Muscle strain/sprain"],
        numbnessTingling: !!data["physicalHistory.Numbness / Tingling"],
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
    console.log("Test:", data.email);

    console.log("Submitting Health History:", data.healthHistory);


    try {
      const res = await apiFetch("http://localhost:8080/intakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

      <h3 className="text-lg font-semibold text-brandLavender">Yoga Experience & Goals</h3>
      <div className="space-y-4">
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

        <label className="block font-medium mt-4 mb-2">How often do you practice?</label>
        <select {...register("practiceFrequency")} className="border rounded p-2">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        {practicedBefore === "yes" && (
          <CheckBoxGroup title="Styles Practiced Most Frequently" namePrefix="styles" options={[...yogaStyles, "Other"]} register={register} />
        )}

        <CheckBoxGroup title="Goals / Expectations" namePrefix="goals" options={[
          "Improve fitness", "Increase well‑being", "Injury rehabilitation",
          "Positive reinforcement", "Strength training", "Weight management", "Other"
        ]} register={register} />

        <CheckBoxGroup title="Personal Yoga Interests" namePrefix="interests" options={[
          "Asana (postures)", "Pranayama (breath work)", "Meditation",
          "Yoga Philosophy", "Eastern energy systems", "Other"
        ]} register={register} />
      </div>

      <h3 className="text-lg font-semibold text-brandLavender">Lifestyle & Fitness</h3>
      <label className="block mb-2 font-medium">Current activity level</label>
      <select {...register("activityLevel")} className="border rounded p-2 mb-4">
        {activityLevels.map((lvl) => (
          <option key={lvl} value={lvl}>{lvl}</option>
        ))}
      </select>
      <TextInput label="Stress level (1‑10)" name="stressLevel" type="number" min="1" max="10" register={register} />

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