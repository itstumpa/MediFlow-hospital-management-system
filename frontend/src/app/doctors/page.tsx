"use client";

import {
  DoctorSearch,
  DoctorsGrid,
  DoctorsHero,
  FeaturedDoctor,
  Pagination,
  PatientReviewPreview,
  QuickFilters,
  SidebarFilters,
  SortDropdown,
} from "@/app/components/doctors";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { doctorsList } from "@/lib/data/doctors";
import { getReviewsByDoctorId } from "@/lib/data/reviews";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const DOCTORS_PER_PAGE = 9;

export default function DoctorsPage() {
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedConsultationType, setSelectedConsultationType] = useState("");
  const [activeQuickFilter, setActiveQuickFilter] = useState("");

  // Sidebar filter state
  const [sidebarDepartments, setSidebarDepartments] = useState<string[]>([]);
  const [sidebarGender, setSidebarGender] = useState("");
  const [sidebarMinExperience, setSidebarMinExperience] = useState(0);
  const [sidebarFeeRange, setSidebarFeeRange] = useState<[number, number]>([
    0, 200,
  ]);
  const [sidebarLanguages, setSidebarLanguages] = useState<string[]>([]);
  const [sidebarMinRating, setSidebarMinRating] = useState(0);

  // Sort & pagination
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Derive filtered doctors
  const filteredDoctors = useMemo(() => {
    let result = [...doctorsList];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.hospital.toLowerCase().includes(q),
      );
    }

    if (selectedDepartment) {
      result = result.filter((d) => d.specialty === selectedDepartment);
    }

    if (selectedLocation) {
      result = result.filter((d) => d.hospital === selectedLocation);
    }

    if (selectedLanguage) {
      result = result.filter((d) =>
        d.languages.some(
          (l) => l.toLowerCase() === selectedLanguage.toLowerCase(),
        ),
      );
    }

    if (selectedAvailability) {
      result = result.filter((d) => d.availability === selectedAvailability);
    }

    if (selectedExperience) {
      const minYears = parseInt(selectedExperience, 10);
      result = result.filter((d) => d.experience >= minYears);
    }

    if (activeQuickFilter) {
      switch (activeQuickFilter) {
        case "available-today":
          result = result.filter(
            (d) =>
              d.availability === "available-now" ||
              d.availability === "available-today",
          );
          break;
        case "top-rated":
          result = result.filter((d) => d.isTopRated);
          break;
        case "online":
          result = result.filter((d) =>
            d.consultationTypes?.some((t) => t === "video"),
          );
          break;
        case "emergency":
          result = result.filter((d) => d.schedule?.some((s) => s.isEmergency));
          break;
        case "experienced":
          result = result.filter((d) => d.experience >= 15);
          break;
        case "children":
          result = result.filter(
            (d) =>
              d.specialty === "Pediatrics" || d.specialty === "Neonatology",
          );
          break;
        case "heart":
          result = result.filter((d) => d.specialty === "Cardiology");
          break;
      }
    }

    if (sidebarDepartments.length > 0) {
      result = result.filter((d) => sidebarDepartments.includes(d.specialty));
    }

    if (sidebarMinExperience > 0) {
      result = result.filter((d) => d.experience >= sidebarMinExperience);
    }

    if (sidebarFeeRange[1] < 200) {
      result = result.filter((d) => d.fee <= sidebarFeeRange[1]);
    }

    if (sidebarLanguages.length > 0) {
      result = result.filter((d) =>
        d.languages.some((l) => sidebarLanguages.includes(l)),
      );
    }

    if (sidebarMinRating > 0) {
      result = result.filter((d) => d.rating >= sidebarMinRating);
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "experience":
        result.sort((a, b) => b.experience - a.experience);
        break;
      case "fee-asc":
        result.sort((a, b) => a.fee - b.fee);
        break;
      case "fee-desc":
        result.sort((a, b) => b.fee - a.fee);
        break;
      case "newest":
        result.reverse();
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [
    searchQuery,
    selectedDepartment,
    selectedLocation,
    selectedLanguage,
    selectedAvailability,
    selectedExperience,
    activeQuickFilter,
    sidebarDepartments,
    sidebarMinExperience,
    sidebarFeeRange,
    sidebarLanguages,
    sidebarMinRating,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * DOCTORS_PER_PAGE,
    currentPage * DOCTORS_PER_PAGE,
  );

  const featuredDoctors = useMemo(() => {
    const topRated = doctorsList.filter(
      (d) => d.isTopRated && d.experience >= 15,
    );
    return topRated.length >= 3
      ? topRated.slice(0, 3)
      : doctorsList.slice(0, 3);
  }, []);

  const featuredReviews = useMemo(
    () => getReviewsByDoctorId(featuredDoctors[0]?.id).slice(0, 3),
    [featuredDoctors],
  );

  const sidebarReviews = useMemo(() => {
    const reviewedDoctors = paginatedDoctors.slice(0, 3);
    return reviewedDoctors.flatMap((d) =>
      getReviewsByDoctorId(d.id).slice(0, 1),
    );
  }, [paginatedDoctors]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("");
    setSelectedLocation("");
    setSelectedLanguage("");
    setSelectedAvailability("");
    setSelectedExperience("");
    setSelectedGender("");
    setSelectedConsultationType("");
    setActiveQuickFilter("");
    setSidebarDepartments([]);
    setSidebarGender("");
    setSidebarMinExperience(0);
    setSidebarFeeRange([0, 200]);
    setSidebarLanguages([]);
    setSidebarMinRating(0);
    setCurrentPage(1);
  };

  const handleSidebarReset = () => {
    setSidebarDepartments([]);
    setSidebarGender("");
    setSidebarMinExperience(0);
    setSidebarFeeRange([0, 200]);
    setSidebarLanguages([]);
    setSidebarMinRating(0);
  };

  return (
    <PageTransition>
      <DoctorsHero />
      <DoctorSearch
        searchQuery={searchQuery}
        onSearchChange={(v) => {
          setSearchQuery(v);
          setCurrentPage(1);
        }}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={(v) => {
          setSelectedDepartment(v);
          setCurrentPage(1);
        }}
        selectedLocation={selectedLocation}
        onLocationChange={(v) => {
          setSelectedLocation(v);
          setCurrentPage(1);
        }}
        selectedLanguage={selectedLanguage}
        onLanguageChange={(v) => {
          setSelectedLanguage(v);
          setCurrentPage(1);
        }}
        selectedAvailability={selectedAvailability}
        onAvailabilityChange={(v) => {
          setSelectedAvailability(v);
          setCurrentPage(1);
        }}
        selectedExperience={selectedExperience}
        onExperienceChange={(v) => {
          setSelectedExperience(v);
          setCurrentPage(1);
        }}
        selectedGender={selectedGender}
        onGenderChange={(v) => {
          setSelectedGender(v);
          setCurrentPage(1);
        }}
        selectedConsultationType={selectedConsultationType}
        onConsultationTypeChange={(v) => {
          setSelectedConsultationType(v);
          setCurrentPage(1);
        }}
        onClearFilters={handleClearFilters}
      />
      <QuickFilters
        activeFilter={activeQuickFilter}
        onFilterChange={(id) => {
          setActiveQuickFilter(id === activeQuickFilter ? "" : id);
          setCurrentPage(1);
        }}
      />

      {/* Breadcrumb */}
      <nav
        className="mx-auto max-w-page px-4 pt-6 md:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-1.5 text-xs text-text-secondary">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            >
              <Home className="h-3 w-3" aria-hidden="true" />
              Home
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <li className="font-medium text-text-primary" aria-current="page">
            Our Doctors
          </li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-page px-4 pb-16 pt-6 md:px-6 lg:px-8 lg:pb-24">
        <div className="flex gap-8">
          {/* Mobile filter toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="mb-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-primary transition-all hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-expanded={showSidebar}
              aria-label={showSidebar ? "Close filters" : "Open filters"}
            >
              {showSidebar ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
              Filters
            </button>
          </div>

          {/* Mobile sidebar overlay */}
          <AnimatePresence>
            {showSidebar && !isDesktop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                onClick={() => setShowSidebar(false)}
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <AnimatePresence mode="wait">
            {(showSidebar || isDesktop) && (
              <motion.div
                key={isDesktop ? "desktop-sidebar" : "mobile-sidebar"}
                initial={
                  isDesktop ? { opacity: 0, x: -20 } : { opacity: 0, x: -280 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -280 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`${isDesktop ? "hidden lg:block lg:w-72 xl:w-80" : "fixed left-0 top-0 z-50 h-full w-72 overflow-y-auto bg-surface shadow-xl lg:hidden"}`}
              >
                <div className={isDesktop ? "" : "p-4 pt-16"}>
                  {!isDesktop && (
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="absolute right-3 top-3 rounded-lg p-1 text-text-secondary hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      aria-label="Close filters"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                  <SidebarFilters
                    selectedDepartments={sidebarDepartments}
                    onDepartmentsChange={setSidebarDepartments}
                    selectedGender={sidebarGender}
                    onGenderChange={setSidebarGender}
                    minExperience={sidebarMinExperience}
                    onExperienceChange={setSidebarMinExperience}
                    feeRange={sidebarFeeRange}
                    onFeeRangeChange={setSidebarFeeRange}
                    selectedLanguages={sidebarLanguages}
                    onLanguagesChange={setSidebarLanguages}
                    minRating={sidebarMinRating}
                    onRatingChange={setSidebarMinRating}
                    onReset={handleSidebarReset}
                    onApply={() => {
                      setCurrentPage(1);
                      setShowSidebar(false);
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main area */}
          <div className="min-w-0 flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-text-secondary">
                <span className="font-semibold text-text-primary">
                  {filteredDoctors.length}
                </span>{" "}
                doctors found
              </p>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            <DoctorsGrid doctors={paginatedDoctors} />

            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}

            <div className="my-14 h-px w-full bg-border/60" />

            <FeaturedDoctor doctors={featuredDoctors} />

            <div className="mt-10">
              <PatientReviewPreview
                reviews={
                  sidebarReviews.length > 0 ? sidebarReviews : featuredReviews
                }
              />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
