"use client";

import {
  hoverLift,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import {
  type Announcement,
  announcementTypeConfig,
  priorityConfig,
} from "../_mock-data";

/* ─── Time formatting ───────────────────────── */

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ══════════════════════════════════════════════
   AnnouncementCard
   ══════════════════════════════════════════════ */

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const typeConfig = announcementTypeConfig[announcement.type];
  const TypeIcon = typeConfig.icon;
  const priority = priorityConfig[announcement.priority];

  return (
    <motion.div
      variants={staggerItem}
      {...hoverLift}
      className={`relative rounded-xl border p-4 sm:p-5 ${
        announcement.pinned
          ? "border-amber-200 bg-amber-50/40 dark:border-amber-900/40 dark:bg-amber-950/20"
          : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
      }`}
    >
      {/* Pin indicator */}
      {announcement.pinned && (
        <div className="absolute right-3 top-3">
          <Pin className="h-3.5 w-3.5 text-amber-500" />
        </div>
      )}

      <div className="flex items-start gap-3 sm:gap-4">
        {/* Type icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            typeConfig.color === "blue"
              ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
              : typeConfig.color === "amber"
                ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
                : typeConfig.color === "violet"
                  ? "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400"
                  : typeConfig.color === "cyan"
                    ? "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400"
                    : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
          }`}
        >
          <TypeIcon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                {announcement.title}
              </h3>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {typeConfig.label} &middot; {announcement.author}
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {announcement.message}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${priority.class}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
              {priority.label}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              {formatDate(announcement.date)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
