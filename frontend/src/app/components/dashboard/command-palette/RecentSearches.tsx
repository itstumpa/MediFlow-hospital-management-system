"use client";

import { cn } from "@/lib/utils";
import { Clock, Trash2 } from "lucide-react";
import { getIconByName } from "./palette-data";
import type { StoredEntry } from "./types";

interface RecentSearchesProps {
  items: StoredEntry[];
  onSelect: (item: StoredEntry) => void;
  onClear: () => void;
  selectedIndex: number;
  startIndex: number;
  onHover: (index: number) => void;
}

export function RecentSearches({
  items,
  onSelect,
  onClear,
  selectedIndex,
  startIndex,
  onHover,
}: RecentSearchesProps) {
  if (items.length === 0) return null;

  return (
    <div className="px-2 pb-1">
      <div className="flex items-center justify-between px-3 pb-1 pt-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Recent Searches
        </span>
        <button
          onClick={onClear}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          <Trash2 className="h-3 w-3" strokeWidth={1.8} />
          Clear
        </button>
      </div>
      <div className="mt-1">
        {items.map((entry, idx) => {
          const itemIndex = startIndex + idx;
          const isSelected = itemIndex === selectedIndex;
          const Icon = getIconByName(entry.iconName);

          return (
            <button
              key={entry.id}
              onClick={() => onSelect(entry)}
              onMouseEnter={() => onHover(itemIndex)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150",
                isSelected
                  ? "bg-dash-primary-light text-dash-primary dark:bg-teal-500/10 dark:text-accent"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5",
              )}
            >
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg",
                  isSelected
                    ? "bg-dash-primary-light text-dash-primary dark:bg-teal-500/15 dark:text-accent"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500",
                )}
              >
                <Icon className="h-[16px] w-[16px]" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    "text-sm font-medium truncate",
                    isSelected && "text-dash-primary dark:text-accent",
                  )}
                >
                  {entry.label}
                </div>
                <div className="text-xs text-slate-400 truncate dark:text-slate-500">
                  {entry.description}
                </div>
              </div>
              <Clock
                className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-600"
                strokeWidth={1.8}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
