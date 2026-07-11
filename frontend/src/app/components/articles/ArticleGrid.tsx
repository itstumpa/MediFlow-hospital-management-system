"use client";

import { staggerContainer } from "@/lib/animations/stagger";
import type { Article } from "@/lib/data/articles";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <FileText className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-text-primary">
          No articles found
        </h3>
        <p className="max-w-md text-text-secondary">
          We couldn&apos;t find any articles matching your search. Try adjusting
          your filters or search terms.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Articles grid"
    >
      {articles.map((article, index) => (
        <div key={article.id} role="listitem">
          <ArticleCard article={article} index={index} />
        </div>
      ))}
    </motion.div>
  );
}
