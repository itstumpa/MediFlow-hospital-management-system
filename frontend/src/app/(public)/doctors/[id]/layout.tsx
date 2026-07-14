"use client";

import {
  AppointmentBooking,
  ProfileActions,
  ProfileHero,
  ProfileNav,
  ProfileStats,
  SimilarDoctors,
} from "@/app/components/doctor-profile";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { getDoctorById, getRelatedDoctors } from "@/lib/data/doctors";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { DoctorProvider, useDoctorContext } from "./doctor-context";

function DoctorProfileHeader() {
  const { doctor } = useDoctorContext();

  return (
    <>
      <ProfileHero doctor={doctor} />
      <ProfileStats doctor={doctor} />
      <ProfileNav />

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
          <li>
            <Link
              href="/doctors"
              className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            >
              Our Doctors
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <li className="font-medium text-text-primary" aria-current="page">
            {doctor.name}
          </li>
        </ol>
      </nav>

      {/* Profile Actions */}
      <div className="mx-auto max-w-page px-4 pt-4 md:px-6 lg:px-8">
        <ProfileActions doctor={doctor} />
      </div>
    </>
  );
}

function DoctorProfileFooter() {
  const { doctor, relatedDoctors } = useDoctorContext();

  return (
    <div className="mx-auto max-w-page space-y-14 px-4 pb-16 pt-8 md:px-6 lg:px-8 lg:pb-24">
      <AppointmentBooking doctor={doctor} />
      <SimilarDoctors doctors={relatedDoctors} />
    </div>
  );
}

export default function DoctorProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const doctorId = params.id as string;
  const doctor = getDoctorById(doctorId);

  if (!doctor) {
    notFound();
  }

  const relatedDoctors = getRelatedDoctors(doctor);

  return (
    <DoctorProvider doctor={doctor} relatedDoctors={relatedDoctors}>
      <PageTransition>
        <DoctorProfileHeader />
        <main>{children}</main>
        <DoctorProfileFooter />
      </PageTransition>
    </DoctorProvider>
  );
}
