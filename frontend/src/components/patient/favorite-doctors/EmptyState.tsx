"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    Calendar,
    Filter,
    Heart,
    Search,
    Star,
    X,
} from "lucide-react";
import type { DoctorTab } from "./types";

/* ─── Props ─── */

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
  activeTab: DoctorTab;
}

/* ─── Component ─── */

export function EmptyState({ hasFilters, onClearFilters, activeTab }: EmptyStateProps) {
  const getEmptyStateContent = () => {
    switch (activeTab) {
      case "available":
        return {
          icon: Calendar,
          title: "No Available Doctors",
          description: "None of your favorite doctors are currently available. Check back later or adjust your filters.",
        };
      case "top-rated":
        return {
          icon: Star,
          title: "No Top-Rated Doctors",
          description: "You don't have any top-rated doctors in your favorites yet. Add some highly-rated doctors to see them here.",
        };
      case "recently-visited":
        return {
          icon: Calendar,
          title: "No Recent Visits",
          description: "You haven't visited any of your favorite doctors in the last 30 days. Book an appointment to see them here.",
        };
      default:
        if (hasFilters) {
          return {
            icon: Filter,
            title: "No Doctors Match Your Filters",
            description: "Try adjusting your search or filter criteria to find what you're looking for.",
          };
        }
        return {
          icon: Heart,
          title: "No Favorite Doctors Yet",
          description: "Start building your list of trusted healthcare providers. Browse our doctors and add them to your favorites for quick access.",
        };
    }
  };

  const { icon: Icon, title, description } = getEmptyStateContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
      )}
      role="status"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <Icon className="h-8 w-8 text-slate-400 dark:text-slate-500" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mb-6 max-w-md text-slate-500 dark:text-slate-400">{description}</p>
      {hasFilters && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClearFilters}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Clear Filters
        </motion.button>
      )}
      {!hasFilters && activeTab === "all" && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Browse Doctors
        </motion.button>
      )}
    </motion.div>
  );
}