"use client";

import { Button } from "@/app/components/dashboard/Button";
import { DashboardContainer } from "@/components/dashboard/staff/DashboardContainer";
import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { AppointmentTable } from "../_components/AppointmentTable";
import { RescheduleDialog } from "../_components/RescheduleDialog";
import {
  SearchFilterBar,
  defaultFilters,
  type Filters,
} from "../_components/SearchFilterBar";
import { appointments, type Appointment } from "../_mock-data";

export default function ReschedulePage() {
  /* ─── State ──────────────────────────────── */

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
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

  const handleRescheduleClose = useCallback(() => {
    setRescheduleOpen(false);
    setSelectedAppointment(null);
  }, []);

  return (
    <DashboardContainer>
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
              title="Reschedule Appointments"
              subtitle="Find and reschedule existing appointments to new time slots"
            >
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </PageHeader>
          </motion.div>

          {/* ── Search & Filters ─────────────────── */}
          <motion.div variants={staggerItem} className="mb-4">
            <SearchFilterBar filters={filters} onChange={handleFilterChange} />
          </motion.div>

          {/* ── Appointments Table ───────────────── */}
          <motion.div variants={staggerItem}>
            <div className="dash-card overflow-hidden">
              <AppointmentTable
                appointments={filteredAppointments}
                onReschedule={handleReschedule}
                onView={() => {}}
                onCancel={() => {}}
              />
            </div>
          </motion.div>

          {/* ── Empty State ──────────────────────── */}
          {filteredAppointments.length === 0 && (
            <motion.div
              variants={staggerItem}
              className="dash-card p-12 text-center"
            >
              <Calendar className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                No appointments found
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Try adjusting your filters or search criteria.
              </p>
            </motion.div>
          )}
        </div>

        {/* ── Reschedule Dialog ──────────────────── */}
        <AnimatePresence>
          {rescheduleOpen && selectedAppointment && (
            <RescheduleDialog
              appointment={selectedAppointment}
              open={rescheduleOpen}
              onClose={handleRescheduleClose}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardContainer>
  );
}
