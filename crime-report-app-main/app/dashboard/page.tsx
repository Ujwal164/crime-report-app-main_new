"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

const statusColors: Record<ReportStatus, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  RESOLVED: "bg-green-500/10 text-green-500 border-green-500/20",
  DISMISSED: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

const typeIcons: Record<ReportType, string> = {
  EMERGENCY: "🚨",
  NON_EMERGENCY: "📝",
};

const typeColors: Record<ReportType, string> = {
  EMERGENCY: "bg-red-500/10 text-red-500 border-red-500/20",
  NON_EMERGENCY: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export default function Dashboard() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<ReportType | "ALL">("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "urgency">("date");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reports");
      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }
      const data = await response.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to load reports");
    } finally {
      setIsLoading(false);
    }
  };

  const updateReportStatus = async (reportId: string, newStatus: ReportStatus) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setReports(prevReports => 
          prevReports.map(report => 
            report.reportId === reportId 
              ? { ...report, status: newStatus }
              : report
          )
        );
        toast.success("Status updated successfully");
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating report:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredReports = Array.isArray(reports) ? reports.filter((report) => {
    const statusMatch = filter === "ALL" || report.status === filter;
    const typeMatch = typeFilter === "ALL" || report.type === typeFilter;
    const searchMatch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && typeMatch && searchMatch;
  }) : [];

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // Sort by urgency (EMERGENCY first, then NON_EMERGENCY)
      if (a.type === "EMERGENCY" && b.type !== "EMERGENCY") return -1;
      if (a.type !== "EMERGENCY" && b.type === "EMERGENCY") return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      <nav className={`border-b ${isDarkMode ? "border-gray-800 bg-gray-900/70" : "border-gray-200 bg-white/70"} backdrop-blur-md sticky top-0 z-50 py-4`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-blue-500">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"} border`}
              />
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-800"
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>
            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {session?.user?.name || "Admin"}
            </span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 transition rounded-lg"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div className="flex gap-2">
              {["ALL", ...Object.values(ReportStatus)].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as ReportStatus | "ALL")}
                  className={`px-4 py-2 rounded-lg transition ${
                    filter === status
                      ? "bg-blue-500 text-white"
                      : isDarkMode
                      ? "bg-gray-900 text-gray-400 hover:bg-gray-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {["ALL", ...Object.values(ReportType)].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type as ReportType | "ALL")}
                  className={`px-4 py-2 rounded-lg transition ${
                    typeFilter === type
                      ? "bg-blue-500 text-white"
                      : isDarkMode
                      ? "bg-gray-900 text-gray-400 hover:bg-gray-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("date")}
              className={`px-4 py-2 rounded-lg transition ${
                sortBy === "date"
                  ? "bg-blue-500 text-white"
                  : isDarkMode
                  ? "bg-gray-900 text-gray-400 hover:bg-gray-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Sort by Date
            </button>
            <button
              onClick={() => setSortBy("urgency")}
              className={`px-4 py-2 rounded-lg transition ${
                sortBy === "urgency"
                  ? "bg-blue-500 text-white"
                  : isDarkMode
                  ? "bg-gray-900 text-gray-400 hover:bg-gray-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Sort by Urgency
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <div className={`col-span-2 text-center py-12 ${
              isDarkMode ? "text-gray-500 bg-gray-900" : "text-gray-400 bg-white"
            } rounded-xl border ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              Loading reports...
            </div>
          ) : sortedReports.length === 0 ? (
            <div className={`col-span-2 text-center py-12 ${
              isDarkMode ? "text-gray-500 bg-gray-900" : "text-gray-400 bg-white"
            } rounded-xl border ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
              No reports found.
            </div>
          ) : (
            sortedReports.map((report) => (
              <div
                key={report.reportId}
                className={`p-6 rounded-xl border transition-all hover:shadow-lg ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800 hover:border-gray-700"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{report.title}</h2>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full ${
                        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                      } font-mono text-sm`}>
                        ID: {report.reportId}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full ${typeColors[report.type]}`}>
                    {typeIcons[report.type]} {report.type}
                  </span>
                </div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
                  {report.description}
                </p>
                {report.image && (
                  <img
                    src={report.image}
                    alt="Report"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full ${statusColors[report.status]}`}>
                    {report.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full ${
                    isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                  }`}>
                    {report.location || "N/A"}
                  </span>
                  <span className={`px-3 py-1 rounded-full ${
                    isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                  }`}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <select
                    value={report.status}
                    onChange={(e) => updateReportStatus(report.reportId, e.target.value as ReportStatus)}
                    className={`px-4 py-2 rounded-lg transition ${
                      isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {Object.values(ReportStatus).map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setSelectedReport(report)}
                    className={`px-4 py-2 rounded-lg transition ${
                      isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Report Details Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`p-6 rounded-xl max-w-2xl w-full mx-4 ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedReport.title}</h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-500 hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full ${typeColors[selectedReport.type]}`}>
                    {typeIcons[selectedReport.type]} {selectedReport.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full ${statusColors[selectedReport.status]}`}>
                    {selectedReport.status}
                  </span>
                </div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {selectedReport.description}
                </p>
                {selectedReport.image && (
                  <img
                    src={selectedReport.image}
                    alt="Report"
                    className="w-full rounded-lg"
                  />
                )}
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full ${
                    isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                  }`}>
                    Location: {selectedReport.location || "N/A"}
                  </span>
                  <span className={`px-3 py-1 rounded-full ${
                    isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                  }`}>
                    Created: {new Date(selectedReport.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
