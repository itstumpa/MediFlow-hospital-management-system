"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { staffBreadcrumbLabels } from "./navigation";

export function Breadcrumb() {
  const pathname = usePathname();

  /* Build segments from the pathname */
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => {
      const href = "/" + arr.slice(0, index + 1).join("/");
      const label =
        staffBreadcrumbLabels[href] ||
        segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return { label, href, isLast: index === arr.length - 1 };
    });

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link
        href="/staff"
        className="flex items-center gap-1 rounded-lg px-1.5 py-1 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
        aria-label="Dashboard home"
      >
        <LayoutDashboard className="h-3.5 w-3.5" />
      </Link>

      {segments.map((segment) => (
        <Fragment key={segment.href}>
          <ChevronRight
            className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600"
            aria-hidden="true"
          />
          {segment.isLast ? (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-medium text-slate-700 dark:text-slate-300"
              aria-current="page"
            >
              {segment.label}
            </motion.span>
          ) : (
            <Link
              href={segment.href}
              className={cn(
                "rounded-lg px-1.5 py-1 text-slate-500 transition-colors",
                "hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
              )}
            >
              {segment.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
