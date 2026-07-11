"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="mt-6 text-center text-sm text-text-secondary"
    >
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-primary hover:text-primary-dark transition-colors
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
      >
        {linkText}
      </Link>
    </motion.p>
  );
}
