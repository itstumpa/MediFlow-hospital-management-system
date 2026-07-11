"use client";

import { PatientReviews } from "@/app/components/doctor-profile";
import { getReviewStats, getReviewsByDoctorId } from "@/lib/data/reviews";
import { useDoctorContext } from "../doctor-context";

export default function ReviewsSectionPage() {
  const { doctor } = useDoctorContext();
  const reviews = getReviewsByDoctorId(doctor.id);
  const reviewStats = getReviewStats(doctor.id);

  return (
    <div className="mx-auto max-w-page space-y-14 px-4 py-8 md:px-6 lg:px-8">
      <PatientReviews
        reviews={reviews}
        average={reviewStats.average}
        total={reviewStats.total}
        distribution={reviewStats.distribution}
      />
    </div>
  );
}
