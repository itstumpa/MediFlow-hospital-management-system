"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Save, X } from "lucide-react";
import { useState } from "react";
import { fadeInBackdrop, scaleUp } from "../MotionVariants";
import { generateTimeSlots, type WorkingDay } from "./schedule-mock-data";

interface TimeSlotEditorProps {
  isOpen: boolean;
  onClose: () => void;
  workingDays: WorkingDay[];
}

export function TimeSlotEditor({
  isOpen,
  onClose,
  workingDays,
}: TimeSlotEditorProps) {
  const [day, setDay] = useState("monday");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [slotDuration, setSlotDuration] = useState(30);
  const [bufferMinutes, setBufferMinutes] = useState(5);
  const [maxPatients, setMaxPatients] = useState(1);
  const [isRecurring, setIsRecurring] = useState(true);

  const selectedDay = workingDays.find((d) => d.day === day);

  const previewSlots = generateTimeSlots(startTime, endTime, slotDuration);

  const handleSave = () => {
    // In a real app, save to backend
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={fadeInBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            variants={scaleUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 mx-auto max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl",
              "dark:bg-slate-900",
              "lg:bottom-auto lg:top-[10%] lg:rounded-2xl",
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-dash-primary" />
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Create Time Slot
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 p-5">
              {/* Day */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Day
                </label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className={cn(
                    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none",
                    "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                  )}
                >
                  {workingDays.map((d) => (
                    <option
                      key={d.day}
                      value={d.day}
                      disabled={!d.isWorkingDay}
                    >
                      {d.label} {!d.isWorkingDay ? "(Day off)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className={cn(
                      "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none",
                      "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                      "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                    )}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className={cn(
                      "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none",
                      "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                      "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                    )}
                  />
                </div>
              </div>

              {/* Slot Duration */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Slot Duration (minutes)
                </label>
                <select
                  value={slotDuration}
                  onChange={(e) => setSlotDuration(Number(e.target.value))}
                  className={cn(
                    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none",
                    "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                  )}
                >
                  {[15, 20, 30, 45, 60].map((d) => (
                    <option key={d} value={d}>
                      {d} min
                    </option>
                  ))}
                </select>
              </div>

              {/* Buffer & Max Patients */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Buffer Time (min)
                  </label>
                  <select
                    value={bufferMinutes}
                    onChange={(e) => setBufferMinutes(Number(e.target.value))}
                    className={cn(
                      "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none",
                      "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                      "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                    )}
                  >
                    {[0, 5, 10, 15, 30].map((d) => (
                      <option key={d} value={d}>
                        {d} min
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Max Patients
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={maxPatients}
                    onChange={(e) => setMaxPatients(Number(e.target.value))}
                    className={cn(
                      "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none",
                      "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                      "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                    )}
                  />
                </div>
              </div>

              {/* Recurring */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="rounded border-slate-300 text-dash-primary focus:ring-dash-primary-light dark:border-slate-600"
                />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  Recurring weekly
                </span>
              </label>

              {/* Preview */}
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Preview ({previewSlots.length} slots)
                </p>
                <div className="flex flex-wrap gap-1">
                  {previewSlots.map((slot) => (
                    <span
                      key={slot}
                      className="rounded bg-white px-2 py-1 text-[10px] font-medium text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-400"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-5 py-3 dark:border-slate-700">
              <button
                onClick={onClose}
                className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-lg bg-dash-primary px-3.5 py-2 text-xs font-medium text-white hover:bg-dash-primary-dark"
              >
                <Save className="h-3.5 w-3.5" />
                Create Slot
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
