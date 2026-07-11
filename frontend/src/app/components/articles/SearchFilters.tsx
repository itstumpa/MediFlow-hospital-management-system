"use client";

import { fadeDown } from "@/lib/animations/fade";
import { getUniqueAuthors } from "@/lib/data/articles";
import { motion } from "framer-motion";
import {
  ChevronDown,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

interface SearchFiltersProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClear: () => void;
  searchQuery: string;
  selectedCategory: string;
  selectedAuthor: string;
  selectedTime: string;
  selectedSort: string;
  categories: string[];
  hasActiveFilters: boolean;
}

const readingTimeOptions = [
  { value: "", label: "Any Time" },
  { value: "5", label: "Under 5 min" },
  { value: "7", label: "Under 7 min" },
  { value: "10", label: "Under 10 min" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "popular", label: "Most Popular" },
  { value: "views", label: "Most Viewed" },
];

export function SearchFilters({
  onSearchChange,
  onCategoryChange,
  onAuthorChange,
  onTimeChange,
  onSortChange,
  onClear,
  searchQuery,
  selectedCategory,
  selectedAuthor,
  selectedTime,
  selectedSort,
  categories,
  hasActiveFilters,
}: SearchFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const authors = useMemo(() => getUniqueAuthors(), []);

  return (
    <motion.div
      variants={fadeDown}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-30 mx-auto max-w-page px-4 py-4 md:px-6 lg:px-8"
    >
      <div className="rounded-2xl border border-white/20 bg-white/70 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-300">
        <div className="px-4 py-3 md:px-6">
          {/* Search row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
                aria-hidden="true"
              />
              <input
                ref={searchRef}
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary/60 transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                aria-label="Search health articles"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    onSearchChange("");
                    searchRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                showFilters || hasActiveFilters
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-text-secondary hover:border-primary/30 hover:text-primary"
              }`}
              aria-label="Toggle filters"
              aria-expanded={showFilters}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Filters</span>
            </motion.button>
          </div>

          {/* Expandable filters */}
          <motion.div
            initial={false}
            animate={{
              height: showFilters ? "auto" : 0,
              opacity: showFilters ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Category */}
              <div className="relative">
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-border bg-surface px-3 py-2.5 pr-8 text-sm text-text-primary transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    aria-label="Filter by category"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Author */}
              <div className="relative">
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                  Doctor
                </label>
                <div className="relative">
                  <select
                    value={selectedAuthor}
                    onChange={(e) => onAuthorChange(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-border bg-surface px-3 py-2.5 pr-8 text-sm text-text-primary transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    aria-label="Filter by doctor"
                  >
                    <option value="">All Doctors</option>
                    {authors.map((author) => (
                      <option key={author.id} value={author.name}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Reading Time */}
              <div className="relative">
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                  Reading Time
                </label>
                <div className="relative">
                  <select
                    value={selectedTime}
                    onChange={(e) => onTimeChange(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-border bg-surface px-3 py-2.5 pr-8 text-sm text-text-primary transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    aria-label="Filter by reading time"
                  >
                    {readingTimeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="relative">
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    value={selectedSort}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-border bg-surface px-3 py-2.5 pr-8 text-sm text-text-primary transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    aria-label="Sort articles"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 flex justify-end border-t border-border pt-3"
              >
                <button
                  onClick={onClear}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-danger transition-colors hover:text-danger/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Clear Filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
