"use client";

import { motion } from "framer-motion";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import type { StaffProfile } from "../_mock-data";

interface ProfileHeroProps {
  profile: StaffProfile;
  onPhotoChange?: () => void;
}

const inputRef = "ref" as string;

export function ProfileHero({ profile, onPhotoChange }: ProfileHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="dash-card overflow-hidden"
    >
      {/* Cover */}
      <div className="h-28 bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-800 sm:h-36" />

      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-14 mb-4 flex sm:-mt-16">
          <motion.div
            className="group relative"
            whileHover="hover"
            initial="rest"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-xl border-4 border-white bg-emerald-100 text-2xl font-bold text-emerald-600 shadow-lg dark:border-slate-800 dark:bg-emerald-900/40 dark:text-emerald-400 sm:h-28 sm:w-28 sm:text-3xl">
              {profile.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt={profile.fullName}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                profile.initials
              )}
            </div>
            <motion.button
              variants={{
                rest: { opacity: 0, scale: 0.8 },
                hover: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.2 }}
              onClick={onPhotoChange}
              className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-xl bg-black/40"
              aria-label="Change profile photo"
            >
              <Camera className="h-6 w-6 text-white" />
            </motion.button>
          </motion.div>

          <div className="ml-5 mt-12 flex-1 sm:mt-14">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              {profile.fullName}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {profile.role} · {profile.department}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            {profile.email}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            {profile.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {profile.city}, {profile.state}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
