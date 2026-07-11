"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { Article } from "@/lib/data/articles";
import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  if (articles.length === 0) return null;

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="my-10"
      aria-labelledby="related-articles-heading"
    >
      <motion.h3
        id="related-articles-heading"
        variants={staggerItem}
        className="mb-6 text-xl font-bold text-text-primary"
      >
        Related Articles
      </motion.h3>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, idx) => (
          <motion.article
            key={article.id}
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className="group overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-lg"
          >
            <Link
              href={`/articles/${article.slug}`}
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-primary backdrop-blur-sm">
                  {article.category}
                </span>
              </div>
            </Link>

            <div className="p-4">
              <div className="mb-2 flex items-center gap-2 text-xs text-text-secondary">
                <span>{article.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {article.readTime}
                </span>
              </div>

              <Link
                href={`/articles/${article.slug}`}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <h4 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug text-text-primary transition-colors group-hover:text-primary">
                  {article.title}
                </h4>
              </Link>

              <div className="flex items-center justify-between">
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-dark"
                >
                  Read More
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>

                <motion.button
                  onClick={() => toggleBookmark(article.id)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    bookmarkedIds.has(article.id)
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary"
                  }`}
                  aria-label={
                    bookmarkedIds.has(article.id)
                      ? "Remove bookmark"
                      : "Bookmark article"
                  }
                >
                  <Bookmark
                    className={`h-3.5 w-3.5 ${
                      bookmarkedIds.has(article.id) ? "fill-primary" : ""
                    }`}
                    aria-hidden="true"
                  />
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
