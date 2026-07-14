import { DoctorForm } from "../../DoctorForm";
import { mockDoctorEditData } from "../../form-mock";

interface EditDoctorPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDoctorPage({ params }: EditDoctorPageProps) {
  const { id } = await params;

  // In a real app, fetch the doctor data from the API using the ID
  // For now, use mock data; in production, fetch by `id`
  const defaultValues = id === "DOC-001" ? mockDoctorEditData : undefined;

  return <DoctorForm mode="edit" defaultValues={defaultValues} />;
}
