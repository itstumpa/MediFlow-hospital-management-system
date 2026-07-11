"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "experience", label: "Most Experienced" },
  { value: "fee-asc", label: "Lowest Fee" },
  { value: "fee-desc", label: "Highest Fee" },
  { value: "newest", label: "Newest" },
];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLabel =
    sortOptions.find((o) => o.value === value)?.label || "Sort By";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-primary transition-all hover:border-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Sort doctors"
      >
        <ArrowUpDown
          className="h-4 w-4 text-text-secondary"
          aria-hidden="true"
        />
        {currentLabel}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className="h-4 w-4 text-text-secondary"
            aria-hidden="true"
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 z-40 mt-1 w-52 overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
            role="listbox"
            aria-label="Sort options"
          >
            {sortOptions.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`cursor-pointer px-4 py-2.5 text-sm transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary ${
                  value === option.value
                    ? "bg-primary/5 font-semibold text-primary"
                    : "text-text-secondary"
                }`}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
