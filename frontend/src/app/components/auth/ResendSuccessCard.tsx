"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ResendSuccessCardProps {
  email: string;
  onResend: () => void;
}

export function ResendSuccessCard({ email, onResend }: ResendSuccessCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Animated success icon with scale spring */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
        >
          <CheckCircle2 className="h-12 w-12 text-success" aria-hidden="true" />
        </motion.div>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-2xl font-bold text-text-primary"
      >
        Verification Email Sent
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-sm text-text-secondary max-w-sm"
      >
        We&apos;ve sent a new verification email to{" "}
        <span className="font-medium text-text-primary">{email}</span>. Please
        check your inbox and follow the instructions.
      </motion.p>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex w-full flex-col gap-3"
      >
        {/* Open Gmail button (UI only) */}
        <motion.a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                     hover:bg-primary-dark transition-all shadow-sm hover:shadow-md
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span>Open Gmail</span>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </motion.a>

        {/* Back to Login */}
        <Link
          href="/auth/login"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-6 py-2.5 text-sm font-medium text-text-primary
                     hover:border-primary/30 hover:bg-primary/[0.02] transition-all
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Back to Login
        </Link>
      </motion.div>

      {/* Resend link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-xs text-text-secondary"
      >
        Didn&apos;t receive it?{" "}
        <button
          type="button"
          onClick={onResend}
          className="font-medium text-primary hover:text-primary-dark transition-colors
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
        >
          Send another
        </button>
      </motion.p>
    </div>
  );
}
