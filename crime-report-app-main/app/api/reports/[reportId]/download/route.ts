import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function GET(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    const reportId = params.reportId;

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }

    // First try to find by reportId
    let report = await prisma.report.findUnique({
      where: { reportId }
    });

    // If not found by reportId, try to find by id
    if (!report) {
      report = await prisma.report.findUnique({
        where: { id: reportId }
      });
    }

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();

    // Load fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Draw title
    const title = 'CRIME REPORT DETAILS';
    const titleWidth = boldFont.widthOfTextAtSize(title, 16);
    page.drawText(title, {
      x: (width - titleWidth) / 2,
      y: height - 50,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Draw separator line
    page.drawLine({
      start: { x: 50, y: height - 70 },
      end: { x: width - 50, y: height - 70 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    // Report details with proper spacing
    const details = [
      { label: 'Report ID:', value: report.reportId || report.id },
      { label: 'Type:', value: report.type },
      { label: 'Status:', value: report.status },
      { label: 'Date:', value: new Date(report.createdAt).toLocaleString() },
      { label: 'Location:', value: report.location || 'Not specified' },
      { label: 'Description:', value: report.description },
    ];

    let y = height - 100;
    const lineHeight = 25;
    const labelWidth = 100;
    const valueX = 160;

    details.forEach(({ label, value }) => {
      // Draw label
      page.drawText(label, {
        x: 50,
        y,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      // Draw value with text wrapping
      const maxWidth = width - valueX - 50;
      const lines = wrapText(value.toString(), maxWidth, font, 12);
      
      lines.forEach((line, index) => {
        page.drawText(line, {
          x: valueX,
          y: y - (index * lineHeight),
          size: 12,
          font: font,
          color: rgb(0, 0, 0),
        });
      });

      // Move to next section
      y -= (lines.length * lineHeight) + 10;
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a downloadable file
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report-${report.reportId || report.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

// Helper function to wrap text
function wrapText(text: string, maxWidth: number, font: any, fontSize: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
} 