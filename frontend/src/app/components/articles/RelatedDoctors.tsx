"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { Doctor } from "@/lib/data/doctors";
import { doctors } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Calendar, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RelatedDoctorsProps {
  category: string;
}

const categoryToSpecialty: Record<string, string[]> = {
  "Heart Health": ["Cardiologist"],
  "Mental Health": ["Psychiatrist", "Psychologist"],
  Nutrition: ["Nutrition Specialist"],
  "Women's Health": ["OB-GYN"],
  Children: ["Pediatrician"],
  Diabetes: ["Endocrinologist", "Nutrition Specialist"],
  "Skin Care": ["Dermatologist"],
  Emergency: ["Cardiologist", "Neurologist"],
  Fitness: ["Cardiologist", "Nutrition Specialist"],
  Pregnancy: ["OB-GYN"],
  Vaccination: ["Pediatrician"],
  "Senior Care": ["Cardiologist", "Neurologist"],
};

export function RelatedDoctors({ category }: RelatedDoctorsProps) {
  const specialties = categoryToSpecialty[category] || [];
  const relatedDoctors = doctors
    .filter((d) =>
      specialties.some((s) =>
        d.specialty.toLowerCase().includes(s.toLowerCase()),
      ),
    )
    .slice(0, 3);

  if (relatedDoctors.length === 0) return null;

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="my-10"
      aria-labelledby="related-doctors-heading"
    >
      <motion.h3
        id="related-doctors-heading"
        variants={staggerItem}
        className="mb-6 text-xl font-bold text-text-primary"
      >
        Recommended Specialists
      </motion.h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relatedDoctors.map((doctor: Doctor) => (
          <motion.div
            key={doctor.id}
            variants={staggerItem}
            className="group flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 border-border">
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="truncate text-base font-semibold text-text-primary">
                    {doctor.name}
                  </span>
                  <BadgeCheck
                    className="h-4 w-4 flex-shrink-0 text-primary"
                    aria-label="Verified"
                  />
                </div>
                <p className="text-sm text-text-secondary">
                  {doctor.specialty}
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-text-secondary">
                  <span>{doctor.experience} years</span>
                  <span className="flex items-center gap-1">
                    <Star
                      className="h-3.5 w-3.5 text-warning"
                      aria-hidden="true"
                    />
                    {doctor.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/appointment?doctor=${doctor.id}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Book Appointment
              </Link>
              <Link
                href={`/doctors/${doctor.id}`}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-secondary transition-all hover:border-primary/30 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View Profile
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
