"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  Eye,
  FileText,
  FlaskConical,
  MoreHorizontal,
  Pill,
} from "lucide-react";
import { useState } from "react";
import { staggerTable, tableRowFade } from "../MotionVariants";
import type { PatientRecord, ViewMode } from "./patients-mock-data";
import { statusConfig } from "./patients-mock-data";

interface PatientTableProps {
  patients: PatientRecord[];
  onSelectPatient: (patient: PatientRecord) => void;
  viewMode: ViewMode;
}

const rowActions = [
  { icon: Eye, label: "View Profile", action: "view" },
  { icon: FileText, label: "Medical History", action: "history" },
  { icon: Pill, label: "Prescriptions", action: "prescriptions" },
  { icon: FlaskConical, label: "Lab Reports", action: "labs" },
  { icon: CalendarPlus, label: "Book Follow-up", action: "followup" },
];

export function PatientTable({
  patients,
  onSelectPatient,
  viewMode,
}: PatientTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  if (viewMode !== "table") return null;

  if (patients.length === 0) return null;

  return (
    <motion.div
      variants={staggerTable}
      initial="hidden"
      animate="visible"
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200/60 bg-white",
        "dark:border-slate-700/40 dark:bg-slate-900/60",
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          {/* Header */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-800/40">
              <Th>Avatar</Th>
              <Th>Patient</Th>
              <Th>Age</Th>
              <Th>Gender</Th>
              <Th>Blood Group</Th>
              <Th>Last Visit</Th>
              <Th>Condition</Th>
              <Th>Status</Th>
              <Th className="w-12">Actions</Th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {patients.map((patient, idx) => {
              const sConf = statusConfig[patient.appointmentStatus];
              return (
                <motion.tr
                  key={patient.id}
                  variants={tableRowFade}
                  className={cn(
                    "group border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/50",
                    "dark:border-slate-800 dark:hover:bg-slate-800/30",
                  )}
                >
                  {/* Avatar */}
                  <td className="px-3 py-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-sm",
                        patient.avatarGradient,
                      )}
                    >
                      {patient.initials}
                    </div>
                  </td>

                  {/* Patient */}
                  <td className="px-3 py-3">
                    <button
                      onClick={() => onSelectPatient(patient)}
                      className="font-medium text-slate-900 transition-colors hover:text-dash-primary dark:text-white dark:hover:text-accent"
                    >
                      {patient.name}
                    </button>
                    <p className="text-[10px] text-slate-400">
                      {patient.patientId}
                    </p>
                  </td>

                  {/* Age */}
                  <td className="px-3 py-3 text-slate-700 dark:text-slate-300">
                    {patient.age}
                  </td>

                  {/* Gender */}
                  <td className="px-3 py-3 text-slate-700 dark:text-slate-300">
                    {patient.gender}
                  </td>

                  {/* Blood Group */}
                  <td className="px-3 py-3">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {patient.bloodGroup}
                    </span>
                  </td>

                  {/* Last Visit */}
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-400">
                    {patient.lastVisit}
                  </td>

                  {/* Condition */}
                  <td className="max-w-[160px] truncate px-3 py-3 text-slate-700 dark:text-slate-300">
                    {patient.condition}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                        sConf.bg,
                        sConf.text,
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 animate-pulse rounded-full",
                          sConf.dot,
                        )}
                      />
                      {patient.appointmentStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="relative px-3 py-3">
                    <button
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === patient.id ? null : patient.id,
                        )
                      }
                      className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>

                    {/* Dropdown menu */}
                    {openMenuId === patient.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                        >
                          {rowActions.map((action) => {
                            const Icon = action.icon;
                            return (
                              <button
                                key={action.action}
                                onClick={() => {
                                  setOpenMenuId(null);
                                  if (action.action === "view") {
                                    onSelectPatient(patient);
                                  }
                                }}
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                              >
                                <Icon className="h-3.5 w-3.5 shrink-0" />
                                {action.label}
                              </button>
                            );
                          })}
                        </motion.div>
                      </>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Row count */}
      <div className="border-t border-slate-100 px-4 py-2 text-[10px] text-slate-400 dark:border-slate-800">
        Showing {patients.length} patient{patients.length !== 1 ? "s" : ""}
      </div>
    </motion.div>
  );
}

function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "px-3 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400",
        className,
      )}
    >
      {children}
    </th>
  );
}
