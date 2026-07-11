"use client";

import type { Article } from "@/lib/data/articles";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link
          href={`/articles/${article.slug}`}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </Link>

        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur-sm">
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
          onClick={(e) => {
            e.preventDefault();
            setIsBookmarked(!isBookmarked);
          }}
          whileHover={{ rotate: 15, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-text-secondary shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
        >
          <Bookmark
            className={`h-4 w-4 transition-all ${isBookmarked ? "fill-primary text-primary" : ""}`}
            aria-hidden="true"
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        {/* Date */}
        <p className="mb-2 text-xs font-medium text-text-secondary">
          {article.date}
        </p>

        {/* Title */}
        <Link
          href={`/articles/${article.slug}`}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <h3 className="mb-2 text-lg font-semibold leading-snug text-text-primary transition-colors group-hover:text-primary">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
          {article.excerpt}
        </p>

        {/* Author */}
        <div className="mb-4 flex items-center gap-2.5">
          <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-border">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate text-sm font-semibold text-text-primary">
                {article.author.name}
              </span>
              <BadgeCheck
                className="h-3.5 w-3.5 flex-shrink-0 text-primary"
                aria-label="Verified Doctor"
              />
            </div>
            <p className="truncate text-xs text-text-secondary">
              {article.author.specialization}
            </p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-3 text-xs text-text-secondary">
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              {article.views >= 1000
                ? `${(article.views / 1000).toFixed(1)}k`
                : article.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" aria-hidden="true" />
              {article.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {article.comments}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Share article"
            >
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.button>
          </div>
        </div>

        {/* Read More */}
        <Link
          href={`/articles/${article.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
}
