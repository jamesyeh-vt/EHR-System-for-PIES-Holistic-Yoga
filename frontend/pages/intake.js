// pages/intake.js
import {useForm} from "react-hook-form";
import {TextInput} from "../components/TextInput";
import {CheckBoxGroup} from "../components/CheckBoxGroup";
import {SignaturePadField} from "../components/SignaturePadField";
import {useState, useEffect} from "react";
import {apiFetch} from "../utils/api";

/** 50 U.S. states (two-letter codes) */
const US_STATES = [
    {abbr: "AL", name: "Alabama"}, {abbr: "AK", name: "Alaska"},
    {abbr: "AZ", name: "Arizona"}, {abbr: "AR", name: "Arkansas"},
    {abbr: "CA", name: "California"}, {abbr: "CO", name: "Colorado"},
    {abbr: "CT", name: "Connecticut"}, {abbr: "DE", name: "Delaware"},
    {abbr: "FL", name: "Florida"}, {abbr: "GA", name: "Georgia"},
    {abbr: "HI", name: "Hawaii"}, {abbr: "ID", name: "Idaho"},
    {abbr: "IL", name: "Illinois"}, {abbr: "IN", name: "Indiana"},
    {abbr: "IA", name: "Iowa"}, {abbr: "KS", name: "Kansas"},
    {abbr: "KY", name: "Kentucky"}, {abbr: "LA", name: "Louisiana"},
    {abbr: "ME", name: "Maine"}, {abbr: "MD", name: "Maryland"},
    {abbr: "MA", name: "Massachusetts"}, {abbr: "MI", name: "Michigan"},
    {abbr: "MN", name: "Minnesota"}, {abbr: "MS", name: "Mississippi"},
    {abbr: "MO", name: "Missouri"}, {abbr: "MT", name: "Montana"},
    {abbr: "NE", name: "Nebraska"}, {abbr: "NV", name: "Nevada"},
    {abbr: "NH", name: "New Hampshire"}, {abbr: "NJ", name: "New Jersey"},
    {abbr: "NM", name: "New Mexico"}, {abbr: "NY", name: "New York"},
    {abbr: "NC", name: "North Carolina"}, {abbr: "ND", name: "North Dakota"},
    {abbr: "OH", name: "Ohio"}, {abbr: "OK", name: "Oklahoma"},
    {abbr: "OR", name: "Oregon"}, {abbr: "PA", name: "Pennsylvania"},
    {abbr: "RI", name: "Rhode Island"}, {abbr: "SC", name: "South Carolina"},
    {abbr: "SD", name: "South Dakota"}, {abbr: "TN", name: "Tennessee"},
    {abbr: "TX", name: "Texas"}, {abbr: "UT", name: "Utah"},
    {abbr: "VT", name: "Vermont"}, {abbr: "VA", name: "Virginia"},
    {abbr: "WA", name: "Washington"}, {abbr: "WV", name: "West Virginia"},
    {abbr: "WI", name: "Wisconsin"}, {abbr: "WY", name: "Wyoming"},
];

const yogaStyles = [
    "Hatha", "Ashtanga", "Vinyasa/Flow", "Iyengar", "Power", "Anusara",
    "Bikram/Hot", "Forrest", "Kundalini", "Gentle", "Restorative", "Yin"
];

const activityLevels = [
    "Sedentary/Very inactive", "Somewhat inactive", "Average",
    "Somewhat active", "Extremely active"
];

const physicalHistoryOptions = [
    {label: "Broken/Dislocated bones", key: "brokenBones"},
    {label: "Muscle strain/sprain", key: "muscleStrain"},
    {label: "Arthritis/Bursitis", key: "arthritisBursitis"},
    {label: "Disc problems", key: "discProblems"},
    {label: "Scoliosis", key: "scoliosis"},
    {label: "Back problems", key: "backProblems"},
    {label: "Osteoporosis", key: "osteoporosis"},
    {label: "Diabetes (type 1 or 2)", key: "diabetes"},
    {label: "High/Low blood pressure", key: "bloodPressure"},
    {label: "Insomnia", key: "insomnia"},
    {label: "Anxiety/Depression", key: "anxietyDepression"},
    {label: "Asthma / Short breath", key: "asthma"},
    {label: "Numbness / Tingling", key: "numbnessTingling"},
    {label: "Cancer", key: "cancer"},
    {label: "Seizures", key: "seizures"},
    {label: "Stroke", key: "stroke"},
    {label: "Heart conditions / Chest pain", key: "heartConditions"},
    {label: "Pregnancy", key: "pregnancy"},
    {label: "Auto-immune condition", key: "autoimmune"},
    {label: "Surgery", key: "surgery"},
    {label: "Medications", key: "medications"}
];

