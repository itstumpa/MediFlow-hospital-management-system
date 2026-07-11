"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Soft medical gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />

        {/* Blurred circles */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 h-60 w-60 rounded-full bg-primary/3 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/3 h-40 w-40 rounded-full bg-accent/3 blur-2xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,124,123,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,124,123,0.3) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Centered form content — full width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex w-full items-center justify-center px-4 py-12"
      >
        <div className="w-full max-w-md">{children}</div>
      </motion.div>
    </div>
  );
}
