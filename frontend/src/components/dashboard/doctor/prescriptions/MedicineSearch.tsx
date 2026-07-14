"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, Pill, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  medicineOptions,
  type MedicineOption,
} from "./prescriptions-mock-data";

interface MedicineSearchProps {
  onSelect: (medicine: MedicineOption) => void;
  selectedIds?: string[];
  placeholder?: string;
}

export function MedicineSearch({
  onSelect,
  selectedIds = [],
  placeholder = "Search medicines by name, brand, or category...",
}: MedicineSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? medicineOptions.filter(
        (m) =>
          !selectedIds.includes(m.id) &&
          (m.name.toLowerCase().includes(query.toLowerCase()) ||
            m.genericName.toLowerCase().includes(query.toLowerCase()) ||
            m.brand.toLowerCase().includes(query.toLowerCase()) ||
            m.category.toLowerCase().includes(query.toLowerCase())),
      )
    : [];

  const handleSelect = useCallback(
    (medicine: MedicineOption) => {
      onSelect(medicine);
      setQuery("");
      setIsOpen(false);
      inputRef.current?.focus();
    },
    [onSelect],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      handleSelect(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all",
          "focus-within:border-dash-primary focus-within:ring-2 focus-within:ring-dash-primary-light",
          "dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-teal-600 dark:focus-within:ring-teal-900/30",
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none dark:text-slate-200 dark:placeholder-slate-500"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="rounded p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && filtered.length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl",
              "dark:border-slate-700 dark:bg-slate-800",
            )}
          >
            {filtered.map((medicine, index) => (
              <button
                key={medicine.id}
                onClick={() => handleSelect(medicine)}
                className={cn(
                  "flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors",
                  index === activeIndex
                    ? "bg-dash-primary-light dark:bg-teal-950/30"
                    : "hover:bg-slate-50 dark:hover:bg-slate-700/50",
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                  <Pill className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {medicine.name}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {medicine.genericName} · {medicine.brand} ·{" "}
                    {medicine.strength}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                  {medicine.category}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && query && filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "absolute left-0 right-0 top-full z-50 mt-1 rounded-xl border border-slate-200 bg-white py-6 text-center shadow-xl",
            "dark:border-slate-700 dark:bg-slate-800",
          )}
        >
          <FlaskConical className="mx-auto h-6 w-6 text-slate-300 dark:text-slate-600" />
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            No medicines found for &quot;{query}&quot;
          </p>
        </motion.div>
      )}
    </div>
  );
}
