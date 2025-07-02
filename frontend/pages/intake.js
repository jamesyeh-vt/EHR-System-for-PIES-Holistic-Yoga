import { useForm } from "react-hook-form";
import { TextInput } from "../components/TextInput";
import { CheckBoxGroup } from "../components/CheckBoxGroup";
import { SignaturePadField } from "../components/SignaturePadField";

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

export default function IntakeFormPage() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log("Intake form data", data);
    alert("Form saved to console – backend not wired yet.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
      {/* PAGE 1 */}
      <h2 className="text-xl font-semibold text-brandLavender">Confidential Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <TextInput label="Name" name="name" register={register} required />
        <TextInput label="Date of Birth" name="dob" type="date" register={register} required />
        <TextInput label="Address" name="address" register={register} required className="md:col-span-2" />
        <TextInput label="City, State, Zip" name="cityStateZip" register={register} required className="md:col-span-2" />
        <TextInput label="Home Phone" name="homePhone" register={register} />
        <TextInput label="Cell Phone" name="cellPhone" register={register} />
        <TextInput label="Work Phone" name="workPhone" register={register} />
        <TextInput label="Email" name="email" type="email" register={register} />
        <TextInput label="Occupation" name="occupation" register={register} />
        <TextInput label="Emergency Contact (name & #)" name="emergencyContact" register={register} className="md:col-span-2" />
        <TextInput label="Referred By" name="referredBy" register={register} className="md:col-span-2" />
      </div>

      {/* YOGA EXPERIENCE / GOALS */}
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
          <input type="date" {...register("lastPracticeDate")}
            className="border rounded p-1" />
        </div>

        <label className="block font-medium mt-4 mb-2">How often do you practice?</label>
        <select {...register("practiceFrequency")} className="border rounded p-2">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <CheckBoxGroup
        title="Styles Practiced Most Frequently"
        namePrefix="styles"
        options={[...yogaStyles, "Other"]}
        register={register}
      />

      <CheckBoxGroup
        title="Goals / Expectations"
        namePrefix="goals"
        options={[
          "Improve fitness",
          "Increase well‑being",
          "Injury rehabilitation",
          "Positive reinforcement",
          "Strength training",
          "Weight management",
          "Other",
        ]}
        register={register}
      />

      <CheckBoxGroup
        title="Personal Yoga Interests"
        namePrefix="interests"
        options={[
          "Asana (postures)",
          "Pranayama (breath work)",
          "Meditation",
          "Yoga Philosophy",
          "Eastern energy systems",
          "Other",
        ]}
        register={register}
      />

      {/* LIFESTYLE & FITNESS */}
      <h3 className="text-lg font-semibold text-brandLavender">Lifestyle & Fitness</h3>
      <label className="block mb-2 font-medium">Current activity level</label>
      <select {...register("activityLevel")} className="border rounded p-2 mb-4">
        {activityLevels.map((lvl) => (
          <option key={lvl} value={lvl}>{lvl}</option>
        ))}
      </select>
      <TextInput label="Stress level (1‑10)" name="stressLevel" type="number" min="1" max="10" register={register} />

      {/* PHYSICAL HISTORY */}
      <CheckBoxGroup
        title="Physical History"
        namePrefix="physicalHistory"
        options={physicalHistoryConditions}
        register={register}
      />

      <TextInput label="Other / Explain" name="otherExplain" register={register} className="md:col-span-2" />

      <label className="block font-medium mb-1">Are you currently taking any medications?</label>
      <textarea {...register("medications")} className="w-full border rounded p-2 mb-4" rows="3" />

      <label className="block font-medium mb-1">Additional details / Anything else to share</label>
      <textarea {...register("additionalDetails")} className="w-full border rounded p-2 mb-6" rows="4" />

      {/* DISCLAIMER */}
      <p className="text-sm leading-relaxed border-l-4 border-brandLavender pl-4 italic">
        We believe that yoga is more than physical exercise. It is a transformative practice…
        {/* truncated for brevity; include full disclaimer verbatim when copying */}
      </p>

      <SignaturePadField label="Client Signature" onEnd={(sig) => register("signature").onChange({ target: { value: sig } })} />

      <button type="submit" className="bg-brandLavender text-white px-6 py-2 rounded-md">Save</button>
      <button type="button" onClick={() => reset()} className="ml-4 underline text-brandLavender">Reset</button>
    </form>
  );
}