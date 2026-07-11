"use client";

import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-xl font-bold text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
        aria-label="MediFlow home"
      >
        <HeartPulse className="h-8 w-8 text-primary" aria-hidden="true" />
        <span>MediFlow</span>
      </Link>
    </motion.div>
  );
}
