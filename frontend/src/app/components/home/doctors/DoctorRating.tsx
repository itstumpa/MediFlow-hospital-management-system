"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface DoctorRatingProps {
  rating: number;
  reviewCount: number;
}

export function DoctorRating({ rating, reviewCount }: DoctorRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < fullStars;
          return (
            <motion.span
              key={i}
              whileHover={{ scale: 1.2, color: "#f59e0b" }}
              transition={{ duration: 0.15 }}
            >
              <Star
                className={`h-3.5 w-3.5 ${
                  isFilled
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }`}
                aria-hidden="true"
              />
            </motion.span>
          );
        })}
      </div>
      <span className="text-xs font-semibold text-text-primary">{rating}</span>
      <span className="text-xs text-text-secondary">
        ({reviewCount.toLocaleString()} reviews)
      </span>
    </div>
  );
}
