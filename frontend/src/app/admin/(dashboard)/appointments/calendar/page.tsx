"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import {
  CalendarToolbar,
  MiniCalendar,
  AppointmentCalendar,
  AppointmentDrawer,
  TodaySummary,
  UpcomingAppointments,
  DoctorAvailability,
} from "@/app/components/dashboard/calendar";
import {
  mockCalendarAppointments,
  mockDoctorAvailability,
  getTodaySummary,
  calendarDoctors,
  calendarDepartments,
  isSameDay,
} from "@/lib/data/appointment-calendar";
import type { CalendarAppointment, CalendarView } from "@/lib/data/appointment-calendar";
import { staggerContainer } from "@/app/components/dashboard/MotionVariants";
import { CalendarDays, Loader2 } from "lucide-react";

export default function AppointmentCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 12));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 6, 12));
  const [view, setView] = useState<CalendarView>("month");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<CalendarAppointment | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulate loading on view change
  const handleViewChange = useCallback((newView: CalendarView) => {
    setLoading(true);
    setView(newView);
    setTimeout(() => setLoading(false), 300);
  }, []);

  const handlePrev = useCallback(() => {
    const d = new Date(currentDate);
    if (view === "day") {
      d.setDate(d.getDate() - 1);
    } else if (view === "week") {
      d.setDate(d.getDate() - 7);
    } else {
      d.setMonth(d.getMonth() - 1);
    }
    setCurrentDate(d);
    if (view === "day") setSelectedDate(d);
  }, [currentDate, view]);

  const handleNext = useCallback(() => {
    const d = new Date(currentDate);
    if (view === "day") {
      d.setDate(d.getDate() + 1);
    } else if (view === "week") {
      d.setDate(d.getDate() + 7);
    } else {
      d.setMonth(d.getMonth() + 1);
    }
    setCurrentDate(d);
    if (view === "day") setSelectedDate(d);
  }, [currentDate, view]);

  const handleToday = useCallback(() => {
    setCurrentDate(new Date(2026, 6, 12));
    setSelectedDate(new Date(2026, 6, 12));
  }, []);

  const todaySummary = useMemo(
    () => getTodaySummary("2026-07-12", mockCalendarAppointments),
    [],
  );

  // Filter upcoming appointments for sidebar (today's remaining and future)
  const upcomingApps = useMemo(
    () =>
      mockCalendarAppointments.filter((apt) => {
        const aptDate = new Date(apt.date + "T" + apt.time);
        const today = new Date(2026, 6, 12);
        return aptDate >= today;
      }),
    [],
  );

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ─── Page Header ─────────────────────────────── */}
      <PageHeader
        title="Appointment Calendar"
        subtitle="Visualize and manage clinic schedules."
      />

      {/* ─── Calendar Toolbar ────────────────────────── */}
      <CalendarToolbar
        currentDate={currentDate}
        view={view}
        onViewChange={handleViewChange}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
        selectedDoctor={selectedDoctor}
        onDoctorChange={setSelectedDoctor}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        doctors={calendarDoctors}
        departments={calendarDepartments}
      />

      {/* ─── Main Layout ─────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Left: Calendar */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="dash-card flex items-center justify-center py-24"
              >
                <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p className="text-sm font-medium">Loading calendar…</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`calendar-${view}-${currentDate.toISOString()}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <AppointmentCalendar
                  view={view}
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  appointments={mockCalendarAppointments}
                  onDateSelect={setSelectedDate}
                  onAppointmentClick={setSelectedAppointment}
                  selectedDoctor={selectedDoctor}
                  selectedDepartment={selectedDepartment}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-4">
          <MiniCalendar
            currentDate={currentDate}
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
              setCurrentDate(date);
            }}
            onMonthChange={setCurrentDate}
          />
          <TodaySummary summary={todaySummary} />
          <UpcomingAppointments
            appointments={upcomingApps}
            onAppointmentClick={setSelectedAppointment}
          />
          <DoctorAvailability doctors={mockDoctorAvailability} />

          {/* Keyboard hint */}
          <div className="rounded-xl border border-dash-border bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              Keyboard shortcuts
            </p>
            <div className="mt-1.5 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
              <p><kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-700">←</kbd> <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-700">→</kbd> Navigate</p>
              <p><kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-700">T</kbd> Today</p>
              <p><kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-700">D</kbd> <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-700">W</kbd> <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-700">M</kbd> Views</p>
              <p><kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-700">Esc</kbd> Close drawer</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Appointment Drawer ──────────────────────── */}
      <AppointmentDrawer
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      />
    </motion.div>
  );
}
