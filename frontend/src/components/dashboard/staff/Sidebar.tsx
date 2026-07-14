"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, HeartPulse, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { staffNavigationGroups, staffQuickActions } from "./navigation";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarItem } from "./SidebarItem";
import { useStaffContext } from "./StaffProvider";

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useStaffContext();
  const pathname = usePathname();

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
        href="/staff"
        className={cn(
          "flex h-16 shrink-0 items-center",
          sidebarCollapsed ? "justify-center px-4" : "gap-3 px-5",
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 shadow-md shadow-emerald-200/50 dark:shadow-emerald-900/30">
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
              <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                Staff Portal
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* ========== Quick Actions ========== */}
      {!sidebarCollapsed && (
        <div className="px-4 pb-3">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">
            Quick Actions
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {staffQuickActions.slice(0, 4).map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-center text-[11px] font-medium transition-all duration-200",
                  "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  "dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200",
                  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
                )}
              >
                <action.icon className="h-4 w-4" strokeWidth={1.8} />
                <span className="leading-tight">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ========== Separator ========== */}
      {!sidebarCollapsed && (
        <div className="mx-5 border-t border-slate-100/80 dark:border-slate-800/40" />
      )}

      {/* ========== Navigation ========== */}
      <nav className="flex-1 overflow-y-auto py-4 dash-scrollbar">
        <div className="flex flex-col gap-6">
          {staffNavigationGroups.map((group) => (
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-sm">
              <User className="h-4 w-4" />
            </div>
            <div className="mt-2 flex flex-col items-center gap-1.5">
              <Link
                href="/staff/profile"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                aria-label="Profile"
              >
                <User className="h-4 w-4" />
              </Link>
              <Link
                href="/staff/settings"
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
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-semibold text-white shadow-sm shadow-emerald-200/50 dark:shadow-emerald-900/30">
              SM
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                Sarah Mitchell
              </p>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  Online
                </span>
              </div>
            </div>
            <div className="flex gap-0.5">
              <Link
                href="/staff/profile"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                aria-label="Profile"
              >
                <User className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/staff/settings"
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
