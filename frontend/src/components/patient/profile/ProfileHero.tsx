"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarDays, Edit3, Medal, ShieldCheck } from "lucide-react";
import type { PatientProfile } from "./types";

/* ─── Props ─── */

interface ProfileHeroProps {
  profile: PatientProfile;
}

/* ─── Component ─── */

export function ProfileHero({ profile }: ProfileHeroProps) {
  const tierColors: Record<string, string> = {
    "Gold Member":
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/30",
    "Silver Member":
      "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/30",
    "Bronze Member":
      "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 border-orange-200/50 dark:border-orange-800/30",
  };

  return (
    <motion.div variants={staggerItem} className="dash-card overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* ─── Avatar ─── */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group relative shrink-0"
          >
            <div
              className={cn(
                "flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br text-3xl font-bold text-white shadow-lg sm:h-28 sm:w-28",
                `bg-gradient-to-br ${profile.avatarColor}`,
                "shadow-emerald-200/50 dark:shadow-emerald-900/30",
              )}
            >
              {profile.avatarInitials}
            </div>
            {/* Online indicator */}
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-800" />
            {/* Hover edit overlay */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <Edit3 className="h-6 w-6 text-white" />
            </div>
          </motion.div>

          {/* ─── Info ─── */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {profile.name}
              </h2>
              <span className="text-sm text-slate-400 dark:text-slate-500">
                Age {profile.age}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              Patient ID: {profile.id}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-semibold",
                  tierColors[profile.membershipTier] ??
                    "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300",
                )}
              >
                <Medal className="h-3.5 w-3.5" />
                {profile.membershipTier}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
                <CalendarDays className="h-3.5 w-3.5" />
                Since {profile.membershipSince}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified
              </span>
            </div>
          </div>

          {/* ─── Edit button ─── */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-dark)]"
          >
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
