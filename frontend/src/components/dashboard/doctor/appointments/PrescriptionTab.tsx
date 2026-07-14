"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Pill, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { PrescriptionEntry } from "./appointment-detail-mock-data";

interface PrescriptionTabProps {
  prescriptions: PrescriptionEntry[];
}

const emptyRx: PrescriptionEntry = {
  id: "",
  medicine: "",
  dosage: "",
  frequency: "",
  duration: "",
  instructions: "",
};

export function PrescriptionTab({
  prescriptions: initial,
}: PrescriptionTabProps) {
  const [items, setItems] = useState<PrescriptionEntry[]>(initial);

  const addItem = () => {
    const newItem: PrescriptionEntry = {
      ...emptyRx,
      id: `rx-temp-${Date.now()}`,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (
    id: string,
    field: keyof PrescriptionEntry,
    value: string,
  ) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
    );
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Header */}
      <motion.div
        variants={staggerItem}
        className="flex items-center justify-between"
      >
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Pill className="h-4 w-4 text-slate-400" />
          Prescriptions ({items.length})
        </h3>
      </motion.div>

      {/* Prescription list */}
      {items.map((rx, idx) => (
        <motion.div
          key={rx.id}
          variants={staggerItem}
          className={cn(
            "rounded-xl border border-slate-200/60 bg-white p-4",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-xs font-bold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
              {idx + 1}
            </div>
            <div className="grid flex-1 grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-5">
              <InputField
                label="Medicine"
                value={rx.medicine}
                onChange={(v) => updateItem(rx.id, "medicine", v)}
                placeholder="e.g. Amoxicillin 500mg"
              />
              <InputField
                label="Dosage"
                value={rx.dosage}
                onChange={(v) => updateItem(rx.id, "dosage", v)}
                placeholder="e.g. 500 mg"
              />
              <InputField
                label="Frequency"
                value={rx.frequency}
                onChange={(v) => updateItem(rx.id, "frequency", v)}
                placeholder="e.g. Three times daily"
              />
              <InputField
                label="Duration"
                value={rx.duration}
                onChange={(v) => updateItem(rx.id, "duration", v)}
                placeholder="e.g. 7 days"
              />
              <InputField
                label="Instructions"
                value={rx.instructions}
                onChange={(v) => updateItem(rx.id, "instructions", v)}
                placeholder="e.g. Take with food"
              />
            </div>
            <button
              onClick={() => removeItem(rx.id)}
              className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ))}

      {/* Add button */}
      <motion.div variants={staggerItem}>
        <button
          onClick={addItem}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3",
            "text-sm font-medium text-slate-500 transition-all",
            "hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/50",
            "dark:border-slate-700 dark:text-slate-400 dark:hover:border-cyan-700 dark:hover:text-cyan-400 dark:hover:bg-cyan-950/20",
          )}
        >
          <Plus className="h-4 w-4" />
          Add Medicine
        </button>
      </motion.div>
    </motion.div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 placeholder:text-slate-400",
          "focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-200",
          "dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-cyan-700 dark:focus:ring-cyan-800/40",
        )}
      />
    </div>
  );
}
