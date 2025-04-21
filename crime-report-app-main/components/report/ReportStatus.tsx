"use client";

import { Report } from '@prisma/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ReportStatusProps {
  reportId: string;
}

export function ReportStatus({ reportId }: ReportStatusProps) {
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
        toast.error('Failed to fetch report status');
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
    return (
      <div className="text-zinc-400">
        Report not found or not yet generated
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${
          report.status === 'PENDING' ? 'bg-yellow-500' :
          report.status === 'IN_PROGRESS' ? 'bg-blue-500' :
          report.status === 'RESOLVED' ? 'bg-green-500' :
          'bg-red-500'
        }`} />
        <span className="text-white font-medium">
          {report.status.replace('_', ' ')}
        </span>
      </div>
      <p className="text-zinc-400">
        Last updated: {new Date(report.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}
