"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Droplets,
  HeartPulse,
  Phone,
  Ruler,
  Weight,
} from "lucide-react";

const items = [
  { label: "Blood Group", value: "A+", icon: Droplets },
  { label: "Height", value: "5' 10\" (178 cm)", icon: Ruler },
  { label: "Weight", value: "165 lbs (75 kg)", icon: Weight },
  { label: "BMI", value: "23.4 — Normal", icon: Activity },
  { label: "Allergies", value: "Pollen, Penicillin", icon: AlertTriangle },
  { label: "Chronic Conditions", value: "None", icon: HeartPulse },
  {
    label: "Emergency Contact",
    value: "Jane Doe — +1 (555) 987-6543",
    icon: Phone,
  },
];

export function HealthSummary() {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">
        Health Summary
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        At-a-glance health information
      </p>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.05 * i,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/40"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm dark:bg-slate-700 dark:text-slate-400">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {item.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
