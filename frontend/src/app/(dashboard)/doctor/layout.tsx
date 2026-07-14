import { DoctorProvider } from "@/components/dashboard/doctor/DoctorProvider";
import { DashboardShell } from "./dashboard-shell";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DoctorProvider>
      <DashboardShell>{children}</DashboardShell>
    </DoctorProvider>
  );
}
