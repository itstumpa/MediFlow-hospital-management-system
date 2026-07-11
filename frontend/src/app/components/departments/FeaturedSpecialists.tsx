"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import {
  staggerContainerFast,
  staggerItemScale,
} from "@/lib/animations/stagger";
import { doctorsList } from "@/lib/data/departments";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FeaturedSpecialists() {
  return (
    <AnimatedSection className="bg-surface py-6 md:py-16">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Featured Specialists"
          subtitle="Meet our experienced medical professionals across all departments."
        />

        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {doctorsList.map((doctor) => (
            <motion.div
              key={doctor.id}
              variants={staggerItemScale}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={doctor.imageUrl}
                  alt={`Photo of ${doctor.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Department badge */}
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-primary shadow-lg backdrop-blur-sm">
                  {doctor.department}
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                  <Star
                    size={12}
                    className="fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                  <span>
                    {doctor.rating} ({doctor.reviewCount})
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-text-primary">{doctor.name}</h3>
                <p className="text-sm text-text-secondary">
                  {doctor.specialty} · {doctor.experience} yrs
                </p>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Link
                    href="/appointment"
                    className="flex-1 rounded-lg bg-primary px-3 py-2 text-center text-xs font-medium text-white transition-colors hover:bg-primary-dark"
                  >
                    Book Appointment
                  </Link>
                  <Link
                    href={`/doctors/${doctor.id}`}
                    className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary"
                  >
                    View Profile
                    <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
