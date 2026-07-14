"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  GraduationCap,
  Languages,
  Search,
  Star,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { doctors, type BookingFormData } from "./types";

interface DoctorSelectionProps {
  departmentId: string;
}

function DoctorSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-700/40 dark:bg-slate-800/60">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DoctorSelection({ departmentId }: DoctorSelectionProps) {
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<BookingFormData>();
  const selected = watch("doctor");

  const filtered = useMemo(
    () =>
      doctors
        .filter((d) => d.departmentId === departmentId)
        .filter(
          (d) =>
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.languages.some((l) =>
              l.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        ),
    [departmentId, searchTerm],
  );

  const available = filtered.filter((d) => d.available);
  const unavailable = filtered.filter((d) => !d.available);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Choose a Doctor
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Select your preferred specialist
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search doctors or languages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid gap-3">
          {[1, 2, 3].map((i) => (
            <DoctorSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <AlertCircle className="h-10 w-10 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            No doctors found
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Try a different search or select another department
          </p>
        </motion.div>
      )}

      {/* Doctors list */}
      {!loading && (
        <AnimatePresence mode="wait">
          <div className="space-y-4">
            {/* Available doctors */}
            {available.length > 0 && (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Available Doctors ({available.length})
                </p>
                <div className="grid gap-3">
                  {available.map((doc) => {
                    const isSelected = selected === doc.id;
                    return (
                      <motion.button
                        key={doc.id}
                        variants={staggerItem}
                        type="button"
                        onClick={() =>
                          setValue("doctor", doc.id, { shouldValidate: true })
                        }
                        className={cn(
                          "group relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-all",
                          isSelected
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md shadow-[var(--color-primary)]/5 dark:border-[var(--color-accent)] dark:bg-teal-950/30"
                            : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:border-slate-600/50",
                        )}
                      >
                        {/* Selected badge */}
                        {isSelected && (
                          <motion.div
                            layoutId="doc-indicator"
                            className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-accent)]"
                            initial={false}
                            transition={{ duration: 0.2 }}
                          >
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </motion.div>
                        )}

                        {/* Avatar */}
                        <div
                          className={cn(
                            "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-lg font-bold text-white shadow-sm transition-transform",
                            isSelected && "scale-110",
                          )}
                        >
                          {doc.initials}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4
                              className={cn(
                                "text-base font-semibold",
                                isSelected
                                  ? "text-[var(--color-primary)] dark:text-[var(--color-accent)]"
                                  : "text-slate-900 dark:text-white",
                              )}
                            >
                              {doc.name}
                            </h4>
                            <span className="flex items-center gap-0.5 text-xs font-medium text-amber-600">
                              <Star className="h-3 w-3 fill-current" />
                              {doc.rating}
                            </span>
                            <span className="text-xs text-slate-400">
                              ({doc.reviews} reviews)
                            </span>
                          </div>

                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              {doc.experience}
                            </span>
                            <span className="flex items-center gap-1">
                              <GraduationCap className="h-3 w-3" />
                              {doc.education}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                              <Languages className="h-3 w-3" />
                              {doc.languages.join(", ")}
                            </span>
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                              ${doc.fee} / visit
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Unavailable doctors */}
            {unavailable.length > 0 && (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Temporarily Unavailable
                </p>
                <div className="grid gap-3">
                  {unavailable.map((doc) => (
                    <div
                      key={doc.id}
                      className="relative flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 opacity-60 dark:border-slate-700/40 dark:bg-slate-800/30"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-300 text-lg font-bold text-white dark:bg-slate-600">
                        {doc.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-slate-500 dark:text-slate-400">
                          {doc.name}
                        </h4>
                        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                          {doc.department} · {doc.experience}
                        </p>
                        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          Currently unavailable — check back later
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnimatePresence>
      )}

      {/* Error */}
      {errors.doctor && (
        <p className="text-xs text-red-500">{errors.doctor.message}</p>
      )}
    </motion.div>
  );
}
