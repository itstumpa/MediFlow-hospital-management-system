"use client";

import { staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useState } from "react";
import {
  doctorStatusConfig,
  formatTime,
  getInitials,
  type DoctorInfo,
  type SlotType,
  type TimeSlot,
} from "../_mock-data";

/* ─── Props ─────────────────────────────────── */

interface AvailabilityCardProps {
  doctor: DoctorInfo;
  slots: TimeSlot[];
  onSlotClick?: (slot: TimeSlot) => void;
}

/* ─── Slot type config (compact) ───────────── */

const slotStyle: Record<
  SlotType,
  { bg: string; text: string; border: string }
> = {
  available: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  booked: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  blocked: {
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-800",
  },
  emergency: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-800",
  },
  "lunch-break": {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
  },
  vacation: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-800",
  },
};

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */

export function AvailabilityCard({
  doctor,
  slots,
  onSlotClick,
}: AvailabilityCardProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedSlots = showAll ? slots : slots.slice(0, 8);

  const bookedCount = slots.filter(
    (s) => s.slotType === "booked" || s.slotType === "emergency",
  ).length;
  const availableCount = slots.filter((s) => s.slotType === "available").length;
  const breakCount = slots.filter(
    (s) =>
      s.slotType === "lunch-break" ||
      s.slotType === "blocked" ||
      s.slotType === "vacation",
  ).length;

  return (
    <motion.div variants={staggerItem} className="dash-card">
      {/* Header */}
      <div className="border-b border-slate-100 p-4 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
            {doctor.photoUrl ? (
              <img
                src={doctor.photoUrl}
                alt={doctor.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-bold text-[var(--color-primary)]">
                {getInitials(doctor.name)}
              </div>
            )}
            <span
              className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                doctorStatusConfig[doctor.status]?.dot ?? "bg-slate-400"
              }`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              {doctor.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {doctor.department}
            </p>
          </div>
          <span className="text-xs text-slate-400">{doctor.workingHours}</span>
        </div>

        {/* Summary row */}
        <div className="mt-3 flex gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-slate-500">
              <strong className="text-slate-700 dark:text-slate-300">
                {availableCount}
              </strong>{" "}
              open
            </span>
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-slate-500">
              <strong className="text-slate-700 dark:text-slate-300">
                {bookedCount}
              </strong>{" "}
              booked
            </span>
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-slate-500">
              <strong className="text-slate-700 dark:text-slate-300">
                {breakCount}
              </strong>{" "}
              breaks
            </span>
          </span>
        </div>
      </div>

      {/* Time slots grid */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5">
          {displayedSlots.map((slot) => {
            const style = slotStyle[slot.slotType] ?? slotStyle.available;
            const isClickable = slot.slotType === "available";

            return (
              <motion.button
                key={slot.id}
                whileHover={isClickable ? { scale: 1.05 } : undefined}
                whileTap={isClickable ? { scale: 0.95 } : undefined}
                onClick={() => isClickable && onSlotClick?.(slot)}
                disabled={!isClickable}
                className={`relative rounded-lg border px-1.5 py-2 text-center text-xs transition-all ${style.bg} ${style.text} ${style.border} ${
                  isClickable
                    ? "cursor-pointer hover:shadow-sm"
                    : "cursor-default"
                }`}
              >
                <span className="block font-medium">
                  {formatTime(slot.startTime)}
                </span>
                <span className="mt-0.5 block truncate opacity-75">
                  {slot.slotType === "booked" && slot.patientName
                    ? getInitials(slot.patientName)
                    : slot.slotType === "available"
                      ? "Open"
                      : slot.slotType === "lunch-break"
                        ? "Lunch"
                        : slot.slotType === "vacation"
                          ? "Leave"
                          : slot.slotType === "blocked"
                            ? "Blocked"
                            : "Emerg"}
                </span>
              </motion.button>
            );
          })}
        </div>

        {slots.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/5"
          >
            <Clock className="h-3 w-3" />
            {showAll ? "Show less" : `Show all ${slots.length} slots`}
          </button>
        )}
      </div>
    </motion.div>
  );
}
