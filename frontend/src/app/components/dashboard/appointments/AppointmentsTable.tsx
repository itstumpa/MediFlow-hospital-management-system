"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Edit3,
  Eye,
  MoreHorizontal,
  Phone,
  Trash2,
  UserCheck,
  Video,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { AppointmentCard } from "./AppointmentCard";
import type {
  Appointment,
  AppointmentFilters,
  SortField,
  ViewMode,
} from "./types";

interface AppointmentsTableProps {
  appointments: Appointment[];
  filters: AppointmentFilters;
  onFiltersChange: (filters: AppointmentFilters) => void;
  selectedIds: Set<string>;
  onSelectId: (id: string) => void;
  onSelectAll: () => void;
  onView: (appointment: Appointment) => void;
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
  onCheckIn: (appointment: Appointment) => void;
  onComplete: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
  viewMode: ViewMode;
}

const COLUMNS: {
  key: string;
  label: string;
  sortable: boolean;
  width: string;
  sortField?: SortField;
}[] = [
  { key: "checkbox", label: "", sortable: false, width: "w-10" },
  {
    key: "patient",
    label: "Patient",
    sortable: true,
    width: "min-w-[180px]",
    sortField: "name",
  },
  {
    key: "doctor",
    label: "Doctor",
    sortable: true,
    width: "min-w-[150px]",
    sortField: "doctor",
  },
  {
    key: "department",
    label: "Department",
    sortable: false,
    width: "min-w-[120px]",
  },
  {
    key: "date",
    label: "Date",
    sortable: true,
    width: "w-28",
    sortField: "date",
  },
  {
    key: "time",
    label: "Time",
    sortable: true,
    width: "w-24",
    sortField: "time",
  },
  { key: "duration", label: "Dur.", sortable: false, width: "w-16" },
  { key: "consultationType", label: "Type", sortable: false, width: "w-24" },
  { key: "paymentStatus", label: "Payment", sortable: false, width: "w-24" },
  { key: "status", label: "Status", sortable: false, width: "w-28" },
  { key: "actions", label: "", sortable: false, width: "w-24" },
];

