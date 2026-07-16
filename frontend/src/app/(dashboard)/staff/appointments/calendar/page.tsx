"use client";

import { DashboardContainer } from "@/components/dashboard/staff/DashboardContainer";
import { PageHeader } from "@/components/dashboard/staff/PageHeader";
import { fadeUp, staggerContainer, staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/app/components/dashboard/Button";
import { AppointmentCalendar } from "../_components/AppointmentCalendar";
import { appointments, type Appointment } from "../_mock-data";

/* ══════════════════════════════════════════════
   Page Component
   ══════════════════════════════════════════════ */

export default function AppointmentsCalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day" | "agenda">("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = useMemo(() => {
    if (!searchQuery) return appointments;
    const q = searchQuery.toLowerCase();
    return appointments.filter(
      (a) =>
        a.patientName.toLowerCase().includes(q) ||
        a.doctorName.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const handleAppointmentClick = useCallback((appt: Appointment) => {
    setSelectedAppointment(appt);
  }, []);

  return (
    <DashboardContainer>
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
        <div className="p-4 md:p-6">
          <PageHeader
            title="Appointment Calendar"
            subtitle="View and manage appointments in calendar, week, day, or agenda view."
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-64 rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>
              <Button variant="primary" onClick={() => { /* navigate to create */ }}>
                <Plus className="h-4 w-4" />
                New Appointment
              </Button>
            </div>
          </PageHeader>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Calendar View */}
            <motion.div variants={staggerItem}>
              <AppointmentCalendar
                view={view}
                onViewChange={setView}
              />
            </motion.div>

            {/* Appointment Detail Modal */}
            {selectedAppointment && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                onClick={() => setSelectedAppointment(null)}
              >
                <motion.div
                  className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {selectedAppointment.patientName}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {selectedAppointment.doctorName} • {selectedAppointment.department}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedAppointment(null)}
                      className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Date</p>
                        <p className="text-sm text-slate-900 dark:text-white">
                          {new Date(selectedAppointment.date + "T00:00:00").toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Time</p>
                        <p className="text-sm text-slate-900 dark:text-white">
                          {selectedAppointment.startTime} - {selectedAppointment.endTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Type</p>
                        <p className="text-sm text-slate-900 dark:text-white capitalize">
                          {selectedAppointment.type.replace("-", " ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Status</p>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            selectedAppointment.status === "confirmed"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : selectedAppointment.status === "checked-in"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : selectedAppointment.status === "waiting"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                  : selectedAppointment.status === "completed"
                                    ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"
                                    : selectedAppointment.status === "cancelled"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                      : selectedAppointment.status === "no-show"
                                        ? "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400"
                                        : "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400"
                          }`}
                        >
                          {selectedAppointment.status.replace("-", " ")}
                        </span>
                      </div>
                    </div>

                    {selectedAppointment.visitReason && (
                      <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Visit Reason</p>
                        <p className="text-sm text-slate-900 dark:text-white">{selectedAppointment.visitReason}</p>
                      </div>
                    )}

                    {selectedAppointment.notes && (
                      <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Notes</p>
                        <p className="text-sm text-slate-900 dark:text-white">{selectedAppointment.notes}</p>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <Button variant="ghost" onClick={() => setSelectedAppointment(null)}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={() => { /* reschedule */ setSelectedAppointment(null); }}>
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardContainer>
  );
}
