"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const floatVariants = {
  animate: {
    y: [-6, 6, -6],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const images = {
  doctor:
    "https://images.unsplash.com/photo-1640876777002-badf6aee5bcc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  dashboard:
    "https://images.unsplash.com/photo-1633219664572-473fd988a44f?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

interface IllustrationPanelProps {
  variant?: "doctor" | "dashboard";
}

export function IllustrationPanel({
  variant = "doctor",
}: IllustrationPanelProps) {
  return (
    <motion.div
      className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-primary/10 shadow-lg shadow-primary/5"
      variants={floatVariants}
      animate="animate"
      aria-hidden="true"
    >
      <Image
        src={images[variant]}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </motion.div>
  );
}
