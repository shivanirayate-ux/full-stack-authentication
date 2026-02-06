"use client";

import Sidebar from "../layout/sidebar";
import Topbar from "../layout/header";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
