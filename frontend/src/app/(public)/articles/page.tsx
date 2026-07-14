"use client";

import {
  ArticleGrid,
  ArticlesBreadcrumb,
  ArticlesHeader,
  CategoryPills,
  CTA,
  FeaturedArticle,
  Pagination,
  SearchFilters,
  TrendingArticles,
} from "@/app/components/articles";
import { PageTransition } from "@/app/components/ui/PageTransition";
import {
  articles,
  featuredArticle,
  getUniqueCategories,
  trendingArticles,
} from "@/lib/data/articles";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ARTICLES_PER_PAGE = 9;

export default function ArticlesPage() {
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeCategory, setActiveCategory] = useState("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    selectedAuthor,
    selectedTime,
    sortBy,
    activeCategory,
  ]);

  const categories = useMemo(() => {
    const cats = getUniqueCategories();
    return ["All", ...cats];
  }, []);

  // Filter articles (excluding featured)
  const regularArticles = useMemo(() => {
    return articles.filter((a) => a.slug !== featuredArticle.slug);
  }, []);

  const filteredArticles = useMemo(() => {
    let filtered = [...regularArticles];

    // Category pill filter
    if (activeCategory !== "All") {
      filtered = filtered.filter((a) => a.category === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.author.name.toLowerCase().includes(q),
      );
    }

    // Category dropdown filter
    if (selectedCategory) {
      filtered = filtered.filter((a) => a.category === selectedCategory);
    }

    // Author filter
    if (selectedAuthor) {
      filtered = filtered.filter((a) => a.author.name === selectedAuthor);
    }

    // Reading time filter
    if (selectedTime) {
      const maxMin = parseInt(selectedTime, 10);
      filtered = filtered.filter((a) => {
        const min = parseInt(a.readTime, 10);
        return !isNaN(min) && min <= maxMin;
      });
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case "popular":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "trending":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    return filtered;
  }, [
    regularArticles,
    searchQuery,
    selectedCategory,
    selectedAuthor,
    selectedTime,
    sortBy,
    activeCategory,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  // Determine if any filters are active
  const hasActiveFilters = !!(
    searchQuery ||
    selectedCategory ||
    selectedAuthor ||
    selectedTime ||
    activeCategory !== "All"
  );

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedAuthor("");
    setSelectedTime("");
    setSortBy("newest");
    setActiveCategory("All");
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-page px-4 pb-16 pt-6 md:px-6 lg:px-8 lg:pb-24">
        {/* Breadcrumb */}
        <ArticlesBreadcrumb />

        {/* Header */}
        <ArticlesHeader />

        {/* Featured Article */}
        <section className="mt-8">
          <FeaturedArticle article={featuredArticle} />
        </section>

        {/* Search & Filters */}
        <section className="mt-8">
          <SearchFilters
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedAuthor={selectedAuthor}
            selectedTime={selectedTime}
            selectedSort={sortBy}
            categories={categories}
            hasActiveFilters={hasActiveFilters}
            onSearchChange={setSearchQuery}
            onCategoryChange={(value) => {
              setSelectedCategory(value);
              setActiveCategory("All");
            }}
            onAuthorChange={setSelectedAuthor}
            onTimeChange={setSelectedTime}
            onSortChange={setSortBy}
            onClear={clearFilters}
          />
        </section>

        {/* Category Pills */}
        <section className="mt-6">
          <CategoryPills
            categories={categories}
            selectedCategory={activeCategory}
            onSelect={(cat) => {
              setActiveCategory(cat);
              setSelectedCategory("");
            }}
          />
        </section>

        {/* Trending Articles */}
        {trendingArticles.length > 0 && (
          <section className="mt-10">
            <TrendingArticles articles={trendingArticles} />
          </section>
        )}

        {/* Article Grid */}
        <section className="mt-10">
          <AnimatePresence mode="wait">
            {paginatedArticles.length > 0 ? (
              <motion.div
                key={currentPage + activeCategory + searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ArticleGrid articles={paginatedArticles} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="mb-4 rounded-full bg-primary/5 p-4">
                  <svg
                    className="h-10 w-10 text-primary/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  No articles found
                </h3>
                <p className="mt-2 max-w-md text-sm text-text-secondary">
                  Try adjusting your search or filter criteria to find what
                  you&apos;re looking for.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </section>
        )}

        {/* CTA */}
        <section className="mt-8">
          <CTA />
        </section>
      </div>
    </PageTransition>
  );
}
