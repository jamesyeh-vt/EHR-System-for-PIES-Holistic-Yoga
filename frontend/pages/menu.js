import Link from 'next/link';

export default function DevMenu() {
  const pages = [
    { path: '/login', label: 'Login' },
    { path: '/intake', label: 'Intake Form' },
    { path: '/soap', label: 'SOAP Note' },
    { path: '/self-assessment', label: 'Self-Assessment Form' },
    { path: '/clients/assigned', label: 'Assigned Clients' },
    { path: '/clients/all', label: 'All Clients' },
    { path: '/clients/history', label: 'Client History' },
    { path: '/clients/search', label: 'Search Clients' },
    { path: '/therapists/manage', label: 'Manage Therapists' },
    { path: '/notes', label: 'All Notes' },
  ];

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-brandLavender mb-6 text-center">PIES Dev Menu</h1>
      <ul className="space-y-3">
        {pages.map(({ path, label }) => (
          <li key={path}>
            <Link href={path}>
              <span className="block bg-gray-100 hover:bg-brandLavender hover:text-white px-4 py-2 rounded-md transition cursor-pointer">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}