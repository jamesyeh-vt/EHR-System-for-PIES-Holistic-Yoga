import SimpleTablePage from "../../components/SimpleTablePage";

export default function AllClientsPage() {
  const rows = ["Alice Baker", "Bob Chen", "Diana Evans"];
  return <SimpleTablePage rows={rows} />;
}