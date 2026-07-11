"use client";

import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export function ArticlesBreadcrumb() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-label="Breadcrumb"
      className="mx-auto max-w-page px-4 pt-6 md:px-6 lg:px-8"
    >
      <ol className="flex items-center gap-2 text-sm text-text-secondary">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="font-medium text-text-primary" aria-current="page">
            Health Articles
          </span>
        </li>
      </ol>
    </motion.nav>
  );
}
