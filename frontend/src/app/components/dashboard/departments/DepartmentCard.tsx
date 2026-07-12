"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CalendarCheck,
  CheckCircle,
  Edit3,
  Eye,
  MoreHorizontal,
  Stethoscope,
  Trash2,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";
import type { Department } from "./types";

interface DepartmentCardProps {
  department: Department;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (department: Department) => void;
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
  index: number;
}

const statusConfig: Record<string, { class: string; icon: React.ElementType }> =
  {
    Active: {
      class:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      icon: CheckCircle,
    },
    Inactive: {
      class:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
      icon: XCircle,
    },
    "Under Maintenance": {
      class:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      icon: Wrench,
    },
    Closed: {
      class: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
      icon: XCircle,
    },
  };

const iconBgColors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-pink-500",
  "bg-lime-500",
  "bg-purple-500",
  "bg-sky-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-slate-500",
];

export function DepartmentCard({
  department,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  index,
}: DepartmentCardProps) {
  const StatusIcon = statusConfig[department.status]?.icon || Building2;
  const colorIdx = department.name.length % iconBgColors.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: "easeOut",
      }}
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
          onChange={() => onSelect(department.id)}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
        />
      </div>

      {/* Status badge */}
      <div className="absolute right-3 top-3 z-10">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            statusConfig[department.status]?.class
          }`}
        >
          <StatusIcon className="h-3 w-3" />
          {department.status}
        </span>
      </div>

      {/* Card content */}
      <div className="p-5 pt-10">
        {/* Icon + Name */}
        <div className="flex flex-col items-center text-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${department.iconBg}`}
          >
            <Building2 className="h-7 w-7" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
            {department.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
            {department.description}
          </p>
        </div>

        {/* Department Head */}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/50">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white ${iconBgColors[colorIdx]}`}
          >
            {department.headInitials}
          </div>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {department.head}
          </span>
        </div>

        {/* Stats grid */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-800/50">
            <Stethoscope className="mx-auto h-3.5 w-3.5 text-slate-400" />
            <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              Doctors
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {department.doctors}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-800/50">
            <Users className="mx-auto h-3.5 w-3.5 text-slate-400" />
            <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              Patients
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {department.patients.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-slate-800/50">
            <CalendarCheck className="mx-auto h-3.5 w-3.5 text-slate-400" />
            <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              Today
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {department.appointmentsToday}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Building2 className="h-3 w-3" />
          {department.building} — {department.floor}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex items-center justify-center gap-1 border-t border-slate-100 pt-3 dark:border-slate-700">
          <button
            onClick={() => onView(department)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
            title="View"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(department)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
            title="Edit"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(department)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-700 dark:hover:text-red-400"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
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
