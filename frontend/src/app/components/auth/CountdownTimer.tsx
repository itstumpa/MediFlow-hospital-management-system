"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  seconds: number;
  onComplete: () => void;
}

export function CountdownTimer({ seconds, onComplete }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [remaining, onComplete]);

  const secs = remaining % 60;
  const progress = 1 - remaining / seconds;
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      className="flex items-center justify-center gap-3 text-sm"
      role="timer"
      aria-live="polite"
      aria-label={`${remaining} seconds remaining`}
    >
      {/* Circular progress indicator */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          className="h-12 w-12 -rotate-90"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-border"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-primary"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <Timer className="absolute h-4 w-4 text-primary" aria-hidden="true" />
      </div>

      {/* Countdown text */}
      <div className="text-left">
        <p className="text-xs text-text-secondary">
          You can resend another email in
        </p>
        <p className="font-semibold text-text-primary">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={secs}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-block tabular-nums min-w-[2ch]"
            >
              {String(secs).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>{" "}
          second{secs !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
