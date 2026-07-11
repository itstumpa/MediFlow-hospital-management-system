"use client";

import type { Doctor } from "@/lib/data/doctors";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Building2,
  Clock,
  Heart,
  MapPin,
  Share2,
  Sparkles,
  Star,
  UserCheck,
  Verified,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
}

const availabilityConfig = {
  "available-now": {
    label: "Available Now",
    dot: "bg-green-400",
    bg: "bg-green-500/15 text-green-700",
  },
  "available-today": {
    label: "Available Today",
    dot: "bg-blue-400",
    bg: "bg-blue-500/15 text-blue-700",
  },
  tomorrow: {
    label: "Tomorrow",
    dot: "bg-amber-400",
    bg: "bg-amber-500/15 text-amber-700",
  },
};

const timeSlots = ["09:00", "10:30", "01:00", "03:30"];

export function DoctorCard({ doctor, index }: DoctorCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const av = availabilityConfig[doctor.availability];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: 0.05 * index,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
      role="article"
      aria-label={`Doctor profile: ${doctor.name}`}
    >
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden md:h-64">
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={doctor.imageUrl}
            alt={`${doctor.name} - ${doctor.specialty}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>

        {/* Availability Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
            delay: 0.2,
          }}
          whileHover={{ scale: [1, 1.12, 1] }}
          className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${av.bg}`}
        >
          <span className={`h-2 w-2 rounded-full ${av.dot}`} />
          {av.label}
        </motion.div>

        {/* Badges */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          {doctor.isVerified && (
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-primary backdrop-blur-sm">
              <Verified className="h-3 w-3" aria-hidden="true" />
              Verified
            </span>
          )}
          {doctor.isTopRated && (
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Top Rated
            </span>
          )}
        </div>

        {/* Action buttons overlay */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorited(!isFavorited)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-text-secondary backdrop-blur-sm transition-colors hover:bg-white"
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorited ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-text-secondary backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Share doctor profile"
          >
            <Share2 className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5">
        {/* Name & Specialty */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-text-primary">
              {doctor.name}
            </h3>
            <p className="text-sm font-medium text-primary">
              {doctor.specialty}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(doctor.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-text-primary">
            {doctor.rating}
          </span>
          <span className="text-xs text-text-secondary">
            ({doctor.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Details */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <Award className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {doctor.experience} Years
          </span>
          <span className="flex items-center gap-1">
            <Building2
              className="h-3.5 w-3.5 text-primary/60"
              aria-hidden="true"
            />
            {doctor.hospital}
          </span>
          <span className="flex items-center gap-1">
            <UserCheck
              className="h-3.5 w-3.5 text-primary/60"
              aria-hidden="true"
            />
            {doctor.patientsTreated} Patients
          </span>
          <span className="flex items-center gap-1">
            <MapPin
              className="h-3.5 w-3.5 text-primary/60"
              aria-hidden="true"
            />
            {doctor.languages.slice(0, 2).join(", ")}
          </span>
        </div>

        {/* Education Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {doctor.education.map((edu) => (
            <span
              key={edu}
              className="rounded-md bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary/80"
            >
              {edu}
            </span>
          ))}
        </div>

        {/* Availability Slots */}
        <div className="mt-3">
          <p className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold text-text-secondary">
            <Clock className="h-3 w-3" aria-hidden="true" />
            Available Today
          </p>
          <div className="flex flex-wrap gap-1.5">
            {timeSlots.map((slot) => (
              <span
                key={slot}
                className="rounded-md border border-border/60 px-2 py-0.5 text-[10px] font-medium text-text-secondary"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-border/50" />

        {/* Fee */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-text-secondary">
              Consultation Fee
            </p>
            <p className="text-xl font-bold text-text-primary">
              ${doctor.fee}
              <span className="text-xs font-normal text-text-secondary">
                .00
              </span>
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="mt-auto" />

        {/* CTA Buttons */}
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/doctors/${doctor.id}`}
            className="group/btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Book Appointment
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            href={`/doctors/${doctor.id}`}
            className="inline-flex items-center justify-center rounded-lg px-3 py-2.5 text-xs font-medium text-text-secondary transition-colors duration-200 hover:bg-background hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View Profile
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
