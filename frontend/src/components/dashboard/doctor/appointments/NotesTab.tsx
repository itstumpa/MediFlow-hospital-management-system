"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FileText, Save } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../MotionVariants";

interface NotesTabProps {
  doctorNotes: string;
}

const noteTemplates = [
  {
    id: "tmpl-1",
    label: "Follow-up Visit",
    template:
      "Patient returns for scheduled follow-up. [SYMPTOMS] since last visit. Vitals stable. Continue current management plan. Next follow-up in [DURATION].",
  },
  {
    id: "tmpl-2",
    label: "New Patient",
    template:
      "New patient evaluation for [COMPLAINT]. History reviewed. Physical examination performed. Diagnosis: [DIAGNOSIS]. Plan: [PLAN].",
  },
  {
    id: "tmpl-3",
    label: "Medication Review",
    template:
      "Medication review conducted. Patient reports [ADHERENCE] with current regimen. [ADJUSTMENTS] made. Patient educated on proper use.",
  },
  {
    id: "tmpl-4",
    label: "Pre-op Assessment",
    template:
      "Pre-operative assessment completed. Patient cleared for [PROCEDURE]. Labs reviewed and within normal limits. Anesthesia risk: [RISK].",
  },
];

export function NotesTab({ doctorNotes }: NotesTabProps) {
  const [notes, setNotes] = useState(doctorNotes);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleTemplateSelect = (tmplId: string) => {
    const tmpl = noteTemplates.find((t) => t.id === tmplId);
    if (tmpl) {
      setNotes(tmpl.template);
      setSelectedTemplate(tmplId);
      setSaved(false);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Templates */}
      <motion.div variants={staggerItem} className="space-y-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <FileText className="h-4 w-4 text-slate-400" />
          Templates
        </h3>
        <div className="flex flex-wrap gap-2">
          {noteTemplates.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleTemplateSelect(tmpl.id)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                selectedTemplate === tmpl.id
                  ? "border-dash-primary-light bg-dash-primary-light text-dash-primary-dark dark:border-teal-700/60 dark:bg-teal-950/30 dark:text-accent"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800",
              )}
            >
              {tmpl.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Editor */}
      <motion.div variants={staggerItem} className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <FileText className="h-4 w-4 text-slate-400" />
            Clinical Notes
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[10px] transition-opacity",
                saved
                  ? "text-emerald-500 opacity-100"
                  : "text-slate-400 opacity-0",
              )}
            >
              Saved
            </span>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1 rounded-lg bg-dash-primary px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-dash-primary-dark"
            >
              <Save className="h-3.5 w-3.5" />
              Save
            </button>
          </div>
        </div>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setSaved(false);
          }}
          placeholder="Write your clinical notes here..."
          rows={10}
          className={cn(
            "w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900 placeholder:text-slate-400",
            "focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary-light",
            "dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-teal-700/60 dark:focus:ring-teal-800/40",
            "resize-y min-h-[200px]",
          )}
        />
        {/* Toolbar (UI only) */}
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-100 bg-slate-50 p-1.5 dark:border-slate-800 dark:bg-slate-800/40">
          {["B", "I", "U", "H1", "H2", "List", "Link"].map((tool) => (
            <button
              key={tool}
              className="rounded-md px-2 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:bg-white hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            >
              {tool}
            </button>
          ))}
          <span className="mx-1 h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <span className="text-[10px] text-slate-400">Auto-save enabled</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
