"use client";

import { motion } from "framer-motion";
import { Headphones, MessageCircle, Phone } from "lucide-react";

const supportOptions = [
  {
    icon: Headphones,
    label: "Contact Support",
    description: "Email us anytime",
    href: "mailto:support@mediflow.com",
  },
  {
    icon: MessageCircle,
    label: "Live Chat",
    description: "Chat with our team",
    href: "#",
  },
  {
    icon: Phone,
    label: "Call Clinic",
    description: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
];

export function SupportCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-xl border border-border/50 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] p-5 shadow-sm"
    >
      <h3 className="text-sm font-semibold text-text-primary mb-1">
        Still having trouble?
      </h3>
      <p className="text-xs text-text-secondary mb-4">
        Our support team is here to help you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {supportOptions.map((option, index) => (
          <motion.a
            key={option.label}
            href={option.href}
            target={option.href.startsWith("http") ? "_blank" : undefined}
            rel={
              option.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center gap-2 rounded-lg border border-border/60 bg-surface px-3 py-3 text-center
                       hover:border-primary/30 hover:shadow-sm hover:bg-primary/[0.02]
                       transition-all duration-200 cursor-pointer
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`${option.label} — ${option.description}`}
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.4 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <option.icon size={15} aria-hidden="true" />
            </motion.div>
            <span className="text-xs font-medium text-text-primary">
              {option.label}
            </span>
            <span className="text-[10px] text-text-secondary leading-tight">
              {option.description}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
