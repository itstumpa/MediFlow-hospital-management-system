"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MoreHorizontal,
  Eye,
  Edit3,
  Calendar,
  FileText,
  MessageSquare,
  Trash2,
} from "lucide-react";
import type { Patient } from "./types";

interface PatientRowProps {
  patient: Patient;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onAppointments: (patient: Patient) => void;
  onMedicalRecords: (patient: Patient) => void;
  onMessage: (patient: Patient) => void;
  index: number;
}

const statusConfig: Record<string, { class: string; dot: string }> = {
  Active: {
    class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
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
    class: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  Pending: {
    class: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    dot: "bg-purple-500",
  },
};

const avatarColors = [
  "bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500",
  "bg-rose-500", "bg-cyan-500", "bg-orange-500", "bg-indigo-500",
];

function Avatar({ initials, colorClass }: { initials: string; colorClass: string }) {
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${colorClass}`}
    >
      {initials}
    </div>
  );
}

export function PatientRow({
  patient,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onAppointments,
  onMedicalRecords,
  onMessage,
  index,
}: PatientRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const colorIdx = patient.name.length % avatarColors.length;
  const statusStyle = statusConfig[patient.status] ?? statusConfig.Pending;

  const formatDate = (date: string | null) => {
    if (!date) return "—";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: "easeOut" }}
      className={`group transition-colors ${
        selected
          ? "bg-blue-50/50 dark:bg-blue-900/20"
          : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
      }`}
    >
      {/* Checkbox */}
      <td className="sticky left-0 z-10 bg-inherit px-3 py-3">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(patient.id)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
            aria-label={`Select ${patient.name}`}
          />
        </div>
      </td>

      {/* Avatar + Patient ID */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-3">
          <Avatar initials={patient.initials} colorClass={avatarColors[colorIdx]} />
          <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
            {patient.patientId}
          </span>
        </div>
      </td>

      {/* Name */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {patient.name}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{patient.email}</p>
      </td>

      {/* Age */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">{patient.age}</span>
      </td>

      {/* Gender */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">{patient.gender}</span>
      </td>

      {/* Blood Group */}
      <td className="px-3 py-3">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {patient.bloodGroup}
        </span>
      </td>

      {/* Assigned Doctor */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {patient.assignedDoctor}
        </span>
      </td>

      {/* Department */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">{patient.department}</span>
      </td>

      {/* Last Visit */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {formatDate(patient.lastVisit)}
        </span>
      </td>

      {/* Upcoming Appointment */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {formatDate(patient.upcomingAppointment)}
        </span>
      </td>

      {/* Status */}
      <td className="px-3 py-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle.class}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
          {patient.status}
        </span>
      </td>

      {/* Actions */}
      <td className="sticky right-0 z-10 bg-inherit px-3 py-3">
        <div className="relative flex items-center justify-end">
          <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onView(patient)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
              title="View Patient"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => onEdit(patient)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
              title="Edit"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(patient)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Dropdown toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="More actions"
            aria-expanded={menuOpen}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                role="menu"
              >
                {[
                  { icon: Eye, label: "View Patient", onClick: () => { onView(patient); setMenuOpen(false); } },
                  { icon: Edit3, label: "Edit", onClick: () => { onEdit(patient); setMenuOpen(false); } },
                  { icon: Calendar, label: "Appointments", onClick: () => { onAppointments(patient); setMenuOpen(false); } },
                  { icon: FileText, label: "Medical Records", onClick: () => { onMedicalRecords(patient); setMenuOpen(false); } },
                  { icon: MessageSquare, label: "Message", onClick: () => { onMessage(patient); setMenuOpen(false); } },
                  { icon: Trash2, label: "Delete", onClick: () => { onDelete(patient); setMenuOpen(false); }, danger: true },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      item.danger
                        ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                    }`}
                    role="menuitem"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </td>
    </motion.tr>
  );
}
