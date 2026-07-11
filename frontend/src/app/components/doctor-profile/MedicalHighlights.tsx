"use client";

import { fadeUp } from "@/lib/animations/fade";
import { staggerContainer } from "@/lib/animations/stagger";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";

interface MedicalHighlightsProps {
  doctor: Doctor;
}

export function MedicalHighlights({ doctor }: MedicalHighlightsProps) {
  const showAwards = doctor.awards > 0;
  const showMetrics = doctor.successRate > 0;

  if (!showAwards && !showMetrics) {
    return null;
  }

  return (
    <section>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <h2 className="text-2xl font-bold text-text-primary">
          Awards & Achievements
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* Awards */}
          {showAwards && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50 via-surface to-surface p-5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" aria-hidden="true" />
                <h3 className="text-sm font-bold text-text-primary">Awards</h3>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl font-bold text-amber-600">
                  {doctor.awards}
                </span>
                <p className="text-sm font-medium text-text-secondary">
                  {doctor.awards}+ professional awards and recognitions
                </p>
              </div>
            </motion.div>
          )}

          {/* Success metrics */}
          {showMetrics && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl border border-border/50 bg-surface p-5 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="text-sm font-bold text-text-primary">
                  Performance Metrics
                </h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-background p-4 text-center">
                  <p className="text-2xl font-bold text-text-primary">
                    {doctor.patientsTreated}
                  </p>
                  <p className="text-[10px] font-medium text-text-secondary">
                    Patients Treated
                  </p>
                </div>
                <div className="rounded-xl bg-background p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {doctor.successRate}%
                  </p>
                  <p className="text-[10px] font-medium text-text-secondary">
                    Success Rate
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
