"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import {
  appointments,
  generateCalendarDays,
  statusConfig,
  typeConfig,
  type Appointment,
  type AppointmentStatus,
} from "../_mock-data";

/* ─── Types ─────────────────────────────────── */

type CalendarView = "month" | "week" | "day" | "agenda";

interface AppointmentCalendarProps {
  view?: CalendarView;
  onViewChange?: (view: CalendarView) => void;
}

/* ─── Helpers ───────────────────────────────── */

function formatTime(time: string) {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${m} ${ampm}`;
}

const colorByStatus: Record<AppointmentStatus, string> = {
  confirmed: "border-l-blue-500 bg-blue-50/60 dark:bg-blue-950/20",
  "checked-in": "border-l-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20",
  waiting: "border-l-amber-500 bg-amber-50/60 dark:bg-amber-950/20",
  completed: "border-l-slate-400 bg-slate-50/60 dark:bg-slate-800/30",
  cancelled: "border-l-red-400 bg-red-50/60 dark:bg-red-950/20",
  "no-show": "border-l-rose-400 bg-rose-50/60 dark:bg-rose-950/20",
  rescheduled: "border-l-violet-400 bg-violet-50/60 dark:bg-violet-950/20",
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ─── Mini Appointment Badge ────────────────── */

function MiniBadge({ appointment }: { appointment: Appointment }) {
  const status = statusConfig[appointment.status];
  return (
    <div
      title={`${appointment.patientName} - ${status.label}`}
      className={`mb-0.5 truncate rounded px-1 py-0.5 text-[10px] font-medium ${status.class}`}
    >
      {formatTime(appointment.startTime)} {appointment.patientInitials}
    </div>
  );
}

/* ─── Month View ────────────────────────────── */

function MonthView({
  month,
  year,
  onPrev,
  onNext,
  onToday,
  onDayClick,
}: {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onDayClick: (day: number, month: number, year: number) => void;
}) {
  const days = useMemo(
    () => generateCalendarDays(month, year, appointments),
    [month, year],
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {monthNames[month]} {year}
          </h3>
          <button
            onClick={onNext}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={onToday}
          className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          Today
        </button>
      </div>

      {/* Day names */}
      <div className="mb-1 grid grid-cols-7">
        {dayNames.map((d) => (
          <div
            key={d}
            className="py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        key={`${month}-${year}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-7 rounded-lg border border-slate-200 dark:border-slate-700"
      >
        {days.map((day, i) => (
          <button
            key={i}
            onClick={() => onDayClick(day.date, day.month, day.year)}
            className={`min-h-[80px] border-b border-r border-slate-200 p-1.5 text-left transition-colors last:border-r-0 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50 ${
              !day.isCurrentMonth
                ? "bg-slate-50/50 dark:bg-slate-900/50"
                : "bg-white dark:bg-slate-900"
            } ${day.isToday ? "ring-2 ring-inset ring-[var(--color-primary)]" : ""}`}
          >
            <span
              className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                day.isToday
                  ? "bg-[var(--color-primary)] text-white"
                  : day.isCurrentMonth
                    ? "text-slate-700 dark:text-slate-300"
                    : "text-slate-400 dark:text-slate-600"
              }`}
            >
              {day.date}
            </span>
            <div className="mt-0.5 space-y-0.5">
              {day.appointments.slice(0, 3).map((appt) => (
                <MiniBadge key={appt.id} appointment={appt} />
              ))}
              {day.appointments.length > 3 && (
                <span className="text-[10px] text-slate-400">
                  +{day.appointments.length - 3} more
                </span>
              )}
            </div>
          </button>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Agenda View ───────────────────────────── */

function AgendaView() {
  const sorted = [...appointments].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const grouped = sorted.reduce<Record<string, Appointment[]>>((acc, appt) => {
    if (!acc[appt.date]) acc[appt.date] = [];
    acc[appt.date].push(appt);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {Object.entries(grouped).map(([date, appts]) => (
        <div key={date}>
          <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h4>
          <div className="space-y-2">
            {appts.map((appt) => {
              const status = statusConfig[appt.status];
              const type = typeConfig[appt.type];
              return (
                <div
                  key={appt.id}
                  className={`flex items-center gap-4 rounded-lg border-l-4 p-3 ${colorByStatus[appt.status]}`}
                >
                  <div className="min-w-[60px] text-sm font-medium text-slate-700 dark:text-slate-300">
                    {formatTime(appt.startTime)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {appt.patientName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {appt.doctorName} · {type.label}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.class}`}
                  >
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ─── Day View ──────────────────────────────── */

function DayView({ date }: { date: Date }) {
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const dayAppointments = appointments
    .filter((a) => a.date === dateStr)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const hours = Array.from({ length: 12 }, (_, i) => i + 7); // 7 AM to 6 PM

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-1"
    >
      <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </h3>
      <div className="rounded-lg border border-slate-200 dark:border-slate-700">
        {hours.map((hour) => {
          const timeStr = `${String(hour).padStart(2, "0")}:00`;
          const hourAppts = dayAppointments.filter((a) =>
            a.startTime.startsWith(String(hour).padStart(2, "0")),
          );
          return (
            <div
              key={hour}
              className="flex border-b border-slate-100 last:border-b-0 dark:border-slate-800"
            >
              <div className="flex w-16 shrink-0 items-start justify-center border-r border-slate-100 py-3 dark:border-slate-800">
                <span className="text-xs font-medium text-slate-400">
                  {formatTime(timeStr)}
                </span>
              </div>
              <div className="flex-1 p-2">
                {hourAppts.length === 0 ? (
                  <div className="py-2 text-center text-xs text-slate-300 dark:text-slate-600">
                    No appointments
                  </div>
                ) : (
                  <div className="space-y-1">
                    {hourAppts.map((appt) => {
                      const status = statusConfig[appt.status];
                      return (
                        <div
                          key={appt.id}
                          className={`rounded-lg border-l-4 p-2 ${colorByStatus[appt.status]}`}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                              {appt.patientName}
                            </p>
                            <span className="text-[10px] font-medium text-slate-400">
                              {formatTime(appt.startTime)} -{" "}
                              {formatTime(appt.endTime)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {appt.doctorName}
                          </p>
                          <span
                            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${status.class}`}
                          >
                            {status.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────── */

export function AppointmentCalendar({
  view = "month",
}: AppointmentCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [calView, setCalView] = useState<CalendarView>(view);

  const prev = () => {
    if (calView === "month") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((y) => y - 1);
      } else {
        setCurrentMonth((m) => m - 1);
      }
    }
  };

  const next = () => {
    if (calView === "month") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((y) => y + 1);
      } else {
        setCurrentMonth((m) => m + 1);
      }
    }
  };

  const goToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDay(today);
  };

  const handleDayClick = (day: number, month: number, year: number) => {
    setSelectedDay(new Date(year, month, day));
    setCalView("day");
  };

  if (calView === "agenda") return <AgendaView />;
  if (calView === "day" && selectedDay) return <DayView date={selectedDay} />;

  return (
    <div className="dash-card p-4">
      {/* View tabs */}
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
        {(["month", "week", "day", "agenda"] as CalendarView[]).map((v) => (
          <button
            key={v}
            onClick={() => {
              setCalView(v);
              if (v === "day" && !selectedDay) setSelectedDay(today);
              if (v === "month") setSelectedDay(null);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              calView === v
                ? "bg-[var(--color-primary)] text-white"
                : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      <MonthView
        month={currentMonth}
        year={currentYear}
        onPrev={prev}
        onNext={next}
        onToday={goToday}
        onDayClick={handleDayClick}
      />
    </div>
  );
}
