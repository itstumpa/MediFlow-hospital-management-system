"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

interface LoadingButtonProps {
  type?: "button" | "submit";
  loading?: boolean;
  disabled?: boolean;
  children: string;
  className?: string;
  showArrow?: boolean;
}

export function LoadingButton({
  type = "submit",
  loading = false,
  disabled = false,
  children,
  className = "",
  showArrow = true,
}: LoadingButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      className={`group relative w-full overflow-hidden rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                 shadow-sm transition-all duration-200
                 hover:bg-primary-dark hover:shadow-md
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:shadow-none
                 ${className}`}
      aria-busy={loading}
    >
      {/* Ripple effect container */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {loading ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-4 w-4" aria-hidden="true" />
            </motion.span>
            <span>Please wait...</span>
            <span className="sr-only">Loading</span>
          </>
        ) : (
          <>
            <span>{children}</span>
            {showArrow && (
              <motion.span
                initial={{ x: 0, opacity: 0.6 }}
                whileHover={{ x: 3, opacity: 1 }}
                className="inline-flex"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.span>
            )}
          </>
        )}
      </span>
    </motion.button>
  );
}
