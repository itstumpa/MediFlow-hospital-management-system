"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";

interface QuickFilter {
  id: string;
  label: string;
}

const filters: QuickFilter[] = [
  { id: "popular", label: "Popular" },
  { id: "available-today", label: "Available Today" },
  { id: "top-rated", label: "Top Rated" },
  { id: "online", label: "Online Consultation" },
  { id: "emergency", label: "Emergency" },
  { id: "female", label: "Female Doctors" },
  { id: "male", label: "Male Doctors" },
  { id: "experienced", label: "Most Experienced" },
  { id: "children", label: "Children Specialists" },
  { id: "heart", label: "Heart Specialists" },
];

interface QuickFiltersProps {
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export function QuickFilters({
  activeFilter,
  onFilterChange,
}: QuickFiltersProps) {
  return (
    <section className="border-b border-border/50 bg-surface py-4">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Quick filters"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              variants={staggerItem}
              onClick={() =>
                onFilterChange(activeFilter === filter.id ? "" : filter.id)
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                activeFilter === filter.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "border border-border bg-background text-text-secondary hover:border-primary/30 hover:text-text-primary"
              }`}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
