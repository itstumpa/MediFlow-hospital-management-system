"use client";

import { AppointmentCardView } from "@/components/dashboard/doctor/appointments/AppointmentCardView";
import {
  computeTodaySummary,
  defaultFilters,
  filterAppointments,
  todayAppointments,
  type FilterState,
  type ViewMode,
} from "@/components/dashboard/doctor/appointments/appointments-mock-data";
import { AppointmentsLoadingSkeleton } from "@/components/dashboard/doctor/appointments/AppointmentsLoadingSkeleton";
import { AppointmentsTable } from "@/components/dashboard/doctor/appointments/AppointmentsTable";
import { AppointmentStats } from "@/components/dashboard/doctor/appointments/AppointmentStats";
import { AppointmentsToolbar } from "@/components/dashboard/doctor/appointments/AppointmentsToolbar";
import { AppointmentTimeline } from "@/components/dashboard/doctor/appointments/AppointmentTimeline";
import { TodaySummary } from "@/components/dashboard/doctor/appointments/TodaySummary";
import { EmptyState } from "@/components/dashboard/doctor/EmptyState";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/doctor/MotionVariants";
import { PageHeader } from "@/components/dashboard/doctor/PageHeader";
import { motion } from "framer-motion";
import { Calendar, SearchX } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function DoctorAppointmentsPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);

  const summary = useMemo(() => computeTodaySummary(), []);
  const filteredAppointments = useMemo(
    () => filterAppointments(todayAppointments, filters),
    [filters],
  );

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setFilters(defaultFilters);
    setViewMode("table");
    setKey((k) => k + 1);
    setTimeout(() => setLoading(false), 600);
  }, []);

  const renderAppointments = () => {
    if (loading) {
      return <AppointmentsLoadingSkeleton viewMode={viewMode} />;
    }

    if (todayAppointments.length === 0) {
      return (
        <EmptyState
          icon={
            <Calendar className="h-8 w-8 text-slate-400 dark:text-slate-500" />
          }
          title="No appointments today"
          description="There are no appointments scheduled for today."
        />
      );
    }

    if (filteredAppointments.length === 0) {
      return (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/50 py-16 dark:border-slate-700 dark:bg-slate-900/30"
        >
          <SearchX className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            No appointments match your filters
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Try adjusting your search or filter criteria.
          </p>
        </motion.div>
      );
    }

    switch (viewMode) {
      case "timeline":
        return <AppointmentTimeline appointments={filteredAppointments} />;
      case "cards":
        return <AppointmentCardView appointments={filteredAppointments} />;
      case "table":
      default:
        return <AppointmentsTable appointments={filteredAppointments} />;
    }
  };

  return (
    <motion.div
      key={key}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Page Header */}
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Today's Appointments"
          subtitle="Manage all appointments scheduled for today."
        />
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={staggerItem}>
        <AppointmentStats />
      </motion.div>

      {/* Toolbar */}
      <motion.div variants={staggerItem}>
        <AppointmentsToolbar
          filters={filters}
          setFilters={setFilters}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onRefresh={handleRefresh}
        />
      </motion.div>

      {/* Main Content + Sidebar */}
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Appointments View */}
        <motion.div variants={staggerItem} className="min-w-0 flex-1">
          {renderAppointments()}
        </motion.div>

        {/* Summary Sidebar */}
        <motion.div
          variants={staggerItem}
          className="w-full shrink-0 lg:w-72 xl:w-80"
        >
          <div className="lg:sticky lg:top-24">
            <TodaySummary summary={summary} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
