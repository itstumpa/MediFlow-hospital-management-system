"use client";

import { fadeUp } from "@/lib/animations/fade";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { Review } from "@/lib/data/reviews";
import { motion } from "framer-motion";
import { MessageCircle, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";

interface PatientReviewPreviewProps {
  reviews: Review[];
}

export function PatientReviewPreview({ reviews }: PatientReviewPreviewProps) {
  if (reviews.length === 0) return null;

  return (
    <section aria-label="Patient reviews">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
        className="space-y-6"
      >
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <MessageCircle
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            />
            <h3 className="text-lg font-bold text-text-primary">
              What Patients Say
            </h3>
          </div>
          <button
            className="text-xs font-medium text-primary transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            aria-label="View all reviews"
          >
            View All ({reviews.length})
          </button>
        </motion.div>

        {/* Review cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((review, index) => (
            <motion.div
              key={review.id}
              variants={staggerItem}
              className="rounded-2xl border border-border/60 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Header */}
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
                    <p className="text-xs text-text-secondary">{review.date}</p>
                  </div>
                </div>
                {review.isVerified && (
                  <span className="flex items-center gap-1 rounded-full bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
                    Verified
                  </span>
                )}
              </div>

              {/* Stars */}
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

              {/* Comment */}
              <p className="mt-2 text-xs leading-relaxed text-text-secondary line-clamp-3">
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Helpful */}
              <div className="mt-3 flex items-center gap-1 text-xs text-text-secondary">
                <ThumbsUp className="h-3 w-3" aria-hidden="true" />
                <span>{review.helpful} found this helpful</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
