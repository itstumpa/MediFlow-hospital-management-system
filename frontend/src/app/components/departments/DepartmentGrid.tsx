"use client";

import type { Department } from "@/lib/data/departments";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { DepartmentCard } from "./DepartmentCard";

interface DepartmentGridProps {
  departments: Department[];
}

export function DepartmentGrid({ departments: depts }: DepartmentGridProps) {
  if (depts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <Building2
          className="mb-4 h-16 w-16 text-text-secondary/30"
          aria-hidden="true"
        />
        <h3 className="text-xl font-semibold text-text-primary">
          No departments found
        </h3>
        <p className="mt-2 text-text-secondary">
          Try adjusting your filters or search criteria.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {depts.map((dept, index) => (
        <DepartmentCard key={dept.id} department={dept} index={index} />
      ))}
    </div>
  );
}
