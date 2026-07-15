"use client";

import { staggerContainer, staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
    DisplayBoardPreview,
    QueueBoard,
    QueueFilters,
    QueueSidebar,
    QueueStats,
    QueueToolbar,
} from "./_components";
import {
    defaultFilterValues,
    queueEntries,
    type QueueEntry,
    type QueueFilterValues,
} from "./_mock-data";

/* ══════════════════════════════════════════════
   Page
   ══════════════════════════════════════════════ */

export default function QueueManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] =
    useState<QueueFilterValues>(defaultFilterValues);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [displayBoardOpen, setDisplayBoardOpen] = useState(false);

  /* ── Filtering ── */
  const entries = useMemo(() => {
    let result = [...queueEntries];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.patientName.toLowerCase().includes(q) ||
          e.patientId.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          e.doctorName.toLowerCase().includes(q),
      );
    }

    // Filters
    if (filters.doctor) {
      result = result.filter((e) => e.doctorName === filters.doctor);
    }
    if (filters.department) {
      result = result.filter((e) => e.department === filters.department);
    }
    if (filters.status) {
      result = result.filter((e) => e.status === filters.status);
    }
    if (filters.priority) {
      result = result.filter((e) => e.priority === filters.priority);
    }
    if (filters.appointmentType) {
      result = result.filter(
        (e) => e.appointmentType === filters.appointmentType,
      );
    }

    // Sort
    switch (filters.sort) {
      case "queue-desc":
        result.sort((a, b) => b.queueNumber - a.queueNumber);
        break;
      case "waiting-longest":
        result.sort((a, b) => b.waitingMinutes - a.waitingMinutes);
        break;
      case "waiting-shortest":
        result.sort((a, b) => a.waitingMinutes - b.waitingMinutes);
        break;
      case "priority":
        result.sort(
          (a, b) =>
            (priorityOrder[a.priority] ?? 99) -
            (priorityOrder[b.priority] ?? 99),
        );
        break;
      case "name":
        result.sort((a, b) => a.patientName.localeCompare(b.patientName));
        break;
      case "queue-asc":
      default:
        result.sort((a, b) => a.queueNumber - b.queueNumber);
        break;
    }

    return result;
  }, [searchQuery, filters]);

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => value !== "" && key !== "sort" && value !== "queue-asc",
  );

  /* ── Handlers ── */
  const handleCallPatient = (entry: QueueEntry) => {
    // Mock: update entry status to "called"
  };

  const handleMarkArrived = (entry: QueueEntry) => {
    // Mock
  };

  const handleComplete = (entry: QueueEntry) => {
    // Mock
  };

  const handleNoShow = (entry: QueueEntry) => {
    // Mock
  };

  const handleCancel = (entry: QueueEntry) => {
    // Mock
  };

  const handleMovePosition = (entry: QueueEntry) => {
    // Mock
  };

  const handleAddWalkIn = () => {
    // Mock: open walk-in form
  };

  const handleCallNext = () => {
    const next = entries.find((e) => e.status === "waiting");
    if (next) handleCallPatient(next);
  };

  const handleRefresh = () => {
    // Mock: refresh queue data
  };

  /* ══════════════════════════════════════════════
     Render
     ══════════════════════════════════════════════ */

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex gap-6"
    >
      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-6">
        {/* Header */}
        <motion.div variants={staggerItem} initial="hidden" animate="visible">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Queue Management
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Monitor and manage today&apos;s patient queue.
              </p>
            </div>
            {/* Sidebar toggle - mobile */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="self-start rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={staggerItem} initial="hidden" animate="visible">
          <QueueStats />
        </motion.div>

        {/* Toolbar */}
        <motion.div variants={staggerItem} initial="hidden" animate="visible">
          <QueueToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            hasActiveFilters={hasActiveFilters}
            onAddWalkIn={handleAddWalkIn}
            onCallNext={handleCallNext}
            onRefresh={handleRefresh}
            onDisplayBoard={() => setDisplayBoardOpen(true)}
          />
        </motion.div>

        {/* Filters */}
        <motion.div variants={staggerItem} initial="hidden" animate="visible">
          <QueueFilters
            isOpen={showFilters}
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilterValues)}
          />
        </motion.div>

        {/* Results count */}
        <motion.div variants={staggerItem} initial="hidden" animate="visible" className="flex items-center justify-between text-sm">
          <p className="text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {entries.filter((e) => e.status !== "cancelled").length}
            </span>{" "}
            active patients
            {hasActiveFilters && (
              <>
                {" "}
                (filtered from{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {queueEntries.length}
                </span>
                )
              </>
            )}
          </p>
        </motion.div>

        {/* Queue Board */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="visible"
        >
          <QueueBoard
            entries={entries}
            onCallPatient={handleCallPatient}
            onMarkArrived={handleMarkArrived}
            onComplete={handleComplete}
            onNoShow={handleNoShow}
            onCancel={handleCancel}
            onMovePosition={handleMovePosition}
          />
        </motion.div>
      </div>

      {/* Queue Sidebar */}
      <div className="hidden lg:block">
        <QueueSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onAssignAppointment={handleAddWalkIn}
          onViewSchedule={() => {}}
        />
      </div>

      {/* Mobile Queue Sidebar */}
      <div className="lg:hidden">
        <QueueSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onAssignAppointment={handleAddWalkIn}
          onViewSchedule={() => {}}
        />
      </div>

      {/* Display Board Preview */}
      <DisplayBoardPreview
        open={displayBoardOpen}
        onClose={() => setDisplayBoardOpen(false)}
      />
    </motion.div>
  );
}

/* ─── Priority sort order ──────────────────── */

const priorityOrder: Record<string, number> = {
  emergency: 0,
  high: 1,
  normal: 2,
  low: 3,
};
