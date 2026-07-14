"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { scaleFade } from "./MotionVariants";

const menuItems = [
  { icon: User, label: "View Profile", href: "/staff/profile" },
  { icon: Settings, label: "Settings", href: "/staff/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "#" },
];

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className={cn(
          "group flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors",
          "hover:bg-slate-100 dark:hover:bg-slate-800",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
          isOpen && "bg-slate-100 dark:bg-slate-800",
        )}
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-semibold text-white shadow-sm transition-transform group-hover:scale-105">
          SM
        </div>
        <div className="hidden text-left md:block">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            Sarah Mitchell
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Senior Receptionist
          </p>
        </div>
        <ChevronDown
          className={cn(
            "hidden h-4 w-4 text-slate-400 transition-transform duration-200 md:block",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click-outside backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={handleClose}
              aria-hidden="true"
            />

            <motion.div
              key="user-dropdown"
              variants={scaleFade}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "absolute right-0 top-full z-50 mt-2 w-[240px] overflow-hidden rounded-2xl",
                "border border-slate-200/60 bg-white shadow-xl shadow-slate-900/5",
                "dark:border-slate-700/60 dark:bg-slate-900",
              )}
              role="menu"
              aria-label="User menu"
            >
              {/* User info */}
              <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800/60">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Sarah Mitchell
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  sarah.mitchell@mediflow.com
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    Online
                  </span>
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                    Front Desk
                  </span>
                </div>
              </div>

              {/* Menu items */}
              <div className="p-1.5">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                      "dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200",
                    )}
                    role="menuitem"
                    onClick={handleClose}
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.8} />
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 dark:border-slate-800/60" />

              {/* Logout */}
              <div className="p-1.5">
                <Link
                  href="/staff/logout"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    "text-red-600 hover:bg-red-50 hover:text-red-700",
                    "dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:text-red-300",
                  )}
                  role="menuitem"
                  onClick={handleClose}
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.8} />
                  Logout
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
