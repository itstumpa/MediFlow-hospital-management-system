"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Clock, Star } from "lucide-react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  entranceDelay?: number;
  floatDuration?: number;
  floatDelay?: number;
}

function FloatingCard({
  children,
  className = "",
  entranceDelay = 0.8,
  floatDuration = 4,
  floatDelay = 0,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: entranceDelay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function HeroFloatingCards() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Card 1 — Appointment Confirmed */}
      <FloatingCard
        entranceDelay={0.8}
        floatDuration={4}
        floatDelay={0}
        className="absolute right-[10%] top-[8%]"
      >
        <div className="w-64 rounded-xl border border-white/20 bg-white/95 p-4 shadow-xl backdrop-blur-md">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <CalendarCheck className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                Appointment Confirmed
              </p>
              <p className="mt-1 text-base font-semibold text-text-primary">
                Tomorrow &middot; 9:30 AM
              </p>
              <p className="mt-0.5 text-sm text-text-secondary">
                Dr. Sarah Johnson &middot; Cardiology
              </p>
            </div>
          </div>
        </div>
      </FloatingCard>

      {/* Card 2 — Rating */}
      <FloatingCard
        entranceDelay={1.0}
        floatDuration={5}
        floatDelay={0.5}
        className="absolute right-[2%] top-[38%]"
      >
        <div className="w-48 rounded-xl border border-white/20 bg-white/95 p-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
            <span className="text-2xl font-bold text-text-primary">4.9</span>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            <strong className="text-text-primary">20,000+</strong> Happy
            Patients
          </p>
        </div>
      </FloatingCard>

      {/* Card 3 — Available Today */}
      <FloatingCard
        entranceDelay={1.2}
        floatDuration={3.5}
        floatDelay={1.0}
        className="absolute bottom-[12%] right-[15%]"
      >
        <div className="w-56 rounded-xl border border-white/20 bg-white/95 p-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-text-primary">
              Available Today
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Cardiology
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Neurology
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Dentistry
            </span>
          </div>
        </div>
      </FloatingCard>
    </div>
  );
}
