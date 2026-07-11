"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10 rounded-2xl border border-warning/20 bg-gradient-to-br from-warning/5 to-amber-50/50 p-6 md:p-8"
    >
      <div className="flex gap-4">
        <div className="mt-0.5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-warning/10">
          <ShieldAlert className="h-6 w-6 text-warning" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Medical Disclaimer
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            This article is intended for educational purposes only and should
            not replace professional medical advice. Always consult a qualified
            healthcare provider with any questions regarding your health or
            medical conditions. Never disregard professional medical advice or
            delay in seeking it because of something you have read on this
            website.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
