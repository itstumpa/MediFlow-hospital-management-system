"use client";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { buildingOptions, floorOptions } from "./form-mock";
import type { DepartmentFormValues } from "./form-schema";

export function LocationSection() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<DepartmentFormValues>();

  const selectedBuilding = watch("building");
  const selectedFloor = watch("floor");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Location
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Physical location and contact information
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Building */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Building <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedBuilding}
            onChange={(e) =>
              setValue("building", e.target.value, { shouldValidate: true })
            }
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
              errors.building
                ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          >
            <option value="">Select building</option>
            {buildingOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errors.building && (
            <p className="text-xs text-red-500" role="alert">
              {errors.building.message}
            </p>
          )}
        </div>

        {/* Floor */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Floor <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedFloor}
            onChange={(e) =>
              setValue("floor", e.target.value, { shouldValidate: true })
            }
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
              errors.floor
                ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          >
            <option value="">Select floor</option>
            {floorOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          {errors.floor && (
            <p className="text-xs text-red-500" role="alert">
              {errors.floor.message}
            </p>
          )}
        </div>

        {/* Room Numbers */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Room Numbers
          </label>
          <input
            {...register("roomNumbers")}
            placeholder="e.g., 301-325, 401-410"
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
              "placeholder:text-slate-400",
              "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          />
        </div>

        {/* Reception Contact */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Reception Contact
          </label>
          <input
            {...register("receptionContact")}
            placeholder="e.g., +1 (555) 0200"
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
              "placeholder:text-slate-400",
              errors.receptionContact
                ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          />
          {errors.receptionContact && (
            <p className="text-xs text-red-500" role="alert">
              {errors.receptionContact.message}
            </p>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Emergency Contact
          </label>
          <input
            {...register("emergencyContact")}
            placeholder="e.g., +1 (555) 0299"
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all",
              "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
              "placeholder:text-slate-400",
              errors.emergencyContact
                ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-500/10"
                : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          />
          {errors.emergencyContact && (
            <p className="text-xs text-red-500" role="alert">
              {errors.emergencyContact.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
