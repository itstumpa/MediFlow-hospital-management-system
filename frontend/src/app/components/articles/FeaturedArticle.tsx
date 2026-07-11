"use client";

import type { Article } from "@/lib/data/articles";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  Clock,
  Eye,
  Share2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      className="group relative mx-auto max-w-page overflow-hidden rounded-2xl border border-primary/20 bg-surface shadow-sm transition-shadow duration-500 hover:shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[500px]">
          <Image
            src={article.largeImageUrl || article.imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
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
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center px-6 py-6 md:px-10 md:py-12">
          {/* Category */}
          <span className="mb-3 inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {article.category}
          </span>

          {/* Date */}
          <p className="mb-2 text-sm font-medium text-text-secondary">
            {article.date}
          </p>

          {/* Title */}
          <h2 className="mb-3 text-2xl font-bold leading-snug tracking-tight text-text-primary transition-colors group-hover:text-primary md:text-3xl">
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="mb-6 text-base leading-relaxed text-text-secondary">
            {article.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-border">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {article.author.name}
              </p>
              <p className="text-xs text-text-secondary">
                {article.author.specialization}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/articles/${article.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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

            <motion.button
              onClick={() => setIsBookmarked(!isBookmarked)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isBookmarked
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface text-text-secondary hover:border-primary/30 hover:text-primary"
              }`}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
            >
              <Bookmark
                className={`h-4 w-4 transition-all ${isBookmarked ? "fill-primary" : ""}`}
                aria-hidden="true"
              />
            </motion.button>

            <motion.button
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-all hover:border-primary/30 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Share article"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          </div>

          {/* Stats */}
          <div className="mt-5 flex items-center gap-4 text-xs text-text-secondary">
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              {article.views.toLocaleString()} views
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
