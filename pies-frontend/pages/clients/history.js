import SimpleTablePage from "../../components/SimpleTablePage";

export default function ClientHistoryPage() {
  const rows = ["Session 12 – 2025-06-01", "Session 13 – 2025-06-08"];
  return <SimpleTablePage rows={rows} />;
}