import { PatientPortalShell } from "./patient-portal-shell";

export const metadata = {
  title: "Patient Portal",
  description:
    "Your personal healthcare portal — manage appointments, medical records, prescriptions, and more.",
};

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PatientPortalShell>{children}</PatientPortalShell>;
}
