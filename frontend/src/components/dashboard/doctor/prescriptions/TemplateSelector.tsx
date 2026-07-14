"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Activity,
  FilePlus,
  Heart,
  ScrollText,
  Thermometer,
  Wind,
} from "lucide-react";
import { staggerContainer, staggerItem } from "../MotionVariants";
import {
  prescriptionTemplates,
  type PrescriptionTemplate,
} from "./prescriptions-mock-data";

interface TemplateSelectorProps {
  onSelect: (template: PrescriptionTemplate) => void;
  selectedId?: string | null;
}

const templateIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Activity,
  Heart,
  Thermometer,
  Wind,
  ScrollText,
  FilePlus,
};

const colorMap: Record<
  string,
  { border: string; bg: string; text: string; iconBg: string }
> = {
  "from-emerald-500 to-green-500": {
    border: "border-emerald-200 dark:border-emerald-800",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    text: "text-emerald-700 dark:text-emerald-300",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  "from-rose-500 to-red-500": {
    border: "border-rose-200 dark:border-rose-800",
    bg: "bg-rose-50 dark:bg-rose-950/20",
    text: "text-rose-700 dark:text-rose-300",
    iconBg: "bg-rose-100 dark:bg-rose-900/30",
  },
  "from-amber-500 to-orange-500": {
    border: "border-amber-200 dark:border-amber-800",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-700 dark:text-amber-300",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
  },
  "from-dash-primary to-dash-primary-dark": {
    border: "border-dash-primary-light dark:border-teal-800",
    bg: "bg-dash-primary-light dark:bg-teal-950/20",
    text: "text-dash-primary-dark dark:text-accent",
    iconBg: "bg-dash-primary-light dark:bg-teal-950/40",
  },
  "from-indigo-500 to-purple-500": {
    border: "border-indigo-200 dark:border-indigo-800",
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    text: "text-indigo-700 dark:text-indigo-300",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  "from-slate-500 to-slate-600": {
    border: "border-slate-200 dark:border-slate-700",
    bg: "bg-slate-50 dark:bg-slate-800/50",
    text: "text-slate-700 dark:text-slate-300",
    iconBg: "bg-slate-100 dark:bg-slate-700",
  },
};

export function TemplateSelector({
  onSelect,
  selectedId,
}: TemplateSelectorProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {prescriptionTemplates.map((template) => {
        const Icon = templateIconMap[template.icon] || FilePlus;
        const colors =
          colorMap[template.color] || colorMap["from-slate-500 to-slate-600"];
        const isSelected = selectedId === template.id;

        return (
          <motion.button
            key={template.id}
            variants={staggerItem}
            onClick={() => onSelect(template)}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              "group relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all",
              "hover:shadow-lg hover:shadow-slate-900/5",
              isSelected
                ? cn(colors.border, colors.bg)
                : "border-slate-200/60 bg-white hover:border-slate-300 dark:border-slate-700/40 dark:bg-slate-900/60 dark:hover:border-slate-600",
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110",
                  colors.iconBg,
                )}
              >
                <Icon className={cn("h-5 w-5", colors.text)} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isSelected
                      ? colors.text
                      : "text-slate-800 dark:text-slate-200",
                  )}
                >
                  {template.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {template.description}
                </p>
                {template.medicines.length > 0 && (
                  <p className="mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">
                    {template.medicines.length} medicine
                    {template.medicines.length > 1 ? "s" : ""} ·{" "}
                    {template.diagnosis}
                  </p>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
