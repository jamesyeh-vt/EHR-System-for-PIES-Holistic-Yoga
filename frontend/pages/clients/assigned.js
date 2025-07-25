// pages/clients/assigned.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { SearchIcon, Trash2Icon } from "lucide-react";

export default function AssignedClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("pies-token") : null;

  // ─────────── helpers ───────────
    // turn "YYYY-MM-DD" into a real Date object at UTC so it won't shift
  function parseYmd(ymd) {
    if (!ymd) return null;
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d + 1)); // force UTC so no local offset shift
  }

  const fmtMonthYear = (ymd) =>
    ymd
      ? new Intl.DateTimeFormat(undefined, { year: "numeric", month: "long" }).format(parseYmd(ymd))
      : "—";

  const fmtFullDate = (ymd) =>
    ymd
      ? new Intl.DateTimeFormat(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(parseYmd(ymd))
      : "—";

  

  /* ───────────────── fetch patients once ───────────────── */
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/patients?page=0&size=100",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to load patients");
        const page = await res.json(); // Spring Page<Patient>
        const mapped = page.content.map((p) => ({
          id: p.id,
          name: `${p.firstName} ${p.lastName}`,
          since: p.dateCreated || p.createdAt, // whatever your entity uses
          dob: p.dateOfBirth,
        }));
        setClients(mapped);
      } catch (e) {
        console.error(e);
        alert(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  /* ───────────────── delete helper ───────────────── */
  const deleteClient = async (id) => {
    if (!confirm("Delete this client?")) return;
    try {
      const res = await fetch(`http://localhost:8080/patients/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      // handle empty/204 bodies safely
      const text = await res.text();
      if (!res.ok) {
        let message = "Delete failed";
        try {
          message = JSON.parse(text).message || message;
        } catch (_) {}
        throw new Error(message);
      }
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h2 className="text-2xl font-semibold text-brandLavender">
        Assigned Clients
      </h2>

      {/* search */}
      <div className="relative max-w-sm">
        <input
          type="text"
          placeholder="Search clients…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-brandLavender"
        />
        <SearchIcon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* loading state */}
      {loading && <p className="text-center text-gray-500">Loading…</p>}

      {/* grid */}
      {!loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cl) => (
            <div
              key={cl.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              {/* body (no hero image) */}
              <div className="p-4 space-y-1">
                <p className="font-semibold text-lg">{cl.name}</p>
                <p className="text-sm text-gray-600">
                  Client since {fmtMonthYear(cl.since)}
                </p>
                <p className="text-sm text-gray-600">
                  DOB: {fmtFullDate(cl.dob)}
                </p>
              </div>

              {/* footer */}
              <div className="flex border-t border-gray-200 text-sm">
                <Link
                  href={`/clients/history?clientId=${cl.id}`}
                  className="flex-1 px-4 py-2 text-brandLavender hover:bg-gray-50 text-center"
                >
                  View record
                </Link>
                <button
                  onClick={() => deleteClient(cl.id)}
                  title="Delete client"
                  className="px-4 py-2 border-l border-gray-200 text-red-600 hover:bg-red-50 flex items-center justify-center"
                >
                  <Trash2Icon size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && !loading && (
        <p className="mt-8 text-center text-gray-500">
          No clients match “{query}”.
        </p>
      )}
    </div>
  );

  
}