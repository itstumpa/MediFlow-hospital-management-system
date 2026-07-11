"use client";

import { motion } from "framer-motion";

interface TimelineConnectorProps {
  index: number;
  orientation: "horizontal" | "vertical";
}

export function TimelineConnector({
  index,
  orientation,
}: TimelineConnectorProps) {
  const delay = 0.3 + (index + 1) * 0.2;

  if (orientation === "horizontal") {
    return (
      <div className="hidden items-center md:flex" aria-hidden="true">
        <div className="relative h-0.5 w-10 overflow-hidden rounded-full bg-border/60 lg:w-14">
          <motion.div
            className="absolute inset-0 origin-left rounded-full bg-primary"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden" aria-hidden="true">
      <div className="relative mx-auto h-8 w-0.5 overflow-hidden rounded-full bg-border">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top rounded-full bg-primary"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay - 0.1,
            ease: [0.25, 0.1, 0.25, 1] as const,
          }}
        />
      </div>
    </div>
  );
}
