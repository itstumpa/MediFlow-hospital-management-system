"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  HeartPulse,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navigationGroups } from "./navigation";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarItem } from "./SidebarItem";
import { useDashboard } from "./use-dashboard";

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useDashboard();

  return (
    <aside
      className={cn(
        "relative z-30 flex h-screen flex-col border-r border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-900/80",
        "transition-[width] duration-200 ease-in-out dash-scrollbar",
        sidebarCollapsed ? "w-[80px]" : "w-[280px]",
      )}
    >
      {/* ========== Logo ========== */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-slate-100 dark:border-slate-800/60",
          sidebarCollapsed ? "justify-center px-4" : "gap-3 px-5",
        )}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm">
          <HeartPulse className="h-5 w-5 text-white" />
        </div>

        {!sidebarCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-white"
          >
            MediFlow
          </motion.span>
        )}
      </div>

      {/* ========== Navigation ========== */}
      <nav className="flex-1 overflow-y-auto py-4 dash-scrollbar">
        <div className="flex flex-col gap-5">
          {navigationGroups.map((group) => (
            <SidebarGroup key={group.label} label={group.label} collapsed={sidebarCollapsed}>
              {group.items.map((item) => (
                <SidebarItem key={item.href} item={item} collapsed={sidebarCollapsed} />
              ))}
            </SidebarGroup>
          ))}
        </div>
      </nav>

      {/* ========== Collapse toggle ========== */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "hidden lg:flex absolute -right-3 top-20 h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300",
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
          "shrink-0 border-t border-slate-100 p-4 dark:border-slate-800/60",
          sidebarCollapsed && "flex flex-col items-center px-2 py-4",
        )}
      >
        {sidebarCollapsed ? (
          <>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              aria-label="User menu"
            >
              <User className="h-4 w-4" />
            </button>
            <div className="mt-2 flex flex-col items-center gap-1.5">
              <Link
                href="/settings"
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-semibold text-white shadow-sm">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                Admin User
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>
            <div className="flex gap-0.5">
              <Link
                href="/settings"
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
