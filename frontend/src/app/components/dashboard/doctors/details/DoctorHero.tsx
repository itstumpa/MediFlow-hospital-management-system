"use client";

import type { AdminDoctorDetail } from "@/lib/data/admin-doctors";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Calendar,
  Edit,
  ExternalLink,
  HeartPulse,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";

interface DoctorHeroProps {
  doctor: AdminDoctorDetail;
}

export function DoctorHero({ doctor }: DoctorHeroProps) {
  const statusColors: Record<string, string> = {
    active:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "on-leave":
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    terminated: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    suspended:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  };

  const statusLabels: Record<string, string> = {
    active: "Active",
    "on-leave": "On Leave",
    terminated: "Terminated",
    suspended: "Suspended",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="dash-card overflow-hidden"
    >
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-dash-primary/5 via-dash-primary/5 to-purple-600/5 dark:from-dash-primary/10 dark:via-dash-primary/10 dark:to-purple-600/10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dash-primary/20 to-transparent" />

        <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
          {/* â”€â”€â”€ Avatar â”€â”€â”€ */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="relative shrink-0"
          >
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-2 border-white shadow-lg dark:border-slate-700 sm:h-32 sm:w-32">
              <Image
                src={doctor.photo}
                alt={doctor.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, 128px"
              />
            </div>
            {doctor.isVerified && (
              <div className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md dark:bg-slate-800">
                <BadgeCheck className="h-5 w-5 text-dash-primary" />
              </div>
            )}
          </motion.div>

          {/* â”€â”€â”€ Info â”€â”€â”€ */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {doctor.name}
              </h1>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[doctor.employmentStatus]}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {statusLabels[doctor.employmentStatus]}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <HeartPulse className="h-4 w-4 text-dash-primary" />
                {doctor.department}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-purple-500" />
                {doctor.specialization}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-slate-400 dark:text-slate-500">
              <span>ID: {doctor.doctorId}</span>
              <span>License: {doctor.licenseNumber}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                <Calendar className="h-4 w-4 text-slate-400" />
                {doctor.experience} Years Exp.
              </div>
              <div className="flex items-center gap-1.5 font-medium text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                {doctor.rating}
              </div>
              <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <Users className="h-4 w-4" />
                {doctor.patientsTreated.toLocaleString()}+ Patients
              </div>
            </div>
          </div>

          {/* â”€â”€â”€ Action Buttons â”€â”€â”€ */}
          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-dash-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-dash-primary-dark hover:shadow-md"
            >
              <Edit className="h-4 w-4" />
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <ExternalLink className="h-4 w-4" />
              View Public Profile
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
