"use client";

import { AnimatedSection } from "@/app/components/ui/AnimatedSection";
import { Button } from "@/app/components/ui/Button";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import type { SpecialistBrief } from "@/lib/data/department-detail";
import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import Image from "next/image";
import {
  imageZoom,
  staggerContainer,
  staggerItem,
} from "./SharedMotionVariants";

interface Props {
  specialists: SpecialistBrief[];
}

function SpecialistCard({ doctor }: { doctor: SpecialistBrief }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover="hover"
      initial="rest"
      className="group cursor-default rounded-xl border border-border bg-surface shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-xl">
        <motion.div variants={imageZoom} className="h-full w-full">
          <Image
            src={doctor.imageUrl}
            alt={`Photo of ${doctor.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
        </motion.div>

        {/* Verified badge */}
        {doctor.verified && (
          <div className="absolute left-3 top-3 rounded-full bg-white/90 p-1.5 shadow-sm backdrop-blur-sm">
            <BadgeCheck
              size={16}
              className="text-primary"
              aria-label="Verified doctor"
            />
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-text-primary shadow-sm backdrop-blur-sm">
          <Star
            size={12}
            className="fill-amber-400 text-amber-400"
            aria-hidden="true"
          />
          <span>{doctor.rating}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-text-primary">
          {doctor.name}
        </h3>
        <p className="mt-0.5 text-xs text-primary">{doctor.specialty}</p>
        <p className="mt-1 text-xs text-text-secondary">
          {doctor.experience} years experience
        </p>

        <div
          className="mt-1 flex items-center gap-1 text-xs text-amber-500"
          aria-label={`${doctor.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              className={
                i < Math.round(doctor.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-border"
              }
              aria-hidden="true"
            />
          ))}
        </div>

        <p className="mt-2 text-xs text-text-secondary">
          {doctor.patientsTreated} patients treated
        </p>

        {/* Languages */}
        <div className="mt-2 flex flex-wrap gap-1">
          {doctor.languages.map((lang) => (
            <span
              key={lang}
              className="rounded-full bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Button variant="primary" size="sm" className="flex-1 text-xs">
            Book Appointment
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            View Profile
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function SpecialistsGrid({ specialists }: Props) {
  if (specialists.length === 0) return null;

  return (
    <AnimatedSection className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Meet Our Specialists"
          subtitle="Expert physicians dedicated to providing exceptional care in their field."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {specialists.map((doctor) => (
            <SpecialistCard key={doctor.id} doctor={doctor} />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