// same helper used elsewhere
const sanitizeKey = (str) => str.replace(/[^a-zA-Z0-9]/g, "_");

// ===== formatting + validation helpers =====
const MAX = {
    firstName: 100,
    lastName: 100,
    address: 255,
    city: 100,
    emergencyContactName: 100,
};

const MAX_NOTE = 255;

const digitsOnly = (s = "") => s.replace(/\D/g, "");
const formatUSPhone = (s = "") => {
    const d = digitsOnly(s).slice(0, 10);
    if (d.length < 4) return d;
    if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

function FieldCount({value, max}) {
    const count = value?.length ?? 0;
    const over = count > max;
    return (
        <div className={`text-xs text-right mt-1 ${over ? "text-red-600" : "text-gray-400"}`}>
            {count} / {max}
        </div>
    );
}

export default function IntakeFormPage() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: {errors, isValid},
    } = useForm({mode: "onChange"});

    const [therapists, setTherapists] = useState([]);
    const practicedBefore = watch("practicedBefore");
    const todayYmd = new Date().toISOString().split("T")[0];

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
        const today = todayYmd;

        const getSelectedOptions = (prefix, options) =>
            options
                .filter((opt) => {
                    const key = typeof opt === "string" ? sanitizeKey(opt) : opt.key;
                    return data[prefix] && data[prefix][key];
                })
                .map((opt) => (typeof opt === "string" ? opt : opt.label));

        // Yoga styles are always shown; collect them from the "styles" group.
        const selectedYogaStyles = getSelectedOptions("styles", yogaStyles);

        const selectedYogaGoals = getSelectedOptions("goals", [
            "Improve fitness",
            "Increase well​-being",
            "Injury rehabilitation",
            "Positive reinforcement",
            "Strength training",
            "Weight management",
            "Other",
        ]);
        const selectedYogaInterests = getSelectedOptions("interests", [
            "Asana (postures)",
            "Pranayama (breath work)",
            "Meditation",
            "Yoga Philosophy",
            "Eastern energy systems",
            "Other",
        ]);

        const healthHistory = {};
        physicalHistoryOptions.forEach(({key}) => {
            healthHistory[key] = data.physicalHistory?.[key] || false;
        });
        healthHistory.medications = !!data.medications;
        healthHistory.medicationsList = data.medications || "";
        healthHistory.additionalNotes = data.additionalDetails || "";
        healthHistory.pregnancyEdd = data.pregnancyEdd || null;
        healthHistory.otherConditionsExplanation = data.otherConditionsExplanation || "";

        const payload = {
            patient: {
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                dateOfBirth: data.dob,
                address: data.address,
                city: data.city,
                state: data.state,                       // two-letter code
                zipCode: digitsOnly(data.zipCode),       // 5 digits
                email: data.email,
                homePhoneNumber: digitsOnly(data.homePhone),
                cellPhoneNumber: digitsOnly(data.cellPhone),
                workPhoneNumber: digitsOnly(data.workPhone),
                emergencyContactName: data.emergencyContactName,
                emergencyContactPhone: digitsOnly(data.emergencyContactPhone),
                referredBy: data.referredBy,
                dateCreated: today,
            },
            therapistId: parseInt(data.therapistId) || null,
            intakeDate: today,
            practicedYogaBefore: data.practicedBefore === "yes",
            lastPracticedDate: data.lastPracticeDate || null,
            yogaFrequency: data.practiceFrequency || null,
            yogaStyles: selectedYogaStyles,
            yogaStyleOther: "", // kept for backend compatibility; no "Other" input on the UI
            yogaGoals: selectedYogaGoals,
            yogaGoalsOther: data.goals?.Other || "",
            yogaGoalsExplanation: data.goalExplanation || "",
            yogaInterests: selectedYogaInterests,
            yogaInterestsOther: data.interests?.Other || "",
            activityLevel: data.activityLevel,
            stressLevel: parseInt(data.stressLevel) || 0,
            healthHistory,
        };

        try {
            const res = await apiFetch("http://localhost:8080/intakes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to submit intake form");
            alert("Form submitted successfully!");
            reset();
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
                {/* Required + char counter */}
                <div>
                    <TextInput
                        label="First Name"
                        name="firstName"
                        register={register}
                        required
                        maxLength={MAX.firstName}
                        {...register("firstName", {
                            required: "First name is required",
                            maxLength: {value: MAX.firstName, message: "Too many characters"},
                        })}
                    />
                    <FieldCount value={watch("firstName")} max={MAX.firstName}/>
                    {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                    <TextInput
                        label="Last Name"
                        name="lastName"
                        register={register}
                        required
                        maxLength={MAX.lastName}
                        {...register("lastName", {
                            required: "Last name is required",
                            maxLength: {value: MAX.lastName, message: "Too many characters"},
                        })}
                    />
                    <FieldCount value={watch("lastName")} max={MAX.lastName}/>
                    {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>}
                </div>

                <TextInput
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    register={register}
                    required
                    {...register("dob", {
                        required: "Date of birth is required",
                        validate: (v) => (!v || v <= todayYmd) || "DOB cannot be in the future",
                    })}
                />

                {/* Address + char counter */}
                <div className="md:col-span-2">
                    <TextInput
                        label="Address"
                        name="address"
                        register={register}
                        required
                        maxLength={MAX.address}
                        className="w-full"
                        {...register("address", {
                            required: "Address is required",
                            maxLength: {value: MAX.address, message: "Too many characters"},
                        })}
                    />
                    <FieldCount value={watch("address")} max={MAX.address}/>
                    {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address.message}</p>}
                </div>

                {/* City + char counter */}
                <div>
                    <TextInput
                        label="City"
                        name="city"
                        register={register}
                        required
                        maxLength={MAX.city}
                        {...register("city", {
                            required: "City is required",
                            maxLength: {value: MAX.city, message: "Too many characters"},
                        })}
                    />
                    <FieldCount value={watch("city")} max={MAX.city}/>
                    {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city.message}</p>}
                </div>

                {/* State dropdown (50 states) */}
                <div>
                    <label className="block font-medium mb-1">State</label>
                    <select
                        className="border rounded p-2 w-full"
                        {...register("state", {required: "State is required"})}
                        defaultValue=""
                    >
                        <option value="" disabled>— Select —</option>
                        {US_STATES.map((s) => (
                            <option key={s.abbr} value={s.abbr}>{s.name}</option>
                        ))}
                    </select>
                    {errors.state && <p className="text-red-600 text-xs mt-1">{errors.state.message}</p>}
                </div>

                {/* Zip: exactly 5 digits */}
                <div>
                    <label className="block font-medium mb-1">Zip Code</label>
                    <input
                        inputMode="numeric"
                        className="border rounded p-2 w-full"
                        placeholder="#####"
                        {...register("zipCode", {
                            required: "Zip code is required",
                            pattern: {value: /^\d{5}$/, message: "Use exactly 5 digits"},
                            onChange: (e) => {
                                e.target.value = digitsOnly(e.target.value).slice(0, 5);
                            },
                        })}
                    />
                    {errors.zipCode && <p className="text-red-600 text-xs mt-1">{errors.zipCode.message}</p>}
                </div>

                {/* Phones: live format (###) ###-#### */}
                <div>
                    <label className="block font-medium mb-1">Home Phone</label>
                    <input
                        inputMode="numeric"
                        className="border rounded p-2 w-full"
                        placeholder="(555) 555-5555"
                        {...register("homePhone", {
                            onChange: (e) => {
                                e.target.value = formatUSPhone(e.target.value);
                            },
                            pattern: {value: /^\(?\d{3}\)?[ ]?\d{3}-\d{4}$/, message: "Format: (555) 555-5555"},
                        })}
                    />
                    {errors.homePhone && <p className="text-red-600 text-xs mt-1">{errors.homePhone.message}</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Cell Phone</label>
                    <input
                        inputMode="numeric"
                        className="border rounded p-2 w-full"
                        placeholder="(555) 555-5555"
                        {...register("cellPhone", {
                            onChange: (e) => {
                                e.target.value = formatUSPhone(e.target.value);
                            },
                            pattern: {value: /^\(?\d{3}\)?[ ]?\d{3}-\d{4}$/, message: "Format: (555) 555-5555"},
                        })}
                    />
                    {errors.cellPhone && <p className="text-red-600 text-xs mt-1">{errors.cellPhone.message}</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Work Phone</label>
                    <input
                        inputMode="numeric"
                        className="border rounded p-2 w-full"
                        placeholder="(555) 555-5555"
                        {...register("workPhone", {
                            onChange: (e) => {
                                e.target.value = formatUSPhone(e.target.value);
                            },
                            pattern: {value: /^\(?\d{3}\)?[ ]?\d{3}-\d{4}$/, message: "Format: (555) 555-5555"},
                        })}
                    />
                    {errors.workPhone && <p className="text-red-600 text-xs mt-1">{errors.workPhone.message}</p>}
                </div>

                <TextInput label="Email" name="email" type="email" register={register}/>

                <TextInput label="Occupation" name="occupation" register={register}/>

                {/* Emergency contact name + counter */}
                <div>
                    <TextInput
                        label="Emergency Contact Name"
                        name="emergencyContactName"
                        register={register}
                        required
                        maxLength={MAX.emergencyContactName}
                        {...register("emergencyContactName", {
                            required: "Emergency contact name is required",
                            maxLength: {value: MAX.emergencyContactName, message: "Too many characters"},
                        })}
                    />
                    <FieldCount value={watch("emergencyContactName")} max={MAX.emergencyContactName}/>
                    {errors.emergencyContactName && (
                        <p className="text-red-600 text-xs mt-1">{errors.emergencyContactName.message}</p>
                    )}
                </div>

                {/* Emergency contact phone formatted */}
                <div>
                    <label className="block font-medium mb-1">Emergency Contact Phone</label>
                    <input
                        inputMode="numeric"
                        className="border rounded p-2 w-full"
                        placeholder="(555) 555-5555"
                        {...register("emergencyContactPhone", {
                            required: "Emergency contact phone is required",
                            onChange: (e) => {
                                e.target.value = formatUSPhone(e.target.value);
                            },
                            pattern: {value: /^\(?\d{3}\)?[ ]?\d{3}-\d{4}$/, message: "Format: (555) 555-5555"},
                        })}
                    />
                    {errors.emergencyContactPhone && (
                        <p className="text-red-600 text-xs mt-1">{errors.emergencyContactPhone.message}</p>
                    )}
                </div>

                <TextInput label="Referred By" name="referredBy" register={register} className="md:col-span-2"/>
            </div>

            {/* --- Therapist --- */}
            <h3 className="text-lg font-semibold text-brandLavender">Therapist Assignment</h3>
            <label className="block mb-2 font-medium">Select Therapist (mandatory)</label>
            <select {...register("therapistId", {required: "Therapist is required"})}
                    className="border rounded p-2 mb-6">
                <option value="">-- No Therapist Assigned --</option>
                {therapists.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                ))}
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
                    <input
                        type="date"
                        className="border rounded p-1"
                        {...register("lastPracticeDate", {
                            validate: (v) => (!v || v <= todayYmd) || "Date cannot be in the future",
                        })}
                    />
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
                </>
            )}

            {/* Yoga styles — ALWAYS visible */}
            <CheckBoxGroup
                title="Style(s) of yoga practiced most frequently: (select all that apply)"
                namePrefix="styles"
                options={yogaStyles}
                register={register}
            />

            <CheckBoxGroup
                title="Goals / Expectations"
                namePrefix="goals"
                options={[
                    "Improve fitness", "Increase well​-being", "Injury rehabilitation",
                    "Positive reinforcement", "Strength training", "Weight management", "Other",
                ]}
                register={register}
            />

            <CheckBoxGroup
                title="Personal Yoga Interests"
                namePrefix="interests"
                options={[
                    "Asana (postures)", "Pranayama (breath work)", "Meditation",
                    "Yoga Philosophy", "Eastern energy systems", "Other",
                ]}
                register={register}
            />

            {/* --- Lifestyle & Fitness --- */}
            <h3 className="text-lg font-semibold text-brandLavender">Lifestyle & Fitness</h3>
            <label className="block mb-2 font-medium">Current activity level</label>
            <select {...register("activityLevel")} className="border rounded p-2 mb-4">
                {activityLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                ))}
            </select>

            {/* Stress level dropdown 1–10 */}
            <div>
                <label className="block font-medium mb-1">Stress level (1–10)</label>
                <select
                    className="border rounded p-2"
                    {...register("stressLevel", {
                        required: false,
                        validate: (v) => (!v || (Number(v) >= 1 && Number(v) <= 10)) || "Pick 1–10",
                    })}
                    defaultValue=""
                >
                    <option value="">— Select —</option>
                    {Array.from({length: 10}, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
                {errors.stressLevel && <p className="text-red-600 text-xs mt-1">{errors.stressLevel.message}</p>}
            </div>

            <CheckBoxGroup title="Physical History" namePrefix="physicalHistory" options={physicalHistoryOptions}
                           register={register}/>
            {/* Other / Explain */}
            <div>
                <label className="block font-medium mb-1">Other / Explain</label>
                <textarea
                    className="w-full border rounded p-2 mb-1"
                    rows={4}
                    maxLength={MAX_NOTE}                           // hard stop in the UI
                    {...register("otherConditionsExplanation", {   // <-- fixed name to match payload
                        maxLength: {value: MAX_NOTE, message: `Max ${MAX_NOTE} characters`},
                    })}
                />
                <FieldCount value={watch("otherConditionsExplanation")} max={MAX_NOTE}/>
                {errors.otherConditionsExplanation && (
                    <p className="text-red-600 text-xs mt-1">
                        {errors.otherConditionsExplanation.message}
                    </p>
                )}
            </div>

            {/* Are you currently taking any medications? */}
            <div>
                <label className="block font-medium mb-1">
                    Are you currently taking any medications?
                </label>
                <textarea
                    className="w-full border rounded p-2 mb-1"
                    rows={3}
                    maxLength={MAX_NOTE}
                    {...register("medications", {
                        maxLength: {value: MAX_NOTE, message: `Max ${MAX_NOTE} characters`},
                    })}
                />
                <FieldCount value={watch("medications")} max={MAX_NOTE}/>
                {errors.medications && (
                    <p className="text-red-600 text-xs mt-1">{errors.medications.message}</p>
                )}
            </div>

            {/* Additional details / Anything else to share */}
            <div>
                <label className="block font-medium mb-1">
                    Additional details / Anything else to share
                </label>
                <textarea
                    className="w-full border rounded p-2 mb-1"
                    rows={4}
                    maxLength={MAX_NOTE}
                    {...register("additionalDetails", {
                        maxLength: {value: MAX_NOTE, message: `Max ${MAX_NOTE} characters`},
                    })}
                />
                <FieldCount value={watch("additionalDetails")} max={MAX_NOTE}/>
                {errors.additionalDetails && (
                    <p className="text-red-600 text-xs mt-1">{errors.additionalDetails.message}</p>
                )}
            </div>

            <p className="text-sm leading-relaxed border-l-4 border-brandLavender pl-4 italic">
                We believe that yoga is more than physical exercise. It is a transformative practice…
            </p>

            <SignaturePadField
                label="Client Signature"
                onEnd={(sig) => register("signature").onChange({target: {value: sig}})}
            />

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={!isValid}
                    className="bg-brandLavender text-white px-6 py-2 rounded-md disabled:opacity-50"
                    title={!isValid ? "Fix validation errors before submitting" : ""}
                >
                    Save
                </button>
                <button type="button" onClick={() => reset()} className="underline text-brandLavender">
                    Reset
                </button>
            </div>
        </form>
    );
}
