"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Accessibility,
  CheckCircle,
  Monitor,
  Moon,
  Palette,
  Sparkles,
  Sun,
} from "lucide-react";
import SettingsCard from "./SettingsCard";
import {
  ACCENT_COLORS,
  AppearanceSettings as AppearanceSettingsType,
  FONT_SIZE_OPTIONS,
  THEME_OPTIONS,
} from "./types";

interface AppearanceSettingsProps {
  settings: AppearanceSettingsType;
  onUpdate: (field: string, value: string | boolean) => void;
}

export default function AppearanceSettings({
  settings,
  onUpdate,
}: AppearanceSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Theme */}
      <SettingsCard title="Theme" icon={Palette}>
        <div className="flex flex-wrap gap-4">
          {THEME_OPTIONS.map((theme, i) => {
            const iconMap = { light: Sun, dark: Moon, system: Monitor };
            const ThemeIcon = iconMap[theme.id];
            const isActive = settings.theme === theme.id;
            return (
              <motion.label
                key={theme.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex-1 min-w-[160px] p-4 rounded-xl border-2 transition-all cursor-pointer",
                  isActive
                    ? "border-[#0e7c7b] bg-[#0e7c7b]/5 dark:bg-[#0e7c7b]/10 shadow-sm"
                    : "border-[#e1e8e8] dark:border-[#2a3a3a] hover:border-[#0e7c7b]/50 hover:bg-[#f8fafa] dark:hover:bg-[#1a2a2a]",
                )}
              >
                <input
                  type="radio"
                  name="theme"
                  value={theme.id}
                  checked={isActive}
                  onChange={(e) => onUpdate("theme", e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-xl",
                      isActive
                        ? "bg-[#0e7c7b] text-white"
                        : "bg-[#f0f5f5] dark:bg-[#2a3a3a] text-[#5c7373] dark:text-[#8a9a9a]",
                    )}
                  >
                    <ThemeIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#1a2e2e] dark:text-white">
                      {theme.label}
                    </p>
                    <p className="text-xs text-[#5c7373] dark:text-[#8a9a9a]">
                      {theme.description}
                    </p>
                  </div>
                  {isActive && (
                    <CheckCircle
                      className="h-4 w-4 text-[#0e7c7b]"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </motion.label>
            );
          })}
        </div>
      </SettingsCard>

      {/* Accent Color */}
      <SettingsCard title="Accent Color" icon={Sparkles}>
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((color, i) => (
            <motion.button
              key={color.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onUpdate("accentColor", color.value)}
              className={cn(
                "w-10 h-10 rounded-xl border-2 transition-all relative",
                settings.accentColor === color.value
                  ? "border-[#1a2e2e] dark:border-white scale-110"
                  : "border-transparent hover:border-[#e1e8e8] dark:hover:border-[#2a3a3a]",
              )}
              style={{ backgroundColor: color.value }}
              aria-label={color.name}
              title={color.name}
            >
              {settings.accentColor === color.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <CheckCircle className="h-4 w-4 text-white drop-shadow" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
        <p className="mt-3 text-sm text-[#5c7373] dark:text-[#8a9a9a]">
          Selected:{" "}
          <span style={{ color: settings.accentColor }}>
            {ACCENT_COLORS.find((c) => c.value === settings.accentColor)
              ?.name || "Custom"}
          </span>
        </p>
      </SettingsCard>

      {/* Animations Toggle */}
      <SettingsCard title="Animations" icon={Sparkles}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-[#1a2e2e] dark:text-white">
              Enable Animations
            </p>
            <p className="text-sm text-[#5c7373] dark:text-[#8a9a9a]">
              Smooth transitions and micro-interactions throughout the interface
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4 shrink-0">
            <input
              type="checkbox"
              checked={settings.animationsEnabled}
              onChange={(e) => onUpdate("animationsEnabled", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0e7c7b]" />
          </label>
        </div>
      </SettingsCard>

      {/* Font Size */}
      <SettingsCard title="Font Size" icon={Accessibility}>
        <div className="flex flex-wrap gap-3">
          {FONT_SIZE_OPTIONS.map((size, i) => {
            const isActive = settings.fontSize === size.id;
            return (
              <motion.label
                key={size.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "flex-1 min-w-[100px] p-4 rounded-xl border-2 transition-all cursor-pointer text-center",
                  isActive
                    ? "border-[#0e7c7b] bg-[#0e7c7b]/5 dark:bg-[#0e7c7b]/10"
                    : "border-[#e1e8e8] dark:border-[#2a3a3a] hover:border-[#0e7c7b]/50",
                )}
              >
                <input
                  type="radio"
                  name="fontSize"
                  value={size.id}
                  checked={isActive}
                  onChange={(e) => onUpdate("fontSize", e.target.value)}
                  className="sr-only"
                />
                <p
                  className={cn(
                    "font-bold text-[#1a2e2e] dark:text-white mb-1",
                    size.id === "small" && "text-lg",
                    size.id === "medium" && "text-xl",
                    size.id === "large" && "text-2xl",
                    size.id === "extra-large" && "text-3xl",
                  )}
                >
                  {size.preview}
                </p>
                <p className="text-xs text-[#5c7373] dark:text-[#8a9a9a]">
                  {size.label}
                </p>
              </motion.label>
            );
          })}
        </div>
      </SettingsCard>
    </div>
  );
}
