"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { scaleFade } from "./MotionVariants";

const menuItems = [
  { icon: User, label: "Profile", href: "/settings" },
  { icon: Settings, label: "Account Settings", href: "/settings" },
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
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          isOpen && "bg-slate-100 dark:bg-slate-800",
        )}
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-semibold text-white shadow-sm transition-transform group-hover:scale-105">
          AD
        </div>
        <div className="hidden text-left md:block">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            Admin User
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Administrator
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
                  Admin User
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  admin@mediflow.com
                </p>
              </div>

              {/* Menu items */}
              <div className="py-1.5">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={handleClose}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 transition-colors",
                      "hover:bg-slate-50 hover:text-slate-900",
                      "dark:text-slate-400 dark:hover:bg-slate-800/40 dark:hover:text-slate-200",
                    )}
                    role="menuitem"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 dark:border-slate-800/60" />

              {/* Logout */}
              <div className="py-1.5">
                <button
                  onClick={() => {} /* handle logout */}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors",
                    "hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30",
                  )}
                  role="menuitem"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
