"use client";

import { ChevronDown, MapPin, Search, Stethoscope, User } from "lucide-react";
import { useState } from "react";

const specialties = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Dentistry",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "Ophthalmology",
  "Psychiatry",
];

const locations = [
  "All Locations",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
];

export function HeroBookingSearch() {
  const [specialty, setSpecialty] = useState("All Specialties");
  const [location, setLocation] = useState("All Locations");
  const [doctorName, setDoctorName] = useState("");

  function handleSearch() {
    // TODO: Implement search logic with API integration
    console.log({ specialty, location, doctorName });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div
      className="rounded-xl bg-white shadow-2xl"
      role="search"
      aria-label="Find a doctor or appointment"
    >
      {/* Mobile / tablet: stacked layout */}
      <div className="lg:hidden">
        <div className="space-y-px">
          {/* Specialty */}
          <div className="relative flex items-center border-b border-gray-100 px-5 py-4">
            <Stethoscope
              className="mr-3 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="mobile-specialty"
                className="text-xs font-medium text-text-secondary"
              >
                Specialty
              </label>
              <select
                id="mobile-specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="mt-0.5 appearance-none bg-transparent text-sm font-medium text-text-primary outline-none"
                aria-label="Select medical specialty"
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-text-secondary"
              aria-hidden="true"
            />
          </div>

          {/* Location */}
          <div className="relative flex items-center border-b border-gray-100 px-5 py-4">
            <MapPin
              className="mr-3 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="mobile-location"
                className="text-xs font-medium text-text-secondary"
              >
                Location
              </label>
              <select
                id="mobile-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-0.5 appearance-none bg-transparent text-sm font-medium text-text-primary outline-none"
                aria-label="Select location"
              >
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-text-secondary"
              aria-hidden="true"
            />
          </div>

          {/* Doctor */}
          <div className="relative flex items-center px-5 py-4">
            <User
              className="mr-3 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="mobile-doctor"
                className="text-xs font-medium text-text-secondary"
              >
                Doctor Name
              </label>
              <input
                id="mobile-doctor"
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="Search doctor name..."
                className="mt-0.5 bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-secondary/60"
                aria-label="Search by doctor name"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="flex w-full items-center justify-center gap-2 rounded-b-xl bg-primary px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Search for doctors and appointments"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
          Search
        </button>
      </div>

      {/* Desktop: horizontal layout */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1fr_1fr_auto]">
        {/* Specialty */}
        <div className="relative flex items-center border-r border-gray-100 px-5 py-4">
          <Stethoscope
            className="mr-3 h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <div className="flex flex-1 flex-col">
            <label
              htmlFor="desktop-specialty"
              className="text-xs font-medium text-text-secondary"
            >
              Specialty
            </label>
            <select
              id="desktop-specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="mt-0.5 appearance-none bg-transparent text-sm font-medium text-text-primary outline-none"
              aria-label="Select medical specialty"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <ChevronDown
            className="h-4 w-4 shrink-0 text-text-secondary"
            aria-hidden="true"
          />
        </div>

        {/* Location */}
        <div className="relative flex items-center border-r border-gray-100 px-5 py-4">
          <MapPin
            className="mr-3 h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <div className="flex flex-1 flex-col">
            <label
              htmlFor="desktop-location"
              className="text-xs font-medium text-text-secondary"
            >
              Location
            </label>
            <select
              id="desktop-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-0.5 appearance-none bg-transparent text-sm font-medium text-text-primary outline-none"
              aria-label="Select location"
            >
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <ChevronDown
            className="h-4 w-4 shrink-0 text-text-secondary"
            aria-hidden="true"
          />
        </div>

        {/* Doctor */}
        <div className="relative flex items-center border-r border-gray-100 px-5 py-4">
          <User
            className="mr-3 h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <div className="flex flex-1 flex-col">
            <label
              htmlFor="desktop-doctor"
              className="text-xs font-medium text-text-secondary"
            >
              Doctor Name
            </label>
            <input
              id="desktop-doctor"
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search doctor name..."
              className="mt-0.5 bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-secondary/60"
              aria-label="Search by doctor name"
            />
          </div>
        </div>

        {/* Search button */}
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 rounded-r-xl bg-primary px-8 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Search for doctors and appointments"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}
