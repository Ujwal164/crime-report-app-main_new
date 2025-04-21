import { Report } from '@prisma/client';

export function encodeReportData(report: Report) {
  return JSON.stringify({
    id: report.id,
    type: report.type,
    createdAt: report.createdAt.toISOString(),
  });
}

export function decodeReportData(encodedData: string) {
  try {
    return JSON.parse(encodedData);
  } catch (error) {
    throw new Error('Invalid report data');
  }
} 