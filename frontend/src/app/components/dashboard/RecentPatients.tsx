"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Eye, MoreHorizontal } from "lucide-react";
import { staggerContainer, staggerItem } from "./MotionVariants";

interface RecentPatient {
  name: string;
  initials: string;
  age: number;
  department: string;
  visitDate: string;
  status: "Active" | "Follow-up" | "Discharged";
}

const patients: RecentPatient[] = [
  { name: "Sarah Chen", initials: "SC", age: 34, department: "Cardiology", visitDate: "Today", status: "Active" },
  { name: "Michael Brown", initials: "MB", age: 52, department: "Neurology", visitDate: "Today", status: "Follow-up" },
  { name: "Emma Davis", initials: "ED", age: 28, department: "Orthopedics", visitDate: "Yesterday", status: "Discharged" },
  { name: "James Wilson", initials: "JW", age: 45, department: "Dermatology", visitDate: "Yesterday", status: "Active" },
  { name: "Olivia Taylor", initials: "OT", age: 19, department: "Pediatrics", visitDate: "2 days ago", status: "Follow-up" },
  { name: "Daniel Martinez", initials: "DM", age: 61, department: "Cardiology", visitDate: "2 days ago", status: "Discharged" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  "Follow-up": "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  Discharged: "bg-slate-50 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400",
};

const bgColors = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
];

export function RecentPatients() {
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
            Recent Patients
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Latest patient registrations
          </p>
        </div>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
          View all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-slate-50 text-left text-xs font-medium text-slate-500 dark:border-slate-800/30 dark:text-slate-400">
              <th className="px-5 py-3" scope="col">Patient</th>
              <th className="px-5 py-3" scope="col">Age</th>
              <th className="px-5 py-3" scope="col">Department</th>
              <th className="px-5 py-3" scope="col">Visit Date</th>
              <th className="px-5 py-3" scope="col">Status</th>
              <th className="px-5 py-3 text-right" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, i) => (
              <motion.tr
                key={i}
                variants={staggerItem}
                className="group border-b border-slate-50 transition-colors hover:bg-slate-50/50 last:border-0 dark:border-slate-800/30 dark:hover:bg-slate-800/20"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${bgColors[i % bgColors.length]}`}
                    >
                      {p.initials}
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {p.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{p.age}</td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{p.department}</td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-400">{p.visitDate}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[p.status]}`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300" aria-label={`View ${p.name}`}>
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300" aria-label="More options">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
