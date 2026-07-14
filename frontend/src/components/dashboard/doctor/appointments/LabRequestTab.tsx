"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Beaker, FlaskConical, Plus, Syringe } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import type { LabRequestEntry } from "./appointment-detail-mock-data";

interface LabRequestTabProps {
  labRequests: LabRequestEntry[];
}

const presetTests = [
  { label: "CBC", icon: FlaskConical },
  { label: "Blood Sugar", icon: Syringe },
  { label: "X-Ray", icon: Beaker },
  { label: "MRI", icon: Beaker },
  { label: "CT Scan", icon: Beaker },
  { label: "Lipid Profile", icon: FlaskConical },
  { label: "Liver Function", icon: FlaskConical },
  { label: "Urinalysis", icon: Syringe },
  { label: "Thyroid Panel", icon: FlaskConical },
  { label: "Vitamin D", icon: Syringe },
  { label: "HbA1c", icon: FlaskConical },
  { label: "ECG", icon: Beaker },
];

const statusMap: Record<string, { bg: string; text: string; dot: string }> = {
  Pending: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  Collected: {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-600 dark:text-cyan-400",
    dot: "bg-cyan-500",
  },
  Processing: {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    text: "text-indigo-600 dark:text-indigo-400",
    dot: "bg-indigo-500",
  },
  Completed: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
};

export function LabRequestTab({ labRequests }: LabRequestTabProps) {
  const [requests, setRequests] = useState<LabRequestEntry[]>(labRequests);
  const [customTest, setCustomTest] = useState("");

  const addPresetTest = (testName: string) => {
    const exists = requests.some(
      (r) => r.test.toLowerCase() === testName.toLowerCase(),
    );
    if (exists) return;
    setRequests((prev) => [
      ...prev,
      {
        id: `lab-new-${Date.now()}`,
        test: testName,
        status: "Pending",
        priority: "Routine",
      },
    ]);
  };

  const addCustomTest = () => {
    const trimmed = customTest.trim();
    if (!trimmed) return;
    addPresetTest(trimmed);
    setCustomTest("");
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Quick add presets */}
      <motion.div variants={staggerItem} className="space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <FlaskConical className="h-4 w-4 text-slate-400" />
          Quick Add Tests
        </h3>
        <div className="flex flex-wrap gap-2">
          {presetTests.map((test) => {
            const Icon = test.icon;
            const isAdded = requests.some(
              (r) => r.test.toLowerCase() === test.label.toLowerCase(),
            );
            return (
              <button
                key={test.label}
                onClick={() => addPresetTest(test.label)}
                disabled={isAdded}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                  isAdded
                    ? "border-emerald-200 bg-emerald-50 text-emerald-500 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {test.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Custom test input */}
      <motion.div variants={staggerItem} className="flex gap-2">
        <input
          type="text"
          value={customTest}
          onChange={(e) => setCustomTest(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCustomTest()}
          placeholder="Enter custom test name..."
          className={cn(
            "flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400",
            "focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-200",
            "dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-cyan-700 dark:focus:ring-cyan-800/40",
          )}
        />
        <button
          onClick={addCustomTest}
          disabled={!customTest.trim()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-cyan-600 disabled:opacity-50"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </motion.div>

      {/* Request list */}
      <motion.div variants={staggerItem} className="space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Beaker className="h-4 w-4 text-slate-400" />
          Ordered Tests ({requests.length})
        </h3>
        {requests.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No lab tests ordered yet.
          </p>
        ) : (
          <div className="space-y-2">
            {requests.map((req) => {
              const sStyle = statusMap[req.status] || statusMap.Pending;
              return (
                <div
                  key={req.id}
                  className={cn(
                    "flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3",
                    "dark:border-slate-800 dark:bg-slate-900/40",
                  )}
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {req.test}
                    </p>
                    {req.notes && (
                      <p className="mt-0.5 text-xs text-slate-400">
                        {req.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        req.priority === "STAT"
                          ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                          : req.priority === "Urgent"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
                      )}
                    >
                      {req.priority}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium",
                        sStyle.bg,
                      )}
                    >
                      <span
                        className={cn("h-1.5 w-1.5 rounded-full", sStyle.dot)}
                      />
                      {req.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
