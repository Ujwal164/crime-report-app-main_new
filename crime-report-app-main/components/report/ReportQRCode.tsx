import { Report } from '@prisma/client';
import { QRCodeSVG } from 'qrcode.react';
import { encodeReportData } from '@/lib/report-encoder';

interface ReportQRCodeProps {
  report: Report;
  size?: number;
}

export function ReportQRCode({ report, size = 200 }: ReportQRCodeProps) {
  // Encode the report data
  const encodedData = encodeReportData(report);

  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeSVG
        value={encodedData}
        size={size}
        level="H"
        includeMargin
        className="rounded-lg bg-white p-4"
      />
      <p className="text-sm text-zinc-400">
        Scan to view report details
      </p>
    </div>
  );
} 