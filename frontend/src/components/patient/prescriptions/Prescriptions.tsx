"use client";

import { pageTransition } from "@/components/patient/MotionVariants";
import { PageHeader } from "@/components/patient/PageHeader";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Download } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { EmptyState } from "./EmptyState";
import { CardsSkeleton, TableSkeleton } from "./LoadingSkeleton";
import { PrescriptionCard } from "./PrescriptionCard";
import { PrescriptionDrawer } from "./PrescriptionDrawer";
import { PrescriptionFilters } from "./PrescriptionFilters";
import { PrescriptionStats } from "./PrescriptionStats";
import { PrescriptionTable } from "./PrescriptionTable";
import type {
  PrescriptionFilters as FiltersType,
  Prescription,
  PrescriptionTab,
  PrescriptionViewMode,
} from "./types";
import {
  computeStats,
  DEFAULT_PRESCRIPTION_FILTERS,
  filterPrescriptions,
  mockPrescriptions,
  sortPrescriptions,
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

export function Prescriptions() {
  /* ─── State ─── */
  const [filters, setFilters] = useState<FiltersType>(
    DEFAULT_PRESCRIPTION_FILTERS,
  );
  const [viewMode, setViewMode] = useState<PrescriptionViewMode>("cards");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);

  /* ─── Derived data ─── */
  const filtered = useMemo(
    () =>
      sortPrescriptions(
        filterPrescriptions(mockPrescriptions, filters),
        filters.sort,
      ),
    [filters],
  );

  const stats = useMemo(() => computeStats(mockPrescriptions), []);

  const tabCounts = useMemo(() => {
    const all = mockPrescriptions.length;
    const active = mockPrescriptions.filter(
      (p) => p.status === "active",
    ).length;
    const completed = mockPrescriptions.filter(
      (p) => p.status === "completed",
    ).length;
    const expired = mockPrescriptions.filter(
      (p) => p.status === "expired",
    ).length;
    return {
      active,
      completed,
      expired,
      all,
    } as Record<PrescriptionTab, number>;
  }, []);

  const hasFilters =
    filters.search ||
    filters.doctor ||
    filters.department ||
    filters.status ||
    filters.dateFrom ||
    filters.dateTo;

  /* ─── Handlers ─── */
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_PRESCRIPTION_FILTERS);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleDownloadAll = useCallback(
    () => showToast("Downloading all prescriptions..."),
    [showToast],
  );

  const handleViewDetails = useCallback((rx: Prescription) => {
    setSelectedRx(rx);
  }, []);

  const handleDownload = useCallback(
    (rx: Prescription) =>
      showToast(`Downloading ${rx.medicine} prescription...`),
    [showToast],
  );

  const handlePrint = useCallback(
    (rx: Prescription) => {
      window.print();
      showToast(`Printing ${rx.medicine} prescription...`);
    },
    [showToast],
  );

  const handleRequestRefill = useCallback(
    (rx: Prescription) =>
      showToast(
        `Refill requested for ${rx.medicine}. Your doctor will review it.`,
      ),
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
        title="My Prescriptions"
        subtitle="View all prescribed medications."
        actions={
          <button
            type="button"
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-md active:scale-[0.97] dark:bg-[var(--color-accent)] dark:text-slate-900 dark:hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download All</span>
            <span className="sm:hidden">Download</span>
          </button>
        }
      />

      {/* Statistics */}
      <PrescriptionStats stats={stats} />

      {/* Filters */}
      <PrescriptionFilters
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        tabCounts={tabCounts}
      />

      {/* Loading state */}
      {loading && (
        <>
          {viewMode === "cards" && <CardsSkeleton />}
          {viewMode === "table" && <TableSkeleton />}
        </>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <EmptyState hasFilters={!!hasFilters} onReset={resetFilters} />
      )}

      {/* Data views */}
      {!loading && filtered.length > 0 && (
        <AnimatePresence mode="wait">
          {viewMode === "cards" && (
            <PrescriptionCard
              key="cards"
              prescriptions={filtered}
              onViewDetails={handleViewDetails}
              onDownload={handleDownload}
              onRequestRefill={handleRequestRefill}
            />
          )}
          {viewMode === "table" && (
            <PrescriptionTable
              key="table"
              prescriptions={filtered}
              onViewDetails={handleViewDetails}
              onDownload={handleDownload}
              onRequestRefill={handleRequestRefill}
            />
          )}
        </AnimatePresence>
      )}

      {/* Records count */}
      {!loading && filtered.length > 0 && (
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
          Showing {filtered.length} of {mockPrescriptions.length} prescriptions
        </p>
      )}

      {/* Detail Drawer */}
      <PrescriptionDrawer
        prescription={selectedRx}
        onClose={() => setSelectedRx(null)}
        onDownload={handleDownload}
        onPrint={handlePrint}
      />

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
