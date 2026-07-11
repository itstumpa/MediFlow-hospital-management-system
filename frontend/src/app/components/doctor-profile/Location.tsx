"use client";

import { fadeUp } from "@/lib/animations/fade";
import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { Building2, MapPin, Phone } from "lucide-react";

interface LocationProps {
  doctor: Doctor;
}

export function Location({ doctor }: LocationProps) {
  return (
    <section id="location">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        <h2 className="text-2xl font-bold text-text-primary">Location</h2>

        <div className="mt-6 rounded-2xl border border-border/50 bg-surface p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-primary">
                {doctor.hospital}
              </h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-text-secondary">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                123 Healthcare Avenue, Medical District, NY 10001
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-text-secondary">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                +1 (800) 123-4567
              </p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-4 flex h-48 items-center justify-center rounded-xl bg-background">
            <div className="text-center">
              <MapPin
                className="mx-auto h-8 w-8 text-text-secondary/40"
                aria-hidden="true"
              />
              <p className="mt-1 text-xs text-text-secondary">
                Map integration placeholder
              </p>
              <p className="text-[10px] text-text-secondary/60">
                Google Maps will render here
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
