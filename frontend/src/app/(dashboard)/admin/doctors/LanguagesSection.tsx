"use client";

import { staggerItem } from "@/lib/animations/stagger";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { languageOptions } from "./form-mock";
import type { DoctorFormValues } from "./form-schema";

export function LanguagesSection() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<DoctorFormValues>();

  const selectedLanguages = watch("languages") || [];

  const toggleLanguage = (lang: string) => {
    const current = selectedLanguages;
    if (current.includes(lang)) {
      setValue(
        "languages",
        current.filter((l) => l !== lang),
        { shouldValidate: true },
      );
    } else {
      setValue("languages", [...current, lang], { shouldValidate: true });
    }
  };

  return (
    <motion.div variants={staggerItem} className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
          <Languages className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Languages
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Languages the doctor can communicate in
          </p>
        </div>
      </div>

      {/* Language Chips */}
      <div className="flex flex-wrap gap-2">
        {languageOptions.map((lang) => {
          const isSelected = selectedLanguages.includes(lang);
          return (
            <motion.button
              key={lang}
              type="button"
              onClick={() => toggleLanguage(lang)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-primary",
                isSelected
                  ? "bg-dash-primary text-white shadow-sm shadow-dash-primary/30"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <motion.span
                  layoutId="lang-selected-dot"
                  className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-white"
                />
              )}
              {lang}
            </motion.button>
          );
        })}
      </div>

      {errors.languages && (
        <p className="text-xs text-red-500">{errors.languages.message}</p>
      )}
    </motion.div>
  );
}
