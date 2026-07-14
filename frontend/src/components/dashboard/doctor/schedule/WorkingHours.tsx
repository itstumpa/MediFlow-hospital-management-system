"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Clock, Pencil, Save } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import { type WorkingDay } from "./schedule-mock-data";

interface WorkingHoursProps {
  workingDays: WorkingDay[];
  onUpdate: (days: WorkingDay[]) => void;
}

export function WorkingHours({ workingDays, onUpdate }: WorkingHoursProps) {
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<WorkingDay | null>(null);

  const startEdit = (day: WorkingDay) => {
    setEditingDay(day.day);
    setEditValues({ ...day });
  };

  const saveEdit = () => {
    if (editValues) {
      onUpdate(
        workingDays.map((d) => (d.day === editValues.day ? editValues : d)),
      );
    }
    setEditingDay(null);
    setEditValues(null);
  };

  const cancelEdit = () => {
    setEditingDay(null);
    setEditValues(null);
  };

  const toggleWorkingDay = (day: WorkingDay) => {
    onUpdate(
      workingDays.map((d) =>
        d.day === day.day ? { ...d, isWorkingDay: !d.isWorkingDay } : d,
      ),
    );
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-slate-200/60 bg-white dark:border-slate-700/40 dark:bg-slate-900/60"
    >
      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
          <Clock className="h-4 w-4 text-slate-400" />
          Working Hours
        </h3>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {workingDays.map((day) => (
          <motion.div
            key={day.day}
            variants={staggerItem}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 transition-colors",
              !day.isWorkingDay && "opacity-50",
            )}
          >
            {/* Day toggle */}
            <button
              onClick={() => toggleWorkingDay(day)}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                day.isWorkingDay
                  ? "border-dash-primary-light bg-dash-primary-light text-dash-primary dark:border-dash-primary dark:bg-dash-primary-light dark:text-accent"
                  : "border-slate-200 bg-white text-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-600",
              )}
            >
              <Check
                className={cn("h-3.5 w-3.5", !day.isWorkingDay && "opacity-0")}
              />
            </button>

            {/* Label */}
            <div className="w-20 shrink-0">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {day.label}
              </p>
              <p className="text-[10px] text-slate-400">
                {day.isWorkingDay ? `${day.slotDuration}min slots` : "Day off"}
              </p>
            </div>

            {/* Editable fields */}
            {editingDay === day.day && editValues ? (
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="time"
                  value={editValues.startTime}
                  onChange={(e) =>
                    setEditValues({ ...editValues, startTime: e.target.value })
                  }
                  className={cn(
                    "w-24 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none",
                    "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                  )}
                />
                <span className="text-xs text-slate-400">to</span>
                <input
                  type="time"
                  value={editValues.endTime}
                  onChange={(e) =>
                    setEditValues({ ...editValues, endTime: e.target.value })
                  }
                  className={cn(
                    "w-24 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none",
                    "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                  )}
                />
                <span className="text-[10px] text-slate-400">Break</span>
                <input
                  type="time"
                  value={editValues.breakStart}
                  onChange={(e) =>
                    setEditValues({ ...editValues, breakStart: e.target.value })
                  }
                  className={cn(
                    "w-20 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none",
                    "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                  )}
                />
                <span className="text-xs text-slate-400">to</span>
                <input
                  type="time"
                  value={editValues.breakEnd}
                  onChange={(e) =>
                    setEditValues({ ...editValues, breakEnd: e.target.value })
                  }
                  className={cn(
                    "w-20 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none",
                    "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                  )}
                />

                <div className="flex items-center gap-1 ml-auto">
                  <button
                    onClick={saveEdit}
                    className="rounded-lg bg-dash-primary p-1.5 text-white hover:bg-dash-primary-dark"
                  >
                    <Save className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center gap-2">
                  {day.isWorkingDay ? (
                    <>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {day.startTime} – {day.endTime}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Break: {day.breakStart}–{day.breakEnd}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs italic text-slate-400">
                      Not working
                    </span>
                  )}
                </div>
                <button
                  onClick={() => startEdit(day)}
                  className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-opacity hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100 dark:hover:bg-slate-800"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
