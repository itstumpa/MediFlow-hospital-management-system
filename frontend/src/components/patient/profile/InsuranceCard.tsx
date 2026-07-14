"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { motion } from "framer-motion";
import { CalendarClock, CreditCard, ShieldCheck, Umbrella } from "lucide-react";
import type { PatientProfile } from "./types";

/* ─── Props ─── */

interface InsuranceCardProps {
  profile: PatientProfile;
}

/* ─── Detail row ─── */

function DetailRow({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-4 transition-colors duration-200 hover:bg-slate-100/60 dark:bg-slate-800/30 dark:hover:bg-slate-700/40"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Component ─── */

export function InsuranceCard({ profile }: InsuranceCardProps) {
  const { insurance } = profile;

  return (
    <motion.div variants={staggerItem} className="dash-card">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5 dark:border-slate-700/50">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-500 dark:bg-blue-950/40 dark:text-blue-400">
          <ShieldCheck className="h-4.5 w-4.5" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Insurance
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Coverage and policy details
          </p>
        </div>
      </div>

      <div className="grid gap-3 p-6 sm:grid-cols-2">
        <DetailRow
          icon={Umbrella}
          label="Provider"
          value={insurance.provider}
          color="#3b82f6"
        />
        <DetailRow
          icon={CreditCard}
          label="Policy Number"
          value={insurance.policyNumber}
          color="#8b5cf6"
        />
        <DetailRow
          icon={ShieldCheck}
          label="Coverage"
          value={insurance.coverage}
          color="#10b981"
        />
        <DetailRow
          icon={CalendarClock}
          label="Expiry"
          value={insurance.expiry}
          color="#f59e0b"
        />
      </div>
    </motion.div>
  );
}
