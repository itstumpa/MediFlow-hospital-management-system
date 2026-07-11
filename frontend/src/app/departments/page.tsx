"use client";

import {
  DepartmentGrid,
  DepartmentsCTA,
  DepartmentSearch,
  DepartmentsHero,
  DepartmentStats,
  FeaturedDepartments,
  MedicalTechnology,
  QuickCategories,
  TreatmentTimeline,
} from "@/app/components/departments";
import { PageTransition } from "@/app/components/ui/PageTransition";
import type { Department } from "@/lib/data/departments";
import { departments as allDepartments } from "@/lib/data/departments";
import { useMemo, useState } from "react";

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  // Filter and sort departments
  const filteredDepartments = useMemo(() => {
    let filtered = [...allDepartments];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q),
      );
    }

    // Category filter (from dropdown)
    if (categoryFilter) {
      filtered = filtered.filter((d) => d.category === categoryFilter);
    }

    // Quick category filter
    if (activeCategory !== "All") {
      filtered = filtered.filter((d) => d.category === activeCategory);
    }

    // Availability filter
    if (availabilityFilter) {
      if (availabilityFilter === "24/7") {
        filtered = filtered.filter((d) => d.operatingHours === "24/7");
      } else if (availabilityFilter === "daytime") {
        filtered = filtered.filter((d) => d.operatingHours !== "24/7");
      } else if (availabilityFilter === "emergency") {
        filtered = filtered.filter((d) => d.emergencyAvailable);
      }
    }

    // Sort
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "doctors":
        filtered.sort((a, b) => b.doctors - a.doctors);
        break;
      case "patients":
        filtered.sort(
          (a, b) =>
            parseInt(b.patientsTreated.replace(/\D/g, "")) -
            parseInt(a.patientsTreated.replace(/\D/g, "")),
        );
        break;
    }

    return filtered;
  }, [searchQuery, categoryFilter, availabilityFilter, sortBy, activeCategory]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setAvailabilityFilter("");
    setSortBy("default");
    setActiveCategory("All");
  };

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") {
      setCategoryFilter("");
    } else {
      setCategoryFilter(cat);
    }
  };

  return (
    <PageTransition>
      {/* 1. Hero Section with Breadcrumb */}
      <DepartmentsHero />

      {/* 2. Stats Counter Section */}
      <DepartmentStats />

      {/* 3. Search & Filter Section with Quick Categories */}
      <section className="bg-background pb-4 pt-8">
        <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
          <DepartmentSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            availabilityFilter={availabilityFilter}
            onAvailabilityFilterChange={setAvailabilityFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />
          <QuickCategories
            selected={activeCategory}
            onSelect={handleCategorySelect}
          />
        </div>
      </section>

      {/* 4. Featured Departments */}
      <FeaturedDepartments />

      {/* 5. All Departments Grid */}
      <section className="bg-surface py-6 md:py-16">
        <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
              All Departments
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
              Browse our complete range of medical specialties and find the care
              you need.
            </p>
          </div>

          <DepartmentGrid departments={filteredDepartments} />
        </div>
      </section>

      {/* 7. Our Medical Technology */}
      <MedicalTechnology />

      {/* 8. Treatment Process Timeline */}
      <TreatmentTimeline />

      {/* 9. Call To Action */}
      <DepartmentsCTA />
    </PageTransition>
  );
}
