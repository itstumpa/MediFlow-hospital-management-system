"use client";

import { fadeUp } from "@/lib/animations/fade";
import { staggerContainer, staggerItemScale } from "@/lib/animations/stagger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import Link from "next/link";

interface SocialPlatform {
  name: string;
  href: string;
  color: string;
  hoverBg: string;
  icon: React.ReactNode;
}

const platforms: SocialPlatform[] = [
  {
    name: "Facebook",
    href: "#",
    color: "text-[#1877F2]",
    hoverBg: "hover:bg-[#1877F2]/10",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    color: "text-[#E4405F]",
    hoverBg: "hover:bg-[#E4405F]/10",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Zm0 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10Zm-5 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4.5-3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    color: "text-[#0A66C2]",
    hoverBg: "hover:bg-[#0A66C2]/10",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    color: "text-[#FF0000]",
    hoverBg: "hover:bg-[#FF0000]/10",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM10 15.5V8.5l6 3.5-6 3.5z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "#",
    color: "text-text-primary",
    hoverBg: "hover:bg-text-primary/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function SocialLinks() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <motion.div
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          className="mb-10 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
            <Share2 className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-[28px] font-bold leading-[1.15] tracking-tight text-text-primary sm:text-3xl md:text-4xl">
            Follow Us
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
            Stay connected with MediFlow on social media for health tips,
            updates, and community stories.
          </p>
        </motion.div>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.name}
              variants={reduced ? undefined : staggerItemScale}
              whileHover={
                reduced
                  ? undefined
                  : {
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 },
                    }
              }
              whileTap={reduced ? undefined : { scale: 0.95 }}
            >
              <Link
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow MediFlow on ${platform.name}`}
                className={`flex items-center gap-3 rounded-xl border border-border ${platform.hoverBg} px-5 py-3.5 text-sm font-medium text-text-primary shadow-sm transition-all duration-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
              >
                <span className={platform.color}>{platform.icon}</span>
                <span>{platform.name}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.p
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={reduced ? undefined : { once: true, amount: 0.1 }}
          className="mt-8 text-center text-xs text-text-secondary/60"
        >
          Join our growing community of 50,000+ followers
        </motion.p>
      </div>
    </section>
  );
}
