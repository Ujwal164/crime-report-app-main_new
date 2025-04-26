"use client";

import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ReportSubmittedProps {
  data: any;
  onCompleteAction: () => void;
}

export function ReportSubmitted({ data, onCompleteAction }: ReportSubmittedProps) {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleTrackReport = () => {
    onCompleteAction();
  };

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(`/api/reports/${data.reportId}/download`);
      
      if (!response.ok) {
        throw new Error('Failed to download report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${data.reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download report. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex h-9 items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 text-sm text-emerald-400">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Report Submitted Successfully
        </div>
        <h2 className="mt-6 text-2xl font-bold text-white">
          Your Report Has Been Submitted
        </h2>
        <p className="mt-2 text-zinc-400">
          Keep this report ID safe to track your report status
        </p>
      </div>

      {/* QR Code Section */}
      <div className="flex flex-col items-center p-6 rounded-xl bg-zinc-900/50 border border-white/5">
        <QRCodeSVG 
          value={`/track-report?reportId=${data.reportId}`}
          size={200}
          level="H"
          includeMargin={true}
          className="mb-4"
        />
        <p className="text-sm text-zinc-400 text-center">
          Scan this QR code to get your report ID in your mobile phone
        </p>
      </div>

      <div className="rounded-xl bg-zinc-900/50 border border-white/5 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Report Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Report ID</span>
            <span className="font-mono text-white">{data.reportId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-400">Status</span>
            <span className="text-emerald-400">PENDING</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleTrackReport}
        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-sky-400 hover:to-blue-500 transition-all duration-200"
      >
        Track Report Status
      </button>

      <button
        onClick={handleDownloadPDF}
        disabled={isDownloading}
        className="w-full bg-gradient-to-r from-zinc-700 to-zinc-800 text-white py-3 px-4 rounded-xl hover:from-zinc-600 hover:to-zinc-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isDownloading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Downloading...
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF Report
          </>
        )}
      </button>
    </div>
  );
}
