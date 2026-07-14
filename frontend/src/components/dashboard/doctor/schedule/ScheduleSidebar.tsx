"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Calendar,
  CalendarPlus,
  Clock,
  Coffee,
  type LucideIcon,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import {
  availabilityStatusOptions,
  computeTodaySummary,
  type AvailabilityStatusType,
} from "./schedule-mock-data";

interface ScheduleSidebarProps {
  availabilityStatus: AvailabilityStatusType;
  onStatusChange: (status: AvailabilityStatusType) => void;
  onAddTimeSlot: () => void;
  onBlockTime: () => void;
  onAddVacation: () => void;
}

const quickActions: {
  icon: LucideIcon;
  label: string;
  action: string;
  color: string;
}[] = [
  {
    icon: CalendarPlus,
    label: "Add Time Slot",
    action: "addSlot",
    color: "text-dash-primary",
  },
  {
    icon: Coffee,
    label: "Block Time",
    action: "blockTime",
    color: "text-amber-500",
  },
  {
    icon: Plane,
    label: "Add Vacation",
    action: "vacation",
    color: "text-indigo-500",
  },
];

import { Plane } from "lucide-react";

export function ScheduleSidebar({
  availabilityStatus,
  onStatusChange,
  onAddTimeSlot,
  onBlockTime,
  onAddVacation,
}: ScheduleSidebarProps) {
  const summary = computeTodaySummary();
  const currentStatusLabel =
    availabilityStatusOptions.find((o) => o.value === availabilityStatus)
      ?.label || "Available";

  const actionHandlers: Record<string, () => void> = {
    addSlot: onAddTimeSlot,
    blockTime: onBlockTime,
    vacation: onAddVacation,
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Today's Summary */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <Calendar className="h-4 w-4 text-slate-400" />
            Today's Summary
          </h3>
        </div>
        <div className="space-y-3 p-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Status
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  availabilityStatus === "available" && "bg-emerald-500",
                  availabilityStatus === "busy" && "bg-amber-500",
                  availabilityStatus === "on-leave" && "bg-blue-500",
                  availabilityStatus === "emergency-only" && "bg-red-500",
                  availabilityStatus === "offline" && "bg-slate-400",
                )}
              />
              {currentStatusLabel}
            </span>
          </div>

          {/* Appointments */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Appointments
            </span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {summary.remainingAppointments} remaining
            </span>
          </div>

          {/* Working Hours */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Working Hours
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Clock className="h-3 w-3 text-slate-400" />
              {summary.workingHours.start} – {summary.workingHours.end}
            </span>
          </div>

          {/* Available Slots */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Available Slots
            </span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {summary.availableSlots} slots
            </span>
          </div>

          {/* Upcoming Break */}
          {summary.upcomingBreak && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Upcoming Break
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                <Coffee className="h-3 w-3" />
                {summary.upcomingBreak.start} – {summary.upcomingBreak.end}
              </span>
            </div>
          )}

          {/* Next appointment */}
          {summary.nextAppointment && (
            <div className="rounded-lg bg-dash-primary-light px-3 py-2 dark:bg-dash-primary-light">
              <p className="text-[10px] font-medium uppercase tracking-wider text-dash-primary dark:text-accent">
                Next Appointment
              </p>
              <p className="mt-0.5 text-xs font-medium text-slate-800 dark:text-slate-200">
                {summary.nextAppointment.patientName}
              </p>
              <p className="text-[10px] text-slate-500">
                {summary.nextAppointment.startTime} –{" "}
                {summary.nextAppointment.endTime}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200/60 bg-white dark:border-slate-700/40 dark:bg-slate-900/60"
      >
        <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Quick Actions
          </h3>
        </div>
        <div className="space-y-1 p-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.action}
                variants={staggerItem}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={actionHandlers[action.action]}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <Icon className={cn("h-4 w-4", action.color)} />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {action.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
