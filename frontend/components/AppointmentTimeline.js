// components/AppointmentTimeline.js
import Link from "next/link";
import { format, parseISO } from "date-fns";

function DateColumn({ iso }) {
  const date = parseISO(iso);
  return (
    <div className="w-20 p-3 text-center border-r border-gray-200">
      <p className="text-xs leading-none text-brandLavender">
        {format(date, "MMM").toUpperCase()}
      </p>
      <p className="text-2xl leading-none font-bold text-brandLavender">
        {format(date, "d")}
      </p>
      <p className="text-xs text-gray-600">{format(date, "yyyy")}</p>
    </div>
  );
}

function VisitCard({ visit }) {
  return (
    <div className="relative bg-white border border-gray-200 rounded shadow-sm">
      {/* dot on the vertical line */}
      <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brandLavender" />

      <div className="flex">
        <DateColumn iso={visit.date} />

        <div className="flex-1 p-3 space-y-1">
          <p className="font-semibold">{visit.title}</p>
          {visit.provider && (
            <p className="text-sm text-gray-700">{visit.provider}</p>
          )}
          {visit.location && (
            <p className="text-sm text-gray-500">{visit.location}</p>
          )}
        </div>
      </div>

      {/* single or multiple actions */}
      {visit.actions?.length > 0 && (
        <div className="divide-y divide-gray-200">
          {visit.actions.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="block px-3 py-2 text-sm text-brandLavender hover:bg-gray-50"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AppointmentTimeline({ visits }) {
  // 1. sort newest → oldest
  const sorted = [...visits].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // 2. bucket by calendar year
  const byYear = sorted.reduce((acc, v) => {
    const yr = v.date.slice(0, 4); // "2025"
    acc[yr] = acc[yr] ? [...acc[yr], v] : [v];
    return acc;
  }, {});

  const years = Object.keys(byYear); // already newest → oldest

  return (
    <div className="relative pl-4 space-y-10">
      {/* vertical line */}
      <span className="absolute top-2 left-1 w-px bg-gray-300 h-full" />

      {years.map((year) => (
        <div key={year} className="space-y-4">
          <p className="text-brandLavender text-lg font-semibold">
            {year === new Date().getFullYear().toString()
              ? "This year"
              : year ===
                (new Date().getFullYear() - 1).toString()
              ? "Last year"
              : year}
          </p>

          {byYear[year].map((v) => (
            <VisitCard key={v.id} visit={v} />
          ))}
        </div>
      ))}
    </div>
  );
}