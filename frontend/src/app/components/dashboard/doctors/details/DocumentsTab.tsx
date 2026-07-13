"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { DoctorDocument } from "@/lib/data/admin-doctors";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Download,
  FileBadge,
  FileCheck,
  FileKey,
  FileSignature,
  FileText,
} from "lucide-react";
import { EmptyState } from "./EmptyState";

interface DocumentsTabProps {
  documents: DoctorDocument[];
}

const categoryConfig: Record<
  string,
  { label: string; icon: typeof FileText; color: string; bg: string }
> = {
  license: {
    label: "Medical License",
    icon: FileBadge,
    color: "text-dash-primary dark:text-accent",
    bg: "bg-dash-primary-light dark:bg-teal-950/30",
  },
  certificate: {
    label: "Certificate",
    icon: FileCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  "government-id": {
    label: "Government ID",
    icon: FileKey,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  contract: {
    label: "Contract",
    icon: FileSignature,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
};

const statusStyles: Record<string, { label: string; class: string }> = {
  active: {
    label: "Active",
    class:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  expired: {
    label: "Expired",
    class: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  pending: {
    label: "Pending",
    class:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
};

export function DocumentsTab({ documents }: DocumentsTabProps) {
  if (documents.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No Documents"
        description="No documents have been uploaded for this doctor."
      />
    );
  }

  const grouped = documents.reduce<Record<string, DoctorDocument[]>>(
    (acc, doc) => {
      const cat = doc.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(doc);
      return acc;
    },
    {} as Record<string, DoctorDocument[]>,
  );

  const categoryOrder = ["license", "certificate", "government-id", "contract"];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-5 md:grid-cols-2"
    >
      {categoryOrder.map((catKey) => {
        const docs = grouped[catKey] ?? [];
        const config = categoryConfig[catKey] ?? categoryConfig.license;
        const Icon = config.icon;

        return (
          <motion.div
            key={catKey}
            variants={staggerItem}
            className="dash-card overflow-hidden p-5"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  config.bg,
                )}
              >
                <Icon className={cn("h-4 w-4", config.color)} />
              </span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {config.label}
              </h3>
            </div>

            {docs.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500">
                No documents in this category.
              </p>
            ) : (
              <div className="space-y-3">
                {docs.map((doc) => {
                  const st = statusStyles[doc.status] ?? statusStyles.active;
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-700 dark:bg-slate-800/30"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                          {doc.name}
                        </p>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>{doc.fileSize}</span>
                          <span>&middot;</span>
                          <span>Exp: {doc.expiryDate}</span>
                          <span
                            className={cn(
                              "inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                              st.class,
                            )}
                          >
                            {st.label}
                          </span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="ml-3 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-dash-primary dark:hover:bg-slate-700 dark:hover:text-dash-primary"
                        aria-label={`Download ${doc.name}`}
                      >
                        <Download className="h-4 w-4" />
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
