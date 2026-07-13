"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { CommandPaletteItem, ResultGroup } from "./types";

interface SearchResultsProps {
  groups: ResultGroup[];
  selectedIndex: number;
  onSelect: (item: CommandPaletteItem) => void;
  onHover: (index: number) => void;
  favorites: Set<string>;
  onToggleFavorite: (item: CommandPaletteItem) => void;
}

export function SearchResults({
  groups,
  selectedIndex,
  onSelect,
  onHover,
  favorites,
  onToggleFavorite,
}: SearchResultsProps) {
  let globalIndex = 0;

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain py-2 dash-scrollbar">
      {groups.map((group) => {
        const startIndex = globalIndex;
        globalIndex += group.items.length;
        const groupEndIndex = globalIndex;

        return (
          <div key={group.label}>
            {/* Group label */}
            <div className="px-4 pb-1 pt-3">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {group.label}
              </span>
            </div>

            {/* Items */}
            <div className="px-2">
              {group.items.map((item, idx) => {
                const itemIndex = startIndex + idx;
                const isSelected = itemIndex === selectedIndex;
                const isFav = favorites.has(item.id);

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.15,
                      delay: idx * 0.025,
                      ease: "easeOut",
                    }}
                    onClick={() => onSelect(item)}
                    onMouseEnter={() => onHover(itemIndex)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150",
                      isSelected
                        ? "bg-dash-primary-light text-dash-primary dark:bg-teal-500/10 dark:text-accent"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5",
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg",
                        isSelected
                          ? "bg-dash-primary-light text-dash-primary dark:bg-teal-500/15 dark:text-accent"
                          : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500",
                      )}
                    >
                      <item.icon
                        className="h-[18px] w-[18px]"
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* Label + description */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          "text-sm font-medium truncate",
                          isSelected && "text-dash-primary dark:text-accent",
                        )}
                      >
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-400 truncate dark:text-slate-500">
                        {item.description}
                      </div>
                    </div>

                    {/* Shortcut + favorite */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Favorite star */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(item);
                        }}
                        className={cn(
                          "flex size-6 items-center justify-center rounded-md transition-colors",
                          isFav
                            ? "text-amber-400 hover:text-amber-500"
                            : "text-slate-300 opacity-0 group-hover:opacity-100 hover:text-slate-400 dark:text-slate-600 dark:hover:text-slate-400",
                        )}
                        aria-label={
                          isFav ? "Remove from favorites" : "Add to favorites"
                        }
                      >
                        <svg
                          viewBox="0 0 20 20"
                          fill={isFav ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth={1.5}
                          className="h-4 w-4"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>

                      {item.shortcut && (
                        <kbd
                          className={cn(
                            "hidden sm:inline-flex items-center gap-0.5 rounded-md border px-1.5 py-0.5",
                            "text-[10px] font-medium leading-none",
                            isSelected
                              ? "border-dash-primary-light bg-dash-primary-light/50 text-dash-primary dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-accent"
                              : "border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500",
                          )}
                        >
                          {item.shortcut}
                        </kbd>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
