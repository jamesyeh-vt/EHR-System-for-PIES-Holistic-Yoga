// pages/soap.js
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../components/TextInput";
import { SignaturePadField } from "../components/SignaturePadField";
import { SearchIcon, XIcon } from "lucide-react";


/** Helper: format Date -> YYYY-MM-DD */
const toYmd = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

export default function SOAPFormPage() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  // Patient search state
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("pies-token") : null;

  /* ──────────────── Fetch patients once ──────────────── */
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/patients?page=0&size=500", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load patients");
        const page = await res.json();
        setPatients(
          page.content.map((p) => ({
            id: p.id,
            name: `${p.firstName} ${p.lastName}`.trim(),
            dob: p.dateOfBirth,
          }))
        );
      } catch (e) {
        console.error(e);
        alert(e.message);
      }
    })();
  }, [token]);

  /* ──────────────── Dropdown helpers ──────────────── */
  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const choosePatient = (p) => {
    setValue("patientId", p.id, { shouldValidate: true });
    setQuery(p.name);
    setSelectedPatientId(p.id);
    setOpenDropdown(false);
  };

  const clearPatient = () => {
    setValue("patientId", "", { shouldValidate: true });
    setQuery("");
    setOpenDropdown(false);
    inputRef.current?.focus();
  };

  const onPatientKeyDown = (e) => {
    if (!openDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, filteredPatients.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const p = filteredPatients[highlightIdx];
      if (p) choosePatient(p);
    } else if (e.key === "Escape") {
      setOpenDropdown(false);
    }
  };

  // Click-away close
  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!selectedPatientId || !token) return;

    (async () => {
      try {
        const res = await fetch(`http://localhost:8080/intakes/patient/${selectedPatientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load intake data");

        const data = await res.json();

        // Calculate age from DOB
        const dob = new Date(data.patient.dateOfBirth);
        const today = new Date();
        const age =
          today.getFullYear() -
          dob.getFullYear() -
          (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

        // Autofill fields
        setValue("age", age);
        setValue("activityLevel", data.activityLevel || "");
        setValue("medications", data.healthHistory?.medicationsList || "");
        setValue("goals", data.yogaGoals || "");
        setValue("historyOfConditions", data.healthHistory?.additionalNotes || "");
      } catch (err) {
        console.error("Failed to load intake form", err);
      }
    })();
  }, [selectedPatientId, token, setValue]);



  /* ──────────────── Submit ──────────────── */
  const onSubmit = async (data) => {
    setLoading(true);
    console.log("SOAP data", data);
    alert("Saved to console (wire to backend when ready)");
    setLoading(false);
    alert("Saved to console (wire to backend when ready)");
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-3xl mx-auto py-10"
    >
      <h2 className="text-2xl font-semibold text-brandLavender">SOAP Note</h2>

      {/* hidden patientId field that backend will need */}
      <input type="hidden" {...register("patientId", { required: true })} />

      {/* Patient search/autocomplete */}
      <div className="relative" ref={dropdownRef}>
        <label className="block font-medium mb-1">Patient</label>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search patient…"
            className={`w-full border rounded pl-8 pr-9 py-2 focus:outline-none focus:ring-2 focus:ring-brandLavender ${
              errors.patientId ? "border-red-500" : ""
            }`}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenDropdown(true);
              setHighlightIdx(0);
              // clear selected id until user chooses again
              setValue("patientId", "", { shouldValidate: true });
            }}
            onFocus={() => setOpenDropdown(true)}
            onKeyDown={onPatientKeyDown}
          />
          <SearchIcon
            size={18}
            className="absolute left-2 top-2.5 text-gray-400 pointer-events-none"
          />
          {query && (
            <button
              type="button"
              className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
              onClick={clearPatient}
            >
              <XIcon size={16} />
            </button>
          )}
        </div>

        {openDropdown && filteredPatients.length > 0 && (
          <ul className="absolute z-30 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white shadow-lg border border-gray-200">
            {filteredPatients.map((p, idx) => (
              <li
                key={p.id}
                className={`px-3 py-2 cursor-pointer text-sm ${
                  idx === highlightIdx
                    ? "bg-brandLavender/10 text-brandLavender"
                    : "hover:bg-gray-100"
                }`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choosePatient(p);
                }}
                onMouseEnter={() => setHighlightIdx(idx)}
              >
                <span className="font-medium">{p.name}</span>
                {p.dob && (
                  <span className="ml-2 text-gray-500 text-xs">({p.dob})</span>
                )}
              </li>
            ))}
          </ul>
        )}
        {errors.patientId && (
          <p className="text-red-500 text-xs mt-1">
            Please pick a patient from the list.
          </p>
        )}
      </div>

      {/* Basic meta fields (updated) */}
      <div className="grid sm:grid-cols-2 gap-4">
        <TextInput
          label="Date of Session"
          name="dateOfSession"
          type="date"
          register={register}
          required
        />

        <TextInput
          label="Time of Session"
          name="timeOfSession"
          type="time"
          register={register}
          required
        />

        <TextInput
          label="Session Length"
          name="sessionLength"
          placeholder="e.g. 60 min"
          register={register}
        />

        <TextInput
          label="Age"
          name="age"
          type="number"
          register={register}
          min={0}
        />

        {/* Activity Level dropdown */}
        <div className="sm:col-span-2">
          <label className="block font-medium mb-1">Activity Level</label>
          <select
            {...register("activityLevel")}
            className="w-full border rounded p-2"
            defaultValue=""
          >
            <option value="" disabled>
              — Select —
            </option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Large Conditions box */}
      <div>
        <label className="block font-medium mb-1">Conditions</label>
        <textarea
          {...register("conditions")}
          className="w-full border rounded p-3"
          rows={5}
          placeholder="Describe current conditions, complaints, etc."
        />
      </div>

      {/* Medications, Goals, Diet as large text areas */}
      <div>
        <label className="block font-medium mb-1">Medications</label>
        <textarea
          {...register("medications")}
          className="w-full border rounded p-3"
          rows={4}
          placeholder="List medications (one per line or separated by commas)"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Goals</label>
        <textarea
          {...register("goals")}
          className="w-full border rounded p-3"
          rows={4}
          placeholder="Short and long term goals..."
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Diet</label>
        <textarea
          {...register("diet")}
          className="w-full border rounded p-3"
          rows={4}
          placeholder="Dietary considerations, restrictions, preferences..."
        />
      </div>

      {/* History of conditions */}
      <div>
        <label className="block font-medium mb-1">History of Condition(s)</label>
        <textarea
          {...register("historyOfConditions")}
          className="w-full border rounded p-3"
          rows={4}
          placeholder="Past injuries, surgeries, relevant medical history…"
        />
      </div>

      {/* SOAP sections */}
      {[
        { label: "Subjective (S)", name: "subjective" },
        { label: "Objective (O)", name: "objective" },
        { label: "Assessment (A)", name: "assessment" },
        { label: "Plan (P)", name: "plan" },
      ].map((sec) => (
        <div key={sec.name}>
          <label className="block font-medium mb-1">{sec.label}</label>
          <textarea
            {...register(sec.name)}
            rows={5}
            className="w-full border rounded p-3"
          />
        </div>
      ))}

      {/* Signature block */}
      <div>
        <SignaturePadField
          name="signature"
          label="Therapist Signature"
          register={register}
          className="border rounded"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-brandLavender text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="underline text-brandLavender"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
