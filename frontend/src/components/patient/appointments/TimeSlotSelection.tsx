"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Clock, Coffee, Moon, Sun, Sunset } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { periodLabels, timeSlots, type BookingFormData } from "./types";

const periodIcons: Record<string, typeof Sun> = {
  morning: Sun,
  afternoon: Coffee,
  evening: Sunset,
  night: Moon,
};

const periodColors: Record<string, string> = {
  morning: "text-amber-500",
  afternoon: "text-orange-500",
  evening: "text-indigo-500",
  night: "text-violet-500",
};

const periodBgColors: Record<string, string> = {
  morning: "bg-amber-50 dark:bg-amber-950/30",
  afternoon: "bg-orange-50 dark:bg-orange-950/30",
  evening: "bg-indigo-50 dark:bg-indigo-950/30",
  night: "bg-violet-50 dark:bg-violet-950/30",
};

export function TimeSlotSelection() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<BookingFormData>();
  const selected = watch("timeSlot");

  const periods = ["morning", "afternoon", "evening", "night"] as const;

  const getSlotsForPeriod = (period: string) =>
    timeSlots.filter((s) => s.period === period);

  const hasAvailableSlots = (period: string) =>
    getSlotsForPeriod(period).some((s) => s.available);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Select a Time
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Choose your preferred appointment time
        </p>
      </div>

      {/* Period sections */}
      <div className="space-y-6">
        {periods.map((period) => {
          const slots = getSlotsForPeriod(period);
          const available = slots.filter((s) => s.available);
          const Icon = periodIcons[period];
          const hasSlots = hasAvailableSlots(period);

          if (!hasSlots) return null;

          return (
            <motion.div
              key={period}
              variants={staggerItem}
              className="space-y-3"
            >
              {/* Period header */}
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg",
                    periodBgColors[period],
                  )}
                >
                  <Icon className={cn("h-4 w-4", periodColors[period])} />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {periodLabels[period]}
                </span>
                <span className="text-xs text-slate-400">
                  ({available.length} slots)
                </span>
              </div>

              {/* Time slot grid */}
              <AnimatePresence mode="wait">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {slots.map((slot) => {
                    const isSelected = selected === slot.id;
                    return (
                      <motion.button
                        key={slot.id}
                        variants={staggerItem}
                        type="button"
                        disabled={!slot.available}
                        onClick={() =>
                          setValue("timeSlot", slot.id, {
                            shouldValidate: true,
                          })
                        }
                        className={cn(
                          "relative flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all",
                          isSelected
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-sm dark:border-[var(--color-accent)] dark:bg-[var(--color-accent)] dark:text-slate-900"
                            : slot.available
                              ? "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
                              : "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed dark:border-slate-800 dark:bg-slate-800/30 dark:text-slate-600",
                        )}
                      >
                        <Clock
                          className={cn(
                            "h-3.5 w-3.5",
                            isSelected &&
                              "text-white/80 dark:text-slate-900/80",
                            !isSelected && slot.available && "text-slate-400",
                          )}
                        />
                        {slot.time}
                      </motion.button>
                    );
                  })}
                </div>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Empty state — all slots booked */}
      {periods.every((p) => !hasAvailableSlots(p)) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <AlertCircle className="h-10 w-10 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            No available slots
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Try selecting a different date
          </p>
        </motion.div>
      )}

      {/* Error */}
      {errors.timeSlot && (
        <p className="text-xs text-red-500">{errors.timeSlot.message}</p>
      )}
    </motion.div>
  );
}
