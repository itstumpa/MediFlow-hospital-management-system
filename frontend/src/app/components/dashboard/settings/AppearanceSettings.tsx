"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Minimize2,
  Monitor,
  Moon,
  Palette,
  Sparkles,
  Square,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { type AppearanceSettings, MOCK_APPEARANCE } from "./types";

interface AppearanceSettingsProps {
  initialData?: AppearanceSettings;
  onChange?: (data: Partial<AppearanceSettings>) => void;
}

const THEME_OPTIONS = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
    description: "Always use light mode",
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    description: "Always use dark mode",
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
    description: "Match system preference",
  },
];

const SIDEBAR_STYLES = [
  {
    value: "default",
    label: "Default",
    icon: LayoutGrid,
    description: "Standard sidebar with labels",
  },
  {
    value: "compact",
    label: "Compact",
    icon: Minimize2,
    description: "Condensed with smaller padding",
  },
  {
    value: "minimal",
    label: "Minimal",
    icon: Square,
    description: "Icons only, expands on hover",
  },
];

const RADIUS_OPTIONS = [
  { value: "none", label: "None", preview: "rounded-none" },
  { value: "sm", label: "Small", preview: "rounded-sm" },
  { value: "md", label: "Medium", preview: "rounded-md" },
  { value: "lg", label: "Large", preview: "rounded-lg" },
  { value: "xl", label: "Extra Large", preview: "rounded-xl" },
  { value: "full", label: "Full", preview: "rounded-full" },
];

const PRESET_COLORS = [
  "#0e7c7b", // blue
  "#1d4ed8", // blue-700
  "#0ea5e9", // sky
  "#06b6d4", // cyan
  "#0d9488", // teal
  "#059669", // emerald
  "#16a34a", // green
  "#65a30d", // lime
  "#ca8a04", // yellow
  "#eab308", // amber
  "#f97316", // orange
  "#ea580c", // red
  "#dc2626", // red-600
  "#db2777", // pink
  "#c026d3", // fuchsia
  "#9333ea", // purple
  "#7c3aed", // violet
  "#6366f1", // indigo
];

