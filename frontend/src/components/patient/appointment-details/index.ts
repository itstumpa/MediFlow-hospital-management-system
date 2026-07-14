export { AppointmentDetails } from "./AppointmentDetails";
export { AppointmentHero } from "./AppointmentHero";
export { AppointmentTimeline } from "./AppointmentTimeline";
export { DoctorCard } from "./DoctorCard";
export { DocumentsCard } from "./DocumentsCard";
export { LocationCard } from "./LocationCard";
export { PaymentCard } from "./PaymentCard";
export { QuickInfo } from "./QuickInfo";
export { RelatedAppointments } from "./RelatedAppointments";

export type {
  ActivityEntry,
  AppointmentAttachment,
  AppointmentDetail,
  AppointmentDetailPageData,
  AppointmentDoctor,
  AppointmentPatient,
  BillingInfo,
  ClinicLocation,
  DoctorDetail,
  Document,
  PrescriptionItem,
  RelatedAppointment,
  TimelineStep,
} from "./types";

export {
  clinicLocations,
  doctorDetails,
  generateDocuments,
  generateTimelineSteps,
  getAppointmentDetailPageData,
  relatedAppointments,
} from "./types";
