import SimpleTablePage from "../components/SimpleTablePage";

export default function TherapistNotesPage() {
  const rows = ["Note #1 – Alice Baker", "Note #2 – Bob Chen"];
  return <SimpleTablePage rows={rows} />;
}