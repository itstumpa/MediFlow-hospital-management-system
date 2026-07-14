"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  Edit3,
  Eye,
  FileText,
  MoreHorizontal,
  Pill,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { staggerTable, tableRowFade } from "../MotionVariants";
import type {
  PrescriptionRecord,
  PrescriptionStatus,
} from "./prescriptions-mock-data";

interface PrescriptionTableProps {
  prescriptions: PrescriptionRecord[];
  onSelect?: (prescription: PrescriptionRecord) => void;
  onEdit?: (prescription: PrescriptionRecord) => void;
  onDelete?: (prescription: PrescriptionRecord) => void;
}

const statusConfig: Record<
  PrescriptionStatus,
  { bg: string; text: string; dot: string }
> = {
  Active: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  Completed: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  Discontinued: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
  },
  Expired: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-500 dark:text-slate-400",
    dot: "bg-slate-400",
  },
  Pending: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
};

export function PrescriptionTable({
  prescriptions,
  onSelect,
  onEdit,
  onDelete,
}: PrescriptionTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  if (prescriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/50 py-16 dark:border-slate-700 dark:bg-slate-900/30">
        <FileText className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          No prescriptions found
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerTable}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-xl border border-slate-200/60 bg-white dark:border-slate-700/40 dark:bg-slate-900/60"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-400">
              <th className="px-4 py-3.5">Prescription ID</th>
              <th className="px-4 py-3.5">Patient</th>
              <th className="px-4 py-3.5">Medicine</th>
              <th className="px-4 py-3.5">Dosage</th>
              <th className="px-4 py-3.5">Duration</th>
              <th className="px-4 py-3.5">Created Date</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {prescriptions.map((rx) => {
              const statusStyle = statusConfig[rx.status];
              return (
                <motion.tr
                  key={rx.id}
                  variants={tableRowFade}
                  className={cn(
                    "group transition-colors",
                    "hover:bg-slate-50/50 dark:hover:bg-slate-800/30",
                    "cursor-pointer",
                  )}
                  onClick={() => onSelect?.(rx)}
                >
                  {/* Prescription ID */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-dash-primary-light dark:bg-teal-950/30">
                        <FileText className="h-3.5 w-3.5 text-dash-primary dark:text-accent" />
                      </div>
                      <span className="font-mono text-xs font-medium text-slate-700 dark:text-slate-300">
                        {rx.prescriptionId}
                      </span>
                    </div>
                  </td>

                  {/* Patient */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white shadow-sm",
                          rx.patientAvatarGradient,
                        )}
                      >
                        {rx.patientInitials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {rx.patientName}
                        </p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                          {rx.patientAge} yrs · {rx.patientGender}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Medicine */}
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      {rx.medicines.slice(0, 2).map((med) => (
                        <span
                          key={med.id}
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300"
                        >
                          <Pill className="h-3 w-3 text-slate-400" />
                          {med.name} {med.strength}
                        </span>
                      ))}
                      {rx.medicines.length > 2 && (
                        <span className="text-[10px] text-slate-400">
                          +{rx.medicines.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Dosage */}
                  <td className="px-4 py-3.5">
                    <span className="whitespace-nowrap text-xs text-slate-600 dark:text-slate-400">
                      {rx.medicines[0]?.dosage ?? "—"}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3.5">
                    <span className="whitespace-nowrap text-xs text-slate-600 dark:text-slate-400">
                      {rx.medicines[0]
                        ? `${rx.medicines[0].duration} ${rx.medicines[0].durationUnit}`
                        : "—"}
                    </span>
                  </td>

                  {/* Created Date */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {new Date(rx.createdDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                        statusStyle.bg,
                        statusStyle.text,
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          statusStyle.dot,
                        )}
                      />
                      {rx.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.(rx);
                        }}
                        className={cn(
                          "rounded-lg p-1.5 text-slate-400 transition-colors",
                          "hover:bg-slate-100 hover:text-slate-600",
                          "dark:hover:bg-slate-800 dark:hover:text-slate-300",
                        )}
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect?.(rx);
                        }}
                        className={cn(
                          "rounded-lg p-1.5 text-slate-400 transition-colors",
                          "hover:bg-slate-100 hover:text-slate-600",
                          "dark:hover:bg-slate-800 dark:hover:text-slate-300",
                        )}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === rx.id ? null : rx.id);
                          }}
                          className={cn(
                            "rounded-lg p-1.5 text-slate-400 transition-colors",
                            "hover:bg-slate-100 hover:text-slate-600",
                            "dark:hover:bg-slate-800 dark:hover:text-slate-300",
                          )}
                        >
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>
                        {openMenuId === rx.id && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                              }}
                            />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className={cn(
                                "absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl",
                                "dark:border-slate-700 dark:bg-slate-800",
                              )}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(null);
                                  onSelect?.(rx);
                                }}
                                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                View Details
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(null);
                                  onEdit?.(rx);
                                }}
                                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Refill
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(null);
                                }}
                                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700"
                              >
                                <Download className="h-3.5 w-3.5" />
                                Download
                              </button>
                              <hr className="my-1 border-slate-100 dark:border-slate-700" />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(null);
                                  onDelete?.(rx);
                                }}
                                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            </motion.div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
