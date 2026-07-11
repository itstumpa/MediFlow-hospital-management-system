"use client";

import { motion } from "framer-motion";

interface EnhancedPasswordStrengthProps {
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

const strengthLevels = [
  {
    score: 0,
    label: "",
    color: "",
    bg: "",
    recommendation: "",
  },
  {
    score: 20,
    label: "Weak",
    color: "text-danger",
    bg: "bg-danger",
    recommendation: "Try adding more character types.",
  },
  {
    score: 40,
    label: "Fair",
    color: "text-warning",
    bg: "bg-warning",
    recommendation: "Add uppercase and special characters.",
  },
  {
    score: 60,
    label: "Good",
    color: "text-info",
    bg: "bg-info",
    recommendation: "Getting better — add a special character.",
  },
  {
    score: 80,
    label: "Strong",
    color: "text-success",
    bg: "bg-success",
    recommendation: "Great! Your password is difficult to guess.",
  },
  {
    score: 100,
    label: "Excellent",
    color: "text-success",
    bg: "bg-success",
    recommendation: "Outstanding! This password is highly secure.",
  },
];

function getStrength(password: string) {
  if (!password) return strengthLevels[0];
  const passed = requirements.filter((r) => r.test(password)).length;
  return strengthLevels[passed];
}

const barTrackVariant = {
  initial: { scaleX: 0 },
  animate: (width: number) => ({
    scaleX: width / 100,
    transition: { duration: 0.4, ease: "easeOut" },
  }),
};

export function EnhancedPasswordStrength({
  password,
}: EnhancedPasswordStrengthProps) {
  const strength = getStrength(password);

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-2 overflow-hidden"
    >
      {/* Strength bar */}
      <div className="space-y-1">
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
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border origin-left">
          <motion.div
            className={`h-full rounded-full ${strength.bg}`}
            initial={{ width: 0 }}
            animate={{ width: `${strength.score}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Recommendation text */}
      {strength.recommendation && (
        <motion.p
          key={strength.label}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-text-secondary italic"
        >
          {strength.recommendation}
        </motion.p>
      )}
    </motion.div>
  );
}
