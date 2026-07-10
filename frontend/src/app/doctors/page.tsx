"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { SpecialtyDoctors } from "@/app/components/home/SpecialtyDoctors";
import { SectionHeading } from "@/app/components/ui/SectionHeading";

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  imageUrl: string;
}

// TODO: Replace with API data
const allDoctors: Doctor[] = [
  { name: "Dr. Sarah Rahman", specialty: "Cardiologist", experience: "15 years", imageUrl: "" },
  { name: "Dr. Michael Torres", specialty: "Interventional Cardiologist", experience: "14 years", imageUrl: "" },
  { name: "Dr. Lisa Park", specialty: "Pediatric Cardiologist", experience: "11 years", imageUrl: "" },
  { name: "Dr. James Mitchell", specialty: "Neurologist", experience: "12 years", imageUrl: "" },
  { name: "Dr. Emily Watson", specialty: "Neurosurgeon", experience: "16 years", imageUrl: "" },
  { name: "Dr. David Kim", specialty: "Clinical Neurologist", experience: "10 years", imageUrl: "" },
  { name: "Dr. Ayesha Khan", specialty: "Pediatrician", experience: "10 years", imageUrl: "" },
  { name: "Dr. Rachel Green", specialty: "Neonatologist", experience: "13 years", imageUrl: "" },
  { name: "Dr. Omar Hassan", specialty: "Pediatric Surgeon", experience: "15 years", imageUrl: "" },
  { name: "Dr. Robert Chen", specialty: "Orthopedic Surgeon", experience: "18 years", imageUrl: "" },
  { name: "Dr. Maria Santos", specialty: "Ophthalmologist", experience: "12 years", imageUrl: "" },
  { name: "Dr. John Baker", specialty: "Pulmonologist", experience: "14 years", imageUrl: "" },
];

const specialties = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Ophthalmology",
  "Pulmonology",
];

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All Specialties");
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  const filteredDoctors = allDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      activeSpecialty === "All Specialties" || doctor.specialty.includes(activeSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * doctorsPerPage,
    currentPage * doctorsPerPage,
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* Hero banner */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Our doctors
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Meet our team of experienced specialists committed to your health and
            well-being.
          </p>
        </div>
      </section>

      {/* Search and filter */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search doctors by name or specialty..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Search doctors"
              />
            </div>

            {/* Specialty filter pills */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by specialty">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  role="tab"
                  aria-selected={activeSpecialty === specialty}
                  onClick={() => {
                    setActiveSpecialty(specialty);
                    setCurrentPage(1);
                  }}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    activeSpecialty === specialty
                      ? "bg-primary text-white shadow-sm"
                      : "bg-background text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctor listing */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          {paginatedDoctors.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedDoctors.map((doctor) => (
                  <div
                    key={doctor.name}
                    className="group flex flex-col items-center rounded-xl border border-border bg-surface p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    role="article"
                  >
                    {/* Avatar placeholder */}
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 ring-2 ring-border">
                      <span className="text-2xl font-bold text-primary">
                        {doctor.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold text-text-primary">
                      {doctor.name}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {doctor.specialty}
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      {doctor.experience} experience
                    </p>

                    <div className="mt-5 w-full">
                      <Button variant="primary" size="sm" className="w-full" href="/appointment">
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Doctor listing pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                        currentPage === page
                          ? "border-primary bg-primary text-white"
                          : "border-border text-text-secondary hover:bg-background"
                      }`}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-text-secondary">No doctors found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveSpecialty("All Specialties");
                }}
                className="mt-4 text-sm font-medium text-primary hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Specialty tabs section */}
      <SpecialtyDoctors />
    </>
  );
}
