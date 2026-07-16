"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, HeartPulse, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { patientNavigationGroups } from "./navigation";
import { usePatientContext } from "./PatientProvider";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = usePatientContext();

  return (
    <aside
      className={cn(
        "relative z-30 flex h-screen flex-col",
        "dash-glass border-r border-white/20 dark:border-slate-700/40",
        "shadow-lg shadow-slate-900/5",
        "transition-[width] duration-200 ease-in-out dash-scrollbar",
        sidebarCollapsed ? "w-[80px]" : "w-[280px]",
      )}
    >
      {/* ========== Logo ========== */}
      <Link
        href="/"
        className={cn(
          "flex h-16 shrink-0 items-center",
          sidebarCollapsed ? "justify-center px-4" : "gap-3 px-5",
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-dash-primary to-dash-primary-dark shadow-md shadow-dash-primary/20 dark:shadow-dash-primary/10">
          <HeartPulse className="h-5 w-5 text-white" />
        </div>

        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.div
              key="logo-text"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                MediFlow
              </span>
              <p className="text-[11px] font-medium text-dash-primary dark:text-[var(--color-accent)]">
                Patient Portal
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* ========== Navigation ========== */}
      <nav className="flex-1 overflow-y-auto py-4 dash-scrollbar">
        <div className="flex flex-col gap-6">
          {patientNavigationGroups.map((group) => (
            <SidebarGroup
              key={group.label}
              label={group.label}
              collapsed={sidebarCollapsed}
            >
              {group.items.map((item) => (
                <SidebarItem
                  key={item.href}
                  item={item}
                  collapsed={sidebarCollapsed}
                />
              ))}
            </SidebarGroup>
          ))}
        </div>
      </nav>

      {/* ========== Collapse toggle ========== */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "hidden lg:flex absolute -right-3 top-20 h-6 w-6 items-center justify-center rounded-full",
          "border border-slate-200 bg-white text-slate-400 shadow-sm transition-colors",
          "hover:bg-slate-50 hover:text-slate-600",
          "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500",
          "dark:hover:bg-slate-700 dark:hover:text-slate-300",
        )}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            sidebarCollapsed && "rotate-180",
          )}
        />
      </button>

      {/* ========== User footer ========== */}
      <div
        className={cn(
          "shrink-0 border-t border-slate-100/80 p-4 dark:border-slate-800/40",
          sidebarCollapsed && "flex flex-col items-center px-2 py-4",
        )}
      >
        {sidebarCollapsed ? (
          <>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-dash-primary to-dash-primary-dark text-white shadow-sm"
              aria-label="User menu"
            >
              <User className="h-4 w-4" />
            </button>
            <div className="mt-2 flex flex-col items-center gap-1.5">
              <Link
                href="/dashboard/patient/settings"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                aria-label="Settings"
              >
                <Settings className="h-4 w-4" />
              </Link>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-dash-primary to-dash-primary-dark text-sm font-semibold text-white shadow-sm shadow-dash-primary/20 dark:shadow-dash-primary/10">
              JD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                John Doe
              </p>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center rounded-full bg-dash-primary-light px-2 py-0.5 text-[10px] font-semibold text-dash-primary dark:bg-teal-950/40 dark:text-[var(--color-accent)]">
                  Gold Member
                </span>
              </div>
            </div>
            <div className="flex gap-0.5">
              <Link
                href="/dashboard/patient/settings"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                aria-label="Settings"
              >
                <Settings className="h-3.5 w-3.5" />
              </Link>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                aria-label="Logout"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
