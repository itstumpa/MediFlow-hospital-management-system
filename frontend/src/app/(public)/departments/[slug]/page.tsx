"use client";

import {
  AchievementStats,
  ConditionsGrid,
  CTASection,
  DepartmentFAQ,
  DepartmentHero,
  DepartmentOverview,
  EmergencyCard,
  FacilitiesGallery,
  HealthResources,
  InsuranceSection,
  ProceduresSection,
  SpecialistsGrid,
  SuccessStories,
  TechnologyGrid,
  TreatmentTimeline,
} from "@/app/components/department-details";
import { useDepartmentContext } from "./department-context";

export default function DepartmentDetailPage() {
  const { department, detail } = useDepartmentContext();

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <DepartmentHero department={department} />

      {/* 2. Overview Section */}
      <DepartmentOverview department={department} overview={detail.overview} />

      {/* 3. Conditions Grid */}
      <ConditionsGrid
        conditions={detail.conditions}
        departmentName={department.name}
        color={department.color}
      />

      {/* 4. Procedures */}
      <ProceduresSection procedures={detail.procedures} />

      {/* 5. Technology Grid */}
      <TechnologyGrid technologies={detail.technologies} />

      {/* 6. Specialists Grid */}
      <SpecialistsGrid specialists={detail.specialists} />

      {/* 7. Treatment Timeline */}
      <TreatmentTimeline steps={detail.treatmentProcess} />

      {/* 8. Achievement Stats */}
      <AchievementStats achievements={detail.achievements} />

      {/* 9. Success Stories */}
      <SuccessStories stories={detail.successStories} />

      {/* 10. Facilities Gallery */}
      <FacilitiesGallery items={detail.gallery} />

      {/* 11. Insurance Section */}
      <InsuranceSection providers={detail.insurance} />

      {/* 12. Health Resources */}
      <HealthResources resources={detail.healthResources} />

      {/* 13. FAQ */}
      <DepartmentFAQ faqs={detail.faq} />

      {/* 14. Emergency Card */}
      {department.emergencyAvailable && (
        <EmergencyCard info={detail.emergency} department={department} />
      )}

      {/* 15. Final CTA */}
      <CTASection department={department} />
    </div>
  );
}
