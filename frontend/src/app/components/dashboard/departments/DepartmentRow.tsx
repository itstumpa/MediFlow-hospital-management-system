"use client";

import { motion } from "framer-motion";
import {
  Archive,
  Building2,
  CheckCircle,
  Edit3,
  Eye,
  MoreHorizontal,
  Trash2,
  UserCog,
  Wrench,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import type { Department } from "./types";

interface DepartmentRowProps {
  department: Department;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (department: Department) => void;
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
  onAssignHead?: (department: Department) => void;
  onArchive?: (department: Department) => void;
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
  "Under Maintenance": {
    class:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
    icon: Wrench,
  },
  Closed: {
    class: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    dot: "bg-red-500",
    icon: XCircle,
  },
};

const iconBgColors = [
  "bg-dash-primary",
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

export function DepartmentRow({
  department,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onAssignHead,
  onArchive,
  index,
}: DepartmentRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const StatusIcon = statusConfig[department.status]?.icon || Building2;
  const colorIdx = department.name.length % iconBgColors.length;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
        ease: "easeOut",
      }}
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
            onChange={() => onSelect(department.id)}
            className="h-4 w-4 rounded border-slate-300 accent-dash-primary focus:ring-dash-primary dark:border-slate-600"
          />
        </div>
      </td>

      {/* Department Icon */}
      <td className="px-3 py-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl text-white ${department.iconBg.replace(
            "dark:",
            "",
          )}`}
        >
          <Building2 className="h-4 w-4" />
        </div>
      </td>

      {/* Department Name */}
      <td className="px-3 py-3">
        <div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {department.name}
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {department.description.slice(0, 60)}...
          </p>
        </div>
      </td>

      {/* Department Head */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ${iconBgColors[colorIdx]}`}
          >
            {department.headInitials}
          </div>
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {department.head}
          </span>
        </div>
      </td>

      {/* Doctors */}
      <td className="px-3 py-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {department.doctors}
        </span>
      </td>

      {/* Patients */}
      <td className="px-3 py-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {department.patients.toLocaleString()}
        </span>
      </td>

      {/* Appointments */}
      <td className="px-3 py-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {department.appointments.toLocaleString()}
        </span>
      </td>

      {/* Floor */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {department.floor}
        </span>
      </td>

      {/* Status */}
      <td className="px-3 py-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            statusConfig[department.status]?.class
          }`}
        >
          <StatusIcon className="h-3 w-3" />
          {department.status}
        </span>
      </td>

      {/* Created Date */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {new Date(department.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </td>

      {/* Actions */}
      <td className="sticky right-0 z-10 bg-inherit px-3 py-3">
        <div className="relative flex items-center justify-end">
          {/* Visible action buttons on hover */}
          <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onView(department)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => onEdit(department)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              title="Edit"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(department)}
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
                className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                {[
                  {
                    icon: Eye,
                    label: "View Details",
                    onClick: () => {
                      onView(department);
                      setMenuOpen(false);
                    },
                  },
                  {
                    icon: Edit3,
                    label: "Edit",
                    onClick: () => {
                      onEdit(department);
                      setMenuOpen(false);
                    },
                  },
                  {
                    icon: UserCog,
                    label: "Assign Head",
                    onClick: () => {
                      onAssignHead?.(department);
                      setMenuOpen(false);
                    },
                  },
                  {
                    icon: Archive,
                    label: "Archive",
                    onClick: () => {
                      onArchive?.(department);
                      setMenuOpen(false);
                    },
                    danger: true,
                  },
                  {
                    icon: Trash2,
                    label: "Delete",
                    onClick: () => {
                      onDelete(department);
                      setMenuOpen(false);
                    },
                    danger: true,
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      "danger" in item && item.danger
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
