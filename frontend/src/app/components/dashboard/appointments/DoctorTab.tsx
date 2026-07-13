"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { AppointmentDetail } from "@/lib/data/appointment-detail";
import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Clock,
  DollarSign,
  Star,
  Stethoscope,
} from "lucide-react";

interface DoctorTabProps {
  appointment: AppointmentDetail;
}

export function DoctorTab({ appointment }: DoctorTabProps) {
  const { doctor } = appointment;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Doctor Profile Card */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="relative">
            <div className="h-20 w-20 overflow-hidden rounded-xl">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-dash-primary text-white shadow-sm">
              <Award className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {doctor.name}
            </h3>
            <p className="text-sm text-dash-primary dark:text-accent">
              {doctor.specialization}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {doctor.department} Department
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                <Briefcase className="h-3 w-3" />
                {doctor.experience} yrs exp
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                <Star className="h-3 w-3 fill-current" />
                {doctor.rating}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                <DollarSign className="h-3 w-3" />${doctor.consultationFee}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Availability & Details */}
      <motion.div
        variants={staggerItem}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
            <Clock className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Availability & Schedule
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Working Hours
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {doctor.availability}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
            <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Department
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {doctor.department}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
            <DollarSign className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Consultation Fee
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ${doctor.consultationFee} per visit
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
