"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardWrapperProps {
  id?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export function CardWrapper({
  id,
  title,
  description,
  icon,
  children,
  className,
  headerAction,
}: CardWrapperProps) {
  return (
    <motion.div
      id={id}
      variants={staggerItem}
      className={cn(
        "rounded-2xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-700/30">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-dash-primary-light)] text-[var(--color-primary)] dark:bg-emerald-950/40 dark:text-emerald-400">
              {icon}
            </span>
          )}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
            {description && (
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
        </div>
        {headerAction && <div className="shrink-0">{headerAction}</div>}
      </div>

      {/* Body */}
      <div className="px-6 py-5">{children}</div>
    </motion.div>
  );
}
