"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeIndicatorVariants, iconRotate } from "./MotionVariants";
import type { DoctorNavItemDef } from "./types";

interface DoctorSidebarItemProps {
  item: DoctorNavItemDef;
  collapsed: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  item: { icon: Icon, label, href, badge },
  collapsed,
  onClick,
}: DoctorSidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        isActive
          ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:bg-teal-950/40 dark:text-[var(--color-accent)]"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200",
        collapsed && "justify-center px-0",
      )}
      title={collapsed ? label : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.span
          variants={activeIndicatorVariants}
          initial="hidden"
          animate="visible"
          className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-accent)]"
        />
      )}

      {/* Icon */}
      <motion.span
        variants={iconRotate}
        initial="idle"
        whileHover="hover"
        className={cn(
          "flex shrink-0 items-center justify-center transition-transform duration-200",
          "group-hover:scale-110",
          isActive &&
            "text-[var(--color-primary)] dark:text-[var(--color-accent)]",
        )}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </motion.span>

      {/* Label */}
      {!collapsed && (
        <span className="overflow-hidden whitespace-nowrap transition-all duration-200">
          {label}
        </span>
      )}

      {/* Badge */}
      {badge !== undefined && badge > 0 && (
        <span
          className={cn(
            "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1.5 text-[11px] font-semibold text-white",
            collapsed && "hidden",
          )}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </Link>
  );
}
