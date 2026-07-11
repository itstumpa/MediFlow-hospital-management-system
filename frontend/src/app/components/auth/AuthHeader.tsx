"use client";

import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import Link from "next/link";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-2xl font-bold text-primary-dark hover:opacity-90 transition-opacity"
          aria-label="MediFlow home"
        >
          <HeartPulse className="h-8 w-8 text-primary" aria-hidden="true" />
          <span>MediFlow</span>
        </Link>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 text-2xl font-bold tracking-tight text-text-primary md:text-3xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-2 text-sm text-text-secondary leading-relaxed max-w-md mx-auto"
      >
        {description}
      </motion.p>
    </div>
  );
}
