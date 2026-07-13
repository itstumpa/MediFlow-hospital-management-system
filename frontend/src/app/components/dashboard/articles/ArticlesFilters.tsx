"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, X } from "lucide-react";
import { authorOptions, categoryOptions } from "./mock";
import type { ArticleFilters as ArticleFiltersType } from "./types";
import { STATUS_OPTIONS } from "./types";

interface ArticlesFiltersProps {
  filters: ArticleFiltersType;
  onFiltersChange: (filters: ArticleFiltersType) => void;
  open: boolean;
  onClose: () => void;
}

function CheckboxGroup<T extends string>({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: readonly T[] | T[];
  selected: T[];
  onChange: (val: T[]) => void;
}) {
  const toggle = (val: T) => {
    if (selected.includes(val)) {
      onChange(selected.filter((s) => s !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <div className="space-y-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
              selected.includes(opt)
                ? "text-dash-primary dark:text-accent"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                selected.includes(opt)
                  ? "border-dash-primary bg-dash-primary"
                  : "border-slate-300 dark:border-slate-600"
              }`}
            >
              {selected.includes(opt) && (
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <div className="space-y-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
              value === opt.value
                ? "text-dash-primary dark:text-accent"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${
                value === opt.value
                  ? "border-dash-primary"
                  : "border-slate-300 dark:border-slate-600"
              }`}
            >
              {value === opt.value && (
                <div className="h-2 w-2 rounded-full bg-dash-primary" />
              )}
            </div>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ArticlesFilters({
  filters,
  onFiltersChange,
  open,
  onClose,
}: ArticlesFiltersProps) {
  const handleReset = () => {
    onFiltersChange({
      ...filters,
      status: [],
      category: [],
      author: [],
      featured: "all",
      dateFrom: "",
      dateTo: "",
    });
  };

  const activeCount =
    filters.status.length +
    filters.category.length +
    filters.author.length +
    (filters.featured !== "all" ? 1 : 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden border-r border-slate-200 dark:border-slate-700"
        >
          <div className="w-[280px]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Filters
              </h3>
              <div className="flex items-center gap-1">
                {activeCount > 0 && (
                  <button
                    onClick={handleReset}
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                    title="Reset filters"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              className="space-y-5 overflow-y-auto px-4 py-4"
              style={{ maxHeight: "calc(100vh - 300px)" }}
            >
              <CheckboxGroup
                label="Status"
                options={STATUS_OPTIONS}
                selected={filters.status}
                onChange={(val) => onFiltersChange({ ...filters, status: val })}
              />

              <CheckboxGroup
                label="Category"
                options={categoryOptions}
                selected={filters.category}
                onChange={(val) =>
                  onFiltersChange({ ...filters, category: val })
                }
              />

              <CheckboxGroup
                label="Author"
                options={authorOptions}
                selected={filters.author}
                onChange={(val) => onFiltersChange({ ...filters, author: val })}
              />

              <RadioGroup
                label="Featured"
                options={[
                  { value: "all", label: "All Articles" },
                  { value: "featured", label: "Featured Only" },
                  { value: "standard", label: "Standard Only" },
                ]}
                value={filters.featured}
                onChange={(val) =>
                  onFiltersChange({
                    ...filters,
                    featured: val as "all" | "featured" | "standard",
                  })
                }
              />

              {/* Date range */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Date Range
                </p>
                <div className="space-y-2">
                  <div>
                    <label
                      htmlFor="filter-date-from"
                      className="block text-xs text-slate-500 dark:text-slate-400"
                    >
                      From
                    </label>
                    <input
                      id="filter-date-from"
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) =>
                        onFiltersChange({
                          ...filters,
                          dateFrom: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="filter-date-to"
                      className="block text-xs text-slate-500 dark:text-slate-400"
                    >
                      To
                    </label>
                    <input
                      id="filter-date-to"
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) =>
                        onFiltersChange({ ...filters, dateTo: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-dash-primary focus:outline-none focus:ring-2 focus:ring-dash-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
