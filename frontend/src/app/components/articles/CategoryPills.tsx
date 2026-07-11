"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";

interface CategoryPillsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const categoryEmojis: Record<string, string> = {
  "Heart Health": "❤️",
  "Mental Health": "🧠",
  Nutrition: "🥗",
  "Women's Health": "👩",
  Children: "👶",
  Diabetes: "🩸",
  "Skin Care": "✨",
  Emergency: "🚨",
  Fitness: "💪",
  Pregnancy: "🤰",
  Vaccination: "💉",
  "Senior Care": "👴",
};

export function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsProps) {
  return (
    <section className="mx-auto max-w-page px-4 py-6 md:px-6 lg:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Article categories"
      >
        <motion.button
          variants={staggerItem}
          onClick={() => onSelect("")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            selectedCategory === ""
              ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
              : "border-border bg-surface text-text-secondary hover:border-primary/30 hover:text-primary"
          }`}
          aria-pressed={selectedCategory === ""}
        >
          All
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category}
            variants={staggerItem}
            onClick={() => onSelect(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              selectedCategory === category
                ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                : "border-border bg-surface text-text-secondary hover:border-primary/30 hover:text-primary"
            }`}
            aria-pressed={selectedCategory === category}
          >
            <span className="mr-1.5">{categoryEmojis[category] || "📋"}</span>
            {category}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
