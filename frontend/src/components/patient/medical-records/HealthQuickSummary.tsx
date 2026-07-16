"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calculator,
  Droplets,
  HeartPulse,
  Pill,
  Ruler,
  Weight,
} from "lucide-react";
import type { HealthSummary } from "./types";

/* ─── Props ─── */

interface MedicalSummaryProps {
  health: HealthSummary;
  className?: string;
}

/* ─── Health stat row ─── */

function HealthRow({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Droplets;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <Icon className={cn("h-4 w-4 shrink-0", color)} />
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 min-w-[100px]">
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </span>
    </div>
  );
}

/* ─── Tag list ─── */

function TagList({
  items,
  emptyLabel,
}: {
  items: string[];
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return (
      <span className="text-xs italic text-slate-400 dark:text-slate-500">
        {emptyLabel}
      </span>
    );
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

/* ─── Component ─── */

export function HealthQuickSummary({ health, className }: MedicalSummaryProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn("dash-card overflow-hidden", className)}
    >
      <div className="p-5 pb-3">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Quick Health Summary
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Your key health indicators at a glance.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-700/40">
        <HealthRow
          icon={Droplets}
          label="Blood Group"
          value={health.bloodGroup}
          color="text-red-400"
        />
        <HealthRow
          icon={Ruler}
          label="Height"
          value={health.height}
          color="text-blue-400"
        />
        <HealthRow
          icon={Weight}
          label="Weight"
          value={health.weight}
          color="text-[var(--color-accent)]"
        />
        <HealthRow
          icon={Calculator}
          label="BMI"
          value={health.bmi}
          color="text-violet-400"
        />
      </div>

      {/* Allergies */}
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700/40">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Allergies
          </span>
          <span className="text-[10px] text-slate-400">
            ({health.allergies.length})
          </span>
        </div>
        <TagList items={health.allergies} emptyLabel="No allergies recorded" />
      </div>

      {/* Chronic Conditions */}
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700/40">
        <div className="flex items-center gap-2 mb-2">
          <HeartPulse className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Chronic Conditions
          </span>
          <span className="text-[10px] text-slate-400">
            ({health.chronicConditions.length})
          </span>
        </div>
        <TagList
          items={health.chronicConditions}
          emptyLabel="No chronic conditions"
        />
      </div>

      {/* Current Medications */}
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700/40">
        <div className="flex items-center gap-2 mb-2">
          <Pill className="h-3.5 w-3.5 text-[var(--color-primary)]" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Current Medications
          </span>
          <span className="text-[10px] text-slate-400">
            ({health.currentMedications.length})
          </span>
        </div>
        <TagList
          items={health.currentMedications}
          emptyLabel="No current medications"
        />
      </div>
    </motion.div>
  );
}
