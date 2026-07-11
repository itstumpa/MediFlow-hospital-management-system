"use client";

import { fadeUp } from "@/lib/animations/fade";
import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, ScrollText } from "lucide-react";

interface QualificationsProps {
  doctor: Doctor;
}

export function Qualifications({ doctor }: QualificationsProps) {
  return (
    <section id="qualifications">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <h2 className="text-2xl font-bold text-text-primary">
          Qualifications & Education
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 grid gap-4 sm:grid-cols-2"
        >
          {/* Education */}
          <div className="rounded-2xl border border-border/50 bg-surface p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <GraduationCap
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
              <h3 className="text-sm font-bold text-text-primary">Education</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {doctor.education.map((edu, i) => (
                <motion.li
                  key={edu}
                  variants={staggerItem}
                  className="flex items-start gap-3 text-xs text-text-secondary"
                >
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[8px] font-bold text-primary">
                    {i + 1}
                  </span>
                  {edu}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div className="rounded-2xl border border-border/50 bg-surface p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="text-sm font-bold text-text-primary">
                Professional Qualifications
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {doctor.qualifications.map((qual, i) => (
                <motion.li
                  key={i}
                  variants={staggerItem}
                  className="flex items-start gap-3 text-xs text-text-secondary"
                >
                  <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[8px] font-bold text-primary">
                    {i + 1}
                  </span>
                  {qual.degree}, {qual.institution} ({qual.year})
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          {doctor.certifications.length > 0 && (
            <div className="sm:col-span-2">
              <div className="rounded-2xl border border-border/50 bg-surface p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <BookOpen
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-bold text-text-primary">
                    Certifications
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {doctor.certifications.map((cert) => (
                    <span
                      key={cert.title}
                      className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {cert.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
