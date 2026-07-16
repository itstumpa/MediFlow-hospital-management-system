"use client";

import { pageTransition } from "@/components/patient/MotionVariants";
import { PageHeader } from "@/components/patient/PageHeader";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Download, Printer, Share2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { EmptyState } from "./EmptyState";
import { LabFilters } from "./LabFilters";
import { LabStats } from "./LabStats";
import {
  CardsSkeleton,
  TableSkeleton,
  TimelineSkeleton,
} from "./LoadingSkeleton";
import { ReportCard } from "./ReportCard";
import { ReportDetailsModal } from "./ReportDetailsModal";
import { ReportTable } from "./ReportTable";
import { ReportTimeline } from "./ReportTimeline";
import { TrendCharts } from "./TrendCharts";
import type {
  LabFilters as LabFiltersType,
  LabReport,
  ViewMode,
} from "./types";
import {
  computeLabStats,
  DEFAULT_LAB_FILTERS,
  getFilteredReports,
  mockLabReports,
  sortReports,
} from "./types";

/* ─── Toast notification ─── */

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-slate-800 px-5 py-3 text-sm font-medium text-white shadow-xl dark:bg-slate-700"
    >
      <AlertCircle className="h-4 w-4 text-[var(--color-accent)]" />
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </motion.div>
  );
}

/* ─── Main component ─── */

export function LabReports() {
  /* ─── State ─── */
  const [filters, setFilters] = useState<LabFiltersType>(DEFAULT_LAB_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<LabReport | null>(null);

  /* ─── Derived data ─── */
  const filtered = useMemo(
    () =>
      sortReports(getFilteredReports(mockLabReports, filters), filters.sort),
    [filters],
  );

  const stats = useMemo(() => computeLabStats(mockLabReports), []);

  const hasFilters =
    filters.search ||
    filters.doctor ||
    filters.department ||
    filters.status ||
    filters.dateFrom ||
    filters.dateTo;

  /* ─── Handlers ─── */
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_LAB_FILTERS);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleDownloadAll = useCallback(
    () => showToast("All reports download started."),
    [showToast],
  );

  const handleViewReport = useCallback((report: LabReport) => {
    setSelectedReport(report);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedReport(null);
  }, []);

  const handleDownloadReport = useCallback(
    (report: LabReport) => {
      showToast(`Downloading ${report.testName}...`);
    },
    [showToast],
  );

  const handlePrintReport = useCallback(() => {
    window.print();
    showToast("Print view opened.");
  }, [showToast]);

  const handleShareReport = useCallback(
    (report: LabReport) => {
      showToast(`Share link copied for ${report.testName}.`);
    },
    [showToast],
  );

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen space-y-6 pb-10"
    >
      {/* Page Header */}
      <PageHeader
        title="Lab Reports"
        subtitle="View and download your laboratory test results."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadAll}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-md active:scale-[0.97] dark:bg-[var(--color-accent)] dark:text-slate-900 dark:hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download All Reports</span>
              <span className="sm:hidden">Download All</span>
            </button>
            <button
              type="button"
              onClick={handlePrintReport}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              type="button"
              onClick={() => showToast("Share link copied to clipboard.")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        }
      />

      {/* Statistics */}
      <LabStats stats={stats} />

      {/* Filters */}
      <LabFilters
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Trend Charts (show in card view) */}
      {viewMode === "cards" && <TrendCharts />}

      {/* Main content */}
      {/* Loading state */}
      {loading && (
        <>
          {viewMode === "cards" && <CardsSkeleton />}
          {viewMode === "table" && <TableSkeleton />}
          {viewMode === "timeline" && <TimelineSkeleton />}
        </>
      )}

      {/* Loaded — empty */}
      {!loading && filtered.length === 0 && (
        <EmptyState hasFilters={!!hasFilters} onReset={resetFilters} />
      )}

      {/* Loaded — data views */}
      {!loading && filtered.length > 0 && (
        <AnimatePresence mode="wait">
          {viewMode === "cards" && (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((report, i) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  index={i}
                  onView={handleViewReport}
                  onDownload={handleDownloadReport}
                />
              ))}
            </motion.div>
          )}
          {viewMode === "table" && (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ReportTable
                reports={filtered}
                onView={handleViewReport}
                onDownload={handleDownloadReport}
              />
            </motion.div>
          )}
          {viewMode === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ReportTimeline
                reports={filtered}
                onView={handleViewReport}
                onDownload={handleDownloadReport}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Reports count */}
      {!loading && filtered.length > 0 && (
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
          Showing {filtered.length} of {mockLabReports.length} reports
        </p>
      )}

      {/* Report Details Modal */}
      <ReportDetailsModal
        report={selectedReport}
        onClose={handleCloseModal}
        onDownload={handleDownloadReport}
        onPrint={handlePrintReport}
        onShare={handleShareReport}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
