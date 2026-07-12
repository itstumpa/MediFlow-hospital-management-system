"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/app/components/dashboard/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight, Users } from "lucide-react";
import Link from "next/link";

interface RelatedPatient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  department: string;
  doctor: string;
  avatar: string;
  lastVisit: string;
  status: "active" | "inactive" | "critical" | "discharged";
}

interface RelatedPatientsProps {
  patients: RelatedPatient[];
  currentPatientId: string;
}

const statusColors = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  inactive: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  discharged:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export function RelatedPatients({
  patients,
  currentPatientId,
}: RelatedPatientsProps) {
  const filtered = patients.filter((p) => p.id !== currentPatientId);

  if (filtered.length === 0) return null;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-dash-primary" />
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Related Patients
        </h3>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          Same department / doctor
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            variants={staggerItem}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <Link
              href={`/admin/patients/${p.id}`}
              className="dash-card flex items-center gap-4 p-4 transition-shadow hover:shadow-md"
            >
              <div className="relative shrink-0">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-400 to-slate-500">
                  {p.avatar ? (
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-white">
                      {p.name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {p.name}
                  </p>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      statusColors[p.status],
                    )}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {p.age} yrs &middot; {p.bloodGroup} &middot; {p.department}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Dr. {p.doctor}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
