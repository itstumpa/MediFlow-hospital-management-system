"use client";

import { AuthLayout } from "@/app/components/auth/AuthLayout";
import { ResendVerificationForm } from "@/app/components/auth/ResendVerificationForm";

export default function ResendVerificationPage() {
  return (
    <AuthLayout>
      <ResendVerificationForm />
    </AuthLayout>
  );
}
