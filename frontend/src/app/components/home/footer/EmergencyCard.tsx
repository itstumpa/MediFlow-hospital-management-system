"use client";

import { motion } from "framer-motion";
import { Ambulance, PhoneCall } from "lucide-react";
import Link from "next/link";

export function EmergencyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-accent/[0.02] px-6 py-5 shadow-lg shadow-accent/5 md:px-8"
    >
      {/* glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
        aria-hidden="true"
        animate={{
          boxShadow: [
            "inset 0 0 20px rgba(45,212,191,0)",
            "inset 0 0 40px rgba(45,212,191,0.1)",
            "inset 0 0 20px rgba(45,212,191,0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex flex-wrap items-center gap-5">
        {/* icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-accent/20"
        >
          <Ambulance className="h-6 w-6 text-accent" aria-hidden="true" />
        </motion.div>

        {/* text */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">Emergency?</h3>
          <p className="text-sm text-white/70">Need immediate medical assistance?</p>
        </div>

        {/* phone badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-5 py-2">
          <PhoneCall className="h-4 w-4 text-accent" aria-hidden="true" />
          <span className="text-sm font-semibold text-accent">+1 (800) 123-0000</span>
        </div>

        {/* cta */}
        <Link
          href="tel:+18001230000"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-primary-dark shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <PhoneCall className="h-4 w-4" aria-hidden="true" />
          Call now
        </Link>
      </div>
    </motion.div>
  );
}