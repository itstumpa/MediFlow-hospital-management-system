"use client";

import { fadeUp } from "@/lib/animations/fade";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { Review } from "@/lib/data/reviews";
import { motion } from "framer-motion";
import { Star, ThumbsUp } from "lucide-react";
import Image from "next/image";

interface PatientReviewsProps {
  reviews: Review[];
  average: number;
  total: number;
  distribution: Record<number, number>;
}

export function PatientReviews({
  reviews,
  average,
  total,
  distribution,
}: PatientReviewsProps) {
  return (
    <section id="reviews">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <h2 className="text-2xl font-bold text-text-primary">
          Patient Reviews
        </h2>

        <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Rating Summary */}
          <div className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm">
            <div className="text-center">
              <p className="text-5xl font-bold text-text-primary">
                {average.toFixed(1)}
              </p>
              <div className="mt-2 flex items-center justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(average)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-text-secondary">
                {total.toLocaleString()} reviews
              </p>
            </div>

            {/* Distribution bars */}
            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = distribution[star] || 0;
                const pct = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-8 text-right text-text-secondary">
                      {star}
                    </span>
                    <Star
                      className="h-3 w-3 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-background">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        className="h-full rounded-full bg-amber-400"
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    <span className="w-8 text-right text-text-secondary">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={staggerItem}
                className="rounded-2xl border border-border/50 bg-surface p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={review.patientAvatar}
                        alt={review.patientName}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {review.patientName}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  {review.isVerified && (
                    <span className="rounded-full bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
                      Verified
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  &ldquo;{review.comment}&rdquo;
                </p>

                <div className="mt-3 flex items-center gap-1 text-xs text-text-secondary">
                  <ThumbsUp className="h-3 w-3" aria-hidden="true" />
                  <span>{review.helpful} found this helpful</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
