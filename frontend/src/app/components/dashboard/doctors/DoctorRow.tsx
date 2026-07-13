"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  Edit3,
  Eye,
  Luggage,
  MessageSquare,
  MoreHorizontal,
  Star,
  Trash2,
  UserX,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import type { Doctor } from "./types";

interface DoctorRowProps {
  doctor: Doctor;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (doctor: Doctor) => void;
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
  index: number;
}

const statusConfig: Record<
  string,
  { class: string; dot: string; icon: React.ElementType }
> = {
  Active: {
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    dot: "bg-emerald-500",
    icon: CheckCircle,
  },
  Inactive: {
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-400",
    icon: XCircle,
  },
  "On Leave": {
    class:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
    icon: Clock,
  },
  Vacation: {
    class:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    dot: "bg-violet-500",
    icon: Luggage,
  },
  "Emergency Duty": {
    class: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    dot: "bg-rose-500",
    icon: AlertTriangle,
  },
};

const availabilityColors: Record<string, string> = {
  Available: "text-emerald-500",
  Busy: "text-amber-500",
  "Out of Office": "text-slate-400",
};

const avatarColors = [
  "bg-dash-primary",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-indigo-500",
];

function Avatar({
  name,
  initials,
  colorClass,
}: {
  name: string;
  initials: string;
  colorClass: string;
}) {
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${colorClass}`}
    >
      {initials}
    </div>
  );
}

export function DoctorRow({
  doctor,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  index,
}: DoctorRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const StatusIcon = statusConfig[doctor.status]?.icon || Circle;
  const colorIdx = doctor.name.length % avatarColors.length;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: "easeOut" }}
      className={`group transition-colors ${
        selected
          ? "bg-dash-primary-light/50 dark:bg-teal-900/20"
          : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
      }`}
    >
      {/* Checkbox */}
      <td className="sticky left-0 z-10 bg-inherit px-3 py-3">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(doctor.id)}
            className="h-4 w-4 rounded border-slate-300 accent-dash-primary focus:ring-dash-primary dark:border-slate-600"
          />
        </div>
      </td>

      {/* Doctor Info */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-3">
          <Avatar
            name={doctor.name}
            initials={doctor.initials}
            colorClass={avatarColors[colorIdx]}
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                {doctor.name}
              </span>
              {doctor.verified && (
                <span className="text-dash-primary" title="Verified">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {doctor.email}
            </p>
          </div>
        </div>
      </td>

      {/* Department */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {doctor.department}
        </span>
        <p className="text-xs text-slate-400">{doctor.specialization}</p>
      </td>

      {/* Experience */}
      <td className="px-3 py-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {doctor.experience} yrs
        </span>
      </td>

      {/* Patients */}
      <td className="px-3 py-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {doctor.patients.toLocaleString()}
        </span>
      </td>

      {/* Rating */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {doctor.rating}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-1.5">
          <StatusIcon
            className={`h-3.5 w-3.5 ${statusConfig[doctor.status]?.class.split(" ")[1] || "text-slate-400"}`}
          />
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[doctor.status]?.class}`}
          >
            {doctor.status}
          </span>
        </div>
      </td>

      {/* Availability */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-1.5">
          <div
            className={`h-2 w-2 rounded-full ${availabilityColors[doctor.availability]}`}
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {doctor.availability}
          </span>
        </div>
      </td>

      {/* Appointment */}
      <td className="px-3 py-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {doctor.appointmentsToday}
        </span>
      </td>

      {/* Actions */}
      <td className="sticky right-0 z-10 bg-inherit px-3 py-3">
        <div className="relative flex items-center justify-end">
          <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onView(doctor)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              title="View profile"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => onEdit(doctor)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              title="Edit"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(doctor)}
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
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                {[
                  {
                    icon: Eye,
                    label: "View Profile",
                    onClick: () => {
                      onView(doctor);
                      setMenuOpen(false);
                    },
                  },
                  {
                    icon: Edit3,
                    label: "Edit",
                    onClick: () => {
                      onEdit(doctor);
                      setMenuOpen(false);
                    },
                  },
                  {
                    icon: Calendar,
                    label: "Schedule",
                    onClick: () => setMenuOpen(false),
                  },
                  {
                    icon: MessageSquare,
                    label: "Send Message",
                    onClick: () => setMenuOpen(false),
                  },
                  {
                    icon: UserX,
                    label: "Deactivate",
                    onClick: () => setMenuOpen(false),
                    danger: true,
                  },
                  {
                    icon: Trash2,
                    label: "Delete",
                    onClick: () => {
                      onDelete(doctor);
                      setMenuOpen(false);
                    },
                    danger: true,
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      item.danger
                        ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                    }`}
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
