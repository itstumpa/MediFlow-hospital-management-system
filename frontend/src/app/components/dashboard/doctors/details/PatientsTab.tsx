"use client";

import { motion } from "framer-motion";
import { CalendarDays, Users } from "lucide-react";
import Image from "next/image";
import type { DoctorPatient } from "@/lib/data/admin-doctors";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { cn } from "@/lib/utils";
import { EmptyState } from "./EmptyState";

interface PatientsTabProps {
  patients: DoctorPatient[];
}

export function PatientsTab({ patients }: PatientsTabProps) {
  if (patients.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No Patients"
        description="No patients have been assigned to this doctor."
      />
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="dash-card overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700">
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Patient
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Age / Gender
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Last Visit
              </th>
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Medical Condition
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {patients.map((patient, i) => (
              <motion.tr
                key={patient.id}
                variants={staggerItem}
                className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={patient.avatar}
                        alt={patient.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {patient.name}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                  {patient.age} yrs / {patient.gender}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {patient.lastVisit}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                      "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
                    )}
                  >
                    {patient.condition}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
