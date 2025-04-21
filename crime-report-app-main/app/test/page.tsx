"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TestDashboard() {
  const { data: session, status } = useSession();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchReports();
    }
  }, [status]);

  const fetchReports = async () => {
    try {
      const response = await fetch("/api/reports");
      if (!response.ok) throw new Error("Failed to fetch reports");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-2xl font-bold">🔍 Dashboard Test Page</h1>

      {/* Authentication Status */}
      {status === "loading" && <p>Loading session...</p>}
      {status === "unauthenticated" && (
        <div>
          <p>You are not signed in.</p>
          <button
            onClick={() => signIn()}
            className="mt-4 px-4 py-2 bg-blue-500 rounded-lg"
          >
            Sign In
          </button>
        </div>
      )}

      {status === "authenticated" && (
        <div className="mt-6">
          <p>✅ You are signed in as: {session?.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="mt-4 px-4 py-2 bg-red-500 rounded-lg"
          >
            Sign Out
          </button>

          {/* Fetch Reports */}
          <h2 className="mt-6 text-xl">📄 Reports Data:</h2>
          {reports.length > 0 ? (
            <ul className="mt-2">
              {reports.map((report: any) => (
                <li key={report.id} className="border p-2 my-2">
                  {report.title} - {report.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reports found or authentication failed.</p>
          )}
        </div>
      )}
    </div>
  );
}
