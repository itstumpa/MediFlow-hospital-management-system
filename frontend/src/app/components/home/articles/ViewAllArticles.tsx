"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ViewAllArticles() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      className="mt-10 text-center"
    >
      <Link
        href="/articles"
        className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-border bg-surface px-8 py-3.5 text-sm font-semibold text-text-primary shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        View All Articles
        <motion.span
          className="inline-flex"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ArrowRight className="h-5 w-5 text-primary" aria-hidden="true" />
        </motion.span>
      </Link>
    </motion.div>
  );
}
