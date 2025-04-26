import { Report } from '@prisma/client';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import { getBaseUrl } from '@/lib/url';

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

  // Generate QR code
  const baseUrl = getBaseUrl();
  const reportUrl = `${baseUrl}/track-report?reportId=${report.id}`;
  
  // Create QR code as PNG
  const qrCodeDataUrl = await QRCode.toDataURL(reportUrl, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 200,
  });

  // Convert data URL to buffer
  const qrCodeBuffer = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');
  
  // Embed the QR code image in the PDF
  const qrCodeImage = await pdfDoc.embedPng(qrCodeBuffer);
  const qrCodeDims = qrCodeImage.scale(0.5); // Scale down to fit
  
  // Draw QR code in the bottom right corner
  page.drawImage(qrCodeImage, {
    x: width - qrCodeDims.width - 50,
    y: 50,
    width: qrCodeDims.width,
    height: qrCodeDims.height,
  });

  // Add QR code label
  page.drawText('Scan to track report status', {
    x: width - qrCodeDims.width - 50,
    y: 30,
    size: 10,
    font,
    color: rgb(0, 0, 0),
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
} 