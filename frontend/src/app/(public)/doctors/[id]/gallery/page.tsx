"use client";

import { Gallery } from "@/app/components/doctor-profile";
import { useDoctorContext } from "../doctor-context";

export default function GallerySectionPage() {
  const { doctor } = useDoctorContext();

  return (
    <div className="mx-auto max-w-page space-y-14 px-4 py-8 md:px-6 lg:px-8">
      <Gallery doctor={doctor} />
    </div>
  );
}
