"use client";

import { useEffect, useState } from "react";
import AppLayout from "../components/layout/applayout";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Users Data
      </h1>

      {loading && <p className="text-slate-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {user && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100 text-left text-sm text-slate-600">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Mobile</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t hover:bg-slate-50">
                {/* User */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {user.firstName?.[0]}
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-slate-500">Logged in user</p>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-slate-600">
                  {user.email}
                </td>

                {/* Mobile */}
                <td className="px-6 py-4 text-slate-600">
                  {user.mobile || "—"}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    Active
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  <Link
                    href="/profile"
                    className="inline-flex items-center px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </AppLayout>
  );
}
