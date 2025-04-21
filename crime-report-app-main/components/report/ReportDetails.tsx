"use client";

import { Report } from '@prisma/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ReportDetailsProps {
  reportId: string;
}

export function ReportDetails({ reportId }: ReportDetailsProps) {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch(`/api/reports/${reportId}`);
        if (!response.ok) {
          throw new Error('Report not found');
        }
        const data = await response.json();
        setReport(data);
      } catch (error) {
        toast.error('Failed to fetch report details');
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [reportId]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-zinc-800 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/50 p-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-zinc-400">Incident Type</p>
          <p className="text-sm text-white mt-1">{report.type}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Submitted On</p>
          <p className="text-sm text-white mt-1">
            {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Location</p>
          <p className="text-sm text-white mt-1">{report.location || 'Not specified'}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Report Type</p>
          <p className="text-sm text-white mt-1">{report.reportType}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-white mb-4">Description</p>
        <p className="text-sm text-zinc-400">{report.description}</p>
      </div>
    </div>
  );
} 