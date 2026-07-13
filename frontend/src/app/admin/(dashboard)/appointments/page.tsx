"use client";

import { AppointmentFilters } from "@/app/components/dashboard/appointments/AppointmentFilters";
import { AppointmentsStats } from "@/app/components/dashboard/appointments/AppointmentsStats";
import { AppointmentsTable } from "@/app/components/dashboard/appointments/AppointmentsTable";
import { AppointmentsToolbar } from "@/app/components/dashboard/appointments/AppointmentsToolbar";
import { BulkActions } from "@/app/components/dashboard/appointments/BulkActions";
import { DeleteAppointmentDialog } from "@/app/components/dashboard/appointments/DeleteAppointmentDialog";
import { EmptyState } from "@/app/components/dashboard/appointments/EmptyState";
import { LoadingSkeleton } from "@/app/components/dashboard/appointments/LoadingSkeleton";
import { appointmentsData } from "@/app/components/dashboard/appointments/mock";
import type {
  Appointment,
  AppointmentFilters as AppointmentFiltersType,
  ViewMode,
} from "@/app/components/dashboard/appointments/types";
import { DEFAULT_FILTERS } from "@/app/components/dashboard/appointments/types";
import { Button } from "@/app/components/dashboard/Button";
import { staggerContainer } from "@/app/components/dashboard/MotionVariants";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Download, Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function AppointmentsPage() {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] =
    useState<AppointmentFiltersType>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteAppointment, setDeleteAppointment] =
    useState<Appointment | null>(null);

  // Filter and sort appointments
  const filteredAppointments = useMemo(() => {
    let result = [...appointmentsData];

    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.patientName.toLowerCase().includes(q) ||
          a.doctorName.toLowerCase().includes(q) ||
          a.appointmentId.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          a.department.toLowerCase().includes(q),
      );
    }

    // Department filter
    if (filters.department.length > 0) {
      result = result.filter((a) => filters.department.includes(a.department));
    }

    // Doctor filter
    if (filters.doctor.length > 0) {
      result = result.filter((a) => filters.doctor.includes(a.doctorName));
    }

    // Status filter
    if (filters.status.length > 0) {
      result = result.filter((a) => filters.status.includes(a.status));
    }

    // Consultation Type filter
    if (filters.consultationType.length > 0) {
      result = result.filter((a) =>
        filters.consultationType.includes(a.consultationType),
      );
    }

    // Payment Status filter
    if (filters.paymentStatus.length > 0) {
      result = result.filter((a) =>
        filters.paymentStatus.includes(a.paymentStatus),
      );
    }

    // Date Range filter
    if (filters.dateRange[0] && filters.dateRange[1]) {
      result = result.filter(
        (a) => a.date >= filters.dateRange[0] && a.date <= filters.dateRange[1],
      );
    }

    // Time Range filter
    if (filters.timeRange[0] && filters.timeRange[1]) {
      result = result.filter(
        (a) => a.time >= filters.timeRange[0] && a.time <= filters.timeRange[1],
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "name":
        result.sort((a, b) => a.patientName.localeCompare(b.patientName));
        break;
      case "doctor":
        result.sort((a, b) => a.doctorName.localeCompare(b.doctorName));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "date":
        result.sort((a, b) => {
          const dateCmp = a.date.localeCompare(b.date);
          if (dateCmp !== 0) return dateCmp;
          return a.time.localeCompare(b.time);
        });
        break;
      case "time":
        result.sort((a, b) => a.time.localeCompare(b.time));
        break;
    }

    if (!filters.sortAsc) {
      result.reverse();
    }

    return result;
  }, [filters]);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === filteredAppointments.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAppointments.map((a) => a.id)));
    }
  }, [filteredAppointments, selectedIds]);

  const handleSelectId = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteAppointment) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(deleteAppointment.id);
        return next;
      });
      setDeleteAppointment(null);
    }
  }, [deleteAppointment]);

  const handleBulkDelete = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <PageHeader
        title="Appointment Management"
        subtitle="View, schedule, and manage all patient appointments."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" icon={Calendar} size="sm">
              Calendar View
            </Button>
            <Button variant="outline" icon={Download} size="sm">
              Export
            </Button>
            <Button variant="primary" icon={Plus} size="sm">
              New Appointment
            </Button>
          </div>
        }
      />

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <AppointmentsStats appointments={appointmentsData} />
          </motion.div>

          {/* Main content area with optional sidebar filters */}
          <div className="flex gap-0">
            {/* Sidebar Filters */}
            <AppointmentFilters
              filters={filters}
              onFiltersChange={setFilters}
              open={filterPanelOpen}
              onClose={() => setFilterPanelOpen(false)}
            />

            {/* Table area */}
            <div className="min-w-0 flex-1">
              <div className="space-y-4">
                {/* Toolbar */}
                <AppointmentsToolbar
                  filters={filters}
                  onFiltersChange={setFilters}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  selectedCount={selectedIds.size}
                  onToggleFilterPanel={() =>
                    setFilterPanelOpen(!filterPanelOpen)
                  }
                  filterPanelOpen={filterPanelOpen}
                />

                {/* Table / Card View / Empty State */}
                {filteredAppointments.length > 0 ? (
                  <motion.div
                    key={viewMode + filteredAppointments.length}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <AppointmentsTable
                      appointments={filteredAppointments}
                      filters={filters}
                      onFiltersChange={setFilters}
                      selectedIds={selectedIds}
                      onSelectId={handleSelectId}
                      onSelectAll={handleSelectAll}
                      onView={(appointment) => {
                        console.log("View appointment:", appointment.id);
                      }}
                      onEdit={(appointment) => {
                        console.log("Edit appointment:", appointment.id);
                      }}
                      onDelete={(appointment) =>
                        setDeleteAppointment(appointment)
                      }
                      onCheckIn={(appointment) => {
                        console.log("Check in:", appointment.id);
                      }}
                      onComplete={(appointment) => {
                        console.log("Complete:", appointment.id);
                      }}
                      onReschedule={(appointment) => {
                        console.log("Reschedule:", appointment.id);
                      }}
                      onCancel={(appointment) => {
                        console.log("Cancel:", appointment.id);
                      }}
                      viewMode={viewMode}
                    />

                    {/* Results count */}
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                      <span>
                        Showing{" "}
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          {filteredAppointments.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          {appointmentsData.length}
                        </span>{" "}
                        appointments
                      </span>
                      {selectedIds.size > 0 && (
                        <span>
                          <span className="font-medium text-dash-primary dark:text-accent">
                            {selectedIds.size}
                          </span>{" "}
                          selected
                        </span>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <EmptyState
                    onNewAppointment={() => console.log("New appointment")}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedIds.size}
        onClear={() => setSelectedIds(new Set())}
        onExportSelected={() => console.log("Export selected")}
        onAssignDoctor={() => console.log("Assign doctor to selected")}
        onChangeStatus={() => console.log("Change status of selected")}
        onDelete={handleBulkDelete}
        onCancel={() => console.log("Cancel selected")}
      />

      {/* Dialogs */}
      <AnimatePresence>
        {deleteAppointment && (
          <DeleteAppointmentDialog
            appointment={deleteAppointment}
            open={!!deleteAppointment}
            onClose={() => setDeleteAppointment(null)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