export function AppearanceSettings({
  initialData = MOCK_APPEARANCE,
  onChange,
}: AppearanceSettingsProps) {
  const [data, setData] = useState<AppearanceSettings>(initialData);
  const [customPrimary, setCustomPrimary] = useState(data.primaryColor);
  const [customAccent, setCustomAccent] = useState(data.accentColor);

  const handleChange = <K extends keyof AppearanceSettings>(
    field: K,
    value: AppearanceSettings[K],
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
    onChange?.({ [field]: value });
  };

  const handleColorChange = (type: "primary" | "accent", color: string) => {
    if (type === "primary") {
      setCustomPrimary(color);
      handleChange("primaryColor", color);
    } else {
      setCustomAccent(color);
      handleChange("accentColor", color);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Theme */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dash-primary-light text-dash-primary dark:bg-teal-900/30 dark:text-accent">
            <Palette className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Theme
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Choose your preferred color scheme
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {THEME_OPTIONS.map((option) => (
              <motion.button
                key={option.value}
                onClick={() =>
                  handleChange(
                    "theme",
                    option.value as "light" | "dark" | "system",
                  )
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all duration-200",
                  data.theme === option.value
                    ? "border-dash-primary bg-dash-primary-light dark:bg-teal-900/20"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600",
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    data.theme === option.value
                      ? "bg-dash-primary-light text-dash-primary dark:bg-teal-900/40 dark:text-accent"
                      : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500",
                  )}
                >
                  <option.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <span
                    className={cn(
                      "font-medium",
                      data.theme === option.value
                        ? "text-dash-primary dark:text-accent"
                        : "text-slate-900 dark:text-white",
                    )}
                  >
                    {option.label}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {option.description}
                  </p>
                </div>
                {data.theme === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-dash-primary text-white text-xs"
                  >
                    âœ“
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Primary & Accent Colors */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Brand Colors
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Primary and accent colors used throughout the app
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Primary Color
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={customPrimary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer dark:border-slate-700"
                  aria-label="Primary color picker"
                />
              </div>
              <input
                type="text"
                value={customPrimary}
                onChange={(e) => handleColorChange("primary", e.target.value)}
                className="flex-1 min-w-[150px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-mono text-slate-900 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="#0e7c7b"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange("primary", color)}
                  className={cn(
                    "h-8 w-8 rounded-lg border-2 transition-all",
                    customPrimary === color
                      ? "border-dash-primary scale-110"
                      : "border-transparent hover:border-slate-300",
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Primary color ${color}`}
                  aria-pressed={customPrimary === color}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Accent Color
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={customAccent}
                  onChange={(e) => handleColorChange("accent", e.target.value)}
                  className="h-10 w-10 rounded-lg border border-slate-200 cursor-pointer dark:border-slate-700"
                  aria-label="Accent color picker"
                />
              </div>
              <input
                type="text"
                value={customAccent}
                onChange={(e) => handleColorChange("accent", e.target.value)}
                className="flex-1 min-w-[150px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-mono text-slate-900 focus:border-dash-primary focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="#0ea5e9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color + "-accent"}
                  onClick={() => handleColorChange("accent", color)}
                  className={cn(
                    "h-8 w-8 rounded-lg border-2 transition-all",
                    customAccent === color
                      ? "border-dash-primary scale-110"
                      : "border-transparent hover:border-slate-300",
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Accent color ${color}`}
                  aria-pressed={customAccent === color}
                />
              ))}
            </div>
          </div>

          {/* Live Preview */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Live Preview
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors",
                  `bg-[${customPrimary}] hover:opacity-90`,
                )}
              >
                Primary Button
              </button>
              <button
                className={cn(
                  "rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors",
                  `border-[${customAccent}] text-[${customAccent}] hover:bg-[${customAccent}] hover:text-white`,
                )}
              >
                Accent Button
              </button>
              <div
                className={cn(
                  "h-10 w-20 rounded-lg border-2 flex items-center justify-center text-sm font-medium",
                  `border-[${customPrimary}] text-[${customPrimary}]`,
                )}
              >
                Card Border
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sidebar Style */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Sidebar Style
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Choose how the navigation sidebar appears
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {SIDEBAR_STYLES.map((style) => (
              <motion.button
                key={style.value}
                onClick={() =>
                  handleChange(
                    "sidebarStyle",
                    style.value as "default" | "compact" | "minimal",
                  )
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all duration-200",
                  data.sidebarStyle === style.value
                    ? "border-dash-primary bg-dash-primary-light dark:bg-teal-900/20"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600",
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    data.sidebarStyle === style.value
                      ? "bg-dash-primary-light text-dash-primary dark:bg-teal-900/40 dark:text-accent"
                      : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500",
                  )}
                >
                  <style.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <span
                    className={cn(
                      "font-medium",
                      data.sidebarStyle === style.value
                        ? "text-dash-primary dark:text-accent"
                        : "text-slate-900 dark:text-white",
                    )}
                  >
                    {style.label}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {style.description}
                  </p>
                </div>
                {data.sidebarStyle === style.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-dash-primary text-white text-xs"
                  >
                    âœ“
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Card Radius */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <Square className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Card Radius
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Border radius for cards and containers
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <div className="flex flex-wrap gap-3">
            {RADIUS_OPTIONS.map((radius) => (
              <motion.button
                key={radius.value}
                onClick={() =>
                  handleChange(
                    "cardRadius",
                    radius.value as AppearanceSettings["cardRadius"],
                  )
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex h-14 w-20 items-center justify-center rounded-lg border-2 transition-all",
                  data.cardRadius === radius.value
                    ? "border-dash-primary bg-dash-primary-light dark:bg-teal-900/20"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600",
                )}
              >
                <div
                  className={cn(
                    "h-8 w-12 transition-all",
                    radius.preview,
                    data.cardRadius === radius.value
                      ? "bg-dash-primary-light dark:bg-teal-900/40"
                      : "bg-white dark:bg-slate-800",
                  )}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Toggles */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Behavior
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enable or disable interface behaviors
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-4">
          <ToggleSetting
            label="Animations"
            description="Enable transitions and micro-interactions throughout the app"
            checked={data.animationsEnabled}
            onChange={(checked) => handleChange("animationsEnabled", checked)}
            icon={<Sparkles className="h-5 w-5" />}
          />
          <ToggleSetting
            label="Dark Mode"
            description="Allow dark mode (when theme is set to System or Dark)"
            checked={data.darkModeEnabled}
            onChange={(checked) => handleChange("darkModeEnabled", checked)}
            icon={<Moon className="h-5 w-5" />}
          />
        </div>
      </section>
    </motion.div>
  );
}

interface ToggleSettingProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon: React.ReactNode;
}

function ToggleSetting({
  label,
  description,
  checked,
  onChange,
  icon,
}: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {icon}
        </div>
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{label}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dash-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900",
          checked ? "bg-dash-primary" : "bg-slate-300 dark:bg-slate-600",
        )}
      >
        <motion.span
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
        />
      </button>
    </div>
  );
}
