"use client";

import { fadeDown } from "@/lib/animations/fade";
import { motion } from "framer-motion";
import {
  Briefcase,
  Clock,
  FilterX,
  Globe,
  MapPin,
  Microscope,
  Search,
  Users,
  Video,
} from "lucide-react";

interface DoctorSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  selectedAvailability: string;
  onAvailabilityChange: (value: string) => void;
  selectedExperience: string;
  onExperienceChange: (value: string) => void;
  selectedGender: string;
  onGenderChange: (value: string) => void;
  selectedConsultationType: string;
  onConsultationTypeChange: (value: string) => void;
  onClearFilters: () => void;
}

const departments = [
  { value: "", label: "All Departments" },
  { value: "Cardiology", label: "Cardiology" },
  { value: "Neurology", label: "Neurology" },
  { value: "Pediatrics", label: "Pediatrics" },
  { value: "Orthopedics", label: "Orthopedics" },
  { value: "Dermatology", label: "Dermatology" },
  { value: "Ophthalmology", label: "Ophthalmology" },
  { value: "Pulmonology", label: "Pulmonology" },
  { value: "General Surgery", label: "General Surgery" },
  { value: "Neonatology", label: "Neonatology" },
];

const locations = [
  { value: "", label: "All Locations" },
  { value: "MediFlow Medical Center", label: "MediFlow Medical Center" },
  { value: "NeuroCare Institute", label: "NeuroCare Institute" },
  { value: "Child Health Clinic", label: "Child Health Clinic" },
  { value: "Bone & Joint Center", label: "Bone & Joint Center" },
  { value: "Skin Care Clinic", label: "Skin Care Clinic" },
  { value: "Vision Care Center", label: "Vision Care Center" },
  { value: "Respiratory Health Center", label: "Respiratory Health Center" },
];

const languages = [
  { value: "", label: "All Languages" },
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "Hindi", label: "Hindi" },
  { value: "Bangla", label: "Bangla" },
  { value: "Arabic", label: "Arabic" },
  { value: "Korean", label: "Korean" },
  { value: "Mandarin", label: "Mandarin" },
];

const availabilities = [
  { value: "", label: "Any Time" },
  { value: "available-now", label: "Available Now" },
  { value: "available-today", label: "Available Today" },
  { value: "tomorrow", label: "Next Available Tomorrow" },
];

const experienceLevels = [
  { value: "", label: "Any Experience" },
  { value: "5", label: "5+ Years" },
  { value: "10", label: "10+ Years" },
  { value: "15", label: "15+ Years" },
  { value: "20", label: "20+ Years" },
];

const genders = [
  { value: "", label: "Any Gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const consultationTypes = [
  { value: "", label: "Any Type" },
  { value: "in-person", label: "In Person" },
  { value: "video", label: "Video Consultation" },
];

export function DoctorSearch({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedLocation,
  onLocationChange,
  selectedLanguage,
  onLanguageChange,
  selectedAvailability,
  onAvailabilityChange,
  selectedExperience,
  onExperienceChange,
  selectedGender,
  onGenderChange,
  selectedConsultationType,
  onConsultationTypeChange,
  onClearFilters,
}: DoctorSearchProps) {
  const hasAnyFilter =
    searchQuery ||
    selectedDepartment ||
    selectedLocation ||
    selectedLanguage ||
    selectedAvailability ||
    selectedExperience ||
    selectedGender ||
    selectedConsultationType;

  return (
    <motion.div
      id="search"
      variants={fadeDown}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="sticky top-[64px] z-30 border-b border-border/40 bg-white/80 py-4 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search Doctor..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Search doctors by name or specialty"
            />
          </div>

          {/* Department */}
          <div className="relative">
            <Microscope
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <select
              value={selectedDepartment}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-background py-2.5 pl-10 pr-8 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Filter by department"
            >
              {departments.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="relative">
            <MapPin
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-background py-2.5 pl-10 pr-8 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Filter by location"
            >
              {locations.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div className="relative">
            <Globe
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-background py-2.5 pl-10 pr-8 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Filter by language"
            >
              {languages.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Row 2: Availability, Experience, Gender, Consultation Type */}
          <div className="relative">
            <Clock
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <select
              value={selectedAvailability}
              onChange={(e) => onAvailabilityChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-background py-2.5 pl-10 pr-8 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Filter by availability"
            >
              {availabilities.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Briefcase
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <select
              value={selectedExperience}
              onChange={(e) => onExperienceChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-background py-2.5 pl-10 pr-8 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Filter by experience"
            >
              {experienceLevels.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Users
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <select
              value={selectedGender}
              onChange={(e) => onGenderChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-background py-2.5 pl-10 pr-8 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Filter by gender"
            >
              {genders.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Video
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <select
              value={selectedConsultationType}
              onChange={(e) => onConsultationTypeChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-background py-2.5 pl-10 pr-8 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Filter by consultation type"
            >
              {consultationTypes.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search + Clear */}
          <div className="flex items-center gap-2 md:col-span-2 lg:col-span-4 xl:col-span-1">
            {hasAnyFilter && (
              <button
                onClick={onClearFilters}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2.5 text-xs font-medium text-text-secondary transition-colors hover:bg-background hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Clear all filters"
              >
                <FilterX className="h-3.5 w-3.5" aria-hidden="true" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
