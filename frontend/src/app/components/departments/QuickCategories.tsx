"use client";

import { motion } from "framer-motion";
import {
  Ambulance,
  Baby,
  Bone,
  Brain,
  Dna,
  Eye,
  Heart,
  Leaf,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  All: Sparkles,
  "Heart Care": Heart,
  "Brain & Nerves": Brain,
  Children: Baby,
  "Women's Health": Heart,
  Orthopedics: Bone,
  Dermatology: Stethoscope,
  Emergency: Ambulance,
  Dental: Dna,
  "Eye Care": Eye,
  "Mental Health": Brain,
  Nutrition: Leaf,
};

interface QuickCategoriesProps {
  selected: string;
  onSelect: (category: string) => void;
}

export function QuickCategories({ selected, onSelect }: QuickCategoriesProps) {
  return (
    <section className="py-6">
      <div className="flex flex-wrap gap-2">
        {Object.entries(categoryIcons).map(([category, Icon]) => {
          const isActive = selected === category;
          return (
            <motion.button
              key={category}
              onClick={() => onSelect(category)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "border border-border bg-white text-text-secondary hover:border-primary/30 hover:text-primary hover:shadow-sm"
              }`}
              aria-pressed={isActive}
              aria-label={`Filter by ${category}`}
            >
              <Icon
                size={16}
                aria-hidden="true"
                className={isActive ? "" : "opacity-70"}
              />
              <span>{category}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
