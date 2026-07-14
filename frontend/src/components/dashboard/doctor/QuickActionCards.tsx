"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  Clock,
  FileText,
  FolderOpen,
  Users,
} from "lucide-react";
import Link from "next/link";
import { quickActionCards } from "./mock-data";
import { staggerContainer, staggerItem } from "./MotionVariants";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  CalendarCheck,
  Users,
  FolderOpen,
  Clock,
};

const colorMap: Record<
  string,
  { bg: string; border: string; text: string; gradient: string }
> = {
  cyan: {
    bg: "bg-dash-primary-light dark:bg-teal-950/30",
    border: "border-dash-primary-light/50 dark:border-teal-800/40",
    text: "text-dash-primary dark:text-accent",
    gradient: "from-dash-primary to-dash-primary-dark",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200/50 dark:border-violet-800/40",
    text: "text-violet-600 dark:text-violet-400",
    gradient: "from-violet-500 to-purple-500",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200/50 dark:border-emerald-800/40",
    text: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500 to-teal-500",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200/50 dark:border-blue-800/40",
    text: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-indigo-500",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200/50 dark:border-rose-800/40",
    text: "text-rose-600 dark:text-rose-400",
    gradient: "from-rose-500 to-pink-500",
  },
};

export function QuickActionCards() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
    >
      {quickActionCards.map((card) => {
        const Icon = iconMap[card.icon] || FileText;
        const colors = colorMap[card.color] || colorMap.cyan;

        return (
          <motion.div key={card.id} variants={staggerItem}>
            <Link
              href={card.href}
              className={cn(
                "group relative block overflow-hidden rounded-xl border p-4 transition-all duration-200",
                "hover:shadow-lg hover:shadow-slate-900/5",
                colors.border,
                colors.bg,
              )}
            >
              {/* Gradient top line */}
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                  colors.gradient,
                )}
              />

              <div className="relative">
                <div
                  className={cn(
                    "mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-200 group-hover:scale-110",
                    "dark:bg-slate-900/80",
                  )}
                >
                  <Icon className={cn("h-5 w-5", colors.text)} />
                </div>

                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {card.label}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {card.description}
                </p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
