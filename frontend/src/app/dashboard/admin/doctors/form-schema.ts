import { z } from "zod";

export const doctorFormSchema = z.object({
  // Personal Information
  photo: z.string().optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["Male", "Female", "Other"], {
    error: "Please select a gender",
  }),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  nationality: z.string().min(1, "Nationality is required"),

  // Professional Information
  doctorId: z.string().optional(),
  department: z.string().min(1, "Department is required"),
  specialization: z.string().min(1, "Specialization is required"),
  designation: z.string().min(1, "Designation is required"),
  yearsOfExperience: z.coerce.number().min(0, "Experience cannot be negative"),
  consultationFee: z.coerce.number().min(0, "Fee cannot be negative"),
  licenseNumber: z.string().min(1, "License number is required"),
  medicalRegistrationNumber: z
    .string()
    .min(1, "Registration number is required"),
  employmentType: z.enum(
    ["Full-time", "Part-time", "Contract", "Visiting", "Locum"],
    {
      error: "Please select employment type",
    },
  ),
  status: z.enum(
    ["Active", "Inactive", "On Leave", "Vacation", "Emergency Duty"],
    {
      error: "Please select status",
    },
  ),

  // Education
  education: z
    .array(
      z.object({
        degree: z.string().min(1, "Degree is required"),
        institution: z.string().min(1, "Institution is required"),
        year: z.string().min(1, "Year is required"),
      }),
    )
    .min(1, "At least one education entry is required"),

  // Certifications
  certifications: z
    .array(
      z.object({
        certificate: z.string().min(1, "Certificate is required"),
        organization: z.string().min(1, "Organization is required"),
        issuedYear: z.string().min(1, "Issued year is required"),
        expiryYear: z.string().optional(),
      }),
    )
    .optional(),

  // Languages
  languages: z.array(z.string()).min(1, "Select at least one language"),

  // Biography
  biography: z.string().optional(),

  // Clinic Information
  hospital: z.string().min(1, "Hospital is required"),
  floor: z.string().optional(),
  roomNumber: z.string().optional(),
  officePhone: z.string().optional(),
  emergencyContact: z.string().optional(),

  // Availability
  availability: z.record(
    z.string(),
    z.object({
      available: z.boolean(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
});

export type DoctorFormValues = z.infer<typeof doctorFormSchema>;

export const defaultFormValues: DoctorFormValues = {
  photo: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "Male",
  dateOfBirth: "",
  bloodGroup: "",
  nationality: "",

  doctorId: "",
  department: "",
  specialization: "",
  designation: "",
  yearsOfExperience: 0,
  consultationFee: 0,
  licenseNumber: "",
  medicalRegistrationNumber: "",
  employmentType: "Full-time",
  status: "Active",

  education: [{ degree: "", institution: "", year: "" }],

  certifications: [
    { certificate: "", organization: "", issuedYear: "", expiryYear: "" },
  ],

  languages: [],

  biography: "",

  hospital: "",
  floor: "",
  roomNumber: "",
  officePhone: "",
  emergencyContact: "",

  availability: {
    Monday: { available: true, startTime: "09:00", endTime: "17:00" },
    Tuesday: { available: true, startTime: "09:00", endTime: "17:00" },
    Wednesday: { available: true, startTime: "09:00", endTime: "17:00" },
    Thursday: { available: true, startTime: "09:00", endTime: "17:00" },
    Friday: { available: true, startTime: "09:00", endTime: "17:00" },
    Saturday: { available: false, startTime: "09:00", endTime: "13:00" },
    Sunday: { available: false, startTime: "09:00", endTime: "13:00" },
  },
};
