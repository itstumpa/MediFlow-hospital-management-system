"use client";

import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import Link from "next/link";

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function CTAButtons() {
  return (
    <motion.div variants={buttonVariants} className="flex flex-wrap gap-4">
      {/* Primary */}
      <Link
        href="/appointment"
        className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-lg shadow-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {/* Subtle ripple background */}
        <span className="absolute inset-0 bg-gradient-to-r from-white to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative flex items-center gap-2.5">
          Book Appointment
          <motion.span
            className="inline-flex"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </motion.span>
        </span>
      </Link>

      {/* Secondary */}
      <Link
        href="/doctors"
        className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-white/60 hover:bg-white/10 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <User className="h-5 w-5" aria-hidden="true" />
        Find a Doctor
      </Link>
    </motion.div>
  );
}
