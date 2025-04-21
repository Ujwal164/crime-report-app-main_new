import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ReportStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();
    
    // Validate the status
    if (!Object.values(ReportStatus).includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const report = await prisma.report.update({
      where: { reportId: params.reportId },
      data: { status },
    });

    return NextResponse.json(report);
  } catch (error: any) {
    console.error("Error updating report:", error);
    
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Error updating report" },
      { status: 500 }
    );
  }
}

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

    return NextResponse.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    return new NextResponse('Error fetching report', { status: 500 });
  }
}
