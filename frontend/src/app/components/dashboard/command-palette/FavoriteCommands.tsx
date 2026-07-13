"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { getIconByName } from "./palette-data";
import type { StoredEntry } from "./types";

interface FavoriteCommandsProps {
  items: StoredEntry[];
  onSelect: (item: StoredEntry) => void;
  onRemove: (id: string) => void;
  selectedIndex: number;
  startIndex: number;
  onHover: (index: number) => void;
}

export function FavoriteCommands({
  items,
  onSelect,
  onRemove,
  selectedIndex,
  startIndex,
  onHover,
}: FavoriteCommandsProps) {
  if (items.length === 0) return null;

  return (
    <div className="px-2 pb-1">
      <div className="px-3 pb-1 pt-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Favorites
        </span>
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
                    : "bg-amber-100 text-amber-500 dark:bg-amber-500/15 dark:text-amber-400",
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(entry.id);
                }}
                className="flex size-6 shrink-0 items-center justify-center rounded-md text-amber-400 transition-colors hover:text-amber-500"
                aria-label="Remove from favorites"
              >
                <Star
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  strokeWidth={1.5}
                />
              </button>
            </button>
          );
        })}
      </div>
    </div>
  );
}
