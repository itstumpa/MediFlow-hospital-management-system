"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AuthorInfo } from "./AuthorInfo";
import type { Article } from "./LatestArticles";

interface FeaturedArticleProps {
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

export function FeaturedArticle({ article, index }: FeaturedArticleProps) {
  return (
    <motion.article
      variants={featuredVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover="hover"
      className="group relative col-span-1 overflow-hidden rounded-2xl border border-primary/20 bg-surface shadow-sm transition-shadow duration-300 hover:shadow-2xl md:col-span-2 lg:col-span-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

          {/* Featured badge */}
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-primary-dark px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-primary/20">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Featured Article
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
        <div className="flex flex-col justify-center px-6 py-6 md:px-8 md:py-10">
          {/* Category */}
          <span
            className={`mb-3 inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium ${
              categoryColors[article.category] ??
              "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            {article.category}
          </span>

          {/* Date */}
          <p className="mb-2 text-sm font-medium text-text-secondary">
            {article.date}
          </p>

          {/* Title */}
          <h3 className="mb-3 text-2xl font-bold leading-snug tracking-tight text-text-primary transition-colors group-hover:text-primary md:text-3xl">
            {article.title}
          </h3>

          {/* Excerpt - longer for featured */}
          <p className="mb-6 text-base leading-relaxed text-text-secondary">
            {article.excerpt}
          </p>

          {/* Author */}
          <AuthorInfo author={article.author} />

          {/* Read More */}
          <Link
            href={`/articles/${article.id}`}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Read Full Article
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
      </div>
    </motion.article>
  );
}

const featuredVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  hover: {
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};
