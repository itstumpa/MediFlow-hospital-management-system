import { StaffProvider } from "@/components/dashboard/staff/StaffProvider";
import { DashboardShell } from "./dashboard-shell";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StaffProvider>
      <DashboardShell>{children}</DashboardShell>
    </StaffProvider>
  );
}
