"use client";

import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import Link from "next/link";
import { SocialIcons } from "./SocialIcons";

const brandVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function FooterBrand() {
  return (
    <motion.div variants={brandVariants} className="flex flex-col gap-5">
      <Link
        href="/"
        className="flex items-center gap-2 text-xl font-bold text-white"
        aria-label="MediFlow home"
      >
        <HeartPulse className="h-8 w-8 text-accent" aria-hidden="true" />
        <span>MediFlow</span>
      </Link>

      <p className="text-sm leading-relaxed text-white/50">
        Providing trusted healthcare services with experienced doctors and
        advanced medical technology.
      </p>

      <SocialIcons />
    </motion.div>
  );
}
