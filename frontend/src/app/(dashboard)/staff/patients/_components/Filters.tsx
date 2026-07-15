"use client";

import { motion } from "framer-motion";
import {
  bloodGroupOptions,
  doctorOptions,
  genderOptions,
  sortOptions,
  statusOptions,
  visitTypeOptions,
} from "../_mock-data";

/* ─── Types ─────────────────────────────────── */

export interface FilterValues {
  patientId: string;
  doctor: string;
  status: string;
  visitType: string;
  bloodGroup: string;
  gender: string;
  sort: string;
}

export const defaultFilterValues: FilterValues = {
  patientId: "",
  doctor: "all",
  status: "all",
  visitType: "all",
  bloodGroup: "all",
  gender: "all",
  sort: "name-asc",
};

interface FiltersProps {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
}

/* ─── Select wrapper ────────────────────────── */

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ─── Component ─────────────────────────────── */

export function Filters({ values, onChange }: FiltersProps) {
  const update = (partial: Partial<FilterValues>) =>
    onChange({ ...values, ...partial });

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="dash-card p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <div className="relative">
            <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Patient ID
            </label>
            <input
              type="text"
              placeholder="e.g. P-1001"
              value={values.patientId}
              onChange={(e) => update({ patientId: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
            />
          </div>

          <Select
            label="Doctor"
            value={values.doctor}
            options={doctorOptions}
            onChange={(v) => update({ doctor: v })}
          />

          <Select
            label="Status"
            value={values.status}
            options={statusOptions}
            onChange={(v) => update({ status: v })}
          />

          <Select
            label="Visit Type"
            value={values.visitType}
            options={visitTypeOptions}
            onChange={(v) => update({ visitType: v })}
          />

          <Select
            label="Blood Group"
            value={values.bloodGroup}
            options={bloodGroupOptions}
            onChange={(v) => update({ bloodGroup: v })}
          />

          <Select
            label="Gender"
            value={values.gender}
            options={genderOptions}
            onChange={(v) => update({ gender: v })}
          />

          <Select
            label="Sort"
            value={values.sort}
            options={sortOptions}
            onChange={(v) => update({ sort: v })}
          />
        </div>
      </div>
    </motion.div>
  );
}
