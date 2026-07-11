"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { Article } from "@/lib/data/articles";
import { motion } from "framer-motion";
import { Bookmark, Clock, Eye, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface TrendingArticlesProps {
  articles: Article[];
}

export function TrendingArticles({ articles }: TrendingArticlesProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (articles.length === 0) return null;

  return (
    <section
      className="mx-auto max-w-page px-4 py-8 md:px-6 lg:px-8"
      aria-labelledby="trending-heading"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div
          variants={staggerItem}
          className="mb-6 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-primary text-white shadow-md">
            <TrendingUp className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="trending-heading"
              className="text-xl font-bold text-text-primary"
            >
              Trending Now
            </h2>
            <p className="text-sm text-text-secondary">
              Most popular articles this week
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Horizontal scroll */}
      <div
        className="hide-scrollbar -mx-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8"
        role="list"
        aria-label="Trending articles"
      >
        <div className="flex gap-4" style={{ minWidth: "max-content" }}>
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -4 }}
              className="group w-[280px] flex-shrink-0 overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-shadow duration-300 hover:shadow-lg"
              role="listitem"
            >
              <Link
                href={`/articles/${article.slug}`}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </Link>

              <div className="p-4">
                <Link
                  href={`/articles/${article.slug}`}
                  className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug text-text-primary transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                </Link>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" aria-hidden="true" />
                      {article.views >= 1000
                        ? `${(article.views / 1000).toFixed(1)}k`
                        : article.views}
                    </span>
                  </div>

                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleBookmark(article.id);
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
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
                      className={`h-3.5 w-3.5 transition-all ${
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
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
