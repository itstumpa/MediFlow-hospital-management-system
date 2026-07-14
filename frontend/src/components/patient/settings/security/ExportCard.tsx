"use client";

import {
  CheckCircle2,
  Download,
  FileArchive,
  FileText,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { CardWrapper } from "./CardWrapper";

/* ---------- Export button ---------- */

function ExportButton({
  icon: Icon,
  label,
  description,
  color,
  onExport,
}: {
  icon: typeof Download;
  label: string;
  description: string;
  color: "primary" | "slate";
  onExport: () => void;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handleClick = () => {
    if (state === "loading") return;
    setState("loading");
    onExport();
    // simulate export delay
    setTimeout(() => {
      setState("done");
      setTimeout(() => setState("idle"), 2000);
    }, 1500);
  };

  const btnStyles = {
    primary:
      "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",
    slate:
      "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700",
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-700/50 dark:bg-slate-800/30">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm dark:bg-slate-700 dark:text-slate-400">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {label}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
      <button
        onClick={handleClick}
        disabled={state === "loading"}
        className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed ${
          btnStyles[color]
        } ${state === "done" ? "!bg-emerald-500 !text-white" : ""}`}
      >
        {state === "idle" && (
          <>
            <Download className="h-4 w-4" />
            Download
          </>
        )}
        {state === "loading" && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing…
          </>
        )}
        {state === "done" && (
          <>
            <CheckCircle2 className="h-4 w-4" />
            Done
          </>
        )}
      </button>
    </div>
  );
}

/* ---------- Component ---------- */

export function ExportCard() {
  return (
    <CardWrapper
      title="Data Export"
      description="Download a copy of your data"
      icon={<FileArchive className="h-5 w-5" />}
    >
      <div className="space-y-3">
        <ExportButton
          icon={FileText}
          label="Download Personal Data"
          description="Name, email, phone, address, and account details"
          color="primary"
          onExport={() => {
            // Mock: trigger a file download
            const blob = new Blob(
              [
                JSON.stringify(
                  {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    phone: "+1 (555) 123-4567",
                    address: "123 Health St, Medical City, MC 12345",
                    dob: "1988-03-15",
                    bloodType: "A+",
                    memberSince: "2024-01-15",
                  },
                  null,
                  2,
                ),
              ],
              { type: "application/json" },
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `personal-data-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        />
        <ExportButton
          icon={FileText}
          label="Download Medical Records"
          description="Visit summaries, lab reports, prescriptions, and imaging"
          color="slate"
          onExport={() => {
            const blob = new Blob(
              [
                JSON.stringify(
                  {
                    records: [
                      {
                        type: "Visit Summary",
                        date: "2026-06-28",
                        doctor: "Dr. Sarah Chen",
                        diagnosis: "Annual checkup — healthy",
                      },
                      {
                        type: "Lab Report",
                        date: "2026-06-20",
                        doctor: "Dr. Michael Roberts",
                        results: "All values within normal range",
                      },
                    ],
                  },
                  null,
                  2,
                ),
              ],
              { type: "application/json" },
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `medical-records-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        />
      </div>
    </CardWrapper>
  );
}
