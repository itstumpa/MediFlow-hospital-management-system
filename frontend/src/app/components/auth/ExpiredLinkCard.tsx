"use client";

import { motion } from "framer-motion";
import { RefreshCw, ShieldOff } from "lucide-react";
import Link from "next/link";

interface ExpiredLinkCardProps {
  message?: string;
}

export function ExpiredLinkCard({
  message = "Your password reset link has expired or is no longer valid.",
}: ExpiredLinkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, -3, 3, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-warning/10"
        >
          <ShieldOff className="h-12 w-12 text-warning" aria-hidden="true" />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-2xl font-bold text-text-primary"
      >
        Reset Link Expired
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-sm text-text-secondary max-w-sm"
      >
        {message}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row gap-3 w-full"
      >
        <Link
          href="/auth/forgot-password"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                     hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <RefreshCw size={15} aria-hidden="true" />
          Request New Link
        </Link>
        <Link
          href="/auth/login"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-6 py-2.5 text-sm font-medium text-text-primary
                     hover:bg-background transition-colors
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Return to Login
        </Link>
      </motion.div>
    </motion.div>
  );
}
