"use client";

import { motion } from "framer-motion";
import { Calendar, Heart, MessageCircle } from "lucide-react";

const actions = [
  { icon: Heart, label: "Save Doctor", ariaLabel: "Save doctor to favorites" },
  { icon: Calendar, label: "Schedule", ariaLabel: "Schedule appointment" },
  { icon: MessageCircle, label: "Chat", ariaLabel: "Chat with doctor" },
];

export function DoctorActions() {
  return (
    <div className="flex items-center justify-center gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.label}
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-secondary transition-colors duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={action.ariaLabel}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        );
      })}
    </div>
  );
}
