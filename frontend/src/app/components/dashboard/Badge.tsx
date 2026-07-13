"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/* â”€â”€â”€ Variant & size types â”€â”€â”€ */

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "violet"
  | "cyan"
  | "orange"
  | "rose";

export type BadgeSize = "sm" | "md" | "lg";

/* â”€â”€â”€ Style maps â”€â”€â”€ */

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  primary:
    "bg-dash-primary-light text-dash-primary dark:bg-teal-950/30 dark:text-accent",
  success:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  warning:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  danger: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  info: "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400",
  violet:
    "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400",
  cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-400",
  orange:
    "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400",
  rose: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px] gap-1",
  md: "px-2 py-0.5 text-xs gap-1",
  lg: "px-2.5 py-1 text-sm gap-1.5",
};

/* â”€â”€â”€ Props â”€â”€â”€ */

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: LucideIcon;
  dot?: boolean;
  dotColor?: string;
  pulse?: boolean;
  className?: string;
  children?: ReactNode;
}

/* â”€â”€â”€ Component â”€â”€â”€ */

export function Badge({
  variant = "default",
  size = "md",
  icon: Icon,
  dot,
  dotColor,
  pulse = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {/* Pulsing dot */}
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            pulse && "animate-pulse",
            dotColor ||
              {
                default: "bg-slate-400 dark:bg-slate-500",
                primary: "bg-dash-primary",
                success: "bg-emerald-500",
                warning: "bg-amber-500",
                danger: "bg-red-500",
                info: "bg-sky-500",
                violet: "bg-violet-500",
                cyan: "bg-cyan-500",
                orange: "bg-orange-500",
                rose: "bg-rose-500",
              }[variant],
          )}
        />
      )}

      {/* Icon */}
      {Icon && <Icon className="h-3 w-3" />}

      {/* Label */}
      {children}
    </span>
  );
}

/* â”€â”€â”€ Animated Badge wrapper â”€â”€â”€ */

export function AnimatedBadge(props: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
    >
      <Badge {...props} />
    </motion.span>
  );
}
