"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Ban,
  RefreshCw,
  ServerCrash,
  WifiOff,
} from "lucide-react";

export type ResendErrorType =
  | "not-found"
  | "too-many-requests"
  | "network"
  | "server";

interface ResendErrorCardProps {
  type: ResendErrorType;
  onRetry: () => void;
}

const errorConfig: Record<
  ResendErrorType,
  { icon: typeof AlertTriangle; title: string; message: string }
> = {
  "not-found": {
    icon: Ban,
    title: "Email Not Found",
    message:
      "We couldn't find an account with that email address. Please check and try again.",
  },
  "too-many-requests": {
    icon: AlertTriangle,
    title: "Too Many Requests",
    message:
      "You've requested too many verification emails. Please wait a moment before trying again.",
  },
  network: {
    icon: WifiOff,
    title: "Network Error",
    message:
      "Unable to connect to our servers. Please check your internet connection and try again.",
  },
  server: {
    icon: ServerCrash,
    title: "Server Error",
    message:
      "Our servers are experiencing issues. Please try again in a few minutes.",
  },
};

export function ResendErrorCard({ type, onRetry }: ResendErrorCardProps) {
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center text-center"
      role="alert"
    >
      {/* Animated error illustration with shake */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 0.5 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-danger/10"
        >
          <Icon className="h-10 w-10 text-danger" aria-hidden="true" />
        </motion.div>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-xl font-bold text-text-primary"
      >
        {config.title}
      </motion.h2>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-sm text-text-secondary max-w-sm"
      >
        {config.message}
      </motion.p>

      {/* Retry button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <motion.button
          type="button"
          onClick={onRetry}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                     hover:bg-primary-dark transition-all shadow-sm hover:shadow-md
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
