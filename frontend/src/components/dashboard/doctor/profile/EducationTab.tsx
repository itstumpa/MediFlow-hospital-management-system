"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import {
  type DoctorProfile,
  type EducationEntry,
} from "./doctor-profile-mock-data";

interface EducationTabProps {
  profile: DoctorProfile;
}

const fieldStyles =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light";

const labelStyles =
  "mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400";

export function EducationTab({ profile }: EducationTabProps) {
  const [entries, setEntries] = useState<EducationEntry[]>(profile.education);

  const addEntry = () => {
    const newEntry: EducationEntry = {
      id: `EDU-${Date.now()}`,
      degree: "",
      institution: "",
      graduationYear: new Date().getFullYear(),
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEntry = (
    id: string,
    field: keyof EducationEntry,
    value: string | number,
  ) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={staggerItem}>
        <div className="rounded-xl border border-slate-200/60 bg-white p-4 dark:border-slate-700/40 dark:bg-slate-900/60">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/30">
                <GraduationCap className="h-4 w-4 text-amber-500" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Medical Education
              </span>
            </div>
            <button
              onClick={addEntry}
              className="inline-flex items-center gap-1 rounded-lg bg-dash-primary px-2.5 py-1.5 text-[10px] font-medium text-white hover:bg-dash-primary-dark"
            >
              <Plus className="h-3 w-3" />
              Add Entry
            </button>
          </div>

          <div className="space-y-3">
            {entries.map((entry, idx) => (
              <motion.div
                key={entry.id}
                variants={staggerItem}
                className={cn(
                  "relative rounded-lg border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-700 dark:bg-slate-800/30",
                  idx === entries.length - 1 && "border-dashed",
                )}
              >
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="absolute right-2 top-2 rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-red-500 dark:hover:bg-slate-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelStyles}>Degree</label>
                    <input
                      type="text"
                      value={entry.degree}
                      onChange={(e) =>
                        updateEntry(entry.id, "degree", e.target.value)
                      }
                      placeholder="e.g. Doctor of Medicine (MD)"
                      className={fieldStyles}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelStyles}>Institution</label>
                    <input
                      type="text"
                      value={entry.institution}
                      onChange={(e) =>
                        updateEntry(entry.id, "institution", e.target.value)
                      }
                      placeholder="e.g. Harvard Medical School"
                      className={fieldStyles}
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Graduation Year</label>
                    <input
                      type="number"
                      value={entry.graduationYear}
                      onChange={(e) =>
                        updateEntry(
                          entry.id,
                          "graduationYear",
                          Number(e.target.value),
                        )
                      }
                      min={1950}
                      max={2030}
                      className={fieldStyles}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {entries.length === 0 && (
              <div className="flex flex-col items-center py-6 text-center">
                <GraduationCap className="mb-2 h-8 w-8 text-slate-300" />
                <p className="text-sm text-slate-500">
                  No education entries added yet
                </p>
                <button
                  onClick={addEntry}
                  className="mt-2 text-xs font-medium text-dash-primary hover:text-dash-primary-dark"
                >
                  + Add your first education entry
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
