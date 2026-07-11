"use client";

import { PageTransition } from "@/app/components/ui/PageTransition";
import { departments } from "@/lib/data/departments";
import { getDepartmentDetail } from "@/lib/data/department-detail";
import { notFound, useParams } from "next/navigation";
import { DepartmentProvider } from "./department-context";

export default function DepartmentDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const slug = params.slug as string;

  const department = departments.find((d) => d.id === slug);
  if (!department) {
    notFound();
  }

  const detail = getDepartmentDetail(slug);
  if (!detail) {
    notFound();
  }

  return (
    <DepartmentProvider department={department} detail={detail}>
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
    </DepartmentProvider>
  );
}
