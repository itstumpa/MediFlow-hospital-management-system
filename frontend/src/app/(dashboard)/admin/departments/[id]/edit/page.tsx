import { DepartmentForm } from "../../DepartmentForm";
import { mockDepartmentEditData } from "../../form-mock";

interface EditDepartmentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDepartmentPage({
  params,
}: EditDepartmentPageProps) {
  const { id } = await params;

  // Use mock data; fallback if not found
  const defaultValues =
    id === "dept-edit-001" ? mockDepartmentEditData : undefined;

  return <DepartmentForm mode="edit" defaultValues={defaultValues} />;
}
