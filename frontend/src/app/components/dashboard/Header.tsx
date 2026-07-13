"use client";

import { cn } from "@/lib/utils";
import { Menu, Plus } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { useCommandPalette } from "./command-palette";
import { NotificationDropdown } from "./NotificationDropdown";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { useDashboard } from "./use-dashboard";
import { UserDropdown } from "./UserDropdown";

export function Header() {
  const { toggleMobileSidebar } = useDashboard();
  const { open: openCommandPalette } = useCommandPalette();

  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl px-4 lg:px-6",
        "dark:border-slate-700/40 dark:bg-slate-900/70",
      )}
    >
      {/* Mobile hamburger */}
      <button
        onClick={toggleMobileSidebar}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        aria-label="Open navigation menu"
      >
        <Menu className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </button>

      {/* Breadcrumb */}
      <div className="hidden min-w-0 flex-1 md:block">
        <Breadcrumb />
      </div>

      {/* Spacer on mobile when breadcrumb is hidden */}
      <div className="flex-1 md:hidden" />

      {/* Search bar — hidden on very small screens */}
      <div className="hidden sm:block">
        <SearchBar onOpen={openCommandPalette} />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        {/* Quick Add */}
        <button
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl",
            "text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600",
            "dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary focus-visible:ring-offset-2",
          )}
          aria-label="Quick add"
        >
          <Plus className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <NotificationDropdown />

        {/* User dropdown */}
        <UserDropdown />
      </div>
    </header>
  );
}
