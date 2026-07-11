"use client";

import { motion } from "framer-motion";
import { Eye, FileText, KeyRound, Lock, Shield, Star } from "lucide-react";

const trustItems = [
  {
    icon: Lock,
    text: "Secure Password Reset",
    color: "text-primary",
  },
  {
    icon: Shield,
    text: "End-to-End Encryption",
    color: "text-success",
  },
  {
    icon: FileText,
    text: "Protected Medical Records",
    color: "text-info",
  },
  {
    icon: Star,
    text: "Trusted by 10K+ Patients",
    color: "text-warning",
  },
  {
    icon: KeyRound,
    text: "Military-Grade Security",
    color: "text-primary",
  },
  {
    icon: Eye,
    text: "Privacy Protected",
    color: "text-success",
  },
];

const floatingAnimations = [
  { y: [-6, 6], x: [-3, 3], duration: 5 },
  { y: [4, -4], x: [2, -2], duration: 6 },
  { y: [-5, 5], x: [3, -3], duration: 4.5 },
  { y: [3, -5], x: [-2, 2], duration: 5.5 },
  { y: [-4, 4], x: [-3, 1], duration: 5.2 },
  { y: [5, -3], x: [2, -3], duration: 4.8 },
];

export function ResetPasswordTrustCards() {
  return (
    <div
      className="relative mx-auto max-w-sm"
      aria-label="Security and trust information"
    >
      {trustItems.map((item, index) => (
        <motion.div
          key={item.text}
          animate={floatingAnimations[index]}
          transition={{
            duration: floatingAnimations[index].duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2 },
          }}
          className="absolute flex items-center gap-3 rounded-xl border border-border/60 bg-surface/90 
                     backdrop-blur-sm px-4 py-3 shadow-sm"
          style={{
            top: `${10 + index * 14}%`,
            right: index % 2 === 0 ? "5%" : "auto",
            left: index % 2 === 0 ? "auto" : "5%",
          }}
        >
          <div className={`${item.color}`}>
            <item.icon size={18} aria-hidden="true" />
          </div>
          <span className="text-sm font-medium text-text-primary whitespace-nowrap">
            {item.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
