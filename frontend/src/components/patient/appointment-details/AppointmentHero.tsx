"use client";

import { statusConfig as historyStatusConfig } from "@/components/patient/appointment-history/types";
import { fadeUp } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  Clock,
  Fingerprint,
  MapPin,
  Phone,
  User,
  Video,
} from "lucide-react";
import type { AppointmentDetail } from "./types";

/* ─── Status badge ─── */
function StatusBadge({ status }: { status: string }) {
  const cfg = historyStatusConfig[status as keyof typeof historyStatusConfig];
  if (cfg) {
    const Icon = cfg.icon;
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold",
          cfg.className,
        )}
      >
        <Icon className="h-3.5 w-3.5" />
        {cfg.label}
      </span>
    );
  }

  // Fallback for statuses not in history config
  const fallback: Record<string, { label: string; className: string }> = {
    scheduled: {
      label: "Scheduled",
      className:
        "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    },
    "in-progress": {
      label: "In Progress",
      className:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    },
    "no-show": {
      label: "No Show",
      className:
        "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
    },
  };
  const fb = fallback[status];
  if (!fb) return <span className="text-sm text-slate-500">{status}</span>;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold",
        fb.className,
      )}
    >
      {fb.label}
    </span>
  );
}

/* ─── Consultation icon ─── */
function ConsultIcon({ type }: { type: string }) {
  const icons: Record<string, typeof Video> = {
    Video,
    Phone,
    "In-Person": User,
    Emergency: Building2,
  };
  const Icon = icons[type] || User;
  return <Icon className="h-4 w-4" />;
}

/* ─── Hero card ─── */
interface AppointmentHeroProps {
  appointment: AppointmentDetail;
  className?: string;
}

export function AppointmentHero({
  appointment,
  className,
}: AppointmentHeroProps) {
  const doc = appointment.doctor;

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50/80 p-6 shadow-sm dark:from-slate-800/80 dark:to-slate-800/40 dark:border-slate-700/40",
        className,
      )}
    >
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--color-primary)]/5 blur-3xl dark:bg-[var(--color-accent)]/5" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-emerald-500/5 blur-3xl dark:bg-emerald-500/10" />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Left: Doctor info + status */}
        <div className="flex items-start gap-5">
          {/* Doctor image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-white shadow-md dark:border-slate-700"
          >
            <img
              src={doc.avatar}
              alt={doc.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
          </motion.div>

          <div className="space-y-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
                {doc.name}
              </h2>
              <p className="text-sm font-medium text-[var(--color-primary)] dark:text-[var(--color-accent)]">
                {doc.specialization || doc.department}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={appointment.status} />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                <ConsultIcon type={appointment.consultationType} />
                {appointment.consultationType}
              </span>
            </div>
            <p className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <Fingerprint className="h-3 w-3" />
              Appointment ID:{" "}
              <span className="font-mono font-medium text-slate-500 dark:text-slate-400">
                {appointment.appointmentId}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div className="relative mt-6 grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl bg-slate-50/80 p-5 dark:bg-slate-800/40 md:grid-cols-4">
        <DetailItem
          icon={Building2}
          label="Department"
          value={appointment.department}
        />
        <DetailItem
          icon={MapPin}
          label="Clinic"
          value="MediFlow Medical Center"
        />
        <DetailItem
          icon={CalendarDays}
          label="Date"
          value={format(new Date(appointment.date), "EEEE, MMM d, yyyy")}
        />
        <DetailItem
          icon={Clock}
          label="Time"
          value={`${appointment.time} · ${appointment.duration} min`}
        />
      </div>
    </motion.div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-slate-700/60 shadow-sm">
        <Icon className="h-4 w-4 text-[var(--color-primary)] dark:text-[var(--color-accent)]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}
