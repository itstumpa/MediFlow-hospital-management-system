"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Availability } from "./DoctorAvatar";
import { DoctorCard } from "./DoctorCard";
import { ViewAllDoctors } from "./ViewAllDoctors";

export interface Doctor {
  name: string;
  specialty: string;
  experience: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  languages: string[];
  hospital: string;
  fee: number;
  availability: Availability;
  isTopRated: boolean;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Sarah Rahman",
    specialty: "Cardiologist",
    experience: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 328,
    languages: ["English", "Bangla", "Hindi"],
    hospital: "City Heart Hospital",
    fee: 40,
    availability: "available-now",
    isTopRated: true,
  },
  {
    name: "Dr. James Mitchell",
    specialty: "Neurologist",
    experience: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 256,
    languages: ["English", "Spanish"],
    hospital: "NeuroCare Institute",
    fee: 50,
    availability: "available-today",
    isTopRated: false,
  },
  {
    name: "Dr. Ayesha Khan",
    specialty: "Pediatrician",
    experience: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 412,
    languages: ["English", "Hindi", "Urdu"],
    hospital: "Child Health Clinic",
    fee: 35,
    availability: "tomorrow",
    isTopRated: false,
  },
  {
    name: "Dr. Robert Chen",
    specialty: "Orthopedic Surgeon",
    experience: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 189,
    languages: ["English", "Mandarin"],
    hospital: "Bone & Joint Center",
    fee: 55,
    availability: "available-today",
    isTopRated: false,
  },
  {
    name: "Dr. Rohit Sharma",
    specialty: "Dermatologist",
    experience: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 203,
    languages: ["English", "Hindi"],
    hospital: "Skin Care Clinic",
    fee: 45,
    availability: "available-now",
    isTopRated: false,
  },
];

const trustIndicators = [
  "Board Certified",
  "Verified Specialists",
  "HIPAA Compliant",
  "Secure Appointment Booking",
];

export function FeaturedDoctors() {
  return (
    <section
      id="doctors"
      className="relative overflow-hidden bg-gradient-to-b from-background via-white to-background py-6"
      aria-label="Featured doctors"
    >
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #0e7c7b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-page px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Featured Doctors
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Meet our expert medical team
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
            Our board-certified specialists bring decades of combined experience
            across every major medical field, ensuring you receive the best
            possible care.
          </p>
        </motion.div>

        {/* Doctor cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {doctors.map((doctor, i) => (
            <DoctorCard key={doctor.name} doctor={doctor} index={i} />
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {trustIndicators.map((indicator) => (
            <span
              key={indicator}
              className="flex items-center gap-1.5 text-xs font-medium text-text-secondary"
            >
              <CheckCircle2
                className="h-4 w-4 text-primary"
                aria-hidden="true"
              />
              {indicator}
            </span>
          ))}
        </motion.div>

        {/* View All CTA */}
        <ViewAllDoctors />
      </div>
    </section>
  );
}
