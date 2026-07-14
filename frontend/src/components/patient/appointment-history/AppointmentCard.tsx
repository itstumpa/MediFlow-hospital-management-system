"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
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
          cfg.dotColor,
          isActive && "animate-ping",
        )}
        style={{ animationDuration: "2s" }}
      />
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          cfg.dotColor,
        )}
      />
    </span>
  );
}

/* ─── Actions menu ─── */
function CardActions({
  appointment,
  onViewDetails,
  onReschedule,
  onCancel,
  onDownload,
}: {
  appointment: Appointment;
  onViewDetails: (apt: Appointment) => void;
  onReschedule: (apt: Appointment) => void;
  onCancel: (apt: Appointment) => void;
  onDownload: (apt: Appointment) => void;
}) {
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
        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="absolute right-0 z-50 mt-1 min-w-[190px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800"
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
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
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

/* ─── Card component ─── */
interface AppointmentCardProps {
  appointment: Appointment;
  onViewDetails: (apt: Appointment) => void;
  onReschedule: (apt: Appointment) => void;
  onCancel: (apt: Appointment) => void;
  onDownload: (apt: Appointment) => void;
}

export function AppointmentCard({
  appointment,
  onViewDetails,
  onReschedule,
  onCancel,
  onDownload,
}: AppointmentCardProps) {
  const apt = appointment;
  const cfg = statusConfig[apt.status];
  const StatusIcon = cfg.icon;

  return (
    <motion.div
      variants={staggerItem}
      whileHover="hover"
      className="group rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all duration-300 hover:border-slate-300/80 hover:shadow-md dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:border-slate-600/60"
    >
      {/* Top row: doctor + actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-bold text-white shadow-sm">
            {apt.doctor.initials}
            {apt.isFavoriteDoctor && (
              <span className="absolute -right-0.5 -top-0.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 drop-shadow-sm" />
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {apt.doctor.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {apt.department}
            </p>
          </div>
        </div>
        <CardActions
          appointment={apt}
          onViewDetails={onViewDetails}
          onReschedule={onReschedule}
          onCancel={onCancel}
          onDownload={onDownload}
        />
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2.5">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Clock className="h-4 w-4 text-slate-400" />
          <span>{format(apt.date, "EEE, MMM d, yyyy")}</span>
          <span className="text-slate-300 dark:text-slate-500">•</span>
          <span>{apt.time}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <MapPin className="h-4 w-4" />
          <span>{apt.clinic}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <ConsultIcon type={apt.consultationType} />
          <span>{apt.consultationType} Consultation</span>
        </div>
      </div>

      {/* Bottom: status + Appointment ID */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700/40">
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
        <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
          {apt.appointmentId}
        </span>
      </div>
    </motion.div>
  );
}
