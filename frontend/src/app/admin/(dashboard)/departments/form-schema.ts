import { z } from "zod";

// ─── Day schedule schema ───
export const dayScheduleSchema = z.object({
  available: z.boolean(),
  startTime: z.string(),
  endTime: z.string(),
});

// ─── Doctor assignment schema ───
export const doctorAssignmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  specialization: z.string(),
  isHead: z.boolean().default(false),
  isAssistantHead: z.boolean().default(false),
});

// ─── Main department form schema ───
export const departmentFormSchema = z.object({
  // Section 1: Basic Information
  name: z.string().min(2, "Department name must be at least 2 characters"),
  code: z.string().min(2, "Department code is required"),
  icon: z.string().min(1, "Please select an icon"),
  image: z.string().optional(),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Short description must be under 200 characters"),
  fullDescription: z
    .string()
    .min(20, "Full description must be at least 20 characters"),

  // Section 2: Management
  departmentHead: z.string().min(1, "Department head is required"),
  assistantHead: z.string().optional(),
  status: z.enum(["Active", "Inactive", "Under Maintenance", "Closed"], {
    error: "Please select a status",
  }),
  openingDate: z.string().min(1, "Opening date is required"),

  // Section 3: Location
  building: z.string().min(1, "Building is required"),
  floor: z.string().min(1, "Floor is required"),
  roomNumbers: z.string().optional(),
  receptionContact: z
    .string()
    .min(7, "Contact number must be valid")
    .optional()
    .or(z.literal("")),
  emergencyContact: z
    .string()
    .min(7, "Contact number must be valid")
    .optional()
    .or(z.literal("")),

  // Section 4: Working Hours
  openingTime: z.string().min(1, "Opening time is required"),
  closingTime: z.string().min(1, "Closing time is required"),
  emergencyAvailable: z.boolean().default(false),
  weekendSchedule: z.string().optional(),
  weeklyTimetable: z.record(z.string(), dayScheduleSchema),

  // Section 5: Department Details
  mission: z
    .string()
    .min(10, "Mission must be at least 10 characters")
    .optional()
    .or(z.literal("")),
  vision: z
    .string()
    .min(10, "Vision must be at least 10 characters")
    .optional()
    .or(z.literal("")),
  coreServices: z.array(z.string()).optional(),
  medicalTechnologies: z.array(z.string()).optional(),
  availableFacilities: z.array(z.string()).optional(),
  emergencyServices: z.boolean().default(false),

  // Section 6: Doctors
  assignedDoctors: z.array(doctorAssignmentSchema).optional(),

  // Section 7: SEO
  slug: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    )
    .optional()
    .or(z.literal("")),
  metaTitle: z
    .string()
    .max(70, "Meta title must be under 70 characters")
    .optional()
    .or(z.literal("")),
  metaDescription: z
    .string()
    .max(160, "Meta description must be under 160 characters")
    .optional()
    .or(z.literal("")),
  keywords: z.string().optional().or(z.literal("")),
  ogImage: z.string().optional(),
});

export type DepartmentFormValues = z.infer<typeof departmentFormSchema>;

// ─── Default values ───
export const defaultFormValues: DepartmentFormValues = {
  name: "",
  code: "",
  icon: "Building2",
  image: "",
  shortDescription: "",
  fullDescription: "",

  departmentHead: "",
  assistantHead: "",
  status: "Active",
  openingDate: "",

  building: "",
  floor: "",
  roomNumbers: "",
  receptionContact: "",
  emergencyContact: "",

  openingTime: "08:00",
  closingTime: "17:00",
  emergencyAvailable: false,
  weekendSchedule: "",
  weeklyTimetable: {
    Monday: { available: true, startTime: "08:00", endTime: "17:00" },
    Tuesday: { available: true, startTime: "08:00", endTime: "17:00" },
    Wednesday: { available: true, startTime: "08:00", endTime: "17:00" },
    Thursday: { available: true, startTime: "08:00", endTime: "17:00" },
    Friday: { available: true, startTime: "08:00", endTime: "17:00" },
    Saturday: { available: false, startTime: "09:00", endTime: "13:00" },
    Sunday: { available: false, startTime: "09:00", endTime: "13:00" },
  },

  mission: "",
  vision: "",
  coreServices: [],
  medicalTechnologies: [],
  availableFacilities: [],
  emergencyServices: false,

  assignedDoctors: [],

  slug: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  ogImage: "",
};
