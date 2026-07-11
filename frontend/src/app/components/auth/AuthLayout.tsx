"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { AuthIllustration } from "./AuthIllustration";

interface AuthLayoutProps {
  children: ReactNode;
  illustration?: ReactNode;
}

export function AuthLayout({ children, illustration }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)]">
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

      {/* Main content */}
      <div className="flex w-full flex-col lg:flex-row">
        {/* Left — Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2 lg:px-8 xl:px-16"
        >
          <div className="w-full max-w-md">{children}</div>
        </motion.div>

        {/* Right — Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden lg:flex lg:w-1/2 lg:min-h-[calc(100vh-4rem)]"
        >
          <div className="relative w-full rounded-l-3xl bg-gradient-to-br from-primary/5 via-surface to-accent/5 border-l border-border/30 overflow-hidden">
            {illustration ?? <AuthIllustration />}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
