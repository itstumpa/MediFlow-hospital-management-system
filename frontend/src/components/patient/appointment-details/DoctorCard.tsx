"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Award,
  Building2,
  CalendarPlus,
  ExternalLink,
  Globe,
  Star,
} from "lucide-react";
import Link from "next/link";
import type { DoctorDetail } from "./types";

interface DoctorCardProps {
  doctor: DoctorDetail;
  onBookAgain?: () => void;
  className?: string;
}

export function DoctorCard({
  doctor,
  onBookAgain,
  className,
}: DoctorCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">
        Treating Doctor
      </h3>

      <div className="flex flex-col sm:flex-row gap-5">
        {/* Photo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-white shadow-md dark:border-slate-700"
        >
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
        </motion.div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {doctor.name}
            </h4>
            <p className="text-sm text-[var(--color-primary)] dark:text-[var(--color-accent)] font-medium">
              {doctor.specialization}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <DoctorStat
              icon={Award}
              label="Experience"
              value={`${doctor.experience} years`}
            />
            <DoctorStat
              icon={Star}
              label="Rating"
              value={
                <span className="flex items-center gap-1">
                  {doctor.rating}
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-slate-400 font-normal">
                    ({doctor.reviewCount})
                  </span>
                </span>
              }
            />
            <DoctorStat
              icon={Globe}
              label="Languages"
              value={doctor.languages.join(", ")}
            />
            <DoctorStat
              icon={Building2}
              label="Hospital"
              value={doctor.hospital}
            />
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {doctor.about}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Link
              href={`/doctors/${doctor.id}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Profile
            </Link>
            <button
              type="button"
              onClick={onBookAgain}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-xs font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-md active:scale-[0.97] dark:bg-[var(--color-accent)] dark:hover:opacity-90"
            >
              <CalendarPlus className="h-3.5 w-3.5" />
              Book Again
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DoctorStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Award;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-700/60">
        <Icon className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
      </div>
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {value}
        </p>
      </div>
    </div>
  );
}
