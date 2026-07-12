"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { DoctorReview } from "@/lib/data/admin-doctors";
import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import { EmptyState } from "./EmptyState";

interface ReviewsTabProps {
  reviews: DoctorReview[];
  averageRating: number;
  totalReviews: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200 dark:fill-slate-600 dark:text-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsTab({
  reviews,
  averageRating,
  totalReviews,
}: ReviewsTabProps) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No Reviews"
        description="This doctor has not received any reviews yet."
      />
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Average Rating Summary */}
      <motion.div
        variants={staggerItem}
        className="dash-card flex items-center gap-6 p-5"
      >
        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/30">
          <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-[10px] font-medium text-amber-500">
            out of 5
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Based on {totalReviews.toLocaleString()} reviews
          </p>
        </div>
      </motion.div>

      {/* Review Cards */}
      <div className="grid gap-4">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            variants={staggerItem}
            className="dash-card p-5 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={review.patientAvatar}
                    alt={review.patientName}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {review.patientName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Visited on {review.visitDate}
                  </p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              &ldquo;{review.comment}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
