"use client";

import { motion } from "framer-motion";

export function BackgroundDecorations() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Glowing circles */}
      <motion.div
        className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/[0.06] blur-3xl"
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/[0.04] blur-3xl"
        animate={{ x: [0, -10, 0], y: [0, 15, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 top-1/4 h-48 w-48 rounded-full bg-primary/[0.03] blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Medical plus symbols */}
      <svg
        className="absolute left-[8%] top-[15%] h-8 w-8 text-primary/[0.04]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 4v16M4 12h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute right-[12%] bottom-[20%] h-6 w-6 text-primary/[0.03]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 4v16M4 12h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute left-[60%] top-[60%] h-5 w-5 text-accent/[0.04]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 4v16M4 12h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Heartbeat line */}
      <svg
        className="absolute bottom-[30%] left-[5%] h-16 w-40 text-primary/[0.03]"
        viewBox="0 0 160 64"
        fill="none"
      >
        <path
          d="M0 32h20l10-20 10 40 10-40 10 40 10-20 10 20 10-40 10 40 10-20 20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Subtle grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.015]">
        <defs>
          <pattern
            id="cta-grid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </svg>
    </div>
  );
}
