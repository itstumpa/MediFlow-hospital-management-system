"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try again",
}: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
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
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle className="h-12 w-12 text-danger" aria-hidden="true" />
        </motion.div>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-4 text-lg font-semibold text-text-primary"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-1 text-sm text-text-secondary"
      >
        {message}
      </motion.p>
      {onRetry && (
        <motion.button
          type="button"
          onClick={onRetry}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-danger/10 px-4 py-2 text-sm font-medium text-danger
                     hover:bg-danger/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
        >
          <RefreshCw size={14} aria-hidden="true" />
          {retryLabel}
        </motion.button>
      )}
    </motion.div>
  );
}
