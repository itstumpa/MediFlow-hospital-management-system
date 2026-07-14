"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { NotificationDropdown } from "./NotificationDropdown";
import { usePatientContext } from "./PatientProvider";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { UserDropdown } from "./UserDropdown";

export function Header() {
  const { toggleMobileSidebar } = usePatientContext();

  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-slate-200/50 bg-white/70 backdrop-blur-xl px-4 lg:px-6",
        "dark:border-slate-700/30 dark:bg-slate-900/70",
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
        <SearchBar />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
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
