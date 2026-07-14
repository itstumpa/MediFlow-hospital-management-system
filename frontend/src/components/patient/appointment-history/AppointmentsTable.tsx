"use client";

import {
  staggerTable,
  tableRowFade,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  CalendarSync,
  Clock,
  Download,
  Eye,
  MapPin,
  MoreHorizontal,
  Phone,
  Star,
  User,
  Video,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Appointment } from "./types";
import { statusConfig } from "./types";

/* ─── Actions dropdown ─── */
interface ActionsDropdownProps {
  appointment: Appointment;
  onViewDetails: (apt: Appointment) => void;
  onReschedule: (apt: Appointment) => void;
  onCancel: (apt: Appointment) => void;
  onDownload: (apt: Appointment) => void;
}

function ActionsDropdown({
  appointment,
  onViewDetails,
  onReschedule,
  onCancel,
  onDownload,
}: ActionsDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive =
    appointment.status === "upcoming" ||
    appointment.status === "confirmed" ||
    appointment.status === "rescheduled";
  const isPastOrCompleted =
    appointment.status === "completed" || appointment.status === "no-show";

  const actions: {
    label: string;
    icon: typeof Eye;
    onClick: () => void;
    show: boolean;
  }[] = [
    {
      label: "View Details",
      icon: Eye,
      onClick: () => onViewDetails(appointment),
      show: true,
    },
    {
      label: "Reschedule",
      icon: CalendarSync,
      onClick: () => onReschedule(appointment),
      show: isActive,
    },
    {
      label: "Cancel Appointment",
      icon: XCircle,
      onClick: () => onCancel(appointment),
      show: isActive,
    },
    {
      label: "Download Summary",
      icon: Download,
      onClick: () => onDownload(appointment),
      show: true,
    },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="absolute right-0 z-50 mt-1 min-w-[180px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
          {actions
            .filter((a) => a.show)
            .map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <action.icon className="h-4 w-4 text-slate-400" />
                {action.label}
              </button>
            ))}
        </motion.div>
      )}
    </div>
  );
}

/* ─── Consultation icon ─── */
function ConsultIcon({ type }: { type: string }) {
  if (type === "Video") return <Video className="h-3.5 w-3.5" />;
  if (type === "Phone") return <Phone className="h-3.5 w-3.5" />;
  return <User className="h-3.5 w-3.5" />;
}

/* ─── Status dot with pulse ─── */
function StatusDot({ status }: { status: string }) {
  const cfg = statusConfig[status as keyof typeof statusConfig];
  const isActive = status === "upcoming" || status === "confirmed";

  return (
    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
      <span
        className={cn(
          "absolute inline-flex h-full w-full rounded-full opacity-75",
          cfg?.dotColor || "bg-slate-400",
          isActive && "animate-ping",
        )}
        style={{ animationDuration: "2s" }}
      />
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          cfg?.dotColor || "bg-slate-400",
        )}
      />
    </span>
  );
}

/* ─── Main table component ─── */
interface AppointmentsTableProps {
  appointments: Appointment[];
  onViewDetails: (apt: Appointment) => void;
  onReschedule: (apt: Appointment) => void;
  onCancel: (apt: Appointment) => void;
  onDownload: (apt: Appointment) => void;
  className?: string;
}

export function AppointmentsTable({
  appointments,
  onViewDetails,
  onReschedule,
  onCancel,
  onDownload,
  className,
}: AppointmentsTableProps) {
  return (
    <motion.div
      variants={staggerTable}
      initial="hidden"
      animate="visible"
      className={cn(
        "overflow-x-auto rounded-2xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60",
        className,
      )}
    >
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-700/40">
            <Th>Appointment ID</Th>
            <Th>Doctor</Th>
            <Th>Department</Th>
            <Th>Clinic</Th>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th className="w-12">Actions</Th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt, i) => {
            const cfg = statusConfig[apt.status];
            const StatusIcon = cfg.icon;
            return (
              <motion.tr
                key={apt.id}
                variants={tableRowFade}
                className="group border-b border-slate-50 transition-colors hover:bg-slate-50/50 last:border-b-0 dark:border-slate-700/20 dark:hover:bg-slate-700/20"
              >
                <td className="px-4 py-3.5">
                  <span className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
                    {apt.appointmentId}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-[10px] font-bold text-white">
                      {apt.doctor.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {apt.doctor.name}
                      </p>
                      {apt.isFavoriteDoctor && (
                        <p className="flex items-center gap-0.5 text-[10px] text-amber-600">
                          <Star className="h-3 w-3 fill-current" />
                          Favorite
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {apt.department}
                  </span>
                </td>
                <td className="px-4 py-3.5 max-w-[160px]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span className="truncate text-sm text-slate-500 dark:text-slate-400">
                      {apt.clinic}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {format(apt.date, "MMM d, yyyy")}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {apt.time}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <ConsultIcon type={apt.consultationType} />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {apt.consultationType}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <StatusDot status={apt.status} />
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        cfg.className,
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {cfg.label}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <ActionsDropdown
                    appointment={apt}
                    onViewDetails={onViewDetails}
                    onReschedule={onReschedule}
                    onCancel={onCancel}
                    onDownload={onDownload}
                  />
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}

function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400",
        className,
      )}
    >
      {children}
    </th>
  );
}
