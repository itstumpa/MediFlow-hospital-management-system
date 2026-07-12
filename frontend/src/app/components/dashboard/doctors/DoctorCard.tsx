"use client";

import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Luggage,
  Circle,
  Eye,
  Edit3,
  Trash2,
  MoreHorizontal,
  BadgeCheck,
} from "lucide-react";
import type { Doctor } from "./types";

interface DoctorCardProps {
  doctor: Doctor;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: (doctor: Doctor) => void;
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
  index: number;
}

const statusConfig: Record<string, { class: string; icon: React.ElementType }> = {
  Active: { class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300", icon: CheckCircle },
  Inactive: { class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400", icon: XCircle },
  "On Leave": { class: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300", icon: Clock },
  Vacation: { class: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300", icon: Luggage },
  "Emergency Duty": { class: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300", icon: AlertTriangle },
};

const avatarColors = [
  "bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500",
  "bg-rose-500", "bg-cyan-500", "bg-orange-500", "bg-indigo-500",
];

const availabilityColors: Record<string, string> = {
  Available: "bg-emerald-500",
  Busy: "bg-amber-500",
  "Out of Office": "bg-slate-400",
};

export function DoctorCard({ doctor, selected, onSelect, onView, onEdit, onDelete, index }: DoctorCardProps) {
  const StatusIcon = statusConfig[doctor.status]?.icon || Circle;
  const colorIdx = doctor.name.length % avatarColors.length;

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
          onChange={() => onSelect(doctor.id)}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
        />
      </div>

      {/* Status badge */}
      <div className="absolute right-3 top-3 z-10">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[doctor.status]?.class}`}>
          <StatusIcon className="h-3 w-3" />
          {doctor.status}
        </span>
      </div>

      {/* Card content */}
      <div className="p-5 pt-10">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center text-center">
          <div className={`relative flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white ${avatarColors[colorIdx]}`}>
            {doctor.initials}
            {doctor.verified && (
              <BadgeCheck className="absolute -bottom-1 -right-1 h-5 w-5 fill-blue-500 text-white" />
            )}
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">{doctor.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{doctor.specialization}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{doctor.department}</p>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Experience</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{doctor.experience}y</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Patients</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{doctor.patients}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Rating</p>
            <div className="flex items-center justify-center gap-0.5 text-sm font-bold text-slate-900 dark:text-white">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {doctor.rating}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${availabilityColors[doctor.availability]}`} />
            <span className="text-slate-600 dark:text-slate-400">{doctor.availability}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Clock className="h-3 w-3" />
            {doctor.appointmentsToday} today
          </div>
        </div>

        {/* Contact */}
        <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
          <p className="truncate">{doctor.email}</p>
          <p>{doctor.phone}</p>
        </div>

        {/* Consult type */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {doctor.consultationType === "Both" ? (
            <>
              <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">Online</span>
              <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">Offline</span>
            </>
          ) : (
            <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">{doctor.consultationType}</span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-center gap-1 border-t border-slate-100 pt-3 dark:border-slate-700">
          <button
            onClick={() => onView(doctor)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
            title="View profile"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(doctor)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
            title="Edit"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(doctor)}
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
