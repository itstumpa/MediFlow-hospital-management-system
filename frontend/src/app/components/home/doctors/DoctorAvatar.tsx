"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type Availability = "available-now" | "available-today" | "tomorrow";

interface DoctorAvatarProps {
  imageUrl: string;
  name: string;
  availability: Availability;
}

const availabilityConfig: Record<
  Availability,
  { label: string; dotColor: string; bgColor: string }
> = {
  "available-now": {
    label: "Available Now",
    dotColor: "bg-green-400",
    bgColor: "bg-green-500/15 text-green-300",
  },
  "available-today": {
    label: "Available Today",
    dotColor: "bg-blue-400",
    bgColor: "bg-blue-500/15 text-blue-300",
  },
  tomorrow: {
    label: "Next Available Tomorrow",
    dotColor: "bg-amber-400",
    bgColor: "bg-amber-500/15 text-amber-300",
  },
};

export function DoctorAvatar({
  imageUrl,
  name,
  availability,
}: DoctorAvatarProps) {
  const config = availabilityConfig[availability];

  return (
    <div className="relative mx-auto mb-4">
      {/* Image container */}
      <motion.div
        className="relative h-28 w-28 overflow-hidden rounded-2xl ring-2 ring-border/50"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="112px"
        />
      </motion.div>

      {/* Availability badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
        whileHover={{ scale: [1, 1.12, 1] }}
        className={`absolute -right-1 -top-1 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold leading-none ${config.bgColor}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${config.dotColor}`} />
        {config.label}
      </motion.div>
    </div>
  );
}
