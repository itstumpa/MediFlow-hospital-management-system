"use client";

import { staggerItem } from "@/components/dashboard/staff/MotionVariants";
import { useToast } from "@/lib/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Contrast,
  Loader2,
  Monitor,
  Moon,
  Palette,
  PanelLeft,
  PanelLeftClose,
  Save,
  Sun,
  Type,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  colorOptions,
  defaultAppearanceSettings,
  fontSizeOptions,
  themeOptions,
} from "../_mock-data";

const appearanceSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  primaryColor: z.string().min(1, "Primary color is required"),
  fontSize: z.enum(["small", "medium", "large"]),
  reducedMotion: z.boolean(),
  highContrast: z.boolean(),
  sidebarCollapsed: z.boolean(),
  animationsEnabled: z.boolean(),
});

type AppearanceFormData = z.infer<typeof appearanceSchema>;

export function AppearanceTab() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    watch,
  } = useForm<AppearanceFormData>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: defaultAppearanceSettings,
    mode: "onBlur",
  });

  const onSubmit = async (data: AppearanceFormData) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Settings saved",
        description: "Appearance settings have been updated successfully.",
        variant: "success",
      });
      reset(data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const theme = watch("theme");
  const primaryColor = watch("primaryColor");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Theme */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30">
            <Palette className="h-5 w-5" aria-hidden="true" />
          </span>
          Theme
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {themeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                register("theme").onChange({ target: { value: opt.value } })
              }
              className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all ${
                theme === opt.value
                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
              }`}
            >
              {opt.icon === "Sun" && <Sun className="h-6 w-6 text-amber-500" />}
              {opt.icon === "Moon" && (
                <Moon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
              )}
              {opt.icon === "Monitor" && (
                <Monitor className="h-6 w-6 text-blue-500" />
              )}
              <span className="font-medium text-slate-900 dark:text-white">
                {opt.label}
              </span>
              {theme === opt.value && (
                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    className="h-3 w-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          System theme follows your operating system preference.
        </p>
      </motion.div>

      {/* Primary Color */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
            <Palette className="h-5 w-5" aria-hidden="true" />
          </span>
          Primary Color
        </h3>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() =>
                register("primaryColor").onChange({
                  target: { value: color.value },
                })
              }
              className={`relative aspect-square rounded-xl border-2 transition-all ${
                primaryColor === color.value
                  ? "border-primary scale-105 shadow-lg"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={color.label}
            >
              {primaryColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          This color is used for primary actions, links, and highlights
          throughout the application.
        </p>
      </motion.div>

      {/* Typography & Layout */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30">
            <Type className="h-5 w-5" aria-hidden="true" />
          </span>
          Typography & Layout
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="fontSize"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Font Size
            </label>
            <select
              id="fontSize"
              {...register("fontSize")}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            >
              {fontSizeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="sidebarCollapsed"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Sidebar Default State
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  register("sidebarCollapsed").onChange({
                    target: { value: "false" },
                  })
                }
                className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all ${
                  watch("sidebarCollapsed") === false
                    ? "border-primary bg-primary/5 dark:bg-primary/10"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                }`}
              >
                <PanelLeft className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                <span className="font-medium text-slate-900 dark:text-white">
                  Expanded
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Full sidebar visible
                </p>
              </button>
              <button
                type="button"
                onClick={() =>
                  register("sidebarCollapsed").onChange({
                    target: { value: "true" },
                  })
                }
                className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all ${
                  watch("sidebarCollapsed") === true
                    ? "border-primary bg-primary/5 dark:bg-primary/10"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                }`}
              >
                <PanelLeftClose className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                <span className="font-medium text-slate-900 dark:text-white">
                  Collapsed
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  Icons only
                </p>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Accessibility */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/30">
            <Contrast className="h-5 w-5" aria-hidden="true" />
          </span>
          Accessibility
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <div>
              <label
                htmlFor="reducedMotion"
                className="font-medium text-slate-900 dark:text-white"
              >
                Reduce Motion
              </label>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                Minimize animations and transitions (respects system preference)
              </p>
            </div>
            <input
              id="reducedMotion"
              type="checkbox"
              {...register("reducedMotion")}
              className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <div>
              <label
                htmlFor="highContrast"
                className="font-medium text-slate-900 dark:text-white"
              >
                High Contrast
              </label>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                Increase color contrast for better readability
              </p>
            </div>
            <input
              id="highContrast"
              type="checkbox"
              {...register("highContrast")}
              className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
            />
          </div>
        </div>
      </motion.div>

      {/* Animations */}
      <motion.div variants={staggerItem} className="dash-card">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30">
            <Zap className="h-5 w-5" aria-hidden="true" />
          </span>
          Animations
        </h3>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
          <div>
            <label
              htmlFor="animationsEnabled"
              className="font-medium text-slate-900 dark:text-white"
            >
              Enable Animations
            </label>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              Enable smooth transitions and micro-interactions throughout the
              app
            </p>
          </div>
          <input
            id="animationsEnabled"
            type="checkbox"
            {...register("animationsEnabled")}
            className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
          />
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={staggerItem} className="flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || !isValid || isSaving}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </motion.div>
    </form>
  );
}
