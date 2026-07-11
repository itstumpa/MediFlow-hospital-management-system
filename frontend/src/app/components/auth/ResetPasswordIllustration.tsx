"use client";

import { motion } from "framer-motion";
import {
  Activity,
  HeartPulse,
  Lock,
  Microscope,
  Shield,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { ResetPasswordTrustCards } from "./ResetPasswordTrustCards";

export function ResetPasswordIllustration() {
  const iconRows = [
    { Icon: Lock, delay: 0 },
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
        transition={{
          duration: 0.7,
          delay: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="relative z-10 flex flex-col items-center gap-8 px-8"
      >
        {/* Security-themed visual */}
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20"
          >
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-sm">
              <Lock className="h-16 w-16 text-primary" aria-hidden="true" />
            </div>
          </motion.div>

          {/* Orbiting rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/10"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-[-20%] rounded-full border border-accent/10"
            animate={{ rotate: -360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl bg-surface/80 backdrop-blur-md border border-border/60 px-6 py-4 shadow-sm text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeartPulse
              className="mx-auto h-6 w-6 text-primary"
              aria-hidden="true"
            />
          </motion.div>
          <p className="mt-2 text-sm font-medium text-text-primary">
            Your security matters
          </p>
          <p className="text-xs text-text-secondary">
            Enterprise-grade protection
          </p>
        </motion.div>

        {/* Floating trust cards */}
        <div className="relative w-full h-[320px]">
          <ResetPasswordTrustCards />
        </div>
      </motion.div>
    </div>
  );
}
