"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Clock,
  CreditCard,
  ExternalLink,
  Mail,
  Phone,
  Stethoscope,
  UserCheck,
  UserX,
} from "lucide-react";
import Image from "next/image";
import type { AdminDoctorDetail } from "@/lib/data/admin-doctors";
import { cn } from "@/lib/utils";

interface SidebarProps {
  doctor: AdminDoctorDetail;
}

const statusConfig: Record<
  string,
  { label: string; icon: typeof UserCheck; color: string; bg: string }
> = {
  active: {
    label: "Active",
    icon: UserCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  "on-leave": {
    label: "On Leave",
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  terminated: {
    label: "Terminated",
    icon: UserX,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
  },
  suspended: {
    label: "Suspended",
    icon: UserX,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30",
  },
};

export function Sidebar({ doctor }: SidebarProps) {
  const status = statusConfig[doctor.employmentStatus] ?? statusConfig.active;
  const StatusIcon = status.icon;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="sticky top-6 space-y-5"
    >
      {/* Doctor Summary */}
      <div className="dash-card overflow-hidden p-5">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-white shadow-lg dark:border-slate-700">
            <Image
              src={doctor.photo}
              alt={doctor.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
            {doctor.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {doctor.specialization}
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Status
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                status.bg,
                status.color,
              )}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {status.label}
            </span>
          </div>

          {/* Department */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Department
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Stethoscope className="h-3.5 w-3.5 text-blue-500" />
              {doctor.department}
            </span>
          </div>

          {/* Consultation Fee */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Consultation Fee
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-white">
              <CreditCard className="h-3.5 w-3.5 text-slate-400" />
              ${doctor.consultationFee}
            </span>
          </div>

          {/* Hospital */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Hospital
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              {doctor.hospital}
            </span>
          </div>

          {/* Experience */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Experience
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-300">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {doctor.experience} Years
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dash-card overflow-hidden p-5">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Quick Actions
        </h4>
        <div className="space-y-2">
          <ActionButton icon={Mail} label="Send Email" />
          <ActionButton icon={Phone} label="Call Doctor" />
          <ActionButton icon={ExternalLink} label="View Schedule" />
        </div>
      </div>
    </motion.aside>
  );
}

function ActionButton({
  icon: Icon,
  label,
}: {
  icon: typeof Mail;
  label: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.01, x: 2 }}
      whileTap={{ scale: 0.98 }}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
    >
      <Icon className="h-4 w-4 text-slate-400" />
      {label}
    </motion.button>
  );
}
