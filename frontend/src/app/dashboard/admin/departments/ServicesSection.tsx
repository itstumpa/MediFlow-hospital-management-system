"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import {
  coreServicesOptions,
  facilityOptions,
  medicalTechnologiesOptions,
} from "./form-mock";
import type { DepartmentFormValues } from "./form-schema";

type ChipGroupField =
  | "coreServices"
  | "medicalTechnologies"
  | "availableFacilities";

function ChipGroup({
  label,
  field,
  options,
}: {
  label: string;
  field: ChipGroupField;
  options: readonly string[];
}) {
  const { watch, setValue } = useFormContext<DepartmentFormValues>();
  const selected = watch(field) || [];

  const toggle = (item: string) => {
    const next = selected.includes(item)
      ? selected.filter((s: string) => s !== item)
      : [...selected, item];
    setValue(field, next, { shouldValidate: true });
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((item) => {
          const isSelected = selected.includes(item);
          return (
            <motion.button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className={cn(
                "rounded-xl border-2 px-3.5 py-2 text-xs font-medium transition-all",
                isSelected
                  ? "border-dash-primary bg-dash-primary-light text-dash-primary dark:border-teal-400 dark:bg-teal-500/10 dark:text-accent"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-500",
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {item}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function ServicesSection() {
  const { register, watch } = useFormContext<DepartmentFormValues>();
  const emergencyServices = watch("emergencyServices");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Department Details
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Mission, vision, services, and capabilities
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Mission */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Mission
          </label>
          <textarea
            {...register("mission")}
            rows={3}
            placeholder="The department's mission statement"
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all resize-none",
              "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
              "placeholder:text-slate-400",
              "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          />
        </div>

        {/* Vision */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Vision
          </label>
          <textarea
            {...register("vision")}
            rows={3}
            placeholder="The department's vision for the future"
            className={cn(
              "w-full rounded-xl border px-4 py-2.5 text-sm transition-all resize-none",
              "focus:outline-none focus:ring-2 focus:ring-dash-primary/20 focus:border-dash-primary",
              "placeholder:text-slate-400",
              "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800",
            )}
          />
        </div>
      </div>

      {/* Core Services */}
      <ChipGroup
        label="Core Services"
        field="coreServices"
        options={coreServicesOptions}
      />

      {/* Medical Technologies */}
      <ChipGroup
        label="Medical Technologies"
        field="medicalTechnologies"
        options={medicalTechnologiesOptions}
      />

      {/* Available Facilities */}
      <ChipGroup
        label="Available Facilities"
        field="availableFacilities"
        options={facilityOptions}
      />

      {/* Emergency Services */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            {...register("emergencyServices")}
            className="peer sr-only"
          />
          <span className="h-6 w-11 rounded-full bg-slate-200 transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-dash-primary peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-dash-primary/20" />
        </label>
        <div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Emergency Services Available
          </p>
          <p className="text-xs text-slate-400">
            Toggle if the department offers dedicated emergency services
          </p>
        </div>
      </div>
    </div>
  );
}
