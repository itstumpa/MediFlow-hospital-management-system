import type { Article, ArticleFAQ } from "@/lib/data/articles";
import type { Metadata } from "next";

interface SEOInput {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  publishedDate?: string;
  modifiedDate?: string;
  category?: string;
  authorName?: string;
  faqs?: ArticleFAQ[];
}

const siteUrl = "https://mediflow.com";
const siteName = "MediFlow Health";

/**
 * Generates standard page metadata for article listing and detail pages.
 */
export function generateArticleMetadata({
  title,
  description,
  slug,
  imageUrl,
  publishedDate,
  modifiedDate,
  category,
  authorName,
}: SEOInput): Metadata {
  const url = `${siteUrl}/articles/${slug}`;
  const images = imageUrl
    ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: publishedDate ? "article" : "website",
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      images,
      ...(category && {
        tags: [category],
      }),
      ...(authorName && {
        authors: [authorName],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generates JSON-LD structured data for an article page.
 */
export function generateArticleJsonLd(article: Article): string {
  const jsonLd: Record<string, unknown> = {
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
      name: siteName,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/articles/${article.slug}`,
    },
    ...(article.relatedSymptoms?.length && {
      keywords: article.relatedSymptoms.join(", "),
    }),
  };

  return JSON.stringify(jsonLd);
}

/**
 * Generates JSON-LD BreadcrumbList structured data.
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[],
): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return JSON.stringify(jsonLd);
}

/**
 * Generates JSON-LD FAQPage structured data.
 */
export function generateFaqJsonLd(faqs: ArticleFAQ[]): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return JSON.stringify(jsonLd);
}

/**
 * Generates metadata for the articles listing page.
 */
export function generateArticlesListMetadata(): Metadata {
  return {
    title: "Health Articles & Medical Insights | MediFlow",
    description:
      "Expert-reviewed health articles, medical insights, and wellness guides from MediFlow's trusted healthcare professionals. Stay informed with evidence-based health information.",
    openGraph: {
      title: "Health Articles & Medical Insights | MediFlow",
      description:
        "Expert-reviewed health articles, medical insights, and wellness guides from MediFlow's trusted healthcare professionals.",
      url: `${siteUrl}/articles`,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Health Articles & Medical Insights | MediFlow",
      description:
        "Expert-reviewed health articles, medical insights, and wellness guides from MediFlow's trusted healthcare professionals.",
    },
    alternates: {
      canonical: `${siteUrl}/articles`,
    },
  };
}
