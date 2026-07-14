"use client";

import { pageTransition } from "@/components/patient/MotionVariants";
import { PageHeader } from "@/components/patient/PageHeader";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Download, Printer, Share2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { EmptyState } from "./EmptyState";
import { Filters } from "./Filters";
import { HealthQuickSummary } from "./HealthQuickSummary";
import {
  CardsSkeleton,
  TableSkeleton,
  TimelineSkeleton,
} from "./LoadingSkeleton";
import { MedicalCard } from "./MedicalCard";
import { MedicalSummary } from "./MedicalSummary";
import { MedicalTable } from "./MedicalTable";
import { MedicalTimeline } from "./MedicalTimeline";
import type { MedicalFilters, ViewMode } from "./types";
import {
  computeMedicalStats,
  DEFAULT_MEDICAL_FILTERS,
  getFilteredRecords,
  groupRecordsByYear,
  mockHealthSummary,
  mockMedicalRecords,
  sortRecords,
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
      <AlertCircle className="h-4 w-4 text-emerald-400" />
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

export function MedicalRecords() {
  /* ─── State ─── */
  const [filters, setFilters] = useState<MedicalFilters>(
    DEFAULT_MEDICAL_FILTERS,
  );
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  /* ─── Derived data ─── */
  const filtered = useMemo(
    () =>
      sortRecords(
        getFilteredRecords(mockMedicalRecords, filters),
        filters.sort,
      ),
    [filters],
  );

  const stats = useMemo(
    () => computeMedicalStats(mockMedicalRecords, mockHealthSummary),
    [],
  );

  const grouped = useMemo(() => groupRecordsByYear(filtered), [filtered]);

  const hasFilters =
    filters.search ||
    filters.doctor ||
    filters.department ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.recordType;

  /* ─── Handlers ─── */
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_MEDICAL_FILTERS);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleDownload = useCallback(
    () => showToast("Medical records download started."),
    [showToast],
  );
  const handlePrint = useCallback(() => {
    window.print();
    showToast("Print view opened.");
  }, [showToast]);
  const handleShare = useCallback(
    () => showToast("Share link copied to clipboard."),
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
        title="Medical Records"
        subtitle="Access your complete medical history securely."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-md active:scale-[0.97] dark:bg-[var(--color-accent)] dark:text-slate-900 dark:hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download All Records</span>
              <span className="sm:hidden">Download</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.97] dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        }
      />

      {/* Statistics */}
      <MedicalSummary stats={stats} />

      {/* Filters */}
      <Filters
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main content area — Two-column layout on large screens */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left / Main */}
        <div className="xl:col-span-3">
          {/* Loading state */}
          {loading && (
            <>
              {viewMode === "timeline" && <TimelineSkeleton />}
              {viewMode === "table" && <TableSkeleton />}
              {viewMode === "cards" && <CardsSkeleton />}
            </>
          )}

          {/* Loaded — empty */}
          {!loading && filtered.length === 0 && (
            <EmptyState hasFilters={!!hasFilters} onReset={resetFilters} />
          )}

          {/* Loaded — data views */}
          {!loading && filtered.length > 0 && (
            <AnimatePresence mode="wait">
              {viewMode === "timeline" && (
                <MedicalTimeline key="timeline" grouped={grouped} />
              )}
              {viewMode === "table" && (
                <MedicalTable key="table" records={filtered} />
              )}
              {viewMode === "cards" && (
                <MedicalCard key="cards" records={filtered} />
              )}
            </AnimatePresence>
          )}

          {/* Records count */}
          {!loading && filtered.length > 0 && (
            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500 text-center">
              Showing {filtered.length} of {mockMedicalRecords.length} records
            </p>
          )}
        </div>

        {/* Right sidebar — Health Summary (xl+) */}
        <div className="xl:col-span-1">
          <div className="xl:sticky xl:top-24">
            <HealthQuickSummary health={mockHealthSummary} />
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
