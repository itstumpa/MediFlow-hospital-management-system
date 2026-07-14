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
import { useEffect, useRef, useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";

interface HealthSummaryCardsProps {
  vitals: {
    height: string;
    weight: string;
    bmi: number;
    bloodPressure: string;
    heartRate: number;
    temperature: string;
    oxygenSaturation: number;
  };
}

const cardConfig = [
  {
    icon: Ruler,
    label: "Height",
    getValue: (v: HealthSummaryCardsProps["vitals"]) => v.height,
    color: "text-dash-primary",
    bg: "bg-dash-primary-light dark:bg-teal-950/30",
    border: "border-dash-primary-light/40 dark:border-teal-800/20",
  },
  {
    icon: Weight,
    label: "Weight",
    getValue: (v: HealthSummaryCardsProps["vitals"]) => v.weight,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    border: "border-indigo-200/40 dark:border-indigo-800/20",
  },
  {
    icon: Droplets,
    label: "BMI",
    getValue: (v: HealthSummaryCardsProps["vitals"]) => v.bmi.toFixed(1),
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200/40 dark:border-emerald-800/20",
    unit: "kg/m²",
  },
  {
    icon: Activity,
    label: "Blood Pressure",
    getValue: (v: HealthSummaryCardsProps["vitals"]) => v.bloodPressure,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200/40 dark:border-rose-800/20",
    unit: "mmHg",
  },
  {
    icon: Heart,
    label: "Heart Rate",
    getValue: (v: HealthSummaryCardsProps["vitals"]) => v.heartRate.toString(),
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200/40 dark:border-red-800/20",
    unit: "bpm",
  },
  {
    icon: Thermometer,
    label: "Temperature",
    getValue: (v: HealthSummaryCardsProps["vitals"]) => v.temperature,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200/40 dark:border-orange-800/20",
  },
  {
    icon: Wind,
    label: "O₂ Saturation",
    getValue: (v: HealthSummaryCardsProps["vitals"]) =>
      `${v.oxygenSaturation}%`,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200/40 dark:border-blue-800/20",
  },
];

function AnimatedNumber({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let start = 0;
    const end = value;
    const duration = 800;
    const step = Math.max(1, Math.floor(end / 30));
    const interval = duration / Math.ceil(end / step);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setDisplayed(end);
        clearInterval(timer);
      } else {
        setDisplayed(start);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [value]);

  return <span ref={ref}>{displayed}</span>;
}

export function HealthSummaryCards({ vitals }: HealthSummaryCardsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
    >
      {cardConfig.map((card) => {
        const Icon = card.icon;
        const value = card.getValue(vitals);
        const isNumeric =
          card.label === "Heart Rate" ||
          card.label === "BMI" ||
          card.label === "O₂ Saturation";

        return (
          <motion.div
            key={card.label}
            variants={staggerItem}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className={cn(
              "rounded-xl border bg-white p-3.5 transition-all",
              "hover:shadow-md hover:shadow-slate-900/5",
              "dark:bg-slate-900/60",
              card.border,
            )}
          >
            <div
              className={cn(
                "mb-2 flex h-8 w-8 items-center justify-center rounded-lg",
                card.bg,
              )}
            >
              <Icon className={cn("h-4 w-4", card.color)} />
            </div>
            <p
              className={cn(
                "text-lg font-bold tracking-tight text-slate-900 dark:text-white",
              )}
            >
              {isNumeric && card.label !== "BMI" ? (
                <AnimatedNumber value={parseInt(value)} />
              ) : (
                value
              )}
              {card.unit && (
                <span className="ml-0.5 text-xs font-normal text-slate-400">
                  {card.unit}
                </span>
              )}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
              {card.label}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
