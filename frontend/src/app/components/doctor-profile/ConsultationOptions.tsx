"use client";

import { fadeUp } from "@/lib/animations/fade";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { Building2, Truck, Video } from "lucide-react";

interface ConsultationOptionsProps {
  doctor: Doctor;
}

const optionIcons: Record<string, React.ElementType> = {
  "in-person": Building2,
  video: Video,
  emergency: Truck,
};

const optionLabels: Record<string, string> = {
  "in-person": "In-Person Consultation",
  video: "Video Consultation",
  emergency: "Emergency Service",
};

const optionDescriptions: Record<string, string> = {
  "in-person": "Visit the clinic for a face-to-face consultation",
  video: "Consult from the comfort of your home via video call",
  emergency: "Available for emergency cases",
};

export function ConsultationOptions({ doctor }: ConsultationOptionsProps) {
  const types = doctor.consultationTypes || [];

  return (
    <section id="consultation">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <h2 className="text-2xl font-bold text-text-primary">
          Consultation Options
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {types.map((type) => {
            const Icon = optionIcons[type] || Building2;
            return (
              <motion.div
                key={type}
                variants={staggerItem}
                className="rounded-2xl border border-border/50 bg-surface p-5 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {optionLabels[type] || type}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {optionDescriptions[type] || ""}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                  <span className="text-xs text-text-secondary">
                    Consultation Fee
                  </span>
                  <span className="text-lg font-bold text-text-primary">
                    ${doctor.fee}.00
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
