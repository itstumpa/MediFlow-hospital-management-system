"use client";

import { motion } from "framer-motion";
import {
  Edit3,
  Eye,
  FileText,
  Mail,
  MoreHorizontal,
  Phone,
} from "lucide-react";
import type { Patient } from "./types";

interface PatientCardProps {
  patient: Patient;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onMedicalRecords: (patient: Patient) => void;
  index: number;
}

const statusConfig: Record<string, { class: string; dot: string }> = {
  Active: {
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  Inactive: {
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-400",
  },
  Admitted: {
    class: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  Discharged: {
    class:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  Pending: {
    class:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    dot: "bg-purple-500",
  },
};

const avatarColors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-indigo-500",
];

export function PatientCard({
  patient,
  selected,
  onSelect,
  onView,
  onEdit,
  onMedicalRecords,
  index,
}: PatientCardProps) {
  const colorIdx = patient.name.length % avatarColors.length;
  const statusStyle = statusConfig[patient.status] ?? statusConfig.Pending;

  const formatDate = (date: string | null) => {
    if (!date) return "None";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      className={`dash-card relative overflow-hidden transition-all ${
        selected
          ? "ring-2 ring-blue-500 shadow-blue-500/10"
          : "hover:shadow-lg hover:-translate-y-0.5"
      }`}
    >
      {/* Selection checkbox */}
      <div className="absolute left-3 top-3 z-10">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(patient.id)}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
          aria-label={`Select ${patient.name}`}
        />
      </div>

      {/* Status badge */}
      <div className="absolute right-3 top-3 z-10">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle.class}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
          {patient.status}
        </span>
      </div>

      {/* Card content */}
      <div className="p-5 pt-10">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center text-center">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white ${avatarColors[colorIdx]}`}
          >
            {patient.initials}
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
            {patient.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {patient.patientId}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {patient.department}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Age
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {patient.age}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Blood
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {patient.bloodGroup}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Gender
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {patient.gender}
            </p>
          </div>
        </div>

        {/* Doctor & Appointment */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Doctor</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {patient.assignedDoctor}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Upcoming</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {formatDate(patient.upcomingAppointment)}
            </span>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
          <p className="flex items-center gap-1.5 truncate">
            <Mail className="h-3 w-3 shrink-0" />
            {patient.email}
          </p>
          <p className="flex items-center gap-1.5">
            <Phone className="h-3 w-3 shrink-0" />
            {patient.phone}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-center gap-1 border-t border-slate-100 pt-3 dark:border-slate-700">
          <button
            onClick={() => onView(patient)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
            title="View patient"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(patient)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
            title="Edit"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onMedicalRecords(patient)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-violet-600 dark:hover:bg-slate-700 dark:hover:text-violet-400"
            title="Medical Records"
          >
            <FileText className="h-4 w-4" />
          </button>
          <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-700" />
          <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
