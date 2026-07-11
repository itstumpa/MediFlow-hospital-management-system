"use client";

import { fadeUp } from "@/lib/animations/fade";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface AboutDoctorProps {
  doctor: Doctor;
}

export function AboutDoctor({ doctor }: AboutDoctorProps) {
  return (
    <section id="about">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <h2 className="text-2xl font-bold text-text-primary">
          About {doctor.name.split(" ").pop()}
        </h2>
        <div className="mt-4 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-sm leading-relaxed text-text-secondary">
              {doctor.about}
            </p>
          </div>
          <div className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm">
            <Quote className="h-6 w-6 text-primary/30" aria-hidden="true" />
            <p className="mt-2 text-xs italic leading-relaxed text-text-secondary">
              &ldquo;
              {doctor.shortBio ||
                `I am committed to providing compassionate, evidence-based care to every patient.`}
              &rdquo;
            </p>
            <p className="mt-3 text-sm font-semibold text-text-primary">
              — {doctor.name}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
