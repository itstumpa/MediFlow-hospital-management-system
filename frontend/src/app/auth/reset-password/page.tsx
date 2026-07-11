import { AuthLayout } from "@/app/components/auth/AuthLayout";
import { ResetPasswordForm } from "@/app/components/auth/ResetPasswordForm";
import { Suspense } from "react";

function ResetPasswordPageContent({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token ?? "";

  return (
    <AuthLayout>
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
}

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <ResetPasswordPageContent searchParams={searchParams} />
    </Suspense>
  );
}
