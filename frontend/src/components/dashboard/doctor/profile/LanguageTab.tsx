"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Globe, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import {
  type DoctorProfile,
  type LanguageEntry,
} from "./doctor-profile-mock-data";

interface LanguageTabProps {
  profile: DoctorProfile;
}

const fieldStyles =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-dash-primary dark:focus:ring-dash-primary-light";

const labelStyles =
  "mb-1 block text-[10px] font-medium text-slate-500 dark:text-slate-400";

const proficiencyOptions = [
  { value: "Native", label: "Native" },
  { value: "Fluent", label: "Fluent" },
  { value: "Advanced", label: "Advanced" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Basic", label: "Basic" },
];

export function LanguageTab({ profile }: LanguageTabProps) {
  const [entries, setEntries] = useState<LanguageEntry[]>(profile.languages);

  const addEntry = () => {
    const newEntry: LanguageEntry = {
      id: `LANG-${Date.now()}`,
      language: "",
      proficiency: "Intermediate",
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const removeEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEntry = <K extends keyof LanguageEntry>(
    id: string,
    field: K,
    value: LanguageEntry[K],
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
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-dash-primary-light dark:bg-dash-primary-light">
                <Globe className="h-4 w-4 text-dash-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Languages
              </span>
            </div>
            <button
              onClick={addEntry}
              className="inline-flex items-center gap-1 rounded-lg bg-dash-primary px-2.5 py-1.5 text-[10px] font-medium text-white hover:bg-dash-primary-dark"
            >
              <Plus className="h-3 w-3" />
              Add Language
            </button>
          </div>

          {entries.length > 0 ? (
            <div className="space-y-2">
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  variants={staggerItem}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-2 dark:border-slate-700 dark:bg-slate-800/30"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      value={entry.language}
                      onChange={(e) =>
                        updateEntry(entry.id, "language", e.target.value)
                      }
                      placeholder="e.g. English"
                      className={cn(fieldStyles, "text-xs")}
                    />
                  </div>
                  <div className="w-36">
                    <select
                      value={entry.proficiency}
                      onChange={(e) =>
                        updateEntry(
                          entry.id,
                          "proficiency",
                          e.target.value as LanguageEntry["proficiency"],
                        )
                      }
                      className={cn(fieldStyles, "text-xs")}
                    >
                      {proficiencyOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="rounded p-1.5 text-slate-400 hover:bg-slate-200 hover:text-red-500 dark:hover:bg-slate-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-6 text-center">
              <Globe className="mb-2 h-8 w-8 text-slate-300" />
              <p className="text-sm text-slate-500">No languages added yet</p>
              <button
                onClick={addEntry}
                className="mt-2 text-xs font-medium text-dash-primary hover:text-dash-primary-dark"
              >
                + Add a language
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
