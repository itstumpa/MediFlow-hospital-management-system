"use client";

import type { Department } from "@/lib/data/departments";
import type { DepartmentDetailData } from "@/lib/data/department-detail";
import { createContext, useContext } from "react";

interface DepartmentContextValue {
  department: Department;
  detail: DepartmentDetailData;
}

const DepartmentContext = createContext<DepartmentContextValue | null>(null);

export function DepartmentProvider({
  children,
  department,
  detail,
}: {
  children: React.ReactNode;
  department: Department;
  detail: DepartmentDetailData;
}) {
  return (
    <DepartmentContext.Provider value={{ department, detail }}>
      {children}
    </DepartmentContext.Provider>
  );
}

export function useDepartmentContext() {
  const ctx = useContext(DepartmentContext);
  if (!ctx) {
    throw new Error("useDepartmentContext must be used within DepartmentProvider");
  }
  return ctx;
}
