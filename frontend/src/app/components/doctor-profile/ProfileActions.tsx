"use client";

import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { Bookmark, Heart, Printer, Send, Share2 } from "lucide-react";
import { useState } from "react";

interface ProfileActionsProps {
  doctor: Doctor;
}

export function ProfileActions({ doctor }: ProfileActionsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const actions = [
    {
      icon: isFavorited ? Heart : Heart,
      label: isFavorited ? "Saved" : "Save",
      isActive: isFavorited,
      onClick: () => setIsFavorited(!isFavorited),
      activeClass: "text-red-500",
    },
    {
      icon: Bookmark,
      label: isSaved ? "Bookmarked" : "Bookmark",
      isActive: isSaved,
      onClick: () => setIsSaved(!isSaved),
      activeClass: "text-primary",
    },
    {
      icon: Share2,
      label: "Share",
      onClick: () => {
        if (navigator.share) {
          navigator.share({ title: doctor.name, url: window.location.href });
        } else {
          navigator.clipboard.writeText(window.location.href);
        }
      },
    },
    {
      icon: Printer,
      label: "Print",
      onClick: () => window.print(),
    },
    {
      icon: Send,
      label: "Refer",
      onClick: () => {
        const subject = encodeURIComponent(
          `Check out ${doctor.name} at MediFlow`,
        );
        const body = encodeURIComponent(
          `I found this doctor on MediFlow: ${window.location.href}`,
        );
        window.open(`mailto:?subject=${subject}&body=${body}`);
      },
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        const btn = (
          <button
            onClick={action.onClick}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              action.isActive
                ? `${action.activeClass} border-current bg-background`
                : "border-border text-text-secondary hover:text-text-primary"
            }`}
            aria-label={action.label}
          >
            <Icon
              className={`h-3.5 w-3.5 ${action.isActive ? "fill-current" : ""}`}
              aria-hidden="true"
            />
            {action.label}
          </button>
        );

        return (
          <motion.div
            key={action.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {btn}
          </motion.div>
        );
      })}
    </div>
  );
}
