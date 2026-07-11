"use client";

import { motion } from "framer-motion";
import { FilterX, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface DepartmentSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  availabilityFilter: string;
  onAvailabilityFilterChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
}

export function DepartmentSearch({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  availabilityFilter,
  onAvailabilityFilterChange,
  sortBy,
  onSortChange,
  onClearFilters,
}: DepartmentSearchProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const hasActiveFilters =
    searchQuery || categoryFilter || availabilityFilter || sortBy !== "default";

  return (
    <div className="sticky top-0 z-40 py-4">
      {/* Backdrop blur + glassmorphism */}
      <div className="rounded-2xl border border-white/40 bg-white/70 px-4 py-4 shadow-lg shadow-black/5 backdrop-blur-xl md:px-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Department..."
              className="w-full rounded-xl border border-border bg-white/80 py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary/60 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Search departments"
            />
          </div>

          {/* Desktop filters - hidden on mobile */}
          <div className="hidden items-center gap-3 md:flex">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="rounded-xl border border-border bg-white/80 px-3.5 py-2.5 text-sm text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Filter by category"
            >
              <option value="">Category</option>
              {[
                "Heart Care",
                "Brain & Nerves",
                "Children",
                "Women's Health",
                "Orthopedics",
                "Dermatology",
                "Emergency",
                "Dental",
                "Eye Care",
                "Mental Health",
                "Nutrition",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={availabilityFilter}
              onChange={(e) => onAvailabilityFilterChange(e.target.value)}
              className="rounded-xl border border-border bg-white/80 px-3.5 py-2.5 text-sm text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Filter by availability"
            >
              <option value="">Availability</option>
              <option value="24/7">24/7</option>
              <option value="daytime">Daytime</option>
              <option value="emergency">Emergency Only</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="rounded-xl border border-border bg-white/80 px-3.5 py-2.5 text-sm text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Sort by"
            >
              <option value="default">Sort By</option>
              <option value="name">Name A-Z</option>
              <option value="rating">Highest Rated</option>
              <option value="doctors">Most Doctors</option>
              <option value="patients">Most Patients</option>
            </select>

            {/* Search button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
              aria-label="Search"
            >
              <Search size={16} aria-hidden="true" />
              <span className="hidden sm:inline">Search</span>
            </motion.button>

            {/* Clear filters */}
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={onClearFilters}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2.5 text-sm text-text-secondary transition-colors hover:border-danger hover:text-danger"
                aria-label="Clear filters"
              >
                <FilterX size={16} aria-hidden="true" />
                <span className="hidden sm:inline">Clear</span>
              </motion.button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/80 px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-white md:hidden"
            aria-expanded={showMobileFilters}
            aria-label="Toggle filters"
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            Filters
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                !
              </span>
            )}
          </button>
        </div>

        {/* Mobile filters drawer */}
        {showMobileFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-4 space-y-3 overflow-hidden md:hidden"
          >
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm"
              aria-label="Filter by category"
            >
              <option value="">Category</option>
              {[
                "Heart Care",
                "Brain & Nerves",
                "Children",
                "Women's Health",
                "Orthopedics",
                "Dermatology",
                "Emergency",
                "Dental",
                "Eye Care",
                "Mental Health",
                "Nutrition",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={availabilityFilter}
              onChange={(e) => onAvailabilityFilterChange(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm"
              aria-label="Filter by availability"
            >
              <option value="">Availability</option>
              <option value="24/7">24/7</option>
              <option value="daytime">Daytime</option>
              <option value="emergency">Emergency Only</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm"
              aria-label="Sort by"
            >
              <option value="default">Sort By</option>
              <option value="name">Name A-Z</option>
              <option value="rating">Highest Rated</option>
              <option value="doctors">Most Doctors</option>
              <option value="patients">Most Patients</option>
            </select>

            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-medium text-white"
              >
                Search
              </motion.button>
              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  className="flex-1 rounded-xl border border-border py-2.5 text-sm text-text-secondary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
