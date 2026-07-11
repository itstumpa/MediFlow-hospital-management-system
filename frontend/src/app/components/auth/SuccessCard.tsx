"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Timer } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SuccessCardProps {
  redirectDelay?: number;
}

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: (i * 360) / 12,
  distance: 60 + Math.random() * 40,
}));

export function SuccessCard({ redirectDelay = 5 }: SuccessCardProps) {
  const [countdown, setCountdown] = useState(redirectDelay);

  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = "/auth/login";
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex flex-col items-center text-center"
    >
      {/* Confetti-like particles */}
      <div className="relative" aria-hidden="true">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="relative flex h-24 w-24 items-center justify-center">
            {/* Particle burst */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute h-2 w-2 rounded-full"
                style={{
                  background:
                    p.id % 3 === 0
                      ? "var(--color-primary)"
                      : p.id % 3 === 1
                        ? "var(--color-accent)"
                        : "var(--color-warning)",
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: [
                    0,
                    Math.cos((p.angle * Math.PI) / 180) * p.distance,
                    Math.cos((p.angle * Math.PI) / 180) * p.distance * 1.2,
                  ],
                  y: [
                    0,
                    Math.sin((p.angle * Math.PI) / 180) * p.distance,
                    Math.sin((p.angle * Math.PI) / 180) * p.distance * 1.2,
                  ],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Central check icon */}
            <motion.div
              className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.15,
                }}
              >
                <CheckCircle2
                  className="h-10 w-10 text-success"
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-6 text-2xl font-bold text-text-primary"
      >
        Password Updated Successfully
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mt-2 text-sm text-text-secondary max-w-sm"
      >
        Your password has been changed successfully. You can now securely sign
        in using your new password.
      </motion.p>

      {/* Countdown indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="mt-4 flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-xs text-text-secondary"
      >
        <Timer size={12} className="text-primary" aria-hidden="true" />
        <span>
          Redirecting to login in{" "}
          <span className="font-medium text-text-primary">{countdown}</span>
          {countdown === 1 ? " second" : " seconds"}...
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex flex-col sm:flex-row gap-3 w-full"
      >
        <Link
          href="/auth/login"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white
                     hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Go to Login
        </Link>
        <Link
          href="/"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-6 py-2.5 text-sm font-medium text-text-primary
                     hover:bg-background transition-colors
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Go to Homepage
        </Link>
      </motion.div>
    </motion.div>
  );
}
