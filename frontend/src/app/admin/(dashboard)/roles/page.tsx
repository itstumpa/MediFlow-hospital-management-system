"use client";

import { RolesPage as RolesPageComponent } from "@/components/dashboard/roles/RolesPage";
import { PageHeader } from "@/app/components/dashboard/PageHeader";
import { staggerContainer } from "@/lib/animations/stagger";
import { motion } from "framer-motion";

export default function RolesPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <PageHeader
        title="Roles & Permissions"
        subtitle="Manage role-based access control for your organization"
      />
      <RolesPageComponent />
    </motion.div>
  );
}
