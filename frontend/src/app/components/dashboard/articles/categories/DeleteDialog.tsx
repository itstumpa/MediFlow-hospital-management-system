"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X, FolderOpen } from "lucide-react";
import type { ArticleCategory } from "./types";

/* ─── Icon resolver ─── */
import {
  Heart,
  Brain,
  Apple,
  Baby,
  Activity,
  Wind,
  Droplets,
  Shield,
  Eye,
  Smile,
  Bone,
  Stethoscope,
  Pill,
  Microscope,
  HeartPulse,
  Syringe,
  Weight,
  Bath,
  Ear,
  Fingerprint,
  Venus,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Brain,
  Apple,
  Baby,
  Activity,
  Wind,
  Droplets,
  Shield,
  Eye,
  Smile,
  Bone,
  Stethoscope,
  Pill,
  Microscope,
  HeartPulse,
  Syringe,
  Weight,
  Bath,
  Ear,
  Fingerprint,
  Venus,
  Sparkles,
  Sun,
  Moon,
};

function resolveIcon(name: string): LucideIcon {
  return iconMap[name] || FolderOpen;
}

interface DeleteDialogProps {
  category: ArticleCategory | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (category: ArticleCategory) => void;
}

export function DeleteDialog({
  category,
  open,
  onClose,
  onConfirm,
}: DeleteDialogProps) {
  if (!category) return null;

  const Icon = resolveIcon(category.icon);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/40">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              Delete Category
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {category.name}
              </span>
              ? This action cannot be undone. All {category.articlesCount}{" "}
              articles in this category will be uncategorized.
            </p>

            {/* Category summary */}
            <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {category.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {category.articlesCount} articles ·{" "}
                    {category.featured ? "Featured" : "Not featured"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(category)}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700 hover:shadow-lg"
              >
                Delete Category
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
