import { Report } from '@prisma/client';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateReportPDF(report: Report) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  // Load fonts
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Add content
  page.drawText('Crime Report', {
    x: 50,
    y: height - 50,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Report details
  const details = [
    `Report ID: ${report.id}`,
    `Type: ${report.type}`,
    `Status: ${report.status}`,
    `Location: ${report.location}`,
    `Date: ${new Date(report.createdAt).toLocaleDateString()}`,
    `Description: ${report.description}`,
  ];

  // Draw each detail
  details.forEach((detail, index) => {
    page.drawText(detail, {
      x: 50,
      y: height - 100 - (index * 20),
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
} 