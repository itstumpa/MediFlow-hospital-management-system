"use client";

import { fadeUpLarge } from "@/lib/animations/fade";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export function ArticlesHeader() {
  return (
    <motion.div
      variants={fadeUpLarge}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-page px-4 py-8 text-center md:px-6 md:py-12 lg:px-8 lg:py-14"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
      >
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        Health Resources
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-balance text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl"
      >
        Health Articles & Medical Insights
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg"
      >
        Explore expert-written articles, wellness guides, preventive healthcare
        tips, and trusted medical information from our specialists.
      </motion.p>
    </motion.div>
  );
}
