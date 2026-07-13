"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  type ButtonHTMLAttributes,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";

/* ─── Variant & size types ─── */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";

export type ButtonSize = "xs" | "sm" | "md" | "lg";

/* ─── Style maps ─── */

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-dash-primary text-white shadow-sm hover:bg-dash-primary-dark hover:shadow-md active:bg-dash-primary-dark",
  secondary:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:active:bg-slate-600",
  outline:
    "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:active:bg-slate-600",
  ghost:
    "text-slate-600 hover:bg-slate-100 active:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 dark:active:bg-slate-700",
  danger:
    "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md active:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
  success:
    "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md active:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-2 py-1 text-xs gap-1.5 rounded-lg",
  sm: "px-3 py-1.5 text-sm gap-1.5 rounded-xl",
  md: "px-4 py-2.5 text-sm gap-2 rounded-xl",
  lg: "px-5 py-3 text-base gap-2 rounded-xl",
};

/* ─── Ripple helper ─── */

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/* ─── Props ─── */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  ripple?: boolean;
  children?: ReactNode;
}

/* ─── Component ─── */

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  ripple = true,
  className,
  disabled,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple || disabled || loading) {
        onClick?.(e);
        return;
      }

      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const id = ++rippleId.current;
      setRipples((prev) => [...prev, { id, x, y, size }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      onClick?.(e);
    },
    [ripple, disabled, loading, onClick],
  );

  return (
    <motion.button
      ref={buttonRef}
      whileHover={disabled || loading ? undefined : { scale: 1.02 }}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      disabled={disabled || loading}
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dash-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...(props as any)}
    >
      {/* Ripple effects */}
      {ripple &&
        ripples.map((r) => (
          <span
            key={r.id}
            className="pointer-events-none absolute rounded-full bg-white/25 animate-[ripple_0.6s_ease-out]"
            style={{
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
            }}
          />
        ))}

      {/* Loading spinner */}
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}

      {/* Icon (left) */}
      {Icon && iconPosition === "left" && !loading && (
        <Icon className="h-4 w-4 shrink-0" />
      )}

      {/* Children */}
      {children && <span className="truncate">{children}</span>}

      {/* Icon (right) */}
      {Icon && iconPosition === "right" && !loading && (
        <Icon className="h-4 w-4 shrink-0" />
      )}
    </motion.button>
  );
}
