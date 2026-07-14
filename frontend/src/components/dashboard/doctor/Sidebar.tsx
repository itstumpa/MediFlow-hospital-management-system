"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, LogOut, Settings, Stethoscope, User } from "lucide-react";
import Link from "next/link";
import { useDoctorContext } from "./DoctorProvider";
import { logoTextVariants } from "./MotionVariants";
import { doctorNavigationGroups, doctorQuickActions } from "./navigation";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useDoctorContext();

  return (
    <aside
      className={cn(
        "relative z-30 flex h-screen flex-col",
        "dash-glass border-r border-white/20 dark:border-slate-700/40",
        "shadow-lg shadow-slate-900/5",
        "transition-[width] duration-200 ease-in-out dash-scrollbar",
        sidebarCollapsed ? "w-[80px]" : "w-[280px]",
      )}
      aria-label="Doctor navigation sidebar"
    >
      {/* ========== Logo ========== */}
      <Link
        href="/doctor"
        className={cn(
          "flex h-16 shrink-0 items-center",
          sidebarCollapsed ? "justify-center px-4" : "gap-3 px-5",
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 shadow-md shadow-cyan-200/50 dark:shadow-cyan-900/30">
          <Stethoscope className="h-5 w-5 text-white" />
        </div>

        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.div
              key="logo-text"
              variants={logoTextVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
            >
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                MediFlow
              </span>
              <p className="text-[11px] font-medium text-cyan-600 dark:text-cyan-400">
                Doctor Portal
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* ========== Navigation ========== */}
      <nav className="flex-1 overflow-y-auto py-4 dash-scrollbar">
        <div className="flex flex-col gap-6">
          {doctorNavigationGroups.map((group) => (
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

      {/* ========== Quick Actions ========== */}
      {!sidebarCollapsed && (
        <div className="shrink-0 border-t border-slate-100/80 px-4 py-3 dark:border-slate-800/40">
          <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">
            Quick Actions
          </p>
          <div className="flex flex-col gap-1">
            {doctorQuickActions.map((action) => (
              <button
                key={action.label}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
                  "text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900",
                  "dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
                )}
                aria-label={action.actionLabel}
              >
                <span className="flex shrink-0 items-center justify-center">
                  <action.icon
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.8}
                  />
                </span>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

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
          "shrink-0 border-t border-slate-100/80 dark:border-slate-800/40",
          sidebarCollapsed ? "px-2 py-4" : "p-4",
        )}
      >
        {sidebarCollapsed ? (
          <div className="flex flex-col items-center gap-2">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-sm"
              aria-label="User menu"
            >
              <User className="h-4 w-4" />
            </button>
            <div className="flex flex-col items-center gap-1.5">
              <Link
                href="/doctor/settings"
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
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-sm font-semibold text-white shadow-sm shadow-cyan-200/50 dark:shadow-cyan-900/30">
              DR
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                Dr. Sarah Mitchell
              </p>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                  Cardiologist
                </span>
              </div>
            </div>
            <div className="flex gap-0.5">
              <Link
                href="/doctor/settings"
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
