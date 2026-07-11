"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const starVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: 0.1 + i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function RatingSummary() {
  return (
    <motion.div
      className="mb-8 text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <div
        className="mb-3 flex items-center justify-center gap-1.5"
        aria-label="4.9 out of 5 stars"
      >
        {[1, 2, 3, 4, 5].map((star, i) => (
          <motion.span
            key={star}
            variants={starVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
          >
            <Star
              className={`h-6 w-6 ${
                star <= 4
                  ? "fill-amber-400 text-amber-400"
                  : "fill-amber-400/70 text-amber-400/70"
              }`}
              aria-hidden="true"
            />
          </motion.span>
        ))}
        <motion.span
          className="ml-2 text-2xl font-bold text-text-primary"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
          }}
        >
          4.9/5
        </motion.span>
      </div>
      <motion.p
        className="text-base font-medium text-text-secondary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Based on 12,000+ Patient Reviews
      </motion.p>
    </motion.div>
  );
}
