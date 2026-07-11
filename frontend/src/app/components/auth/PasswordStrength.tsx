"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

interface Requirement {
  label: string;
  test: (p: string) => boolean;
}

const requirements: Requirement[] = [
  { label: "8+ characters", test: (p) => p.length >= 8 },
  { label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "Lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "Number", test: (p) => /\d/.test(p) },
  {
    label: "Special character",
    test: (p) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p),
  },
];

function getStrength(password: string): {
  score: number;
  label: string;
  color: string;
  bg: string;
} {
  if (!password) return { score: 0, label: "", color: "", bg: "" };
  const passed = requirements.filter((r) => r.test(password)).length;
  if (passed <= 1)
    return { score: 20, label: "Weak", color: "text-danger", bg: "bg-danger" };
  if (passed <= 2)
    return {
      score: 40,
      label: "Fair",
      color: "text-warning",
      bg: "bg-warning",
    };
  if (passed <= 3)
    return { score: 60, label: "Good", color: "text-info", bg: "bg-info" };
  if (passed <= 4)
    return {
      score: 80,
      label: "Strong",
      color: "text-success",
      bg: "bg-success",
    };
  return {
    score: 100,
    label: "Very Strong",
    color: "text-success",
    bg: "bg-success",
  };
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = getStrength(password);
  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-3 overflow-hidden"
    >
      {/* Strength bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-text-secondary">
            Password strength
          </span>
          {strength.label && (
            <motion.span
              key={strength.label}
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-xs font-semibold ${strength.color}`}
            >
              {strength.label}
            </motion.span>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
          <motion.div
            className={`h-full rounded-full ${strength.bg}`}
            initial={{ width: 0 }}
            animate={{ width: `${strength.score}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Requirements list */}
      <ul className="space-y-1.5" aria-label="Password requirements">
        {requirements.map((req) => {
          const passed = req.test(password);
          return (
            <motion.li
              key={req.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-2 text-xs ${
                passed ? "text-success" : "text-text-secondary"
              }`}
            >
              <motion.span
                key={passed ? "check" : "x"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {passed ? (
                  <Check size={12} aria-hidden="true" />
                ) : (
                  <X size={12} aria-hidden="true" />
                )}
              </motion.span>
              {req.label}
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
