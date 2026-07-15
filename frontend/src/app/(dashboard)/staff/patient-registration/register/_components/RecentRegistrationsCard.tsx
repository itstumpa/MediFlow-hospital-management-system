"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Clock, UserPlus } from "lucide-react";
import { patientTypeConfig, recentRegistrations } from "../_mock-data";

/* ─── Row ───────────────────────────────────── */

function RegistrationRow({ reg }: { reg: (typeof recentRegistrations)[0] }) {
  const cfg = patientTypeConfig[reg.type];
  const TypeIcon = cfg.icon;

  return (
    <motion.div
      variants={staggerItem}
      className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white/50 px-3 py-2.5 transition-colors hover:bg-slate-50 dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:bg-slate-800/50"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-semibold text-[var(--color-primary)] dark:bg-[var(--color-primary)]/20">
        {reg.patientInitials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {reg.patientName}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <TypeIcon className={`h-3 w-3 ${cfg.class.split(" ")[1]}`} />
          <span>{cfg.label}</span>
        </div>
      </div>
      <span className="shrink-0 text-[10px] text-slate-400">{reg.time}</span>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────── */

export function RecentRegistrationsCard() {
  return (
    <div className="dash-card">
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
          <Clock className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Recent Registrations
        </h3>
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-100 px-1.5 text-[10px] font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
          {recentRegistrations.length}
        </span>
      </div>

      <div className="p-4">
        {recentRegistrations.length === 0 ? (
          <div className="py-8 text-center">
            <UserPlus className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              No registrations today
            </p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {recentRegistrations.map((reg) => (
              <RegistrationRow key={reg.id} reg={reg} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
