"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HeartPulse, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { fadeIn, slideLeft } from "./MotionVariants";
import { staffNavigationGroups } from "./navigation";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarItem } from "./SidebarItem";
import { useStaffContext } from "./StaffProvider";

export function MobileSidebar() {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useStaffContext();

  /* Lock body scroll when open */
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  return (
    <AnimatePresence>
      {mobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="mobile-drawer"
            variants={slideLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-white dark:bg-slate-900 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5 dark:border-slate-800/60">
              <Link
                href="/staff"
                className="flex items-center gap-3"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 shadow-sm">
                  <HeartPulse className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                    MediFlow
                  </span>
                  <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    Staff Portal
                  </p>
                </div>
              </Link>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 dash-scrollbar">
              <div className="flex flex-col gap-5">
                {staffNavigationGroups.map((group) => (
                  <SidebarGroup
                    key={group.label}
                    label={group.label}
                    collapsed={false}
                  >
                    {group.items.map((item) => (
                      <SidebarItem
                        key={item.href}
                        item={item}
                        collapsed={false}
                      />
                    ))}
                  </SidebarGroup>
                ))}
              </div>
            </nav>

            {/* Mobile user footer */}
            <div className="shrink-0 border-t border-slate-100 px-5 py-4 dark:border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-semibold text-white shadow-sm">
                  SM
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                    Sarah Mitchell
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Senior Receptionist
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
