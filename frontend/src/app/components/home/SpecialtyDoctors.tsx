"use client";

import { Button } from "@/app/components/ui/Button";
import { useState } from "react";

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  imageUrl: string;
}

interface SpecialtyTab {
  id: string;
  label: string;
  doctors: Doctor[];
}

// TODO: Replace with API data
const specialtyTabs: SpecialtyTab[] = [
  {
    id: "cardiology",
    label: "Cardiology",
    doctors: [
      {
        name: "Dr. Sarah Rahman",
        specialty: "Cardiologist",
        experience: "15 years",
        imageUrl: "",
      },
      {
        name: "Dr. Michael Torres",
        specialty: "Interventional Cardiologist",
        experience: "14 years",
        imageUrl: "",
      },
      {
        name: "Dr. Lisa Park",
        specialty: "Pediatric Cardiologist",
        experience: "11 years",
        imageUrl: "",
      },
    ],
  },
  {
    id: "neurology",
    label: "Neurology",
    doctors: [
      {
        name: "Dr. James Mitchell",
        specialty: "Neurologist",
        experience: "12 years",
        imageUrl: "",
      },
      {
        name: "Dr. Emily Watson",
        specialty: "Neurosurgeon",
        experience: "16 years",
        imageUrl: "",
      },
      {
        name: "Dr. David Kim",
        specialty: "Clinical Neurologist",
        experience: "10 years",
        imageUrl: "",
      },
    ],
  },
  {
    id: "pediatrics",
    label: "Pediatrics",
    doctors: [
      {
        name: "Dr. Ayesha Khan",
        specialty: "Pediatrician",
        experience: "10 years",
        imageUrl: "",
      },
      {
        name: "Dr. Rachel Green",
        specialty: "Neonatologist",
        experience: "13 years",
        imageUrl: "",
      },
      {
        name: "Dr. Omar Hassan",
        specialty: "Pediatric Surgeon",
        experience: "15 years",
        imageUrl: "",
      },
    ],
  },
];

export function SpecialtyDoctors() {
  const [activeTab, setActiveTab] = useState(specialtyTabs[0].id);

  const currentTab =
    specialtyTabs.find((tab) => tab.id === activeTab) ?? specialtyTabs[0];

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-page px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Top doctors by specialty
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Browse leading specialists across our top departments.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="mb-10 flex justify-center"
          role="tablist"
          aria-label="Doctor specialties"
        >
          <div className="inline-flex rounded-xl border border-border bg-background p-1">
            {specialtyTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab panel */}
        <div
          key={currentTab.id}
          role="tabpanel"
          id={`tabpanel-${currentTab.id}`}
          aria-labelledby={`tab-${currentTab.id}`}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {currentTab.doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="group flex flex-col items-center rounded-xl border border-border bg-background p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              role="article"
            >
              {/* Avatar placeholder */}
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 ring-2 ring-border">
                <span className="text-xl font-bold text-primary">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>

              <h3 className="text-base font-semibold text-text-primary">
                {doctor.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {doctor.specialty}
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                {doctor.experience} experience
              </p>

              <div className="mt-4 w-full">
                <Button variant="primary" size="sm" className="w-full">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
