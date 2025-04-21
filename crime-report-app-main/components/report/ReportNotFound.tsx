"use client";

interface ReportNotFoundProps {
  message?: string;
}

export function ReportNotFound({ message = "Report not found" }: ReportNotFoundProps) {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/50 p-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Report Not Found</h1>
          <p className="text-zinc-400">{message}</p>
        </div>
      </div>
    </div>
  );
} 