"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Briefcase, Building, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import {
  type DoctorProfile,
  type ExperienceEntry,
} from "./doctor-profile-mock-data";

interface ExperienceTabProps {
  profile: DoctorProfile;
}

const fieldStyles =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light";

const labelStyles =
  "mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400";

export function ExperienceTab({ profile }: ExperienceTabProps) {
  const [entries, setEntries] = useState<ExperienceEntry[]>(profile.experience);

  const addEntry = () => {
    const newEntry: ExperienceEntry = {
      id: `EXP-${Date.now()}`,
      hospital: "",
      designation: "",
      startYear: new Date().getFullYear(),
      isCurrent: false,
      responsibilities: [],
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEntry = <K extends keyof ExperienceEntry>(
    id: string,
    field: K,
    value: ExperienceEntry[K],
  ) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
  };

  const addResponsibility = (entryId: string) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId
          ? { ...e, responsibilities: [...e.responsibilities, ""] }
          : e,
      ),
    );
  };

  const updateResponsibility = (
    entryId: string,
    idx: number,
    value: string,
  ) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId
          ? {
              ...e,
              responsibilities: e.responsibilities.map((r, i) =>
                i === idx ? value : r,
              ),
            }
          : e,
      ),
    );
  };

  const removeResponsibility = (entryId: string, idx: number) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId
          ? {
              ...e,
              responsibilities: e.responsibilities.filter((_, i) => i !== idx),
            }
          : e,
      ),
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
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                <Briefcase className="h-4 w-4 text-emerald-500" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Work Experience
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
                    <label className={labelStyles}>
                      Hospital / Organization
                    </label>
                    <input
                      type="text"
                      value={entry.hospital}
                      onChange={(e) =>
                        updateEntry(entry.id, "hospital", e.target.value)
                      }
                      placeholder="e.g. MediFlow Health Institute"
                      className={fieldStyles}
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Designation</label>
                    <input
                      type="text"
                      value={entry.designation}
                      onChange={(e) =>
                        updateEntry(entry.id, "designation", e.target.value)
                      }
                      placeholder="e.g. Senior Consultant"
                      className={fieldStyles}
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className={labelStyles}>Start Year</label>
                      <input
                        type="number"
                        value={entry.startYear}
                        onChange={(e) =>
                          updateEntry(
                            entry.id,
                            "startYear",
                            Number(e.target.value),
                          )
                        }
                        min={1980}
                        max={2030}
                        className={fieldStyles}
                      />
                    </div>
                    {!entry.isCurrent && (
                      <div className="flex-1">
                        <label className={labelStyles}>End Year</label>
                        <input
                          type="number"
                          value={entry.endYear || ""}
                          onChange={(e) =>
                            updateEntry(
                              entry.id,
                              "endYear",
                              Number(e.target.value) || undefined,
                            )
                          }
                          min={1980}
                          max={2030}
                          className={fieldStyles}
                        />
                      </div>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={entry.isCurrent}
                        onChange={(e) =>
                          updateEntry(entry.id, "isCurrent", e.target.checked)
                        }
                        className="rounded border-slate-300 text-dash-primary focus:ring-dash-primary-light"
                      />
                      <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400">
                        I currently work here
                      </span>
                    </label>
                  </div>

                  {/* Responsibilities */}
                  <div className="sm:col-span-2">
                    <label className={labelStyles}>Responsibilities</label>
                    <div className="space-y-1.5">
                      {entry.responsibilities.map((resp, ri) => (
                        <div key={ri} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={resp}
                            onChange={(e) =>
                              updateResponsibility(entry.id, ri, e.target.value)
                            }
                            placeholder="e.g. Lead cardiology team"
                            className={cn(fieldStyles, "text-xs")}
                          />
                          <button
                            onClick={() => removeResponsibility(entry.id, ri)}
                            className="rounded p-1 text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addResponsibility(entry.id)}
                        className="text-[10px] font-medium text-dash-primary hover:text-dash-primary-dark"
                      >
                        + Add responsibility
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {entries.length === 0 && (
              <div className="flex flex-col items-center py-6 text-center">
                <Building className="mb-2 h-8 w-8 text-slate-300" />
                <p className="text-sm text-slate-500">
                  No work experience added yet
                </p>
                <button
                  onClick={addEntry}
                  className="mt-2 text-xs font-medium text-dash-primary hover:text-dash-primary-dark"
                >
                  + Add your first work experience
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
