"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface PasswordChecklistProps {
  password: string;
}

const requirements = [
  { label: "Minimum 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  {
    label: "One special character",
    test: (p: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p),
  },
];

export function PasswordChecklist({ password }: PasswordChecklistProps) {
  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <ul className="space-y-1.5" aria-label="Password requirements">
        {requirements.map((req, index) => {
          const passed = req.test(password);
          return (
            <motion.li
              key={req.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              className={`flex items-center gap-2 text-xs ${
                passed ? "text-success" : "text-text-secondary"
              }`}
            >
              <motion.span
                key={passed ? `check-${req.label}` : `x-${req.label}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
              >
                {passed ? (
                  <Check size={12} aria-hidden="true" />
                ) : (
                  <X size={12} aria-hidden="true" />
                )}
              </motion.span>
              <span>{req.label}</span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
