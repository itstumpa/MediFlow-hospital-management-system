"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Download,
  Grid3X3,
  List,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { authorOptions, categoryOptions } from "./mock";
import type { ArticleFilters, ViewMode } from "./types";
import { STATUS_OPTIONS } from "./types";

interface ArticlesToolbarProps {
  filters: ArticleFilters;
  onFiltersChange: (filters: ArticleFilters) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedCount: number;
  onToggleFilterPanel: () => void;
  filterPanelOpen: boolean;
  onCreateArticle: () => void;
  onExport: () => void;
}

function FilterChip({
  label,
  active,
  onClick,
  onRemove,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  onRemove: () => void;
}) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
        active
          ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
      {active && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 rounded-full p-0.5 hover:bg-blue-200/50 dark:hover:bg-blue-800/50"
        >
          <X className="h-3 w-3" />
        </span>
      )}
    </motion.button>
  );
}

function DropdownFilter<T extends string>({
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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (val: T) => {
    if (selected.includes(val)) {
      onChange(selected.filter((s) => s !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
          selected.length > 0
            ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600"
        }`}
      >
        {label}
        {selected.length > 0 && (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
            {selected.length}
          </span>
        )}
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-800"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
                  selected.includes(opt)
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                    selected.includes(opt)
                      ? "border-blue-600 bg-blue-600"
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
            {selected.length > 0 && (
              <button
                onClick={() => onChange([])}
                className="mt-1 w-full rounded-lg px-3 py-2 text-center text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                Clear all
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ArticlesToolbar({
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
  onToggleFilterPanel,
  filterPanelOpen,
  onCreateArticle,
  onExport,
}: ArticlesToolbarProps) {
  const updateSearch = (search: string) =>
    onFiltersChange({ ...filters, search });

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.category.length > 0 ||
    filters.author.length > 0 ||
    filters.featured !== "all" ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.search.length > 0;

  const clearAllFilters = () =>
    onFiltersChange({
      ...filters,
      search: "",
      status: [],
      category: [],
      author: [],
      featured: "all",
      dateFrom: "",
      dateTo: "",
    });

  const activeFilterCount =
    filters.status.length +
    filters.category.length +
    filters.author.length +
    (filters.featured !== "all" ? 1 : 0);

  return (
    <div className="space-y-3">
      {/* Main toolbar row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative min-w-[200px] max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="Search articles by title, author, category..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder-slate-400 transition-all focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:placeholder-slate-500 dark:focus:border-blue-700 dark:focus:ring-blue-500/30"
            aria-label="Search articles"
          />
          {filters.search && (
            <button
              onClick={() => updateSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Quick filter chips */}
        <div className="hidden flex-wrap items-center gap-2 sm:flex">
          <FilterChip
            label="Published"
            active={filters.status.includes("Published")}
            onClick={() =>
              onFiltersChange({
                ...filters,
                status: filters.status.includes("Published")
                  ? filters.status.filter((s) => s !== "Published")
                  : [...filters.status, "Published"],
              })
            }
            onRemove={() =>
              onFiltersChange({
                ...filters,
                status: filters.status.filter((s) => s !== "Published"),
              })
            }
          />
          <FilterChip
            label="Draft"
            active={filters.status.includes("Draft")}
            onClick={() =>
              onFiltersChange({
                ...filters,
                status: filters.status.includes("Draft")
                  ? filters.status.filter((s) => s !== "Draft")
                  : [...filters.status, "Draft"],
              })
            }
            onRemove={() =>
              onFiltersChange({
                ...filters,
                status: filters.status.filter((s) => s !== "Draft"),
              })
            }
          />
          <FilterChip
            label="Featured"
            active={filters.featured === "featured"}
            onClick={() =>
              onFiltersChange({
                ...filters,
                featured: filters.featured === "featured" ? "all" : "featured",
              })
            }
            onRemove={() =>
              onFiltersChange({ ...filters, featured: "all" })
            }
          />
        </div>

        {/* Filter toggle */}
        <motion.button
          onClick={onToggleFilterPanel}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
            filterPanelOpen
              ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </motion.button>

        {/* View toggle */}
        <div className="flex items-center rounded-xl border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-800">
          <button
            onClick={() => onViewModeChange("table")}
            className={`rounded-lg p-2 transition-all ${
              viewMode === "table"
                ? "bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-900/40 dark:text-blue-300"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            }`}
            aria-label="Table view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange("grid")}
            className={`rounded-lg p-2 transition-all ${
              viewMode === "grid"
                ? "bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-900/40 dark:text-blue-300"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            }`}
            aria-label="Grid view"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
        </div>

        {/* Create + Export buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExport}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
          >
            <Download className="h-4 w-4" />
            Export
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCreateArticle}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Create Article
          </motion.button>
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X className="h-3.5 w-3.5" />
            Reset Filters
          </motion.button>
        )}
      </div>

      {/* Dropdown filters row */}
      <div className="flex flex-wrap items-center gap-2">
        <DropdownFilter
          label="Status"
          options={STATUS_OPTIONS}
          selected={filters.status}
          onChange={(val) => onFiltersChange({ ...filters, status: val })}
        />
        <DropdownFilter
          label="Category"
          options={categoryOptions}
          selected={filters.category}
          onChange={(val) => onFiltersChange({ ...filters, category: val })}
        />
        <DropdownFilter
          label="Author"
          options={authorOptions}
          selected={filters.author}
          onChange={(val) => onFiltersChange({ ...filters, author: val })}
        />
      </div>
    </div>
  );
}
