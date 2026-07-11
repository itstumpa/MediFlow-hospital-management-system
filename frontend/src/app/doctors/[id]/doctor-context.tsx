"use client";

import type { Doctor } from "@/lib/data/doctors";
import { createContext, useContext } from "react";

interface DoctorContextValue {
  doctor: Doctor;
  relatedDoctors: Doctor[];
}

const DoctorContext = createContext<DoctorContextValue | null>(null);

export function DoctorProvider({
  children,
  doctor,
  relatedDoctors,
}: {
  children: React.ReactNode;
  doctor: Doctor;
  relatedDoctors: Doctor[];
}) {
  return (
    <DoctorContext.Provider value={{ doctor, relatedDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctorContext() {
  const ctx = useContext(DoctorContext);
  if (!ctx) {
    throw new Error("useDoctorContext must be used within DoctorProvider");
  }
  return ctx;
}
