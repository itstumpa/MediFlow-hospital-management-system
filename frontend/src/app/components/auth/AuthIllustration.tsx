"use client";

import { motion } from "framer-motion";
import {
  Activity,
  HeartPulse,
  Microscope,
  Shield,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { TrustCards } from "./TrustCards";

export function AuthIllustration() {
  const iconRows = [
    { Icon: HeartPulse, delay: 0 },
    { Icon: Activity, delay: 0.2 },
    { Icon: Microscope, delay: 0.1 },
    { Icon: Syringe, delay: 0.3 },
    { Icon: Stethoscope, delay: 0.15 },
    { Icon: Shield, delay: 0.25 },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Subtle background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      {/* Floating medical icons at very low opacity */}
      <div className="absolute inset-0" aria-hidden="true">
        {iconRows.map(({ Icon, delay }, i) => {
          const row = Math.floor(i / 2);
          const col = i % 2;
          return (
            <motion.div
              key={i}
              className="absolute text-primary/10"
              style={{
                top: `${15 + row * 30}%`,
                left: `${15 + col * 55}%`,
              }}
              animate={{
                y: [-10, 10],
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            >
              <Icon size={48} />
            </motion.div>
          );
        })}
      </div>

      {/* Central illustration area */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 flex flex-col items-center gap-8 px-8"
      >
        {/* Main healthcare visual */}
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20"
          >
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-sm">
              <HeartPulse
                className="h-16 w-16 text-primary"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Orbiting rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[-20%] rounded-full border border-accent/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl bg-surface/80 backdrop-blur-md border border-border/60 px-6 py-4 shadow-sm text-center"
        >
          <div
            className="flex items-center justify-center gap-1"
            aria-label="5 out of 5 stars"
          >
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="h-4 w-4 fill-warning text-warning"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
          <p className="mt-2 text-sm font-medium text-text-primary">
            Trusted by 10,000+ patients
          </p>
          <p className="text-xs text-text-secondary">
            &ldquo;Exceptional care, seamless experience&rdquo;
          </p>
        </motion.div>

        {/* Floating trust cards */}
        <div className="relative w-full h-[320px]">
          <TrustCards />
        </div>
      </motion.div>
    </div>
  );
}
