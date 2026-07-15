"use client";

import { Button } from "@/app/components/dashboard/Button";
import {
  staggerTable,
  tableRowFade,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Eye, FileText, MoreHorizontal } from "lucide-react";
import { type Patient, statusConfig } from "../_mock-data";

/* ─── Helpers ───────────────────────────────── */

function getInitialsColor(name: string) {
  const colors = [
    "bg-[var(--color-primary)]",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
  ];
  const idx = name.length % colors.length;
  return colors[idx];
}

function formatAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

/* ─── Desktop Row ───────────────────────────── */

function DesktopRow({
  patient,
  onView,
}: {
  patient: Patient;
  onView: (p: Patient) => void;
}) {
  const status = statusConfig[patient.status];
  const initialsColor = getInitialsColor(patient.name);

  return (
    <motion.tr
      variants={tableRowFade}
      className="group border-b border-slate-100 transition-colors hover:bg-slate-50/80 dark:border-slate-800 dark:hover:bg-slate-800/40"
    >
      <td className="py-3 pl-4 pr-2">
        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
          {patient.id}
        </span>
      </td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white ${initialsColor}`}
          >
            {patient.initials}
          </span>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {patient.name}
            </p>
            <p className="text-xs text-slate-400">{patient.email}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-sm text-slate-700 dark:text-slate-300">
        {patient.age}
      </td>
      <td className="px-3 py-3">
        <span className="text-sm capitalize text-slate-600 dark:text-slate-400">
          {patient.gender}
        </span>
      </td>
      <td className="px-3 py-3 text-sm text-slate-700 dark:text-slate-300">
        {patient.assignedDoctor}
      </td>
      <td className="px-3 py-3 text-sm text-slate-500 dark:text-slate-400">
        {patient.phone}
      </td>
      <td className="px-3 py-3 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
        {patient.lastVisit}
      </td>
      <td className="px-3 py-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.class}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </td>
      <td className="py-3 pl-3 pr-4">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="xs"
            icon={Eye}
            onClick={() => onView(patient)}
          >
            View
          </Button>
          <Button variant="ghost" size="xs" icon={MoreHorizontal} />
        </div>
      </td>
    </motion.tr>
  );
}

/* ─── Mobile Card ───────────────────────────── */

function MobileCard({
  patient,
  onView,
}: {
  patient: Patient;
  onView: (p: Patient) => void;
}) {
  const status = statusConfig[patient.status];
  const initialsColor = getInitialsColor(patient.name);

  return (
    <motion.div
      variants={tableRowFade}
      className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white/50 px-4 py-3 transition-colors hover:bg-slate-50 dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:bg-slate-800/60"
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${initialsColor}`}
      >
        {patient.initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {patient.name}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {patient.assignedDoctor} · Age {patient.age}
        </p>
        <p className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
          <span>{patient.phone}</span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span>{patient.id}</span>
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.class}`}
        >
          {status.label}
        </span>
        <Button
          variant="ghost"
          size="xs"
          icon={Eye}
          onClick={() => onView(patient)}
        >
          View
        </Button>
      </div>
    </motion.div>
  );
}

/* ─── Empty State ───────────────────────────── */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <FileText className="h-7 w-7 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
        No patients found
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Try adjusting your search or filter criteria.
      </p>
    </div>
  );
}

/* ─── Main Component ────────────────────────── */

interface PatientTableProps {
  patients: Patient[];
  onViewPatient: (patient: Patient) => void;
}

export function PatientTable({
  patients: filteredPatients,
  onViewPatient,
}: PatientTableProps) {
  if (filteredPatients.length === 0) return <EmptyState />;

  return (
    <div className="dash-card overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-sticky-header">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  ID
                </th>
                <th className="px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Patient
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Age
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Gender
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Doctor
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Phone
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Last Visit
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <motion.tbody
              variants={staggerTable}
              initial="hidden"
              animate="visible"
            >
              {filteredPatients.map((patient) => (
                <DesktopRow
                  key={patient.id}
                  patient={patient}
                  onView={onViewPatient}
                />
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2 p-4 md:hidden">
        <motion.div
          variants={staggerTable}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {filteredPatients.map((patient) => (
            <MobileCard
              key={patient.id}
              patient={patient}
              onView={onViewPatient}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
