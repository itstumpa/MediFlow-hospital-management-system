"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "about", label: "About", path: "/about" },
  { id: "qualifications", label: "Qualifications", path: "/qualifications" },
  { id: "expertise", label: "Expertise", path: "/expertise" },
  { id: "consultation", label: "Consultation", path: "/consultation" },
  { id: "schedule", label: "Schedule", path: "/schedule" },
  { id: "reviews", label: "Reviews", path: "/reviews" },
  { id: "gallery", label: "Gallery", path: "/gallery" },
  { id: "location", label: "Location", path: "/location" },
];

export function ProfileNav() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Determine active section from the current URL path
  const pathParts = pathname.split("/").filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1] || "";
  const activeSection = sections.some((s) => s.id === lastPart)
    ? lastPart
    : "about";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 },
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} />
      <nav
        className={`z-20 border-b border-border/50 bg-surface transition-shadow ${
          isSticky ? "sticky top-[64px] shadow-md" : ""
        }`}
        aria-label="Doctor profile sections"
      >
        <div className="mx-auto max-w-page overflow-x-auto px-4 md:px-6 lg:px-8">
          <div className="flex gap-1 py-2" role="tablist">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={`./${section.id}`}
                role="tab"
                aria-selected={activeSection === section.id}
                className={`relative whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  activeSection === section.id
                    ? "text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {activeSection === section.id && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{section.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
