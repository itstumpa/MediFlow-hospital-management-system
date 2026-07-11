"use client";

import { fadeUp } from "@/lib/animations/fade";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

interface ExpertiseProps {
  doctor: Doctor;
}

export function Expertise({ doctor }: ExpertiseProps) {
  return (
    <section id="expertise">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <h2 className="text-2xl font-bold text-text-primary">
          Areas of Expertise
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {doctor.expertise.map((area) => (
            <motion.div
              key={area}
              variants={staggerItem}
              className="group rounded-2xl border border-border/50 bg-surface p-5 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Stethoscope className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {area}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
