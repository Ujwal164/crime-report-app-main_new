import { NextResponse } from 'next/server';
import { generateReportPDF } from '@/lib/pdf-generator';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    const report = await prisma.report.findUnique({
      where: { id: params.reportId },
    });

    if (!report) {
      return new NextResponse('Report not found', { status: 404 });
    }

    const pdfBytes = await generateReportPDF(report);
    const url = new URL(request.url);
    const autoDownload = url.searchParams.get('autoDownload') === 'true';

    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': autoDownload 
          ? 'attachment; filename="report.pdf"'
          : 'inline; filename="report.pdf"',
        'Content-Length': pdfBytes.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Error generating PDF', { status: 500 });
  }
} 