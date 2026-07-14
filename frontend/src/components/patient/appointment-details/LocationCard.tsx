"use client";

import { staggerItem } from "@/components/patient/MotionVariants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Building2,
  Car,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import type { ClinicLocation } from "./types";

interface LocationCardProps {
  clinic: ClinicLocation;
  className?: string;
}

export function LocationCard({ clinic, className }: LocationCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "rounded-2xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700/40 dark:bg-slate-800/60 overflow-hidden",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white px-6 pt-6 pb-4">
        Location & Parking
      </h3>

      {/* Map placeholder */}
      <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-700/40 overflow-hidden">
        <iframe
          src={clinic.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(0.3) invert(0.05)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Clinic location"
          className="dark:opacity-70"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none rounded-none" />
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 dark:bg-[var(--color-accent)]/10">
            <Building2 className="h-4 w-4 text-[var(--color-primary)] dark:text-[var(--color-accent)]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {clinic.clinicName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {clinic.address}, {clinic.city}, {clinic.state} {clinic.zip}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-700/60">
            <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {clinic.room}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {clinic.floor}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-700/60">
            <Phone className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {clinic.phone}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Front desk
            </p>
          </div>
        </div>

        {/* Parking */}
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/30">
          <div className="flex items-start gap-3">
            <Car className="h-4 w-4 mt-0.5 text-slate-500 dark:text-slate-400 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Parking Information
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {clinic.parkingInfo}
              </p>
            </div>
          </div>
        </div>

        {/* Directions button */}
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(`${clinic.address}, ${clinic.city}, ${clinic.state} ${clinic.zip}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:shadow-sm dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <Navigation className="h-4 w-4" />
          Get Directions
          <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
        </a>
      </div>
    </motion.div>
  );
}
