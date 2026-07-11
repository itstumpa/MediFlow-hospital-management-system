"use client";

import { motion } from "framer-motion";
import { Check, Link, X } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url?: string;
  compact?: boolean;
}

export function ShareButtons({
  title,
  url,
  compact = false,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const FacebookIcon = () => (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );

  const LinkedinIcon = () => (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const shareLinks = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: FacebookIcon,
      color: "hover:text-[#1877F2]",
    },
    {
      name: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      icon: () => <X className="h-4 w-4" aria-hidden="true" />,
      color: "hover:text-[#1DA1F2]",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: LinkedinIcon,
      color: "hover:text-[#0A66C2]",
    },
  ];

  const buttonBase = `flex items-center justify-center rounded-full border border-border bg-surface transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
    compact ? "h-9 w-9" : "h-10 w-10"
  }`;

  return (
    <div
      className={`flex items-center gap-2 ${compact ? "" : ""}`}
      role="group"
      aria-label="Share article"
    >
      {shareLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={`${buttonBase} text-text-secondary ${link.color}`}
          aria-label={`Share on ${link.name}`}
        >
          {link.icon()}
        </motion.a>
      ))}

      <motion.button
        onClick={copyLink}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${buttonBase} ${
          copied
            ? "border-primary/30 bg-primary/5 text-primary"
            : "text-text-secondary hover:border-primary/30 hover:text-primary"
        }`}
        aria-label={copied ? "Link copied" : "Copy link"}
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Link className="h-4 w-4" aria-hidden="true" />
        )}
      </motion.button>
    </div>
  );
}
