"use client";

import { useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  CalendarAppointment,
  CalendarView,
} from "@/lib/data/appointment-calendar";
import {
  getWeekDays,
  getMonthDays,
  isToday,
  isSameDay,
  formatDayHeader,
} from "@/lib/data/appointment-calendar";
import { AppointmentEvent } from "./AppointmentEvent";

interface AppointmentCalendarProps {
  view: CalendarView;
  currentDate: Date;
  selectedDate: Date;
  appointments: CalendarAppointment[];
  onDateSelect: (date: Date) => void;
  onAppointmentClick: (appointment: CalendarAppointment) => void;
  selectedDoctor: string;
  selectedDepartment: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 7); // 7 AM - 6 PM

export function AppointmentCalendar({
  view,
  currentDate,
  selectedDate,
  appointments,
  onDateSelect,
  onAppointmentClick,
  selectedDoctor,
  selectedDepartment,
}: AppointmentCalendarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to 8 AM on mount
  useEffect(() => {
    if (scrollRef.current && (view === "day" || view === "week")) {
      scrollRef.current.scrollTop = 120; // ~8 AM position
    }
  }, [view, currentDate]);

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      if (selectedDoctor && apt.doctorName !== selectedDoctor) return false;
      if (selectedDepartment && apt.department !== selectedDepartment)
        return false;
      return true;
    });
  }, [appointments, selectedDoctor, selectedDepartment]);

  const dayAppointments = useMemo(
    () =>
      filteredAppointments.filter((apt) => {
        const aptDate = new Date(apt.date + "T" + apt.time);
        return isSameDay(aptDate, selectedDate);
      }),
    [filteredAppointments, selectedDate],
  );

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  const weekAppointments = useMemo(
    () =>
      weekDays.map((day) => ({
        date: day,
        appointments: filteredAppointments.filter((apt) => {
          const aptDate = new Date(apt.date + "T" + apt.time);
          return isSameDay(aptDate, day);
        }),
      })),
    [weekDays, filteredAppointments],
  );

  const monthDays = useMemo(() => getMonthDays(currentDate), [currentDate]);

  const monthAppointments = useMemo(
    () =>
      monthDays.map((day) => ({
        date: day,
        count: day
          ? filteredAppointments.filter((apt) => {
              const aptDate = new Date(apt.date + "T" + apt.time);
              return isSameDay(aptDate, day);
            }).length
          : 0,
        appointments: day
          ? filteredAppointments.filter((apt) => {
              const aptDate = new Date(apt.date + "T" + apt.time);
              return isSameDay(aptDate, day);
            })
          : [],
      })),
    [monthDays, filteredAppointments],
  );

  // ─── Day View ─────────────────────────────────────────
  if (view === "day") {
    return (
      <motion.div
        key="day-view"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="dash-card overflow-hidden"
      >
        {/* Day header */}
        <div className="sticky top-0 z-10 border-b border-dash-border bg-white px-4 py-3 dark:bg-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {dayAppointments.length} appointment
            {dayAppointments.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Timeline */}
        <div
          ref={scrollRef}
          className="max-h-[600px] overflow-y-auto dash-scrollbar"
        >
          {HOURS.map((hour) => {
            const timeStr = `${hour.toString().padStart(2, "0")}:00`;
            const hourApps = dayAppointments.filter((apt) => {
              const aptHour = parseInt(apt.time.split(":")[0]);
              return aptHour === hour;
            });

            return (
              <div
                key={hour}
                className="flex border-b border-dash-border last:border-b-0"
              >
                {/* Time label */}
                <div className="flex w-16 shrink-0 items-start justify-center border-r border-dash-border py-2">
                  <span className="text-[11px] font-medium text-slate-400">
                    {hour > 12
                      ? `${hour - 12} PM`
                      : hour === 12
                        ? "12 PM"
                        : `${hour} AM`}
                  </span>
                </div>
                {/* Slot */}
                <div className="flex min-h-[60px] flex-1 flex-col gap-1 p-1.5">
                  {hourApps.length > 0 ? (
                    hourApps.map((apt) => (
                      <AppointmentEvent
                        key={apt.id}
                        appointment={apt}
                        view="day"
                        onClick={onAppointmentClick}
                      />
                    ))
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-[11px] text-slate-300 dark:text-slate-600">
                        —
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {dayAppointments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-500">
              <CalendarDays className="mb-3 h-10 w-10 opacity-40" />
              <p className="text-sm font-medium">No appointments today</p>
              <p className="mt-1 text-xs">
                Schedule a new appointment to get started.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // ─── Week View ────────────────────────────────────────
  if (view === "week") {
    return (
      <motion.div
        key="week-view"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="dash-card overflow-hidden"
      >
        {/* Week header */}
        <div className="sticky top-0 z-10 grid grid-cols-8 border-b border-dash-border bg-white dark:bg-slate-800">
          <div className="border-r border-dash-border p-2" />
          {weekDays.map((day) => (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-1px] focus-visible:outline-dash-primary",
                isToday(day)
                  ? "bg-dash-primary-light dark:bg-dash-primary/20"
                  : "hover:bg-slate-50 dark:hover:bg-slate-700",
              )}
            >
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold",
                  isToday(day) && "bg-dash-primary text-white",
                  !isToday(day) && "text-slate-900 dark:text-white",
                )}
              >
                {day.getDate()}
              </span>
            </button>
          ))}
        </div>

        {/* Week timeline */}
        <div
          ref={scrollRef}
          className="max-h-[560px] overflow-y-auto dash-scrollbar"
        >
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-8 border-b border-dash-border last:border-b-0"
            >
              {/* Hour label */}
              <div className="flex items-start justify-center border-r border-dash-border py-2">
                <span className="text-[11px] font-medium text-slate-400">
                  {hour > 12
                    ? `${hour - 12} PM`
                    : hour === 12
                      ? "12 PM"
                      : `${hour} AM`}
                </span>
              </div>
              {/* Day columns */}
              {weekAppointments.map(({ date, appointments: dayApps }) => {
                const hourApps = dayApps.filter((apt) => {
                  const aptHour = parseInt(apt.time.split(":")[0]);
                  return aptHour === hour;
                });
                return (
                  <div
                    key={date.toISOString()}
                    className={cn(
                      "min-h-[60px] border-r border-dash-border p-1 last:border-r-0",
                      isToday(date) &&
                        "bg-dash-primary-light/30 dark:bg-dash-primary/10",
                    )}
                  >
                    {hourApps.map((apt) => (
                      <AppointmentEvent
                        key={apt.id}
                        appointment={apt}
                        view="week"
                        onClick={onAppointmentClick}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // ─── Month View ───────────────────────────────────────
  return (
    <motion.div
      key="month-view"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="dash-card overflow-hidden"
    >
      {/* Month day headers */}
      <div className="sticky top-0 z-10 grid grid-cols-7 border-b border-dash-border bg-white dark:bg-slate-800">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="py-2 text-center text-[11px] font-semibold text-slate-500 dark:text-slate-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-7">
        {monthAppointments.map(
          ({ date, count, appointments: dayApps }, idx) => {
            if (!date) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[100px] border-b border-r border-dash-border bg-slate-50/50 dark:bg-slate-800/30"
                />
              );
            }

            const isSelected = isSameDay(date, selectedDate);
            const today = isToday(date);
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();

            return (
              <div
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className={cn(
                  "min-h-[100px] cursor-pointer border-b border-r border-dash-border p-1.5 transition-colors last:border-r-0",
                  !isCurrentMonth && "bg-slate-50/50 dark:bg-slate-800/30",
                  isCurrentMonth &&
                    !isSelected &&
                    !today &&
                    "hover:bg-slate-50 dark:hover:bg-slate-700/50",
                  today &&
                    !isSelected &&
                    "bg-dash-primary-light/20 dark:bg-dash-primary/10",
                  isSelected &&
                    "bg-dash-primary-light/40 ring-1 ring-inset ring-dash-primary dark:bg-dash-primary/20",
                )}
                role="button"
                tabIndex={0}
                aria-label={`${date.toLocaleDateString("en-US", { month: "long", day: "numeric" })} — ${count} appointments`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onDateSelect(date);
                }}
              >
                {/* Day number */}
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                      today
                        ? "bg-dash-primary text-white"
                        : isCurrentMonth
                          ? "text-slate-800 dark:text-slate-200"
                          : "text-slate-400 dark:text-slate-600",
                    )}
                  >
                    {date.getDate()}
                  </span>
                  {count > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-dash-primary/10 px-1.5 text-[10px] font-medium text-dash-primary dark:bg-dash-primary/20">
                      {count}
                    </span>
                  )}
                </div>

                {/* Events */}
                <div className="space-y-0.5">
                  {dayApps.slice(0, 3).map((apt) => (
                    <AppointmentEvent
                      key={apt.id}
                      appointment={apt}
                      view="month"
                      onClick={onAppointmentClick}
                      compact
                    />
                  ))}
                  {dayApps.length > 3 && (
                    <p className="px-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      +{dayApps.length - 3} more
                    </p>
                  )}
                </div>
              </div>
            );
          },
        )}
      </div>
    </motion.div>
  );
}
