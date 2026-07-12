"use client";

import { motion } from "framer-motion";
import {
  FolderOpen,
  Star,
  Eye,
  Edit3,
  Trash2,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArticleCategory } from "./types";
import { staggerItem } from "../../MotionVariants";

/* ─── Icon resolver ─── */
import {
  Heart,
  Brain,
  Apple,
  Baby,
  Activity,
  Lung,
  Droplets,
  Shield,
  Eye as EyeIcon,
  Tooth,
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
  Lung,
  Droplets,
  Shield,
  Eye: EyeIcon,
  Tooth,
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

const colorVariants = [
  {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-600 dark:text-blue-400",
    ring: "ring-blue-200 dark:ring-blue-800",
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-200 dark:ring-emerald-800",
    gradient: "from-emerald-500/10 to-transparent",
  },
  {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-600 dark:text-violet-400",
    ring: "ring-violet-200 dark:ring-violet-800",
    gradient: "from-violet-500/10 to-transparent",
  },
  {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-200 dark:ring-amber-800",
    gradient: "from-amber-500/10 to-transparent",
  },
  {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-600 dark:text-rose-400",
    ring: "ring-rose-200 dark:ring-rose-800",
    gradient: "from-rose-500/10 to-transparent",
  },
  {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-600 dark:text-cyan-400",
    ring: "ring-cyan-200 dark:ring-cyan-800",
    gradient: "from-cyan-500/10 to-transparent",
  },
];

interface CategoryCardProps {
  categories: ArticleCategory[];
  onView: (cat: ArticleCategory) => void;
  onEdit: (cat: ArticleCategory) => void;
  onDelete: (cat: ArticleCategory) => void;
  onToggleFeature: (cat: ArticleCategory) => void;
}

export function CategoryCard({
  categories,
  onView,
  onEdit,
  onDelete,
  onToggleFeature,
}: CategoryCardProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {categories.map((category, i) => {
        const Icon = resolveIcon(category.icon);
        const colors = colorVariants[i % colorVariants.length];

        return (
          <motion.div
            key={category.id}
            variants={staggerItem}
            className={cn(
              "dash-card group relative cursor-pointer overflow-hidden p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            )}
            onClick={() => onView(category)}
          >
            {/* Gradient overlay on hover */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-b opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                colors.gradient
              )}
            />

            {/* Featured badge */}
            {category.featured && (
              <div className="absolute right-3 top-3 z-10">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                  <Star className="h-3 w-3 fill-amber-500" />
                  Featured
                </span>
              </div>
            )}

            {/* Icon area */}
            <div
              className={cn(
                "relative flex h-14 w-14 items-center justify-center rounded-2xl ring-1 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                colors.bg,
                colors.text,
                colors.ring
              )}
            >
              <Icon className="h-7 w-7" />
            </div>

            {/* Content */}
            <div className="mt-4 space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {category.name}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {category.description}
              </p>
            </div>

            {/* Meta footer */}
            <div className="relative mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <FileText className="h-4 w-4" />
                <span className="font-medium tabular-nums">
                  {category.articlesCount}
                </span>
                <span>articles</span>
              </div>

              {/* Quick action buttons */}
              <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(category);
                  }}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
                  aria-label={`Edit ${category.name}`}
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFeature(category);
                  }}
                  className={cn(
                    "rounded-lg p-1.5 transition-colors",
                    category.featured
                      ? "text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                      : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                  )}
                  aria-label={
                    category.featured
                      ? `Unfeature ${category.name}`
                      : `Feature ${category.name}`
                  }
                >
                  <Star className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(category);
                  }}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                  aria-label={`Delete ${category.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
