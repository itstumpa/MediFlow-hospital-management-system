"use client";

import {
  staggerContainer,
  staggerItem,
} from "@/components/dashboard/staff/MotionVariants";
import { motion } from "framer-motion";
import { Check, Monitor, Moon, Palette, Square, Sun } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { accentColorOptions, themeOptions } from "../_mock-data";
import type { ProfileFormValues } from "../form-schema";

export function AppearanceTab() {
  const { register, watch, setValue } = useFormContext<ProfileFormValues>();
  const currentTheme = watch("theme");
  const currentAccent = watch("accentColor");
  const compactMode = watch("compactMode");

  const inputGlow =
    "transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]";

  const themeIcons: Record<string, React.ReactNode> = {
    light: <Sun className="h-5 w-5" />,
    dark: <Moon className="h-5 w-5" />,
    system: <Monitor className="h-5 w-5" />,
  };

  const themeLabels: Record<string, string> = {
    light: "Light",
    dark: "Dark",
    system: "System",
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Section Header */}
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
            <Palette className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Appearance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Theme, accent color, and display preferences
            </p>
          </div>
        </div>
      </motion.div>

      {/* Theme Selector */}
      <motion.div variants={staggerItem} className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                setValue("theme", opt.value, { shouldDirty: true })
              }
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                currentTheme === opt.value
                  ? "border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/30"
                  : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
              }`}
            >
              <span
                className={
                  currentTheme === opt.value
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-500 dark:text-slate-400"
                }
              >
                {themeIcons[opt.value]}
              </span>
              <span
                className={`text-xs font-medium ${
                  currentTheme === opt.value
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {themeLabels[opt.value]}
              </span>
              {currentTheme === opt.value && (
                <span className="absolute right-2 top-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Accent Color */}
      <motion.div variants={staggerItem} className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Accent Color
        </label>
        <div className="flex flex-wrap gap-3">
          {accentColorOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                setValue("accentColor", opt.value, { shouldDirty: true })
              }
              className="group relative flex flex-col items-center gap-1"
              title={opt.label}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all group-hover:scale-110"
                style={{ backgroundColor: opt.color }}
              >
                {currentAccent === opt.value && (
                  <Check className="h-5 w-5 text-white" />
                )}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Compact Mode */}
      <motion.div variants={staggerItem}>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-slate-400">
              <Square className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Compact Mode
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Reduce spacing for a denser display
              </p>
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              {...register("compactMode")}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-focus:outline-none dark:bg-slate-600" />
          </label>
        </div>
      </motion.div>
    </motion.div>
  );
}
