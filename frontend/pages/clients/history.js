import AppointmentTimeline from "../../components/AppointmentTimeline";
import { useState } from "react";

export default function ClientHistoryPage() {
  /* ───────────────────────── dummy data ───────────────────────── */
  const [filter, setFilter] = useState("all");

  // upcoming (future-dated)
  const upcoming = [
    {
      id: "upc-1",
      date: "2025-07-22",
      title: "Follow-up – Knee Pain",
      provider: "Dr. Allen",
      location: "PIES Main Clinic",
      actions: [{ label: "View details", href: "#" }],
    },
    {
      id: "upc-2",
      date: "2025-08-15",
      title: "Physical Therapy Evaluation",
      provider: "Therapist Kim",
      location: "Wellness Center – Room 4",
      actions: [{ label: "View details", href: "#" }],
    },
  ];

  // past (reverse-chronological newest → oldest)
  const visits = [
    /* ─ 2025 ─────────────────────────────────────────── */
    {
      id: "v-2025-06-21",
      date: "2025-06-21",
      title: "Yoga Rehab Session",
      provider: "Therapist Kim",
      location: "Studio B",
      actions: [{ label: "Session notes", href: "#" }],
    },
    {
      id: "v-2025-06-08",
      date: "2025-06-08",
      title: "Office Visit",
      provider: "Dr. Smith",
      location: "Main Clinic",
      actions: [{ label: "View details", href: "#" }],
    },
    {
      id: "v-2025-06-01",
      date: "2025-06-01",
      title: "Phone Consultation",
      provider: "Dr. Smith",
      actions: [{ label: "View details", href: "#" }],
    },
    {
      id: "v-2025-05-18",
      date: "2025-05-18",
      title: "Dietary Check-in",
      provider: "Nutritionist Patel",
      actions: [{ label: "Diet plan", href: "#" }],
    },
    {
      id: "v-2025-04-30",
      date: "2025-04-30",
      title: "Lab Work Review",
      provider: "Dr. Smith",
      actions: [{ label: "Lab results", href: "#" }],
    },

    /* ─ 2024 ─────────────────────────────────────────── */
    {
      id: "v-2024-12-10",
      date: "2024-12-10",
      title: "Follow-up",
      provider: "Dr. Smith",
      actions: [{ label: "View details", href: "#" }],
    },
    {
      id: "v-2024-11-22",
      date: "2024-11-22",
      title: "Office Visit",
      provider: "Dr. Roy",
      location: "PIES Main Clinic",
      actions: [{ label: "View details", href: "#" }],
    },
    {
      id: "v-2024-10-18",
      date: "2024-10-18",
      title: "Refill Request",
      provider: "Dr. Roy",
      actions: [{ label: "Clinical notes", href: "#" }],
    },
    {
      id: "v-2024-09-26",
      date: "2024-09-26",
      title: "Telephone Check-in",
      provider: "Dr. Roy",
      actions: [{ label: "Clinical notes", href: "#" }],
    },
    {
      id: "v-2024-08-14",
      date: "2024-08-14",
      title: "Imaging Review",
      provider: "Dr. Allen",
      actions: [{ label: "Physical report", href: "#" }],
    },
    {
      id: "v-2024-07-03",
      date: "2024-07-03",
      title: "Patient Portal Message",
      provider: "Dr. Smith",
      actions: [{ label: "Message thread", href: "#" }],
    },
    {
      id: "v-2024-06-15",
      date: "2024-06-15",
      title: "Re-fill Request",
      provider: "Dr. Smith",
      actions: [{ label: "Clinical notes", href: "#" }],
    },
  ];

  /* ───────────────────────── filtering ───────────────────────── */
  const filteredVisits =
    filter === "all"
      ? visits
      : visits.filter((v) => v.date.startsWith(filter)); // crude example

  /* ───────────────────────── render ───────────────────────── */
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* filter & schedule row */}
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <label htmlFor="filter" className="font-medium text-brandLavender">
            Show:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded p-1 text-sm"
          >
            <option value="all">All</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>

          <button className="text-sm text-brandLavender hover:underline">
            More filter options
          </button>
        </div>

        <button className="bg-brandLavender hover:opacity-90 text-white text-sm px-4 py-2 rounded">
          Schedule an appointment
        </button>
      </div>

      {/* upcoming */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-brandLavender">
          Upcoming appointments
        </h3>

        {upcoming.length === 0 ? (
          <div className="border border-gray-200 rounded p-6 text-center text-gray-500">
            There are no upcoming visits to display.
          </div>
        ) : (
          <AppointmentTimeline visits={upcoming} />
        )}
      </section>

      {/* past */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-brandLavender">Past visits</h3>
        <AppointmentTimeline visits={filteredVisits} />
      </section>
    </div>
  );
}
