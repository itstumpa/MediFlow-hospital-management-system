"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  Droplets,
  Heart,
  Ruler,
  Thermometer,
  Weight,
  Wind,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { VitalsData } from "./appointment-detail-mock-data";

interface VitalsTabProps {
  vitals: VitalsData;
}

const vitalsConfig = [
  {
    icon: Activity,
    label: "Blood Pressure",
    value: "bloodPressure",
    unit: "mmHg",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
  },
  {
    icon: Heart,
    label: "Heart Rate",
    value: "heartRate",
    unit: "bpm",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/30",
  },
  {
    icon: Thermometer,
    label: "Temperature",
    value: "temperature",
    unit: "",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    icon: Ruler,
    label: "Height",
    value: "height",
    unit: "",
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
  {
    icon: Weight,
    label: "Weight",
    value: "weight",
    unit: "",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    icon: Droplets,
    label: "BMI",
    value: "bmi",
    unit: "kg/m²",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: Wind,
    label: "O₂ Saturation",
    value: "oxygenSaturation",
    unit: "%",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
];

export function VitalsTab({ vitals }: VitalsTabProps) {
  const getValue = (key: string) => {
    switch (key) {
      case "bloodPressure":
        return vitals.bloodPressure;
      case "heartRate":
        return vitals.heartRate.toString();
      case "temperature":
        return vitals.temperature;
      case "height":
        return vitals.height;
      case "weight":
        return vitals.weight;
      case "bmi":
        return vitals.bmi.toFixed(1);
      case "oxygenSaturation":
        return vitals.oxygenSaturation.toString();
      default:
        return "";
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
    >
      {vitalsConfig.map((v) => (
        <motion.div
          key={v.label}
          variants={staggerItem}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className={cn(
            "rounded-xl border border-slate-200/60 bg-white p-4 transition-all",
            "hover:shadow-md hover:shadow-slate-900/5",
            "dark:border-slate-700/40 dark:bg-slate-900/60",
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                v.bg,
              )}
            >
              <v.icon className={cn("h-4 w-4", v.color)} />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {v.label}
            </span>
          </div>
          <p className="mt-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {getValue(v.value)}
            {v.unit && (
              <span className="ml-0.5 text-xs font-normal text-slate-400">
                {v.unit}
              </span>
            )}
          </p>
        </motion.div>
      ))}

      {/* Recorded at */}
      <motion.div
        variants={staggerItem}
        className="col-span-full mt-1 text-right text-[10px] text-slate-400 dark:text-slate-500"
      >
        Recorded at {vitals.recordedAt}
      </motion.div>
    </motion.div>
  );
}
