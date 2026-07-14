"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { recentPatients } from "./mock-data";
import { staggerContainer, staggerItem } from "./MotionVariants";

const initialsColors = [
  "from-dash-primary to-dash-primary-dark",
  "from-violet-400 to-purple-500",
  "from-emerald-400 to-teal-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
];

export function PatientOverview() {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/60 bg-white p-5",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Recent Patients
        </h2>
        <Link
          href="/doctor/patients"
          className="inline-flex items-center gap-0.5 text-xs font-medium text-dash-primary transition-colors hover:text-dash-primary-dark dark:text-accent dark:hover:text-accent"
        >
          View all
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="overflow-x-auto"
      >
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-slate-100 text-left text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:text-slate-500">
              <th className="pb-2 pr-2">Patient</th>
              <th className="pb-2 pr-2">Age / Gender</th>
              <th className="pb-2 pr-2">Last Visit</th>
              <th className="pb-2 pr-2">Condition</th>
              <th className="pb-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentPatients.map((patient, idx) => {
              const gradient = initialsColors[idx % initialsColors.length];
              return (
                <motion.tr
                  key={patient.id}
                  variants={staggerItem}
                  className="group border-b border-slate-50 transition-colors hover:bg-slate-50 dark:border-slate-800/50 dark:hover:bg-slate-800/30"
                >
                  <td className="py-2.5 pr-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-semibold text-white shadow-sm",
                          gradient,
                        )}
                      >
                        {patient.initials}
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {patient.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-2 text-sm text-slate-600 dark:text-slate-400">
                    {patient.age} / {patient.gender}
                  </td>
                  <td className="py-2.5 pr-2 text-sm text-slate-500 dark:text-slate-400">
                    {patient.lastVisit}
                  </td>
                  <td className="py-2.5 pr-2">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {patient.condition}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    <Link
                      href={`/doctor/patients/${patient.id}`}
                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium text-dash-primary transition-colors hover:bg-dash-primary-light dark:text-accent dark:hover:bg-dash-primary-light/30"
                    >
                      <Eye className="h-3 w-3" />
                      Quick View
                    </Link>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>

        {recentPatients.length === 0 && (
          <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
            No patients seen recently.
          </p>
        )}
      </motion.div>
    </div>
  );
}
