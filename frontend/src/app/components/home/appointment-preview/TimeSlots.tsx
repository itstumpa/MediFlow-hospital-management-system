"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface TimeSlot {
  time: string;
  label: string;
  available: boolean;
}

const timeSlots: TimeSlot[] = [
  { time: "09:00", label: "9:00 AM", available: true },
  { time: "10:30", label: "10:30 AM", available: true },
  { time: "13:00", label: "1:00 PM", available: true },
  { time: "15:30", label: "3:30 PM", available: true },
];

export function TimeSlots() {
  const [selected, setSelected] = useState<string>("10:30");

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
        Available Times
      </label>
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label="Available time slots"
      >
        {timeSlots.map((slot) => {
          const isSelected = selected === slot.time;
          return (
            <motion.button
              key={slot.time}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${slot.label}${slot.available ? "" : " (unavailable)"}`}
              disabled={!slot.available}
              onClick={() => setSelected(slot.time)}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                isSelected
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-border bg-surface text-text-primary hover:border-primary/40 hover:bg-primary/5"
              } ${
                !slot.available
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer"
              }`}
              whileHover={slot.available ? { scale: 1.05 } : undefined}
              whileTap={slot.available ? { scale: 0.97 } : undefined}
            >
              {slot.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
