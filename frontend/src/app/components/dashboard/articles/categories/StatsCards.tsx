"use client";

import { motion } from "framer-motion";
import { FolderOpen, FileText, FileX2, Star } from "lucide-react";
import type { ArticleCategory } from "./types";
import { staggerContainer, staggerItem } from "../../MotionVariants";

interface StatsCardsProps {
  categories: ArticleCategory[];
}

function AnimatedCounter({ value }: { value: number }) {
  return (
    <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
      {value}
    </span>
  );
}

const statsConfig = [
  {
    key: "total",
    label: "Total Categories",
    icon: FolderOpen,
    color: "blue",
    getValue: (cats: ArticleCategory[]) => cats.length,
  },
  {
    key: "published",
    label: "Published Articles",
    icon: FileText,
    color: "emerald",
    getValue: (cats: ArticleCategory[]) =>
      cats.reduce((sum, c) => sum + c.articlesCount, 0),
  },
  {
    key: "empty",
    label: "Empty Categories",
    icon: FileX2,
    color: "amber",
    getValue: (cats: ArticleCategory[]) =>
      cats.filter((c) => c.articlesCount === 0).length,
  },
  {
    key: "featured",
    label: "Featured Categories",
    icon: Star,
    color: "violet",
    getValue: (cats: ArticleCategory[]) =>
      cats.filter((c) => c.featured).length,
  },
] as const;

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  blue: {
    bg: "bg-dash-primary-light dark:bg-teal-950/30",
    text: "text-dash-primary dark:text-accent",
    ring: "ring-dash-primary/20",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500/20",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-500/20",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-600 dark:text-violet-400",
    ring: "ring-violet-500/20",
  },
};

export function StatsCards({ categories }: StatsCardsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {statsConfig.map((stat) => {
        const Icon = stat.icon;
        const colors = colorMap[stat.color];
        const value = stat.getValue(categories);

        return (
          <motion.div
            key={stat.key}
            variants={staggerItem}
            className="dash-card group relative overflow-hidden p-5 transition-all duration-300 hover:shadow-lg"
          >
            {/* Hover gradient accent */}
            <div
              className={`absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-10 ${colors.bg}`}
            />

            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <AnimatedCounter value={value} />
              </div>
              <div className={`rounded-xl p-2.5 ${colors.bg} ${colors.text}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            {/* Bottom accent bar */}
            <div
              className={`mt-4 h-0.5 w-8 rounded-full ${colors.bg} transition-all duration-300 group-hover:w-12`}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
