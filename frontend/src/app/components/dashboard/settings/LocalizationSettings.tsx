"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, Globe, Ruler } from "lucide-react";
import { useState } from "react";
import {
  CURRENCIES,
  DATE_FORMATS,
  LANGUAGES,
  type LocalizationSettings,
  MOCK_LOCALIZATION,
  TIMEZONES,
} from "./types";

interface LocalizationSettingsProps {
  initialData?: LocalizationSettings;
  onChange?: (data: Partial<LocalizationSettings>) => void;
}

export function LocalizationSettings({
  initialData = MOCK_LOCALIZATION,
  onChange,
}: LocalizationSettingsProps) {
  const [data, setData] = useState<LocalizationSettings>(initialData);

  const handleChange = <K extends keyof LocalizationSettings>(
    field: K,
    value: LocalizationSettings[K],
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
    onChange?.({ [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Timezone */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Timezone
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Set the default timezone for the clinic
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Default Timezone
          </label>
          <select
            value={data.timezone}
            onChange={(e) => handleChange("timezone", e.target.value)}
            className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace("_", " ")}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Current time in {data.timezone}:{" "}
            <span className="font-mono font-medium text-slate-900 dark:text-white">
              {new Date().toLocaleTimeString("en-US", {
                timeZone: data.timezone,
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
        </div>
      </section>

      {/* Language */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Language
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Default language for the interface
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Interface Language
          </label>
          <select
            value={data.language}
            onChange={(e) => handleChange("language", e.target.value)}
            className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Date & Time Formats */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Date & Time Formats
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              How dates and times are displayed throughout the app
            </p>
          </div>
        </div>

        <div className="dash-card p-6 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Date Format
            </label>
            <select
              value={data.dateFormat}
              onChange={(e) => handleChange("dateFormat", e.target.value)}
              className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {DATE_FORMATS.map((fmt) => (
                <option key={fmt.value} value={fmt.value}>
                  {fmt.label}
                </option>
              ))}
            </select>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Preview:{" "}
              <span className="font-mono font-medium text-slate-900 dark:text-white">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: data.dateFormat.includes("MMM") ? "short" : "2-digit",
                  day: "2-digit",
                })}
              </span>
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Time Format
            </label>
            <div className="flex gap-4">
              {["12h", "24h"].map((format) => (
                <motion.button
                  key={format}
                  onClick={() =>
                    handleChange("timeFormat", format as "12h" | "24h")
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all",
                    data.timeFormat === format
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600",
                  )}
                >
                  <span className="font-mono text-lg font-medium">
                    {new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: format === "12h",
                    })}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {format}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Currency */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Currency
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Default currency for billing and payments
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Default Currency
          </label>
          <select
            value={data.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
            className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {CURRENCIES.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} - {curr.name} ({curr.symbol})
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Preview:{" "}
            <span className="font-mono font-medium text-slate-900 dark:text-white">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: data.currency,
              }).format(1234.56)}
            </span>
          </p>
        </div>
      </section>

      {/* Measurement Units */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
            <Ruler className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Measurement Units
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              System of measurement for medical records
            </p>
          </div>
        </div>

        <div className="dash-card p-6">
          <div className="flex gap-4">
            {["metric", "imperial"].map((unit) => (
              <motion.button
                key={unit}
                onClick={() =>
                  handleChange(
                    "measurementUnits",
                    unit as "metric" | "imperial",
                  )
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex-1 flex flex-col items-center gap-2 rounded-xl border-2 p-6 transition-all",
                  data.measurementUnits === unit
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600",
                )}
              >
                <span className="text-2xl font-bold">
                  {unit === "metric" ? "kg/cm" : "lb/in"}
                </span>
                <span className="font-medium text-slate-900 dark:text-white capitalize">
                  {unit}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  {unit === "metric"
                    ? "Kilograms, centimeters, Celsius"
                    : "Pounds, inches, Fahrenheit"}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
