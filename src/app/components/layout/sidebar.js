"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "hover:bg-blue-600 hover:text-white text-slate-700"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6 border-b flex justify-center mr-22">
        <Image
          src="/images/logo (1).png"
          alt="Logo"
          width={150}
          height={80}
          className="object-cover rounded-lg"
        />
      </div>

      <nav className="p-4 space-y-2">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>
      </nav>
    </aside>
  );
}
