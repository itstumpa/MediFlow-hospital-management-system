"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { AuthorInfo } from "./AuthorInfo";
import type { Article } from "./LatestArticles";

interface ArticleCardProps {
  article: Article;
  index: number;
}

const categoryColors: Record<string, string> = {
  "Heart Health": "bg-rose-100 text-rose-700 border-rose-200",
  "Mental Health": "bg-violet-100 text-violet-700 border-violet-200",
  "Women's Health": "bg-pink-100 text-pink-700 border-pink-200",
  "Child Care": "bg-amber-100 text-amber-700 border-amber-200",
  Nutrition: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Orthopedics: "bg-blue-100 text-blue-700 border-blue-200",
  "Preventive Care": "bg-teal-100 text-teal-700 border-teal-200",
};

export const ArticleCard = memo(function ArticleCard({
  article,
  index,
}: ArticleCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover="hover"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-sm ${
              categoryColors[article.category] ??
              "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            {article.category}
          </span>
        </div>

        {/* Reading time */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
          <Clock className="h-3 w-3" aria-hidden="true" />
          <span>{article.readTime}</span>
        </div>

        {/* Bookmark */}
        <motion.button
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-text-secondary shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label={`Bookmark article: ${article.title}`}
          whileHover={{ rotate: 15, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bookmark className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        {/* Date */}
        <p className="mb-2 text-xs font-medium text-text-secondary">
          {article.date}
        </p>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold leading-snug text-text-primary transition-colors group-hover:text-primary">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
          {article.excerpt}
        </p>

        {/* Author */}
        <AuthorInfo author={article.author} />

        {/* Read More */}
        <Link
          href={`/articles/${article.id}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Read Article
          <motion.span
            className="inline-flex"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </Link>
      </div>
    </motion.article>
  );
});

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  hover: {
    y: -6,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};
