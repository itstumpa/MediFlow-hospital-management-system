"use client";

import { slideLeft } from "@/lib/animations/slide";
import { motion } from "framer-motion";
import { RotateCcw, SlidersHorizontal, Star } from "lucide-react";

interface SidebarFiltersProps {
  selectedDepartments: string[];
  onDepartmentsChange: (depts: string[]) => void;
  selectedGender: string;
  onGenderChange: (gender: string) => void;
  minExperience: number;
  onExperienceChange: (years: number) => void;
  feeRange: [number, number];
  onFeeRangeChange: (range: [number, number]) => void;
  selectedLanguages: string[];
  onLanguagesChange: (langs: string[]) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  onReset: () => void;
  onApply: () => void;
}

const departmentOptions = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Ophthalmology",
  "Pulmonology",
  "General Surgery",
  "Neonatology",
];

const languageOptions = [
  "English",
  "Spanish",
  "French",
  "Hindi",
  "Bangla",
  "Arabic",
  "Korean",
  "Mandarin",
];

export function SidebarFilters({
  selectedDepartments,
  onDepartmentsChange,
  selectedGender,
  onGenderChange,
  minExperience,
  onExperienceChange,
  feeRange,
  onFeeRangeChange,
  selectedLanguages,
  onLanguagesChange,
  minRating,
  onRatingChange,
  onReset,
  onApply,
}: SidebarFiltersProps) {
  const toggleDepartment = (dept: string) => {
    if (selectedDepartments.includes(dept)) {
      onDepartmentsChange(selectedDepartments.filter((d) => d !== dept));
    } else {
      onDepartmentsChange([...selectedDepartments, dept]);
    }
  };

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      onLanguagesChange(selectedLanguages.filter((l) => l !== lang));
    } else {
      onLanguagesChange([...selectedLanguages, lang]);
    }
  };

  return (
    <motion.aside
      variants={slideLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="sticky top-[180px] w-full rounded-2xl border border-border/60 bg-surface p-6 shadow-sm"
      aria-label="Filter panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            className="h-4 w-4 text-primary"
            aria-hidden="true"
          />
          <h3 className="text-sm font-bold text-text-primary">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          aria-label="Reset all filters"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Reset
        </button>
      </div>

      <div className="mt-4 space-y-6 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
        {/* Departments */}
        <fieldset>
          <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
            Departments
          </legend>
          <div className="space-y-1.5">
            {departmentOptions.map((dept) => (
              <label
                key={dept}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-text-secondary transition-colors hover:bg-background"
              >
                <input
                  type="checkbox"
                  checked={selectedDepartments.includes(dept)}
                  onChange={() => toggleDepartment(dept)}
                  className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary"
                />
                {dept}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Availability */}
        <fieldset>
          <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
            Availability
          </legend>
          <div className="space-y-1.5">
            {[
              { value: "available-now", label: "Available Now" },
              { value: "available-today", label: "Available Today" },
              { value: "tomorrow", label: "Next Available Tomorrow" },
            ].map((a) => (
              <label
                key={a.value}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-text-secondary transition-colors hover:bg-background"
              >
                <input
                  type="radio"
                  name="availability"
                  value={a.value}
                  className="h-3.5 w-3.5 border-border text-primary focus:ring-primary"
                />
                {a.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Gender */}
        <fieldset>
          <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
            Gender
          </legend>
          <div className="flex gap-2">
            {["Any", "Male", "Female"].map((g) => (
              <button
                key={g}
                onClick={() =>
                  onGenderChange(g === "Any" ? "" : g.toLowerCase())
                }
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  (g === "Any" && !selectedGender) ||
                  selectedGender === g.toLowerCase()
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-text-secondary hover:border-primary/30"
                }`}
                aria-pressed={
                  (g === "Any" && !selectedGender) ||
                  selectedGender === g.toLowerCase()
                }
              >
                {g}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Experience Slider */}
        <fieldset>
          <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
            Experience: {minExperience}+ Years
          </legend>
          <input
            type="range"
            min={0}
            max={30}
            step={5}
            value={minExperience}
            onChange={(e) => onExperienceChange(Number(e.target.value))}
            className="w-full accent-primary"
            aria-label="Minimum experience in years"
          />
          <div className="mt-1 flex justify-between text-[10px] text-text-secondary">
            <span>0</span>
            <span>30+</span>
          </div>
        </fieldset>

        {/* Fee Range */}
        <fieldset>
          <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
            Consultation Fee: ${feeRange[0]} – ${feeRange[1]}
          </legend>
          <input
            type="range"
            min={0}
            max={200}
            step={10}
            value={feeRange[1]}
            onChange={(e) =>
              onFeeRangeChange([feeRange[0], Number(e.target.value)])
            }
            className="w-full accent-primary"
            aria-label="Maximum consultation fee"
          />
          <div className="mt-1 flex justify-between text-[10px] text-text-secondary">
            <span>$0</span>
            <span>$200+</span>
          </div>
        </fieldset>

        {/* Languages */}
        <fieldset>
          <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
            Languages
          </legend>
          <div className="space-y-1.5">
            {languageOptions.map((lang) => (
              <label
                key={lang}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-text-secondary transition-colors hover:bg-background"
              >
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(lang)}
                  onChange={() => toggleLanguage(lang)}
                  className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary"
                />
                {lang}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Rating */}
        <fieldset>
          <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
            Minimum Rating
          </legend>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4, 5].map((r) => (
              <button
                key={r}
                onClick={() => onRatingChange(r)}
                className={`flex items-center gap-0.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  minRating === r
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-text-secondary hover:border-primary/30"
                }`}
                aria-label={`${r} star minimum`}
                aria-pressed={minRating === r}
              >
                {r === 0 ? (
                  "Any"
                ) : (
                  <>
                    {r}
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  </>
                )}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Apply Button */}
      <button
        onClick={onApply}
        className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Apply Filters
      </button>
    </motion.aside>
  );
}
