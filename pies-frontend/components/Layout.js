import Link from "next/link";
import Image from "next/image";

export default function Layout({ title, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* top bar */}
      <header className="bg-brandLavender h-16 flex items-center px-4 shadow-md fixed inset-x-0 top-0 z-50">
        <Link href="/clients/assigned" className="flex items-center space-x-2">
          <Image src="/PIESlogo.jpeg" alt="PIES Logo" width={80} height={80} priority />
          <span className="sr-only">Home</span>
        </Link>
        <h1 className="text-lg font-semibold text-white ml-4 truncate">{title}</h1>
      </header>
      {/* page content */}
      <main className="pt-20 px-4 pb-10 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
