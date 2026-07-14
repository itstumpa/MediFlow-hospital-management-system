"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Heart,
  MapPin,
  Star,
  Video,
} from "lucide-react";
import type { DoctorAvailability, FavoriteDoctor } from "./types";
import { availabilityConfig } from "./types";

interface DoctorCardProps {
  doctor: FavoriteDoctor;
  index: number;
  onViewProfile: (doctor: FavoriteDoctor) => void;
  onBookAppointment: (doctor: FavoriteDoctor) => void;
  onRemoveFavorite: (doctorId: string) => void;
}

function AvailabilityBadge({
  availability,
  nextSlot,
}: {
  availability: DoctorAvailability;
  nextSlot: string;
}) {
  const config = availabilityConfig[availability];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
          config.className,
        )}
      >
        <Icon className="h-3 w-3" aria-hidden="true" />
        {config.label}
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400">
        {nextSlot}
      </span>
    </div>
  );
}

function LanguageChips({ languages }: { languages: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Languages spoken">
      {languages.slice(0, 3).map((lang) => (
        <span
          key={lang}
          className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          {lang}
        </span>
      ))}
      {languages.length > 3 && (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          +{languages.length - 3}
        </span>
      )}
    </div>
  );
}

export function DoctorCard({
  doctor,
  index,
  onViewProfile,
  onBookAppointment,
  onRemoveFavorite,
}: DoctorCardProps) {
  const availabilityConfigItem = availabilityConfig[doctor.availability];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)" }}
      className="group relative rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all hover:shadow-xl dark:border-slate-700/40 dark:bg-slate-800/60"
      style={{ willChange: "transform, box-shadow" }}
    >
      {/* Favorite Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onRemoveFavorite(doctor.id);
        }}
        className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-rose-400 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/30"
        aria-label="Remove from favorites"
      >
        <Heart className="h-5 w-5 fill-current" />
      </motion.button>

      {/* Top Rated Badge */}
      {doctor.isTopRated && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
          <Star className="h-3 w-3 fill-current" aria-hidden="true" />
          Top Rated
        </div>
      )}

      {/* Verified Badge */}
      {doctor.isVerified && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
          Verified
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Doctor Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-xl"
        >
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Availability Dot */}
          <span
            className={cn(
              "absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-800",
              availabilityConfigItem.dotColor,
            )}
            aria-label={availabilityConfigItem.label}
          />
        </motion.div>

        {/* Doctor Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                {doctor.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <span
                  className={cn("text-sm font-medium", doctor.specialtyColor)}
                >
                  {doctor.specialty}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {doctor.experienceText} exp
                </span>
              </div>
            </div>
          </div>

          {/* Hospital & Rating */}
          <div className="mt-3 flex items-center gap-3 flex-wrap text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {doctor.hospital.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Star
                className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0"
                aria-hidden="true"
              />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {doctor.rating}
              </span>
              <span className="text-slate-400">({doctor.reviewCount})</span>
            </span>
          </div>

          {/* Languages */}
          <div className="mt-3" aria-label="Languages">
            <LanguageChips languages={doctor.languages} />
          </div>

          {/* Consultation Types */}
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            {doctor.consultationTypes.includes("in-person") && (
              <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                <Calendar className="h-3 w-3" aria-hidden="true" />
                In-Person
              </span>
            )}
            {doctor.consultationTypes.includes("video") && (
              <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                <Video className="h-3 w-3" aria-hidden="true" />
                Video
              </span>
            )}
          </div>
        </div>

        {/* Fee & Actions */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              ${doctor.consultationFee}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Consultation
            </p>
          </div>

          <AvailabilityBadge
            availability={doctor.availability}
            nextSlot={doctor.nextAvailableSlot}
          />

          <div className="flex w-full gap-2 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewProfile(doctor)}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              View Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onBookAppointment(doctor)}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)]"
            >
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              Book
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
