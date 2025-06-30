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

export function SOAPFormPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log("SOAP data", data);
    alert("Saved to console");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
      <div className="grid sm:grid-cols-2 gap-4">
        <TextInput label="Name" name="name" register={register} required />
        <TextInput label="Date" name="date" type="date" register={register} required />
        <TextInput label="Time" name="time" type="time" register={register} />
        <TextInput label="Duration" name="duration" register={register} />
        <TextInput label="Age" name="age" type="number" register={register} />
        <TextInput label="Conditions" name="conditions" register={register} className="sm:col-span-2" />
      </div>

      <h3 className="text-lg font-semibold text-brandLavender">Medications</h3>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <TextInput key={i} label={`Meds ${i}`} name={`meds${i}`} register={register} />
      ))}

      <label className="block font-medium">Activity Level</label>
      <select {...register("activityLevel")}
        className="border rounded p-2 mb-4">
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <h3 className="text-lg font-semibold text-brandLavender">Goals & Diet</h3>
      {[1, 2, 3].map((i) => (
        <TextInput key={i} label={`Goal ${i}`} name={`goal${i}`} register={register} />
      ))}
      {[1, 2].map((i) => (
        <TextInput key={i} label={`Diet ${i}`} name={`diet${i}`} register={register} />
      ))}

      <label className="block font-medium mb-1">History of Condition(s)</label>
      <textarea {...register("historyOfConditions")} className="w-full border rounded p-2 mb-4" rows="3" />

      {[
        { label: "Subjective", name: "subjective" },
        { label: "Objective", name: "objective" },
        { label: "Assessment", name: "assessment" },
        { label: "Plan", name: "plan" },
      ].map((sec) => (
        <div key={sec.name} className="mb-4">
          <label className="block font-medium mb-1">{sec.label}</label>
          <textarea {...register(sec.name)} rows="4" className="w-full border rounded p-2" />
        </div>
      ))}

      <button type="submit" className="bg-brandLavender text-white px-6 py-2 rounded">Save</button>
    </form>
  );
}

export default SOAPFormPage; 
