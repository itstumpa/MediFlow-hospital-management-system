"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  List,
  Maximize2,
  Minimize2,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  dayOfWeekLabels,
  dayOfWeekOrder,
  formatTime12h,
  getMonthDays,
  getWeekDates,
  type CalendarViewType,
  type ScheduleAppointment,
  type TimeSlot,
  type WorkingDay,
} from "./schedule-mock-data";

interface CalendarViewProps {
  viewType: CalendarViewType;
  onViewTypeChange: (view: CalendarViewType) => void;
  weekOffset: number;
  onWeekOffsetChange: (offset: number) => void;
  workingDays: WorkingDay[];
  timeSlots: TimeSlot[];
  appointments: ScheduleAppointment[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const viewOptions: {
  value: CalendarViewType;
  label: string;
  icon: LucideIcon;
}[] = [
  { value: "month", label: "Month", icon: CalendarDays },
  { value: "week", label: "Week", icon: CalendarDays },
  { value: "day", label: "Day", icon: CalendarDays },
  { value: "agenda", label: "Agenda", icon: List },
];

const MONTH_NAMES = [
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

const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarView({
  viewType,
  onViewTypeChange,
  weekOffset,
  onWeekOffsetChange,
  workingDays,
  timeSlots,
  appointments,
  selectedDate,
  onDateSelect,
}: CalendarViewProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
  const [monthYear, setMonthYear] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const headerLabel = useMemo(() => {
    if (viewType === "day") {
      const d = new Date(selectedDate);
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    if (viewType === "week") {
      const start = weekDates[0];
      const end = weekDates[6];
      const fmt = (d: Date) =>
        d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (start.getMonth() === end.getMonth()) {
        return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`;
      }
      return `${fmt(start)} – ${fmt(end)}, ${end.getFullYear()}`;
    }
    return `${MONTH_NAMES[monthYear.month]} ${monthYear.year}`;
  }, [viewType, selectedDate, weekDates, monthYear]);

  const navigateBack = () => {
    if (viewType === "day") {
      const d = new Date(selectedDate);
      d.setDate(d.getDate() - 1);
      onDateSelect(d.toISOString().split("T")[0]);
    } else if (viewType === "week") {
      onWeekOffsetChange(weekOffset - 1);
    } else {
      setMonthYear((p) =>
        p.month === 0
          ? { year: p.year - 1, month: 11 }
          : { ...p, month: p.month - 1 },
      );
    }
  };

  const navigateForward = () => {
    if (viewType === "day") {
      const d = new Date(selectedDate);
      d.setDate(d.getDate() + 1);
      onDateSelect(d.toISOString().split("T")[0]);
    } else if (viewType === "week") {
      onWeekOffsetChange(weekOffset + 1);
    } else {
      setMonthYear((p) =>
        p.month === 11
          ? { year: p.year + 1, month: 0 }
          : { ...p, month: p.month + 1 },
      );
    }
  };

  const goToToday = () => {
    onWeekOffsetChange(0);
    onDateSelect(todayStr);
    setMonthYear({ year: today.getFullYear(), month: today.getMonth() });
  };

  const getDayAppointments = (dateStr: string) =>
    appointments.filter((a) => a.date === dateStr);

  // ─── Month View ──────────────────────────────────────────────────────────
  const monthDays = useMemo(
    () => getMonthDays(monthYear.year, monthYear.month),
    [monthYear],
  );

  const renderMonthView = () => (
    <div className="grid grid-cols-7 border-l border-t border-slate-200 dark:border-slate-700">
      {DAY_SHORT.map((d) => (
        <div
          key={d}
          className="border-b border-r border-slate-200 bg-slate-50/50 px-2 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400"
        >
          {d}
        </div>
      ))}
      {monthDays.map((date, i) => {
        if (!date) {
          return (
            <div
              key={`empty-${i}`}
              className="border-b border-r border-slate-200 dark:border-slate-700"
            />
          );
        }
        const dateStr = date.toISOString().split("T")[0];
        const dayAppts = getDayAppointments(dateStr);
        const isToday = dateStr === todayStr;
        const isSelected = dateStr === selectedDate;
        const isWorking = workingDays.some(
          (w) =>
            w.day ===
              dayOfWeekOrder[date.getDay() === 0 ? 6 : date.getDay() - 1] &&
            w.isWorkingDay,
        );

        return (
          <button
            key={dateStr}
            onClick={() => onDateSelect(dateStr)}
            className={cn(
              "group relative min-h-[72px] border-b border-r border-slate-200 p-1 text-left transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50",
              isSelected &&
                "bg-dash-primary-light/50 dark:bg-dash-primary-light/20",
              !isWorking && "bg-slate-50/30 dark:bg-slate-900/30",
            )}
          >
            <span
              className={cn(
                "inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-medium",
                isToday && "bg-dash-primary text-white",
                !isToday &&
                  isSelected &&
                  "bg-dash-primary-light text-dash-primary dark:bg-dash-primary-light dark:text-accent",
                !isToday && !isSelected && "text-slate-600 dark:text-slate-400",
              )}
            >
              {date.getDate()}
            </span>
            <div className="mt-0.5 space-y-0.5">
              {dayAppts.slice(0, 3).map((apt) => (
                <div
                  key={apt.id}
                  className={cn(
                    "truncate rounded px-1 py-0.5 text-[9px] leading-tight",
                    apt.status === "completed"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                      : apt.isConflict
                        ? "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
                  )}
                >
                  {apt.startTime} {apt.patientName.split(" ")[0]}
                </div>
              ))}
              {dayAppts.length > 3 && (
                <p className="px-1 text-[9px] text-slate-400">
                  +{dayAppts.length - 3} more
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );

  // ─── Week View ───────────────────────────────────────────────────────────
  const HOURS = Array.from({ length: 12 }, (_, i) => i + 7); // 7AM–6PM
  const daysWithAppts = weekDates.map((date) => {
    const dateStr = date.toISOString().split("T")[0];
    const dayAppts = getDayAppointments(dateStr);
    const daySlots = timeSlots.filter((s) => s.date === dateStr);
    const day = dayOfWeekOrder[date.getDay() === 0 ? 6 : date.getDay() - 1];
    return { date, dateStr, day, appointments: dayAppts, slots: daySlots };
  });

  const renderWeekView = () => (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-[auto_repeat(7,1fr)] min-w-[700px]">
        {/* Header row */}
        <div className="border-b border-r border-slate-200 bg-slate-50/50 p-2 dark:border-slate-700 dark:bg-slate-800/50" />
        {daysWithAppts.map(({ date, dateStr, day }) => {
          const isToday = dateStr === todayStr;
          return (
            <div
              key={dateStr}
              className={cn(
                "border-b border-r border-slate-200 px-2 py-2 text-center dark:border-slate-700",
                isToday &&
                  "bg-dash-primary-light/50 dark:bg-dash-primary-light/20",
              )}
            >
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                {dayOfWeekLabels[day]?.shortLabel}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-sm font-semibold",
                  isToday
                    ? "text-dash-primary dark:text-accent"
                    : "text-slate-800 dark:text-slate-200",
                )}
              >
                {date.getDate()}
              </p>
            </div>
          );
        })}

        {/* Time rows */}
        {HOURS.map((hour) => (
          <div key={hour} className="contents">
            <div className="flex items-start border-b border-r border-slate-200 px-2 py-2 dark:border-slate-700">
              <span className="text-[10px] text-slate-400">
                {formatTime12h(hour)}
              </span>
            </div>
            {daysWithAppts.map(({ dateStr, appointments: dayApts }) => {
              const hourAppts = dayApts.filter((a) => {
                const h = parseInt(a.startTime.split(":")[0]);
                return h === hour;
              });
              return (
                <div
                  key={`${dateStr}-${hour}`}
                  className={cn(
                    "relative min-h-[48px] border-b border-r border-slate-200 p-0.5 dark:border-slate-700",
                    dateStr === todayStr &&
                      "bg-dash-primary-light/20 dark:bg-dash-primary-light/10",
                  )}
                >
                  {hourAppts.map((apt) => (
                    <div
                      key={apt.id}
                      className={cn(
                        "mb-0.5 rounded px-1.5 py-1 text-[10px] leading-tight",
                        apt.status === "completed"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                          : apt.isConflict
                            ? "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
                      )}
                    >
                      <p className="font-medium">
                        {apt.patientName.split(" ")[0]}
                      </p>
                      <p className="text-[8px] opacity-70">
                        {apt.startTime}–{apt.endTime}
                      </p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Day View ────────────────────────────────────────────────────────────
  const renderDayView = () => {
    const dayApts = getDayAppointments(selectedDate);
    const daySlots = timeSlots.filter((s) => s.date === selectedDate);

    return (
      <div className="space-y-1">
        {HOURS.map((hour) => {
          const hourAppts = dayApts.filter((a) => {
            const h = parseInt(a.startTime.split(":")[0]);
            return h === hour;
          });
          const hourSlots = daySlots.filter((s) => {
            const h = parseInt(s.startTime.split(":")[0]);
            return h === hour;
          });
          const isAvailable = hourSlots.some((s) => s.isAvailable);

          return (
            <div key={hour} className="flex items-stretch gap-2">
              <div className="flex w-16 items-start pt-1.5">
                <span className="text-[10px] font-medium text-slate-400">
                  {formatTime12h(hour)}
                </span>
              </div>
              <div
                className={cn(
                  "flex flex-1 flex-col rounded-lg border px-2 py-1",
                  isAvailable
                    ? "border-slate-200 dark:border-slate-700"
                    : "border-dashed border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/30",
                )}
              >
                {hourAppts.length === 0 && (
                  <p className="py-1 text-[10px] text-slate-400">
                    {isAvailable ? "Available" : "—"}
                  </p>
                )}
                {hourAppts.map((apt) => (
                  <div
                    key={apt.id}
                    className={cn(
                      "flex items-center justify-between rounded px-2 py-1.5",
                      apt.status === "completed"
                        ? "bg-emerald-50 dark:bg-emerald-950/20"
                        : apt.isConflict
                          ? "bg-red-50 dark:bg-red-950/20"
                          : "bg-blue-50 dark:bg-blue-950/20",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[9px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {apt.patientInitials}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                          {apt.patientName}
                        </p>
                        <p className="text-[9px] text-slate-400">
                          {apt.startTime} – {apt.endTime} · {apt.type}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[9px] font-medium capitalize",
                        apt.status === "completed" &&
                          "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
                        apt.status === "confirmed" &&
                          "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
                        apt.status === "in-progress" &&
                          "bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
                        apt.status === "scheduled" &&
                          "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
                      )}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ─── Agenda View ─────────────────────────────────────────────────────────
  const renderAgendaView = () => {
    const sorted = [...appointments].sort(
      (a, b) =>
        a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime),
    );
    const grouped = sorted.reduce(
      (acc, apt) => {
        if (!acc[apt.date]) acc[apt.date] = [];
        acc[apt.date].push(apt);
        return acc;
      },
      {} as Record<string, ScheduleAppointment[]>,
    );

    return (
      <div className="space-y-4">
        {Object.entries(grouped).map(([date, apts]) => {
          const d = new Date(date);
          return (
            <div key={date}>
              <h4 className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {d.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
                {date === todayStr && (
                  <span className="ml-2 rounded bg-dash-primary-light px-1.5 py-0.5 text-[9px] text-dash-primary dark:bg-dash-primary-light dark:text-accent">
                    Today
                  </span>
                )}
              </h4>
              <div className="space-y-1">
                {apts.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900/60"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {apt.patientInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {apt.patientName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {apt.startTime} – {apt.endTime}
                      </p>
                    </div>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium capitalize text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {apt.type}
                    </span>
                    {apt.isConflict && (
                      <span className="rounded bg-red-100 px-1.5 py-0.5 text-[9px] text-red-600 dark:bg-red-950/30 dark:text-red-400">
                        Conflict
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {Object.keys(grouped).length === 0 && (
          <div className="flex flex-col items-center py-8 text-center">
            <CalendarDays className="mb-2 h-8 w-8 text-slate-300 dark:text-slate-600" />
            <p className="text-sm text-slate-500">No appointments scheduled</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white transition-all dark:border-slate-700/40 dark:bg-slate-900/60",
        fullscreen && "fixed inset-4 z-40 overflow-auto shadow-2xl",
      )}
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <button
            onClick={navigateBack}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToToday}
            className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            Today
          </button>
          <button
            onClick={navigateForward}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <h3 className="ml-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
            {headerLabel}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          {/* View switcher */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50/50 p-0.5 dark:border-slate-700 dark:bg-slate-800/50">
            {viewOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => onViewTypeChange(opt.value)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                    viewType === opt.value
                      ? "bg-white text-dash-primary shadow-sm dark:bg-slate-900 dark:text-accent"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="ml-1 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            {fullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Calendar Body */}
      <div className="p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewType}-${weekOffset}-${selectedDate}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {viewType === "month" && renderMonthView()}
            {viewType === "week" && renderWeekView()}
            {viewType === "day" && renderDayView()}
            {viewType === "agenda" && renderAgendaView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