const statusConfig: Record<string, { class: string; dot: string }> = {
  Confirmed: {
    class: "bg-dash-primary-light text-dash-primary dark:bg-teal-900/40 dark:text-accent",
    dot: "bg-dash-primary",
  },
  Pending: {
    class:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  Completed: {
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  Cancelled: {
    class: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    dot: "bg-red-500",
  },
  "No Show": {
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    dot: "bg-slate-400",
  },
  Rescheduled: {
    class:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    dot: "bg-violet-500",
  },
  "Checked In": {
    class: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
    dot: "bg-cyan-500",
  },
  "In Progress": {
    class:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    dot: "bg-indigo-500",
  },
};

const paymentConfig: Record<string, { class: string }> = {
  Paid: {
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  Pending: {
    class:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  Refunded: {
    class: "bg-dash-primary-light text-dash-primary dark:bg-teal-900/40 dark:text-accent",
  },
  Waived: {
    class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  Insurance: {
    class:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  },
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
  initials,
  colorClass,
}: {
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

function AppointmentRow({
  appointment,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onCheckIn,
  onComplete,
  onReschedule,
  onCancel,
  index,
}: {
  appointment: Appointment;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (appointment: Appointment) => void;
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
  onCheckIn: (appointment: Appointment) => void;
  onComplete: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
  index: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const colorIdx = appointment.patientName.length % avatarColors.length;
  const statusStyle = statusConfig[appointment.status] ?? statusConfig.Pending;
  const payStyle =
    paymentConfig[appointment.paymentStatus] ?? paymentConfig.Pending;

  const formatTime = (t: string) => {
    const [h, m] = t.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

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
            onChange={() => onSelect(appointment.id)}
            className="h-4 w-4 rounded border-slate-300 accent-dash-primary focus:ring-dash-primary dark:border-slate-600"
            aria-label={`Select ${appointment.patientName}`}
          />
        </div>
      </td>

      {/* Patient */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-3">
          <Avatar
            initials={appointment.patientInitials}
            colorClass={avatarColors[colorIdx]}
          />
          <div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {appointment.patientName}
            </span>
            <p className="text-xs font-mono text-slate-400 dark:text-slate-500">
              {appointment.appointmentId}
            </p>
          </div>
        </div>
      </td>

      {/* Doctor */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {appointment.doctorName}
        </span>
      </td>

      {/* Department */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {appointment.department}
        </span>
      </td>

      {/* Date */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {new Date(appointment.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </td>

      {/* Time */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {formatTime(appointment.time)}
        </span>
      </td>

      {/* Duration */}
      <td className="px-3 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {appointment.duration}m
        </span>
      </td>

      {/* Consultation Type */}
      <td className="px-3 py-3">
        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {appointment.consultationType === "Video" ? (
            <Video className="h-3 w-3" />
          ) : appointment.consultationType === "Phone" ? (
            <Phone className="h-3 w-3" />
          ) : (
            <Calendar className="h-3 w-3" />
          )}
          {appointment.consultationType}
        </span>
      </td>

      {/* Payment Status */}
      <td className="px-3 py-3">
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${payStyle.class}`}
        >
          {appointment.paymentStatus}
        </span>
      </td>

      {/* Status */}
      <td className="px-3 py-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle.class}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
          {appointment.status}
        </span>
      </td>

      {/* Actions */}
      <td className="sticky right-0 z-10 bg-inherit px-3 py-3">
        <div className="relative flex items-center justify-end">
          <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onView(appointment)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-dash-primary dark:hover:bg-slate-700 dark:hover:text-dash-primary"
              title="View"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => onEdit(appointment)}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
              title="Edit"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            {appointment.status === "Pending" && (
              <button
                onClick={() => onCheckIn(appointment)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-cyan-600 dark:hover:bg-slate-700 dark:hover:text-cyan-400"
                title="Check In"
              >
                <UserCheck className="h-4 w-4" />
              </button>
            )}
            {appointment.status === "In Progress" && (
              <button
                onClick={() => onComplete(appointment)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
                title="Complete"
              >
                <CheckCircle2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => onDelete(appointment)}
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

          <AnimatePresence>
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
                  role="menu"
                >
                  {[
                    {
                      icon: Eye,
                      label: "View Details",
                      onClick: () => {
                        onView(appointment);
                        setMenuOpen(false);
                      },
                    },
                    {
                      icon: Edit3,
                      label: "Edit",
                      onClick: () => {
                        onEdit(appointment);
                        setMenuOpen(false);
                      },
                    },
                    {
                      icon: Calendar,
                      label: "Reschedule",
                      onClick: () => {
                        onReschedule(appointment);
                        setMenuOpen(false);
                      },
                    },
                    {
                      icon: UserCheck,
                      label: "Check In",
                      onClick: () => {
                        onCheckIn(appointment);
                        setMenuOpen(false);
                      },
                      hidden:
                        appointment.status !== "Pending" &&
                        appointment.status !== "Confirmed",
                    },
                    {
                      icon: CheckCircle2,
                      label: "Mark Completed",
                      onClick: () => {
                        onComplete(appointment);
                        setMenuOpen(false);
                      },
                      hidden:
                        appointment.status !== "In Progress" &&
                        appointment.status !== "Checked In",
                    },
                    {
                      icon: XCircle,
                      label: "Cancel Appointment",
                      onClick: () => {
                        onCancel(appointment);
                        setMenuOpen(false);
                      },
                      danger: true,
                    },
                    {
                      icon: Trash2,
                      label: "Delete",
                      onClick: () => {
                        onDelete(appointment);
                        setMenuOpen(false);
                      },
                      danger: true,
                    },
                  ]
                    .filter((item) => !item.hidden)
                    .map((item) => (
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
          </AnimatePresence>
        </div>
      </td>
    </motion.tr>
  );
}

export function AppointmentsTable({
  appointments,
  filters,
  onFiltersChange,
  selectedIds,
  onSelectId,
  onSelectAll,
  onView,
  onEdit,
  onDelete,
  onCheckIn,
  onComplete,
  onReschedule,
  onCancel,
  viewMode,
}: AppointmentsTableProps) {
  const allSelected =
    appointments.length > 0 && selectedIds.size === appointments.length;

  const handleSort = (field: SortField) => {
    if (filters.sortBy === field) {
      onFiltersChange({ ...filters, sortAsc: !filters.sortAsc });
    } else {
      onFiltersChange({ ...filters, sortBy: field, sortAsc: true });
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (filters.sortBy !== field) {
      return <ChevronsUpDown className="h-3.5 w-3.5 text-slate-400" />;
    }
    return filters.sortAsc ? (
      <ChevronUp className="h-3.5 w-3.5 text-dash-primary" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5 text-dash-primary" />
    );
  };

  if (viewMode === "card") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {appointments.map((appointment, i) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            selected={selectedIds.has(appointment.id)}
            onSelect={onSelectId}
            onView={onView}
            onEdit={onEdit}
            index={i}
          />
        ))}
      </motion.div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" role="grid">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/80">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`${col.width} px-3 py-3 ${
                    col.key === "checkbox" ? "text-center" : "text-left"
                  }`}
                >
                  {col.key === "checkbox" ? (
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={onSelectAll}
                        className="h-4 w-4 rounded border-slate-300 accent-dash-primary focus:ring-dash-primary dark:border-slate-600"
                        aria-label="Select all appointments"
                      />
                    </div>
                  ) : col.sortable && col.sortField ? (
                    <button
                      onClick={() => handleSort(col.sortField!)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      {col.label}
                      {renderSortIcon(col.sortField!)}
                    </button>
                  ) : (
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {col.label}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {appointments.map((appointment, i) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                selected={selectedIds.has(appointment.id)}
                onSelect={onSelectId}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onCheckIn={onCheckIn}
                onComplete={onComplete}
                onReschedule={onReschedule}
                onCancel={onCancel}
                index={i}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
