"use client";

import { motion, type Variants } from "framer-motion";
import { AlertCircle, RefreshCw, ShieldOff, WifiOff } from "lucide-react";
import Link from "next/link";

type ErrorVariant = "generic" | "expired" | "invalid" | "server" | "network";

interface ErrorCardProps {
  variant?: ErrorVariant;
  message?: string;
  onRetry?: () => void;
}

const errorConfig: Record<
  ErrorVariant,
  {
    icon: typeof AlertCircle;
    title: string;
    defaultMessage: string;
  }
> = {
  generic: {
    icon: AlertCircle,
    title: "Something went wrong",
    defaultMessage: "An unexpected error occurred. Please try again.",
  },
  expired: {
    icon: ShieldOff,
    title: "Reset Link Expired",
    defaultMessage:
      "Your password reset link has expired or is no longer valid.",
  },
  invalid: {
    icon: ShieldOff,
    title: "Invalid Reset Link",
    defaultMessage:
      "This password reset link is invalid. It may have already been used.",
  },
  server: {
    icon: AlertCircle,
    title: "Server Error",
    defaultMessage:
      "We couldn't process your request. Our team has been notified.",
  },
  network: {
    icon: WifiOff,
    title: "Network Error",
    defaultMessage:
      "Unable to connect. Please check your internet connection and try again.",
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const shakeVariants = {
  shake: {
    x: [0, -4, 4, -4, 4, -2, 2, 0],
    transition: { duration: 0.4 },
  },
};

export function ErrorCard({
  variant = "generic",
  message,
  onRetry,
}: ErrorCardProps) {
  const config = errorConfig[variant];
  const Icon = config.icon;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        variants={shakeVariants}
        animate="shake"
        className="flex flex-col items-center rounded-xl border border-danger/20 bg-danger/5 p-8 text-center"
        role="alert"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10">
            <Icon className="h-7 w-7 text-danger" aria-hidden="true" />
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-lg font-semibold text-text-primary"
        >
          {config.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-1 text-sm text-text-secondary max-w-sm"
        >
          {message ?? config.defaultMessage}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-col sm:flex-row gap-3 w-full"
        >
          {onRetry && (
            <motion.button
              type="button"
              onClick={onRetry}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-primary
                         hover:bg-background transition-colors
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <RefreshCw size={14} aria-hidden="true" />
              Try Again
            </motion.button>
          )}
          <Link
            href="/auth/forgot-password"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white
                       hover:bg-primary-dark transition-colors shadow-sm
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Request New Reset Link
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-3"
        >
          <Link
            href="/auth/login"
            className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          >
            Back to Login
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
