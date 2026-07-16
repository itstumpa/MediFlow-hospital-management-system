"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  Droplets,
  Gauge,
  Heart,
  Ruler,
  Thermometer,
  Weight,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { VitalsData } from "./types";

/* ─── Vital item ─── */

function VitalItem({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 dark:border-slate-700/40 dark:bg-slate-800/60">
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          color,
        )}
      >
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─── Props ─── */

interface VitalsCardProps {
  vitals: VitalsData;
  className?: string;
}

export function VitalsCard({ vitals, className }: VitalsCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn("dash-card p-5", className)}
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="h-4 w-4 text-[var(--color-primary)]" />
          Vitals
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Recorded during consultation
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <VitalItem
          icon={Gauge}
          label="Blood Pressure"
          value={vitals.bloodPressure}
          color="bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400"
        />
        <VitalItem
          icon={Heart}
          label="Heart Rate"
          value={vitals.heartRate}
          color="bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400"
        />
        <VitalItem
          icon={Thermometer}
          label="Temperature"
          value={vitals.temperature}
          color="bg-orange-50 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400"
        />
        <VitalItem
          icon={Wind}
          label="Respiratory Rate"
          value={vitals.respiratoryRate}
          color="bg-blue-50 text-blue-500 dark:bg-blue-950/40 dark:text-blue-400"
        />
        <VitalItem
          icon={Droplets}
          label="Oxygen Saturation"
          value={vitals.oxygenSaturation}
          color="bg-cyan-50 text-cyan-500 dark:bg-cyan-950/40 dark:text-cyan-400"
        />
        <VitalItem
          icon={Ruler}
          label="Height"
          value={vitals.height}
          color="bg-violet-50 text-violet-500 dark:bg-violet-950/40 dark:text-violet-400"
        />
        <VitalItem
          icon={Weight}
          label="Weight"
          value={vitals.weight}
          color="bg-dash-primary-light text-dash-primary dark:bg-teal-950/40 dark:text-[var(--color-accent)]"
        />
        <VitalItem
          icon={Activity}
          label="BMI"
          value={vitals.bmi}
          color="bg-indigo-50 text-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-400"
        />
      </div>
    </motion.div>
  );
}
