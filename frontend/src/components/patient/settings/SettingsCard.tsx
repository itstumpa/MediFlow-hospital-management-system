"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SettingsCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function SettingsCard({
  title,
  icon: Icon,
  children,
  className,
}: SettingsCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "rounded-2xl bg-white/80 dark:bg-[#1a2a2a]/80 backdrop-blur-xl border border-[#e1e8e8] dark:border-[#2a3a3a] p-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-[#0e7c7b]/10 text-[#0e7c7b] dark:text-[#2dd4bf]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="text-lg font-semibold text-[#1a2e2e] dark:text-white">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}
