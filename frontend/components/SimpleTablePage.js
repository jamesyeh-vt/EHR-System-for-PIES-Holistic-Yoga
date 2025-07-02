import Link from "next/link";

export default function SimpleTablePage({ rows }) {
  return (
    <table className="w-full border border-gray-300 mb-6">
      <thead className="bg-brandLavender text-white">
        <tr>
          <th className="p-2 text-left">Name</th>
          <th className="p-2" />
        </tr>
      </thead>
      <tbody>
        {rows.map((name) => (
          <tr key={name} className="border-t">
            <td className="p-2">{name}</td>
            <td className="p-2 text-right">
              <Link href="#" className="text-brandLavender underline">
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
