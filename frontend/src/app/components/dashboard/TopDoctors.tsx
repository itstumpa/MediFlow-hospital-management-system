"use client";

import { motion } from "framer-motion";
import { ExternalLink, MoreHorizontal, Star } from "lucide-react";
import { staggerContainer, staggerItem } from "./MotionVariants";

interface TopDoctor {
  name: string;
  initials: string;
  specialty: string;
  rating: number;
  patients: number;
  department: string;
  appointments: number;
}

const doctors: TopDoctor[] = [
  {
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    specialty: "Cardiologist",
    rating: 4.9,
    patients: 245,
    department: "Cardiology",
    appointments: 38,
  },
  {
    name: "Dr. James Mitchell",
    initials: "JM",
    specialty: "Neurologist",
    rating: 4.8,
    patients: 198,
    department: "Neurology",
    appointments: 32,
  },
  {
    name: "Dr. Lisa Park",
    initials: "LP",
    specialty: "Pediatrician",
    rating: 4.9,
    patients: 267,
    department: "Pediatrics",
    appointments: 41,
  },
  {
    name: "Dr. David Kim",
    initials: "DK",
    specialty: "Orthopedic Surgeon",
    rating: 4.7,
    patients: 178,
    department: "Orthopedics",
    appointments: 29,
  },
  {
    name: "Dr. Michael Torres",
    initials: "MT",
    specialty: "Dermatologist",
    rating: 4.8,
    patients: 156,
    department: "Dermatology",
    appointments: 25,
  },
];

const bgColors = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
];

export function TopDoctors() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="dash-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800/60">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Top Performing Doctors
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Based on ratings and patient volume
          </p>
        </div>
      </div>

      {/* Doctor cards */}
      <div className="divide-y divide-slate-50 dark:divide-slate-800/30">
        {doctors.map((doc, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
          >
            {/* Avatar */}
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${bgColors[i % bgColors.length]}`}
            >
              {doc.initials}
            </span>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {doc.name}
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                  <Star className="h-3 w-3 fill-current" />
                  {doc.rating}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {doc.specialty} &middot; {doc.department}
              </p>
            </div>

            {/* Stats */}
            <div className="hidden items-center gap-6 sm:flex">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {doc.patients}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Patients
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {doc.appointments}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  This week
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                aria-label={`View ${doc.name} profile`}
              >
                <ExternalLink className="h-4 w-4" />
              </button>
              <button
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                aria-label="More options"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
