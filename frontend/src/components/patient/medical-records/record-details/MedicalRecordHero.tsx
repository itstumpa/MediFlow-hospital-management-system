"use client";

import { cn, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  Clock,
  Hash,
  Hospital,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import {
  recordStatusConfig,
  recordTypeColors,
  recordTypeIcons,
  recordTypeLabels,
} from "../types";
import type { RecordDetailData } from "./types";

/* ─── Hero detail row ─── */

function HeroRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/80 dark:bg-white/10">
        <Icon className="h-4 w-4 text-[var(--color-primary)] dark:text-[var(--color-accent)]" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─── Props ─── */

interface MedicalRecordHeroProps {
  data: RecordDetailData;
  className?: string;
}

export function MedicalRecordHero({ data, className }: MedicalRecordHeroProps) {
  const { record } = data;
  const TypeIcon = recordTypeIcons[record.recordType];
  const colors = recordTypeColors[record.recordType];
  const statusCfg = recordStatusConfig[record.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("dash-card relative overflow-hidden p-0", className)}
    >
      {/* Decorative gradient blob */}
      <div
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10",
          "bg-gradient-to-br",
          colors.text === "text-blue-700"
            ? "from-blue-400 to-blue-600"
            : colors.text === "text-emerald-700"
              ? "from-emerald-400 to-emerald-600"
              : colors.text === "text-violet-700"
                ? "from-violet-400 to-violet-600"
                : colors.text === "text-rose-700"
                  ? "from-rose-400 to-rose-600"
                  : colors.text === "text-amber-700"
                    ? "from-amber-400 to-amber-600"
                    : colors.text === "text-red-700"
                      ? "from-red-400 to-red-600"
                      : "from-indigo-400 to-indigo-600",
        )}
      />

      <div className="p-6">
        {/* Top row: type badge + status */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
              colors.bg,
              colors.text,
              colors.darkBg,
              colors.darkText,
            )}
          >
            <TypeIcon className="h-3.5 w-3.5" />
            {recordTypeLabels[record.recordType]}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
              statusCfg.className,
            )}
          >
            {statusCfg.label}
          </span>
        </div>

        {/* Doctor info */}
        <div className="mb-5 flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
              delay: 0.1,
            }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 text-lg font-bold text-white shadow-md"
          >
            {record.doctor.initials}
          </motion.div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {record.doctor.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {record.department}
            </p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
          <HeroRow
            icon={CalendarDays}
            label="Visit Date"
            value={formatDate(record.date)}
          />
          <HeroRow
            icon={Building2}
            label="Department"
            value={record.department}
          />
          <HeroRow
            icon={Hospital}
            label="Hospital"
            value="MediFlow Medical Center"
          />
          <HeroRow icon={Hash} label="Record ID" value={record.id} />
          <HeroRow icon={Clock} label="Time" value="10:00 AM" />
          <HeroRow icon={MapPin} label="Room" value="Suite 3A" />
        </div>
      </div>
    </motion.div>
  );
}
