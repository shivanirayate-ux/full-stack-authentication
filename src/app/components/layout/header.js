"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold capitalize text-slate-700">
        {pathname.replace("/", "") || "Dashboard"}
      </h2>

      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm"
        >
          Login
        </Link>

        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
          👤
        </div>
      </div>
    </header>
  );
}
