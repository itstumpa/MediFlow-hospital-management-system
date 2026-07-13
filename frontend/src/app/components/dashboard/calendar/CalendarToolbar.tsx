"use client";

import type { CalendarView } from "@/lib/data/appointment-calendar";
import { formatMonthYear } from "@/lib/data/appointment-calendar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Printer } from "lucide-react";

interface CalendarToolbarProps {
  currentDate: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  selectedDoctor: string;
  onDoctorChange: (doctor: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  doctors: readonly {
    id: string;
    name: string;
    initials: string;
    department: string;
  }[];
  departments: readonly string[];
}

const viewOptions: { value: CalendarView; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export function CalendarToolbar({
  currentDate,
  view,
  onViewChange,
  onPrev,
  onNext,
  onToday,
  selectedDoctor,
  onDoctorChange,
  selectedDepartment,
  onDepartmentChange,
  doctors,
  departments,
}: CalendarToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-dash-border bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Row 1: Title + New Appointment */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-xl bg-dash-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-dash-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-primary"
            aria-label="New Appointment"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Appointment</span>
          </motion.button>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToday}
            className="rounded-xl border border-dash-border bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-primary dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
          >
            Today
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl border border-dash-border bg-white p-2 text-slate-500 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-primary dark:border-slate-600 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600"
            aria-label="Print"
          >
            <Printer className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Row 2: Navigation + View + Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Date Navigation */}
        <div className="flex items-center rounded-xl border border-dash-border bg-white dark:border-slate-600 dark:bg-slate-700">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onPrev}
            className="flex h-9 w-9 items-center justify-center rounded-l-xl text-slate-500 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-[-1px] focus-visible:outline-dash-primary dark:text-slate-400 dark:hover:bg-slate-600"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
          <span className="min-w-[180px] px-3 text-center text-sm font-semibold text-slate-900 dark:text-white">
            {formatMonthYear(currentDate)}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onNext}
            className="flex h-9 w-9 items-center justify-center rounded-r-xl text-slate-500 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-[-1px] focus-visible:outline-dash-primary dark:text-slate-400 dark:hover:bg-slate-600"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>

        {/* View Selector */}
        <div className="flex overflow-hidden rounded-xl border border-dash-border bg-white dark:border-slate-600 dark:bg-slate-700">
          {viewOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onViewChange(opt.value)}
              className={cn(
                "px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-1px] focus-visible:outline-dash-primary",
                view === opt.value
                  ? "bg-dash-primary text-white"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-600",
              )}
              aria-pressed={view === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex sm:items-center sm:gap-3">
          {/* Doctor Filter */}
          <select
            value={selectedDoctor}
            onChange={(e) => onDoctorChange(e.target.value)}
            className="rounded-xl border border-dash-border bg-white px-3 py-2 text-sm text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-primary dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
            aria-label="Filter by doctor"
          >
            <option value="">All Doctors</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.name}>
                {doc.name}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="rounded-xl border border-dash-border bg-white px-3 py-2 text-sm text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-primary dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
            aria-label="Filter by department"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
