"use client";
import { ReportTracker } from "@/components/report/ReportTracker";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function TrackReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportId = searchParams.get("reportId");
  const [inputId, setInputId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputId.trim()) {
      router.push(`/track-report?reportId=${inputId.trim()}`);
    }
  };

  if (!reportId) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-full max-w-lg">
            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/50 p-10">
              <h1 className="text-3xl font-bold text-white mb-8 text-center">Track Your Report</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="reportId" className="block text-base font-medium text-zinc-400 mb-3">
                    Enter Report ID
                  </label>
                  <input
                    type="text"
                    id="reportId"
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                    className="w-full px-5 py-3 text-lg rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Enter your report ID"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 text-lg bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  Track Report
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-5xl">
          <ReportTracker initialReportId={reportId} />
        </div>
      </div>
    </div>
  );
}
