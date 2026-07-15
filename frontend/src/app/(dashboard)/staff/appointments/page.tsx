"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { ViewMode } from "./_components";
import {
  AppointmentCalendar,
  AppointmentCard,
  AppointmentForm,
  AppointmentStats,
  AppointmentTable,
  CancelDialog,
  DoctorAvailabilitySidebar,
  RescheduleDialog,
  SearchFilterBar,
  ViewModeSwitcher,
  WaitlistCard,
} from "./_components";
import type { Filters } from "./_components/SearchFilterBar";
import { defaultFilters } from "./_components/SearchFilterBar";
import { appointments, type Appointment } from "./_mock-data";

export default function AppointmentsPage() {
  /* ─── State ──────────────────────────────── */

  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const [createOpen, setCreateOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  /* ─── Derived ─────────────────────────────── */

  const filteredAppointments = useMemo(() => {
    let result = appointments;

    // Search query
    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (a) =>
          a.patientName.toLowerCase().includes(q) ||
          a.doctorName.toLowerCase().includes(q) ||
          a.department.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q),
      );
    }

    // Doctor filter
    if (filters.doctor && filters.doctor !== "All Doctors") {
      result = result.filter((a) => a.doctorName === filters.doctor);
    }

    // Department filter
    if (filters.department && filters.department !== "All Departments") {
      result = result.filter((a) => a.department === filters.department);
    }

    // Date filter
    if (filters.date) {
      result = result.filter((a) => a.date === filters.date);
    }

    // Status filter
    if (filters.status && filters.status !== "all") {
      result = result.filter((a) => a.status === filters.status);
    }

    // Type filter
    if (filters.type && filters.type !== "all") {
      result = result.filter((a) => a.type === filters.type);
    }

    // Sort
    if (filters.sort === "date-asc") {
      result = [...result].sort(
        (a, b) =>
          a.date.localeCompare(b.date) ||
          a.startTime.localeCompare(b.startTime),
      );
    } else if (filters.sort === "date-desc") {
      result = [...result].sort(
        (a, b) =>
          b.date.localeCompare(a.date) ||
          b.startTime.localeCompare(a.startTime),
      );
    } else if (filters.sort === "patient-asc") {
      result = [...result].sort((a, b) =>
        a.patientName.localeCompare(b.patientName),
      );
    } else if (filters.sort === "patient-desc") {
      result = [...result].sort((a, b) =>
        b.patientName.localeCompare(a.patientName),
      );
    }

    return result;
  }, [filters]);

  /* ─── Handlers ────────────────────────────── */

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const handleReschedule = useCallback((appt: Appointment) => {
    setSelectedAppointment(appt);
    setRescheduleOpen(true);
  }, []);

  const handleCancel = useCallback((appt: Appointment) => {
    setSelectedAppointment(appt);
    setCancelOpen(true);
  }, []);

  const handleView = useCallback((appt: Appointment) => {
    // In production, would navigate to detail page or open detail drawer
    console.log("View appointment:", appt.id);
  }, []);

  /* ─── Render main content based on viewMode ── */

  const renderMainContent = () => {
    switch (viewMode) {
      case "calendar":
        return <AppointmentCalendar view="month" onViewChange={() => {}} />;

      case "table":
        return <AppointmentTable searchQuery={filters.query} />;

      case "timeline":
        return (
          <div className="dash-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <svg
                className="h-7 w-7 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Timeline View
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              A chronological Gantt-style timeline of today&apos;s appointments
              is coming soon.
            </p>
          </div>
        );

      case "cards":
        return <AppointmentCard />;

      default:
        return <AppointmentTable searchQuery={filters.query} />;
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50"
    >
      <div className="p-4 md:p-6">
        {/* ── Page Header ──────────────────────── */}
        <motion.div variants={staggerItem}>
          <PageHeader
            title="Appointment Management"
            subtitle="Manage all clinic appointments, schedules, and patient visits."
          >
            <Button variant="primary" onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </PageHeader>
        </motion.div>

        {/* ── Stats ────────────────────────────── */}
        <motion.div variants={staggerItem} className="mb-5">
          <AppointmentStats />
        </motion.div>

        {/* ── Search & Filters ─────────────────── */}
        <motion.div variants={staggerItem} className="mb-4">
          <SearchFilterBar filters={filters} onChange={handleFilterChange} />
        </motion.div>

        {/* ── View Mode Switcher ───────────────── */}
        <motion.div variants={staggerItem} className="mb-5">
          <ViewModeSwitcher active={viewMode} onChange={setViewMode} />
        </motion.div>

        {/* ── Main Grid ────────────────────────── */}
        <motion.div
          variants={staggerItem}
          className="grid grid-cols-1 gap-5 lg:grid-cols-4"
        >
          {/* Main Content Area */}
          <motion.div
            key={viewMode}
            variants={staggerItem}
            className="lg:col-span-3"
          >
            {renderMainContent()}
          </motion.div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:col-span-1">
            <DoctorAvailabilitySidebar />
            <WaitlistCard />
          </aside>
        </motion.div>
      </div>

      {/* ── Dialogs ────────────────────────────── */}
      <AnimatePresence>
        {createOpen && (
          <AppointmentForm
            open={createOpen}
            onClose={() => setCreateOpen(false)}
          />
        )}

        {rescheduleOpen && selectedAppointment && (
          <RescheduleDialog
            appointment={selectedAppointment}
            open={rescheduleOpen}
            onClose={() => {
              setRescheduleOpen(false);
              setSelectedAppointment(null);
            }}
          />
        )}

        {cancelOpen && selectedAppointment && (
          <CancelDialog
            appointment={selectedAppointment}
            open={cancelOpen}
            onClose={() => {
              setCancelOpen(false);
              setSelectedAppointment(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
