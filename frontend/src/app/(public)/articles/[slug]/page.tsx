"use client";

import {
  ArticleHeader,
  AuthorCard,
  Comments,
  DetailBreadcrumb,
  Disclaimer,
  FinalCTA,
  KeyTakeaways,
  RelatedArticles,
  RelatedDoctors,
  RichArticle,
  ShareButtons,
  Sources,
  SymptomsTags,
  TableOfContents,
} from "@/app/components/articles";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { getArticleBySlug, getRelatedArticles } from "@/lib/data/articles";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const article = getArticleBySlug(slug);
  const relatedArticles = getRelatedArticles(slug, 3);

  if (!article) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-page px-4 pb-16 pt-6 md:px-6 lg:px-8 lg:pb-24">
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-primary/5 p-4">
              <svg
                className="h-12 w-12 text-primary/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">
              Article Not Found
            </h1>
            <p className="mt-2 max-w-md text-sm text-text-secondary">
              The article you are looking for does not exist or may have been
              removed. Please check the URL or browse our latest articles.
            </p>
            <Link
              href="/articles"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Articles
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="mx-auto max-w-page px-4 pb-16 pt-6 md:px-6 lg:px-8 lg:pb-24">
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.excerpt,
              image: article.largeImageUrl || article.imageUrl,
              datePublished: article.date,
              dateModified: article.modifiedDate || article.date,
              author: {
                "@type": "Person",
                name: article.author.name,
                description: article.author.specialization,
              },
              publisher: {
                "@type": "Organization",
                name: "MediFlow Health",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://mediflow.com/articles/${article.slug}`,
              },
              ...(article.relatedSymptoms?.length && {
                keywords: article.relatedSymptoms.join(", "),
              }),
            }),
          }}
        />

        {/* Breadcrumb */}
        <DetailBreadcrumb articleTitle={article.title} />

        {/* Article Header */}
        <ArticleHeader article={article} />

        {/* Main content area with table of contents */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
          {/* Main content column */}
          <div className="min-w-0">
            {/* Key Takeaways */}
            {article.keyTakeaways.length > 0 && (
              <KeyTakeaways takeaways={article.keyTakeaways} />
            )}

            {/* Rich Article Content */}
            <RichArticle content={article.content} />

            {/* Disclaimer */}
            <Disclaimer />

            {/* Symptoms Tags */}
            {article.relatedSymptoms.length > 0 && (
              <SymptomsTags symptoms={article.relatedSymptoms} />
            )}

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="my-8 flex items-center gap-4"
            >
              <span className="text-sm font-medium text-text-secondary">
                Share this article:
              </span>
              <ShareButtons title={article.title} />
            </motion.div>

            {/* Author Card */}
            <AuthorCard author={article.author} />

            {/* Related Doctors */}
            <RelatedDoctors category={article.category} />

            {/* Sources */}
            {article.sources.length > 0 && (
              <Sources sources={article.sources} />
            )}

            {/* Comments */}
            {article.sampleComments.length > 0 && (
              <Comments comments={article.sampleComments} />
            )}
          </div>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents sections={article.content} />
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} />
        )}

        {/* Final CTA */}
        <FinalCTA />
      </article>
    </PageTransition>
  );
}
