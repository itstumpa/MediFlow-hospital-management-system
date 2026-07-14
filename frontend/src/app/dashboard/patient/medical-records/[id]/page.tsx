import { RecordDetails } from "@/components/patient/medical-records/record-details/RecordDetails";
import { getRecordDetailData } from "@/components/patient/medical-records/record-details/types";

export const metadata = {
  title: "Medical Record Details | MediFlow",
  description: "View detailed medical record information",
};

export default async function MedicalRecordDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = getRecordDetailData(id);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Record Not Found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            The medical record "{id}" does not exist.
          </p>
          <a
            href="/dashboard/patient/medical-records"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Records
          </a>
        </div>
      </div>
    );
  }

  return <RecordDetails data={data} />;
}
