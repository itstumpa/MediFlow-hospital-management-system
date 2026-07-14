"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  MapPin,
  Star,
  Video,
} from "lucide-react";
import type { DoctorAvailability, FavoriteDoctor } from "./types";
import { availabilityConfig } from "./types";

interface DoctorListProps {
  doctors: FavoriteDoctor[];
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
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        config.className,
      )}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {config.label}
      <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
        {nextSlot}
      </span>
    </span>
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

export function DoctorList({
  doctors,
  onViewProfile,
  onBookAppointment,
  onRemoveFavorite,
}: DoctorListProps) {
  if (doctors.length === 0) return null;

  return (
    <div
      className="rounded-xl border border-slate-200 bg-white overflow-hidden dark:border-slate-700 dark:bg-slate-800/60"
      role="list"
      aria-label="Favorite doctors"
    >
      {/* Table Header */}
      <div className="hidden lg:grid grid-cols-[1fr_120px_100px_100px_140px_100px_160px] border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
        <div className="flex items-center gap-2">Doctor</div>
        <div>Specialty</div>
        <div>Hospital</div>
        <div>Rating</div>
        <div>Availability</div>
        <div>Fee</div>
        <div className="text-right pr-5">Actions</div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group lg:grid grid-cols-[1fr_120px_100px_100px_140px_100px_160px] items-center px-5 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            role="listitem"
          >
            {/* Doctor Column */}
            <div className="flex items-center gap-4 min-w-0 lg:col-span-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(doctor.id);
                }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-rose-400 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/30 lg:hidden"
                aria-label="Remove from favorites"
              >
                <Heart className="h-5 w-5 fill-current" />
              </motion.button>
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="h-12 w-12 rounded-xl object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                    {doctor.name}
                  </h3>
                  {doctor.isTopRated && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                      <Star
                        className="h-3 w-3 fill-current"
                        aria-hidden="true"
                      />
                      Top Rated
                    </span>
                  )}
                  {doctor.isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {doctor.specialty}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {doctor.experienceText} experience
                </p>
              </div>
            </div>

            {/* Specialty Column */}
            <div className="hidden lg:block text-sm text-slate-600 dark:text-slate-400">
              {doctor.specialty}
            </div>

            {/* Hospital Column */}
            <div className="hidden lg:block text-sm text-slate-600 dark:text-slate-400 truncate">
              {doctor.hospital.name}
            </div>

            {/* Rating Column */}
            <div className="hidden lg:block flex items-center gap-1.5">
              <Star
                className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0"
                aria-hidden="true"
              />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {doctor.rating}
              </span>
              <span className="text-slate-400">({doctor.reviewCount})</span>
            </div>

            {/* Availability Column */}
            <div className="hidden lg:block">
              <AvailabilityBadge
                availability={doctor.availability}
                nextSlot={doctor.nextAvailableSlot}
              />
            </div>

            {/* Fee Column */}
            <div className="hidden lg:block text-right font-semibold text-slate-900 dark:text-white">
              ${doctor.consultationFee}
            </div>

            {/* Actions Column */}
            <div className="flex items-center justify-end gap-2 lg:col-span-1 lg:pr-5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewProfile(doctor)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                View Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onBookAppointment(doctor)}
                className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)]"
              >
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                Book
              </motion.button>
            </div>

            {/* Mobile Details Row */}
            <div className="lg:hidden lg:col-span-7 mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{doctor.hospital.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Star
                    className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {doctor.rating}
                  </span>
                  <span className="text-slate-400">
                    ({doctor.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>${doctor.consultationFee} consultation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{doctor.experienceText} experience</span>
                </div>
                <div className="col-span-2" aria-label="Languages">
                  <LanguageChips languages={doctor.languages} />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  {doctor.consultationTypes.includes("in-person") && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      In-Person
                    </span>
                  )}
                  {doctor.consultationTypes.includes("video") && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      <Video className="h-3 w-3" aria-hidden="true" />
                      Video
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
