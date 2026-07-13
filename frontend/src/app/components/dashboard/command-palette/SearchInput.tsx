"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function SearchInput({
  value,
  onChange,
  onKeyDown,
  inputRef,
}: SearchInputProps) {
  return (
    <div className="relative">
      {/* Search icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
        <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search pages, commands, or actions..."
        spellCheck={false}
        autoComplete="off"
        className={cn(
          "w-full border-0 bg-transparent py-5 pl-11 pr-4",
          "text-base text-slate-900 placeholder-slate-400",
          "focus:outline-none focus:ring-0",
          "dark:text-white dark:placeholder-slate-500",
        )}
      />

      {/* Glow effect on focus */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px",
          "bg-gradient-to-r from-transparent via-dash-primary/30 to-transparent",
          "opacity-0 transition-opacity duration-300",
          value && "opacity-100",
        )}
      />
    </div>
  );
}
