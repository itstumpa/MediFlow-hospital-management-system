"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import { FeaturedArticle } from "./FeaturedArticle";
import { ViewAllArticles } from "./ViewAllArticles";

export interface Article {
  id: number;
  featured?: boolean;
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: {
    name: string;
    specialization: string;
    avatar: string;
  };
}

const articles: Article[] = [
  {
    id: 1,
    featured: true,
    category: "Heart Health",
    readTime: "5 min read",
    date: "May 12, 2026",
    title: "5 Everyday Habits That Keep Your Heart Healthy",
    excerpt:
      "Discover five simple yet powerful daily habits that can significantly improve your cardiovascular health. From mindful eating to stress management, our cardiologists share evidence-based practices that you can start incorporating into your routine today to build a healthier heart for years to come.",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    author: {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    },
  },
  {
    id: 2,
    category: "Mental Health",
    readTime: "4 min read",
    date: "May 10, 2026",
    title: "Understanding Anxiety: When to Seek Professional Help",
    excerpt:
      "Learn to recognize the signs of anxiety disorders and understand when it's time to consult a mental health professional. Early intervention can make a significant difference.",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    author: {
      name: "Dr. Emily Chen",
      specialization: "Psychiatrist",
      avatar:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
    },
  },
  {
    id: 3,
    category: "Nutrition",
    readTime: "6 min read",
    date: "May 8, 2026",
    title: "The Complete Guide to a Balanced Diet for All Ages",
    excerpt:
      "From children to seniors, nutritional needs evolve throughout life. Our dietitians break down what a truly balanced plate looks like at every stage.",
    imageUrl:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop",
    author: {
      name: "Dr. Priya Sharma",
      specialization: "Nutrition Specialist",
      avatar:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
    },
  },
  {
    id: 4,
    category: "Women's Health",
    readTime: "5 min read",
    date: "May 5, 2026",
    title: "Annual Wellness Exams: What Every Woman Should Know",
    excerpt:
      "Stay on top of your health with our comprehensive guide to annual wellness exams. Learn what screenings are recommended and when to schedule them.",
    imageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
    author: {
      name: "Dr. Lisa Park",
      specialization: "OB-GYN",
      avatar:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
    },
  },
  {
    id: 5,
    category: "Child Care",
    readTime: "4 min read",
    date: "May 3, 2026",
    title: "Vaccination Schedule: Protecting Your Child's Future",
    excerpt:
      "Stay informed about the recommended vaccination schedule for children. Our pediatricians explain each vaccine and why timely immunization matters.",
    imageUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop",
    author: {
      name: "Dr. Michael Torres",
      specialization: "Pediatrician",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function LatestArticles() {
  const featuredArticle = articles.find((a) => a.featured) ?? articles[0];
  const remainingArticles = articles.filter((a) => a.id !== featuredArticle.id);

  return (
    <section
      className="relative overflow-hidden bg-background py-6 md:py-10 lg:py-16"
      aria-labelledby="articles-heading"
    >
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/[0.02] blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-accent/[0.02] blur-3xl" />
        {/* Medical cross decoration */}
        <svg
          className="absolute right-[5%] top-[10%] h-32 w-32 text-primary/[0.03]"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M50 20v60M20 50h60"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
        <svg
          className="absolute bottom-[15%] left-[8%] h-24 w-24 text-primary/[0.02]"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M50 20v60M20 50h60"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
      </div>

      <motion.div
        className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Health Resources
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="articles-heading"
          variants={itemVariants}
          className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          Latest Health Articles & Tips
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          Explore expert-written health guides, wellness tips, and preventive
          care advice from our experienced medical professionals.
        </motion.p>

        {/* Articles Grid */}
        <motion.div variants={itemVariants} className="mt-12">
          {/* Featured article — full width */}
          <div className="mb-6 md:mb-8">
            <FeaturedArticle article={featuredArticle} index={0} />
          </div>

          {/* Remaining articles — responsive grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {remainingArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i + 1} />
            ))}
          </div>
        </motion.div>

        {/* View All */}
        <ViewAllArticles />

      </motion.div>
    </section>
  );
}
