"use client";

import { fadeUpLarge } from "@/lib/animations/fade";
import type { Article } from "@/lib/data/articles";
import { motion } from "framer-motion";
import { BadgeCheck, Bookmark, Clock, Eye, Heart, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShareButtons } from "./ShareButtons";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.header
      variants={fadeUpLarge}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-page px-4 md:px-6 lg:px-8"
    >
      {/* Category & Meta row */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Link
          href={`/articles?category=${encodeURIComponent(article.category)}`}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {article.category}
        </Link>
        <span className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {article.readTime}
        </span>
        <span className="text-xs text-text-secondary">{article.date}</span>
        <span className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          {article.views.toLocaleString()} views
        </span>
      </div>

      {/* Title */}
      <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-4xl lg:text-5xl">
        {article.title}
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-lg leading-relaxed text-text-secondary md:text-xl">
        {article.subtitle}
      </p>

      {/* Author row */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/doctors`}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-border">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          </Link>
          <div>
            <div className="flex items-center gap-1.5">
              <Link
                href={`/doctors`}
                className="text-sm font-semibold text-text-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {article.author.name}
              </Link>
              <BadgeCheck
                className="h-4 w-4 text-primary"
                aria-label="Verified Doctor"
              />
            </div>
            <p className="text-sm text-text-secondary">
              {article.author.specialization} &middot;{" "}
              {article.author.experience} years experience
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Like */}
          <motion.button
            onClick={() => setIsLiked(!isLiked)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isLiked
                ? "border-red-200 bg-red-50 text-red-500"
                : "border-border text-text-secondary hover:border-red-200 hover:text-red-400"
            }`}
            aria-label={isLiked ? "Unlike article" : "Like article"}
          >
            <Heart
              className={`h-4 w-4 transition-all ${isLiked ? "fill-red-500" : ""}`}
              aria-hidden="true"
            />
          </motion.button>

          {/* Bookmark */}
          <motion.button
            onClick={() => setIsBookmarked(!isBookmarked)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isBookmarked
                ? "border-primary/20 bg-primary/5 text-primary"
                : "border-border text-text-secondary hover:border-primary/30 hover:text-primary"
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
          >
            <Bookmark
              className={`h-4 w-4 transition-all ${isBookmarked ? "fill-primary" : ""}`}
              aria-hidden="true"
            />
          </motion.button>

          {/* Print */}
          <motion.button
            onClick={() => window.print()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-all hover:border-primary/30 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Print article"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </div>
      </div>

      {/* Share buttons */}
      <div className="mt-6">
        <ShareButtons title={article.title} />
      </div>

      {/* Featured image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mt-8 aspect-[21/10] overflow-hidden rounded-2xl"
      >
        <Image
          src={article.largeImageUrl || article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 100vw, 1440px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </motion.div>
    </motion.header>
  );
}
