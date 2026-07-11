"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import { motion } from "framer-motion";
import { ExternalLink, ScrollText } from "lucide-react";
import Link from "next/link";

interface SourcesProps {
  sources: { label: string; url: string }[];
}

export function Sources({ sources }: SourcesProps) {
  if (sources.length === 0) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="my-10 rounded-2xl border border-border bg-surface p-6 md:p-8"
    >
      <motion.div
        variants={staggerItem}
        className="mb-5 flex items-center gap-2"
      >
        <ScrollText className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-text-primary">
          Sources & References
        </h3>
      </motion.div>

      <motion.ul
        variants={staggerItem}
        className="space-y-3"
        role="list"
        aria-label="Article sources"
      >
        {sources.map((source, idx) => (
          <li key={idx}>
            <Link
              href={source.url}
              className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-all hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {idx + 1}
              </span>
              <span className="underline-offset-2 group-hover:underline">
                {source.label}
              </span>
              <ExternalLink
                className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
