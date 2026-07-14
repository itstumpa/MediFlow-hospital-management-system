"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { departments, type BookingFormData } from "./types";

export function DepartmentSelection() {
  const [search, setSearch] = useState("");
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<BookingFormData>();
  const selected = watch("department");

  const filtered = useMemo(
    () =>
      departments.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.description.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const popularDepts = departments.filter((d) => d.popular);
  const isPopular = (id: string) =>
    departments.find((d) => d.id === id)?.popular;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Select a Department
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Choose the medical specialty you need
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search departments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>

      {/* Popular departments quick pick */}
      {!search && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-[var(--color-primary)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Popular
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularDepts.map((dept) => (
              <button
                key={dept.id}
                type="button"
                onClick={() =>
                  setValue("department", dept.id, { shouldValidate: true })
                }
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium transition-all",
                  selected === dept.id
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:border-[var(--color-accent)] dark:text-[var(--color-accent)]"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800",
                )}
              >
                <dept.icon className="h-3.5 w-3.5" />
                {dept.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Department grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((dept) => {
          const Icon = dept.icon;
          const isSelected = selected === dept.id;
          return (
            <motion.button
              key={dept.id}
              variants={staggerItem}
              type="button"
              onClick={() =>
                setValue("department", dept.id, { shouldValidate: true })
              }
              className={cn(
                "group relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-all",
                isSelected
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md shadow-[var(--color-primary)]/5 dark:border-[var(--color-accent)] dark:bg-teal-950/30"
                  : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:border-slate-600/50",
              )}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  layoutId="dept-indicator"
                  className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-accent)]"
                  initial={false}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}

              {/* Icon */}
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all",
                  dept.bgColor,
                  isSelected && "scale-110",
                )}
              >
                <Icon className={cn("h-6 w-6", dept.color)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4
                    className={cn(
                      "text-sm font-semibold",
                      isSelected
                        ? "text-[var(--color-primary)] dark:text-[var(--color-accent)]"
                        : "text-slate-900 dark:text-white",
                    )}
                  >
                    {dept.name}
                  </h4>
                  {dept.popular && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {dept.description}
                </p>
                <p className="mt-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
                  {dept.doctorCount} doctors available
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="h-10 w-10 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            No departments found
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Try a different search term
          </p>
        </div>
      )}

      {/* Error */}
      {errors.department && (
        <p className="text-xs text-red-500">{errors.department.message}</p>
      )}
    </motion.div>
  );
}
