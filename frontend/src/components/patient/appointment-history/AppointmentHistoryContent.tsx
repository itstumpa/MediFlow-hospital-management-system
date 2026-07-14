"use client";

import { useCallback, useMemo, useState } from "react";
import { AppointmentCard } from "./AppointmentCard";
import { AppointmentStats } from "./AppointmentStats";
import { AppointmentTabs } from "./AppointmentTabs";
import { AppointmentsTable } from "./AppointmentsTable";
import { AppointmentsToolbar } from "./AppointmentsToolbar";
import { EmptyState } from "./EmptyState";
import { LoadingSkeleton } from "./LoadingSkeleton";
import type { Appointment, TabOption, ViewMode } from "./types";
import { DEFAULT_APPOINTMENT_FILTERS, getPatientAppointments } from "./types";

interface AppointmentHistoryContentProps {
  appointments: Appointment[];
  isLoading?: boolean;
}

export function AppointmentHistoryContent({
  appointments,
  isLoading = false,
}: AppointmentHistoryContentProps) {
  const [activeTab, setActiveTab] = useState<TabOption>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [filters, setFilters] = useState(DEFAULT_APPOINTMENT_FILTERS);

  /* ─── Derive stats ─── */
  const stats = useMemo(
    () => ({
      upcoming: appointments.filter(
        (a) =>
          a.status === "confirmed" ||
          a.status === "upcoming" ||
          a.status === "rescheduled",
      ).length,
      completed: appointments.filter((a) => a.status === "completed").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
      missed: appointments.filter((a) => a.status === "no-show").length,
      thisMonth: appointments.filter((a) => {
        const d = new Date(a.date);
        const now = new Date();
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }).length,
      favoriteDoctorVisits: appointments.filter((a) => a.isFavoriteDoctor)
        .length,
    }),
    [appointments],
  );

  /* ─── Filtered appointments ─── */
  const filtered = useMemo(() => {
    // First apply toolbar filters
    let result = getPatientAppointments({ ...filters }, appointments);
    // Then apply tab filter
    if (activeTab === "upcoming") {
      result = result.filter(
        (a) =>
          a.status === "upcoming" ||
          a.status === "confirmed" ||
          a.status === "rescheduled",
      );
    } else if (activeTab === "completed") {
      result = result.filter((a) => a.status === "completed");
    } else if (activeTab === "cancelled") {
      result = result.filter((a) => a.status === "cancelled");
    }
    return result;
  }, [filters, activeTab, appointments]);

  /* ─── Handlers ─── */
  const handleReset = useCallback(() => {
    setFilters(DEFAULT_APPOINTMENT_FILTERS);
    setActiveTab("all");
  }, []);

  const handleViewDetails = useCallback((apt: Appointment) => {
    // Navigate to detail or open modal
    console.log("View details:", apt.id);
  }, []);

  const handleReschedule = useCallback((apt: Appointment) => {
    // Navigate to reschedule flow
    console.log("Reschedule:", apt.id);
  }, []);

  const handleCancel = useCallback((apt: Appointment) => {
    // Open cancel confirmation
    console.log("Cancel:", apt.id);
  }, []);

  const handleDownload = useCallback((apt: Appointment) => {
    // Trigger summary download
    console.log("Download:", apt.id);
  }, []);

  const hasActiveFilters =
    filters.search.length > 0 ||
    filters.status.length > 0 ||
    filters.department.length > 0 ||
    filters.consultationType.length > 0;

  /* ─── Loading state ─── */
  if (isLoading) {
    return <LoadingSkeleton viewMode={viewMode} />;
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <AppointmentStats stats={stats} />

      {/* Toolbar */}
      <AppointmentsToolbar
        filters={filters}
        onFilterChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onReset={handleReset}
      />

      {/* Tabs */}
      <AppointmentTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        appointments={appointments}
      />

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState hasActiveFilters={hasActiveFilters} onReset={handleReset} />
      ) : viewMode === "table" ? (
        <AppointmentsTable
          appointments={filtered}
          onViewDetails={handleViewDetails}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
          onDownload={handleDownload}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              onViewDetails={handleViewDetails}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}
    </div>
  );
}
