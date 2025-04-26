"use client";

import { useState } from "react";
import { ReportForm } from "./ReportForm";
import { ReportSubmitted } from "./ReportFormCompleted";
import { useRouter } from "next/navigation";

export function ReportWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState<any>(null);
  const router = useRouter();

  const handleStepComplete = async (data: any) => {
    setReportData(data);
    setCurrentStep(2);
  };

  return (
    <div className="rounded-2xl bg-zinc-900 p-8">
      {currentStep === 1 && <ReportForm onCompleteAction={handleStepComplete} />}
      {currentStep === 2 && reportData && (
        <ReportSubmitted 
          data={reportData} 
          onCompleteAction={() => router.push(`/track-report?reportId=${reportData.reportId}`)} 
        />
      )}
    </div>
  );
}
