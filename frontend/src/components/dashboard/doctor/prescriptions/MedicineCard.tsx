"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Moon,
  Pill,
  Sun,
  Sunrise,
  Sunset,
  Trash2,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import type { MedicineItem } from "./prescriptions-mock-data";

interface MedicineCardProps {
  medicine: MedicineItem;
  index: number;
  onUpdate: (index: number, medicine: MedicineItem) => void;
  onRemove: (index: number) => void;
  onDuplicate: (index: number) => void;
}

const timeSlots = [
  {
    key: "morning" as const,
    label: "Morning",
    icon: Sunrise,
    color: "text-amber-500",
  },
  {
    key: "afternoon" as const,
    label: "Afternoon",
    icon: Sun,
    color: "text-orange-500",
  },
  {
    key: "evening" as const,
    label: "Evening",
    icon: Sunset,
    color: "text-indigo-400",
  },
  { key: "night" as const, label: "Night", icon: Moon, color: "text-blue-500" },
];

export function MedicineCard({
  medicine,
  index,
  onUpdate,
  onRemove,
  onDuplicate,
}: MedicineCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleTimeSlot = (
    slot: "morning" | "afternoon" | "evening" | "night",
  ) => {
    onUpdate(index, { ...medicine, [slot]: !medicine[slot] });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200/60 bg-white transition-all",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
        expanded && "shadow-md",
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dash-primary-light dark:bg-teal-950/30">
          <Pill className="h-4 w-4 text-dash-primary dark:text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {medicine.name}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {medicine.strength} · {medicine.category}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDuplicate(index)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            title="Duplicate"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onRemove(index)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
            title="Remove"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Dosage & Frequency summary */}
      <div className="flex items-center gap-4 px-3 pb-3 text-xs text-slate-500 dark:text-slate-400">
        <span>
          Dosage:{" "}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {medicine.dosage}
          </span>
        </span>
        <span>
          Frequency:{" "}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {medicine.frequency}
          </span>
        </span>
        <span>
          Duration:{" "}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {medicine.duration} {medicine.durationUnit}
          </span>
        </span>
      </div>

      {/* Expanded details */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-slate-100 px-3 py-3 dark:border-slate-700/40"
        >
          {/* Time slots */}
          <div>
            <p className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              Time of Day
            </p>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((slot) => {
                const active = medicine[slot.key];
                const Icon = slot.icon;
                return (
                  <button
                    key={slot.key}
                    onClick={() => toggleTimeSlot(slot.key)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all",
                      active
                        ? "border-dash-primary-light bg-dash-primary-light text-dash-primary-dark dark:border-teal-800 dark:bg-teal-950/30 dark:text-accent"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                    )}
                  >
                    <Icon
                      className={cn("h-3.5 w-3.5", active ? slot.color : "")}
                    />
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Food relation */}
          <div className="mt-3">
            <p className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              With Food
            </p>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  onUpdate(index, {
                    ...medicine,
                    beforeFood: !medicine.beforeFood,
                    afterFood: medicine.beforeFood ? medicine.afterFood : false,
                  })
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all",
                  medicine.beforeFood
                    ? "border-dash-primary-light bg-dash-primary-light text-dash-primary-dark dark:border-teal-800 dark:bg-teal-950/30 dark:text-accent"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                )}
              >
                <Utensils className="h-3.5 w-3.5" />
                Before Food
              </button>
              <button
                onClick={() =>
                  onUpdate(index, {
                    ...medicine,
                    afterFood: !medicine.afterFood,
                    beforeFood: medicine.afterFood
                      ? medicine.beforeFood
                      : false,
                  })
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all",
                  medicine.afterFood
                    ? "border-dash-primary-light bg-dash-primary-light text-dash-primary-dark dark:border-teal-800 dark:bg-teal-950/30 dark:text-accent"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                )}
              >
                <Utensils className="h-3.5 w-3.5" />
                After Food
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-3">
            <p className="mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
              Instructions
            </p>
            <textarea
              value={medicine.instructions}
              onChange={(e) =>
                onUpdate(index, { ...medicine, instructions: e.target.value })
              }
              rows={2}
              className={cn(
                "w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none transition-all",
                "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:focus:border-teal-600 dark:focus:ring-teal-900/30",
              )}
              placeholder="Enter special instructions..."
            />
          </div>

          {/* Dosage / Frequency / Duration */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
                Dosage
              </label>
              <input
                type="text"
                value={medicine.dosage}
                onChange={(e) =>
                  onUpdate(index, { ...medicine, dosage: e.target.value })
                }
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 outline-none transition-all",
                  "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                )}
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
                Frequency
              </label>
              <input
                type="text"
                value={medicine.frequency}
                onChange={(e) =>
                  onUpdate(index, { ...medicine, frequency: e.target.value })
                }
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 outline-none transition-all",
                  "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                )}
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400">
                Duration
              </label>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={medicine.duration}
                  onChange={(e) =>
                    onUpdate(index, { ...medicine, duration: e.target.value })
                  }
                  className={cn(
                    "w-14 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 outline-none transition-all",
                    "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
                  )}
                />
                <select
                  value={medicine.durationUnit}
                  onChange={(e) =>
                    onUpdate(index, {
                      ...medicine,
                      durationUnit: e.target.value as
                        | "days"
                        | "weeks"
                        | "months",
                    })
                  }
                  className={cn(
                    "flex-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-600 outline-none transition-all",
                    "focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light",
                    "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                  )}
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
