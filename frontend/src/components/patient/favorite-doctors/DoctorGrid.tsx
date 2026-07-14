"use client";

import { motion } from "framer-motion";
import { DoctorCard } from "./DoctorCard";
import type { FavoriteDoctor } from "./types";

interface DoctorGridProps {
  doctors: FavoriteDoctor[];
  onViewProfile: (doctor: FavoriteDoctor) => void;
  onBookAppointment: (doctor: FavoriteDoctor) => void;
  onRemoveFavorite: (doctorId: string) => void;
}

export function DoctorGrid({
  doctors,
  onViewProfile,
  onBookAppointment,
  onRemoveFavorite,
}: DoctorGridProps) {
  if (doctors.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="list"
      aria-label="Favorite doctors"
    >
      {doctors.map((doctor, index) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          index={index}
          onViewProfile={onViewProfile}
          onBookAppointment={onBookAppointment}
          onRemoveFavorite={onRemoveFavorite}
        />
      ))}
    </motion.div>
  );
}
