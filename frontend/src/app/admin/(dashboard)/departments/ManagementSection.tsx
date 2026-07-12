"use client";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { statusOptions } from "./form-mock";
import type { DepartmentFormValues } from "./form-schema";

export function ManagementSection() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<DepartmentFormValues>();

  const selectedStatus = watch("status");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Management
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Department leadership and operational status
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Department Head */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Department Head <span className="text-red-500">*</span>
          </label>
          <input
            {...register("departmentHead")}
            placeholder="e.g., Dr. Sarah Johnson"
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400",
              "placeholder:text-slate-400",
              errors.departmentHead
                ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          />
          {errors.departmentHead && (
            <p className="text-xs text-red-500" role="alert">
              {errors.departmentHead.message}
            </p>
          )}
        </div>

        {/* Assistant Head */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Assistant Head
          </label>
          <input
            {...register("assistantHead")}
            placeholder="e.g., Dr. James Mitchell"
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400",
              "placeholder:text-slate-400",
              errors.assistantHead
                ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          />
          {errors.assistantHead && (
            <p className="text-xs text-red-500" role="alert">
              {errors.assistantHead.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Status <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => {
              const isSelected = selectedStatus === option.value;
              return (
                <label
                  key={option.value}
                  className={cn(
                    "relative flex cursor-pointer items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all",
                    isSelected
                      ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-500/10"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-500",
                  )}
                >
                  <input
                    type="radio"
                    {...register("status")}
                    value={option.value}
                    className="sr-only"
                  />
                  <span className={cn("h-2 w-2 rounded-full", option.color)} />
                  {option.label}
                </label>
              );
            })}
          </div>
          {errors.status && (
            <p className="text-xs text-red-500" role="alert">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Opening Date */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Opening Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("openingDate")}
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400",
              errors.openingDate
                ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          />
          {errors.openingDate && (
            <p className="text-xs text-red-500" role="alert">
              {errors.openingDate.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
