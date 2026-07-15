"use client";

import {
  fadeUp,
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Clock, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatTime,
  getMonthDays,
  getWeekDates,
  isToday,
  scheduleData,
  weekScheduleData,
  type CalendarDay,
  type ScheduleEvent,
  type ViewMode,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface DoctorCalendarProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  onEventClick?: (event: ScheduleEvent) => void;
}

/* ─── View mode tabs ────────────────────────── */

const viewModes: { value: ViewMode; label: string }[] = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
  { value: "agenda", label: "Agenda" },
];

/* ══════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════ */

function getMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function getWeekRange(date: Date): string {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  start.setDate(diff);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

function getDayHeader(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getEventsForDate(dateStr: string): ScheduleEvent[] {
  return scheduleData.flatMap((entry) =>
    entry.events.filter((ev) => ev.date === dateStr),
  );
}

function getWeekEvents(): Map<string, ScheduleEvent[]> {
  const map = new Map<string, ScheduleEvent[]>();
  weekScheduleData.forEach(({ date, entries }) => {
    map.set(
      date,
      entries.flatMap((e) => e.events),
    );
  });
  return map;
}

function getDayEvents(dateStr: string): ScheduleEvent[] {
  return getEventsForDate(dateStr).sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );
}

const HOUR_HEIGHT = 60;
const START_HOUR = 7;
const END_HOUR = 21;

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function DoctorCalendar({
  viewMode,
  onViewChange,
  onEventClick,
}: DoctorCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterDepartment, setFilterDepartment] = useState<string>("");

  const departments = useMemo(
    () => Array.from(new Set(scheduleData.map((d) => d.department))).sort(),
    [],
  );

  /* ── Navigation ── */
  const navigate = (direction: "prev" | "next") => {
    const d = new Date(currentDate);
    if (viewMode === "month") {
      d.setMonth(d.getMonth() + (direction === "next" ? 1 : -1));
    } else if (viewMode === "week") {
      d.setDate(d.getDate() + (direction === "next" ? 7 : -7));
    } else {
      d.setDate(d.getDate() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(d);
  };

  const goToToday = () => setCurrentDate(new Date());

  /* ── Filter ── */
  const filteredEvents = useMemo(() => {
    if (!filterDepartment) return null;
    return scheduleData
      .filter((d) => d.department === filterDepartment)
      .flatMap((d) => d.events);
  }, [filterDepartment]);

  /* ══════════════════════════════════════════
     Month View
     ══════════════════════════════════════════ */
  const MonthView = () => {
    const monthDays = useMemo(
      () => getMonthDays(currentDate.getFullYear(), currentDate.getMonth()),
      [currentDate],
    );

    const daysWithEvents: CalendarDay[] = useMemo(() => {
      if (filteredEvents) {
        return monthDays.map((day) => ({
          ...day,
          events: filteredEvents.filter((ev) => ev.date === day.date),
        }));
      }
      return monthDays.map((day) => ({
        ...day,
        events: getEventsForDate(day.date),
      }));
    }, [monthDays, filteredEvents]);

    return (
      <div className="dash-card overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-700">
          {dayNames.map((name) => (
            <div
              key={name}
              className="py-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400"
            >
              {name}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7">
          {daysWithEvents.map((day) => (
            <div
              key={day.date}
              className={`min-h-[90px] border-b border-r border-slate-100 p-1 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50 ${
                !day.isCurrentMonth ? "bg-slate-50/50 dark:bg-slate-800/30" : ""
              }`}
            >
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  day.isToday
                    ? "bg-[var(--color-primary)] text-white"
                    : day.isCurrentMonth
                      ? "text-slate-700 dark:text-slate-300"
                      : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {day.dayNumber}
              </span>

              <div className="mt-1 space-y-0.5">
                {day.events.slice(0, 3).map((event) => (
                  <button
                    key={event.id}
                    onClick={() => onEventClick?.(event)}
                    className="flex w-full items-center gap-1 rounded px-1 py-0.5 text-left text-[10px] transition-opacity hover:opacity-80"
                    style={{ backgroundColor: `${event.color}20` }}
                  >
                    <span
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: event.color }}
                    />
                    <span className="truncate font-medium text-slate-700 dark:text-slate-300">
                      {event.patientName ?? "—"}
                    </span>
                  </button>
                ))}
                {day.events.length > 3 && (
                  <span className="px-1 text-[10px] text-slate-400">
                    +{day.events.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ══════════════════════════════════════════
     Week View
     ══════════════════════════════════════════ */
  const WeekView = () => {
    const weekDates = getWeekDates(currentDate);
    const weekEvents: Map<string, ScheduleEvent[]> = useMemo(() => {
      const map = new Map<string, ScheduleEvent[]>();
      weekDates.forEach((date) => {
        const events = filteredEvents
          ? filteredEvents.filter((ev) => ev.date === date)
          : getEventsForDate(date);
        map.set(date, events);
      });
      return map;
    }, [weekDates, filteredEvents]);

    const hourLabels = [];
    for (let h = START_HOUR; h <= END_HOUR; h++) {
      hourLabels.push(`${h.toString().padStart(2, "0")}:00`);
    }

    return (
      <div className="dash-card overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-8 border-b border-slate-200 dark:border-slate-700">
          <div className="border-r border-slate-100 p-2 dark:border-slate-700" />
          {weekDates.map((date) => {
            const d = new Date(date);
            const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
            const dayNum = d.getDate();
            const today = isToday(date);
            return (
              <div
                key={date}
                className={`p-2 text-center ${
                  today ? "bg-[var(--color-primary)]/5" : ""
                }`}
              >
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {dayName}
                </div>
                <div
                  className={`mt-0.5 text-sm font-semibold ${
                    today
                      ? "text-[var(--color-primary)]"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {dayNum}
                </div>
              </div>
            );
          })}
        </div>

        {/* Time grid */}
        <div className="overflow-auto" style={{ maxHeight: 600 }}>
          {hourLabels.map((hour, idx) => {
            const hourNum = START_HOUR + idx;
            return (
              <div
                key={hour}
                className="grid grid-cols-8 border-b border-slate-100 dark:border-slate-700"
              >
                <div className="flex items-start justify-center border-r border-slate-100 py-2 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400">
                    {hourNum > 12
                      ? `${hourNum - 12} PM`
                      : hourNum === 12
                        ? "12 PM"
                        : `${hourNum} AM`}
                  </span>
                </div>
                {weekDates.map((date) => {
                  const events = (weekEvents.get(date) ?? []).filter((ev) => {
                    const evHour = Number.parseInt(ev.startTime.split(":")[0]);
                    return evHour === hourNum;
                  });

                  return (
                    <div
                      key={`${date}-${hour}`}
                      className="relative min-h-[60px] border-r border-slate-100 p-1 dark:border-slate-700"
                    >
                      {events.map((event) => (
                        <motion.button
                          key={event.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => onEventClick?.(event)}
                          className="mb-0.5 w-full rounded px-1.5 py-1 text-left text-[10px] leading-tight transition-opacity hover:opacity-80"
                          style={{
                            backgroundColor: `${event.color}25`,
                            borderLeft: `2px solid ${event.color}`,
                          }}
                        >
                          <span className="block font-medium text-slate-700 dark:text-slate-300">
                            {formatTime(event.startTime)}
                          </span>
                          <span className="block truncate text-slate-500 dark:text-slate-400">
                            {event.patientName ?? "—"}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* ══════════════════════════════════════════
     Day View
     ══════════════════════════════════════════ */
  const DayView = () => {
    const dateStr = currentDate.toISOString().split("T")[0];
    const events = useMemo(
      () =>
        filteredEvents
          ? filteredEvents.filter((ev) => ev.date === dateStr)
          : getDayEvents(dateStr),
      [dateStr, filteredEvents],
    );

    const hourLabels = [];
    for (let h = START_HOUR; h <= END_HOUR; h++) {
      hourLabels.push(`${h.toString().padStart(2, "0")}:00`);
    }

    return (
      <div className="dash-card overflow-hidden">
        <div className="overflow-auto" style={{ maxHeight: 600 }}>
          {hourLabels.map((hour, idx) => {
            const hourNum = START_HOUR + idx;
            const hourEvents = events.filter((ev) => {
              const evHour = Number.parseInt(ev.startTime.split(":")[0]);
              return evHour === hourNum;
            });

            return (
              <div
                key={hour}
                className="flex border-b border-slate-100 dark:border-slate-700"
              >
                <div className="flex w-20 flex-shrink-0 items-start justify-center border-r border-slate-100 py-3 dark:border-slate-700">
                  <span className="text-xs text-slate-400">
                    {hourNum > 12
                      ? `${hourNum - 12} PM`
                      : hourNum === 12
                        ? "12 PM"
                        : `${hourNum} AM`}
                  </span>
                </div>
                <div className="flex min-h-[60px] flex-1 flex-wrap gap-1.5 p-2">
                  {hourEvents.map((event) => (
                    <motion.button
                      key={event.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => onEventClick?.(event)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-opacity hover:opacity-80"
                      style={{
                        backgroundColor: `${event.color}20`,
                        borderLeft: `3px solid ${event.color}`,
                      }}
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {event.patientName ?? "Blocked"}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {event.reason || event.doctorName}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {formatTime(event.startTime)} –{" "}
                          {formatTime(event.endTime)}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* ══════════════════════════════════════════
     Agenda View
     ══════════════════════════════════════════ */
  const AgendaView = () => {
    const weekDates = getWeekDates(currentDate);
    const weekEvents: ScheduleEvent[] = useMemo(() => {
      const events: ScheduleEvent[] = [];
      weekDates.forEach((date) => {
        const evts = filteredEvents
          ? filteredEvents.filter((ev) => ev.date === date)
          : getEventsForDate(date);
        events.push(...evts);
      });
      return events.sort(
        (a, b) =>
          new Date(`${a.date}T${a.startTime}`).getTime() -
          new Date(`${b.date}T${b.startTime}`).getTime(),
      );
    }, [weekDates, filteredEvents]);

    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {weekEvents.length > 0 ? (
          weekEvents.map((event) => (
            <motion.button
              key={event.id}
              variants={staggerItem}
              whileHover={{ scale: 1.005 }}
              onClick={() => onEventClick?.(event)}
              className="flex w-full items-center gap-4 rounded-xl border border-slate-100 bg-white p-3 text-left transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-700"
            >
              {/* Date badge */}
              <div className="flex w-12 flex-shrink-0 flex-col items-center rounded-lg bg-slate-50 py-1.5 dark:bg-slate-700">
                <span className="text-[10px] font-medium text-slate-400">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {new Date(event.date).getDate()}
                </span>
              </div>

              {/* Color indicator */}
              <div
                className="h-10 w-1 flex-shrink-0 rounded-full"
                style={{ backgroundColor: event.color }}
              />

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {event.patientName ?? "—"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {event.doctorName} · {event.reason || "No reason specified"}
                </p>
              </div>

              {/* Time & doctor */}
              <div className="flex flex-shrink-0 items-center gap-2 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  {formatTime(event.startTime)} – {formatTime(event.endTime)}
                </span>
              </div>
            </motion.button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <Calendar className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              No appointments found
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              No scheduled events for this period.
            </p>
          </div>
        )}
      </motion.div>
    );
  };

  /* ══════════════════════════════════════════
     Render
     ══════════════════════════════════════════ */

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-800/50">
        {/* Navigation */}
        <div className="flex items-center gap-1.5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("prev")}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
          <button
            onClick={goToToday}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/5"
          >
            Today
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("next")}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
          <h3 className="ml-2 text-sm font-semibold text-slate-900 dark:text-white">
            {viewMode === "month" && getMonthYear(currentDate)}
            {viewMode === "week" && getWeekRange(currentDate)}
            {viewMode === "day" && getDayHeader(currentDate)}
            {viewMode === "agenda" && getWeekRange(currentDate)}
          </h3>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Department filter */}
          <div className="relative">
            <Filter className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="h-8 appearance-none rounded-lg border border-slate-200 bg-white pl-8 pr-7 text-xs font-medium text-slate-600 transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* View mode tabs */}
          <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-600">
            {viewModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => onViewChange(mode.value)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  viewMode === mode.value
                    ? "bg-[var(--color-primary)] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {viewMode === "month" && <MonthView />}
          {viewMode === "week" && <WeekView />}
          {viewMode === "day" && <DayView />}
          {viewMode === "agenda" && <AgendaView />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
