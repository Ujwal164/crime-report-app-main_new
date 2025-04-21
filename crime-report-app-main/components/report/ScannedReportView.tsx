import { decodeReportData } from '@/lib/report-encoder';

interface ScannedReportViewProps {
  scannedData: string;
}

export function ScannedReportView({ scannedData }: ScannedReportViewProps) {
  try {
    const report = decodeReportData(scannedData);

    return (
      <div className="p-6 bg-zinc-900 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Report Details</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-zinc-400">Report ID</h3>
            <p className="text-white">{report.id}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-400">Type</h3>
            <p className="text-white">{report.type}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-400">Location</h3>
            <p className="text-white">{report.location}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-400">Description</h3>
            <p className="text-white">{report.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-400">Status</h3>
            <p className="text-white">{report.status}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-400">Date</h3>
            <p className="text-white">
              {new Date(report.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6 bg-red-900/50 rounded-xl text-center">
        <p className="text-red-400">Invalid report data</p>
      </div>
    );
  }
} 