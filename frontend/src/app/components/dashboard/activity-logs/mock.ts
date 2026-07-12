import type {
  ActivityLog,
  ActivityActionType,
  ActivityModule,
  ActivitySeverity,
  ActivityStatus,
  UserRole,
} from "./types";

/** Mock users for activity logs */
export const mockUsers = [
  {
    id: "usr-001",
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    role: "Super Admin" as UserRole,
  },
  {
    id: "usr-002",
    name: "James Anderson",
    email: "james.anderson@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    role: "Admin" as UserRole,
  },
  {
    id: "usr-003",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    role: "Doctor" as UserRole,
  },
  {
    id: "usr-004",
    name: "Maria Rodriguez",
    email: "maria.rodriguez@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face",
    role: "Nurse" as UserRole,
  },
  {
    id: "usr-005",
    name: "Robert Chen",
    email: "robert.chen@mediflow.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: "Receptionist" as UserRole,
  },
  {
    id: "sys-001",
    name: "System Automation",
    email: "system@mediflow.com",
    avatar: undefined,
    role: "System" as UserRole,
  },
];

/** Mock IP addresses */
const mockIPs = [
  "192.168.1.45",
  "10.0.0.23",
  "172.16.5.89",
  "203.0.113.42",
  "198.51.100.17",
  "203.0.113.195",
  "192.0.2.14",
  "198.51.100.87",
];

/** Mock locations */
const mockLocations = [
  {
    country: "United States",
    city: "New York",
    region: "NY",
    ip: "192.168.1.45",
    isp: "Verizon",
  },
  {
    country: "United States",
    city: "Los Angeles",
    region: "CA",
    ip: "10.0.0.23",
    isp: "AT&T",
  },
  {
    country: "United Kingdom",
    city: "London",
    region: "ENG",
    ip: "172.16.5.89",
    isp: "BT Group",
  },
  {
    country: "Canada",
    city: "Toronto",
    region: "ON",
    ip: "203.0.113.42",
    isp: "Rogers",
  },
  {
    country: "Australia",
    city: "Sydney",
    region: "NSW",
    ip: "198.51.100.17",
    isp: "Telstra",
  },
  {
    country: "Germany",
    city: "Berlin",
    region: "BE",
    ip: "203.0.113.195",
    isp: "Deutsche Telekom",
  },
  {
    country: "Japan",
    city: "Tokyo",
    region: "TK",
    ip: "192.0.2.14",
    isp: "NTT",
  },
  {
    country: "Singapore",
    city: "Singapore",
    region: "SG",
    ip: "198.51.100.87",
    isp: "Singtel",
  },
];

/** Mock devices */
const mockDevices = [
  {
    browser: "Chrome",
    browserVersion: "120.0.6099.129",
    os: "Windows",
    osVersion: "11",
    device: "desktop" as const,
    deviceModel: "Dell XPS 15",
  },
  {
    browser: "Firefox",
    browserVersion: "121.0",
    os: "macOS",
    osVersion: "14.2",
    device: "desktop" as const,
    deviceModel: "MacBook Pro 16",
  },
  {
    browser: "Safari",
    browserVersion: "17.2",
    os: "iOS",
    osVersion: "17.2",
    device: "mobile" as const,
    deviceModel: "iPhone 15 Pro",
  },
  {
    browser: "Chrome",
    browserVersion: "120.0.6099.129",
    os: "Android",
    osVersion: "14",
    device: "mobile" as const,
    deviceModel: "Samsung Galaxy S24",
  },
  {
    browser: "Edge",
    browserVersion: "120.0.2210.91",
    os: "Windows",
    osVersion: "11",
    device: "desktop" as const,
    deviceModel: "Surface Laptop 5",
  },
  {
    browser: "Safari",
    browserVersion: "17.2",
    os: "macOS",
    osVersion: "14.2",
    device: "desktop" as const,
    deviceModel: "iMac 24",
  },
  {
    browser: "Chrome",
    browserVersion: "120.0.6099.129",
    os: "Linux",
    osVersion: "Ubuntu 22.04",
    device: "desktop" as const,
    deviceModel: "ThinkPad X1 Carbon",
  },
  {
    browser: "Firefox",
    browserVersion: "121.0",
    os: "iPadOS",
    osVersion: "17.2",
    device: "tablet" as const,
    deviceModel: "iPad Pro 12.9",
  },
];

/** Generate a random timestamp within the last 30 days */
function randomTimestamp(daysAgo: number = 30): string {
  const now = new Date();
  const past = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  const randomTime =
    past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime).toISOString();
}

/** Generate mock activity logs */
export const activityLogsData: ActivityLog[] = [
  // Today - Critical Security Events
  {
    id: "act-001",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 min ago
    user: mockUsers[0],
    module: "Security",
    action: "login",
    description: "Successful admin login from new device",
    severity: "critical",
    status: "success",
    ipAddress: "203.0.113.42",
    location: mockLocations[3],
    device: mockDevices[1],
    beforeState: {},
    afterState: { sessionId: "sess-abc123", mfaVerified: true },
    relatedEntities: [
      { type: "Session", id: "sess-abc123", name: "Admin Session" },
    ],
    metadata: { mfaMethod: "authenticator", riskScore: 15 },
  },
  {
    id: "act-002",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 min ago
    user: mockUsers[1],
    module: "Users",
    action: "role_change",
    description:
      "Changed role for user 'dr.williams@mediflow.com' from Doctor to Senior Doctor",
    severity: "warning",
    status: "success",
    ipAddress: "192.168.1.45",
    location: mockLocations[0],
    device: mockDevices[0],
    beforeState: {
      role: "Doctor",
      permissions: ["read:patients", "write:appointments"],
    },
    afterState: {
      role: "Senior Doctor",
      permissions: [
        "read:patients",
        "write:appointments",
        "manage:doctors",
        "approve:leave",
      ],
    },
    relatedEntities: [
      {
        type: "User",
        id: "usr-012",
        name: "Dr. Williams",
        url: "/admin/doctors/usr-012",
      },
    ],
    metadata: { changedBy: "james.anderson@mediflow.com", reason: "Promotion" },
  },
  {
    id: "act-003",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    user: mockUsers[2],
    module: "Patients",
    action: "create",
    description: "Created new patient record: John Doe (MRN: MRN-2025-0042)",
    severity: "info",
    status: "success",
    ipAddress: "172.16.5.89",
    location: mockLocations[2],
    device: mockDevices[2],
    beforeState: {},
    afterState: {
      mrn: "MRN-2025-0042",
      name: "John Doe",
      dob: "1985-03-15",
      insurance: "BlueCross",
    },
    relatedEntities: [
      {
        type: "Patient",
        id: "pat-042",
        name: "John Doe",
        url: "/admin/patients/pat-042",
      },
    ],
    metadata: { source: "walk-in", referredBy: "Dr. Smith" },
  },
  {
    id: "act-004",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    user: mockUsers[3],
    module: "Appointments",
    action: "update",
    description:
      "Rescheduled appointment APT-2025-0156 from 10:00 AM to 2:30 PM",
    severity: "info",
    status: "success",
    ipAddress: "198.51.100.17",
    location: mockLocations[4],
    device: mockDevices[3],
    beforeState: {
      appointmentId: "APT-2025-0156",
      time: "10:00",
      doctor: "Dr. Sharma",
      status: "confirmed",
    },
    afterState: {
      appointmentId: "APT-2025-0156",
      time: "14:30",
      doctor: "Dr. Sharma",
      status: "confirmed",
    },
    relatedEntities: [
      {
        type: "Appointment",
        id: "APT-2025-0156",
        name: "Follow-up: Jane Smith",
        url: "/admin/appointments/APT-2025-0156",
      },
      {
        type: "Patient",
        id: "pat-015",
        name: "Jane Smith",
        url: "/admin/patients/pat-015",
      },
    ],
    metadata: { reason: "Patient requested later time", notifiedPatient: true },
  },
  {
    id: "act-005",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    user: mockUsers[4],
    module: "Articles",
    action: "delete",
    description: "Deleted draft article 'Understanding MRI Results'",
    severity: "warning",
    status: "success",
    ipAddress: "203.0.113.195",
    location: mockLocations[5],
    device: mockDevices[4],
    beforeState: {
      id: "art-089",
      title: "Understanding MRI Results",
      status: "Draft",
      author: "Robert Chen",
    },
    afterState: { deleted: true, deletedAt: new Date().toISOString() },
    relatedEntities: [
      { type: "Article", id: "art-089", name: "Understanding MRI Results" },
    ],
    metadata: {
      reason: "Duplicate content",
      approvedBy: "sarah.mitchell@mediflow.com",
    },
  },

  // Yesterday - Various Activities
  {
    id: "act-006",
    timestamp: new Date(
      Date.now() - 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
    ).toISOString(), // Yesterday + 2h
    user: mockUsers[0],
    module: "Departments",
    action: "create",
    description: "Created new department: 'Pediatric Neurology'",
    severity: "info",
    status: "success",
    ipAddress: "192.168.1.45",
    location: mockLocations[0],
    device: mockDevices[0],
    beforeState: {},
    afterState: {
      id: "dept-015",
      name: "Pediatric Neurology",
      head: "Dr. Anderson",
      budget: 2500000,
    },
    relatedEntities: [
      {
        type: "Department",
        id: "dept-015",
        name: "Pediatric Neurology",
        url: "/admin/departments/dept-015",
      },
    ],
    metadata: { approvedBy: "board", effectiveDate: "2025-02-01" },
  },
  {
    id: "act-007",
    timestamp: new Date(
      Date.now() - 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[1],
    module: "Doctors",
    action: "approve",
    description:
      "Approved doctor onboarding for Dr. Emily Watson (License: MD-2025-0456)",
    severity: "info",
    status: "success",
    ipAddress: "10.0.0.23",
    location: mockLocations[1],
    device: mockDevices[5],
    beforeState: {
      status: "pending_review",
      license: "MD-2025-0456",
      specialties: ["Cardiology"],
    },
    afterState: {
      status: "active",
      license: "MD-2025-0456",
      specialties: ["Cardiology"],
      approvedAt: new Date().toISOString(),
    },
    relatedEntities: [
      {
        type: "Doctor",
        id: "doc-023",
        name: "Dr. Emily Watson",
        url: "/admin/doctors/doc-023",
      },
    ],
    metadata: { verifiedBy: "Medical Board", backgroundCheck: "passed" },
  },
  {
    id: "act-008",
    timestamp: new Date(
      Date.now() - 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[5], // System
    module: "System",
    action: "export",
    description:
      "Automated daily backup completed - 2.3 GB exported to secure storage",
    severity: "info",
    status: "success",
    ipAddress: "127.0.0.1",
    location: {
      country: "Internal",
      city: "Server",
      region: "DC-1",
      ip: "127.0.0.1",
      isp: "Internal",
    },
    device: {
      browser: "System",
      browserVersion: "1.0",
      os: "Linux",
      osVersion: "Ubuntu 22.04",
      device: "desktop" as const,
    },
    beforeState: { lastBackup: "2025-01-27T02:00:00Z", size: "2.1 GB" },
    afterState: {
      lastBackup: new Date().toISOString(),
      size: "2.3 GB",
      duration: "4m 32s",
    },
    relatedEntities: [
      { type: "Backup", id: "bkp-2025-01-28", name: "Daily Backup 2025-01-28" },
    ],
    metadata: {
      type: "full",
      encryption: "AES-256",
      destination: "s3://mediflow-backups/prod",
    },
  },
  {
    id: "act-009",
    timestamp: new Date(
      Date.now() - 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[2],
    module: "Appointments",
    action: "reject",
    description:
      "Rejected appointment request APT-REQ-2025-0089 - scheduling conflict",
    severity: "warning",
    status: "success",
    ipAddress: "172.16.5.89",
    location: mockLocations[2],
    device: mockDevices[2],
    beforeState: {
      requestId: "APT-REQ-2025-0089",
      patient: "Michael Brown",
      requestedTime: "2025-01-29T10:00:00Z",
      doctor: "Dr. Sharma",
    },
    afterState: {
      requestId: "APT-REQ-2025-0089",
      status: "rejected",
      reason: "Doctor has surgery scheduled",
      rejectedAt: new Date().toISOString(),
    },
    relatedEntities: [
      {
        type: "AppointmentRequest",
        id: "APT-REQ-2025-0089",
        name: "New Patient Consultation",
      },
      {
        type: "Patient",
        id: "pat-067",
        name: "Michael Brown",
        url: "/admin/patients/pat-067",
      },
    ],
    metadata: {
      alternativeOffered: true,
      alternativeTime: "2025-01-29T15:00:00Z",
    },
  },
  {
    id: "act-010",
    timestamp: new Date(
      Date.now() - 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[3],
    module: "Messages",
    action: "create",
    description: "Sent broadcast message to all Cardiology department staff",
    severity: "info",
    status: "success",
    ipAddress: "198.51.100.17",
    location: mockLocations[4],
    device: mockDevices[3],
    beforeState: {},
    afterState: {
      messageId: "msg-045",
      recipients: 12,
      subject: "Schedule Update - Feb 2025",
      sentAt: new Date().toISOString(),
    },
    relatedEntities: [
      { type: "Message", id: "msg-045", name: "Schedule Update - Feb 2025" },
      { type: "Department", id: "dept-003", name: "Cardiology" },
    ],
    metadata: { priority: "high", channels: ["in-app", "email", "sms"] },
  },
  {
    id: "act-011",
    timestamp: new Date(
      Date.now() - 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[4],
    module: "Notifications",
    action: "update",
    description: "Updated notification preferences for patient portal",
    severity: "info",
    status: "success",
    ipAddress: "203.0.113.195",
    location: mockLocations[5],
    device: mockDevices[4],
    beforeState: {
      emailEnabled: true,
      smsEnabled: false,
      pushEnabled: true,
      frequency: "immediate",
    },
    afterState: {
      emailEnabled: true,
      smsEnabled: true,
      pushEnabled: true,
      frequency: "daily_digest",
    },
    relatedEntities: [
      {
        type: "Settings",
        id: "notif-prefs-patient",
        name: "Patient Notification Preferences",
      },
    ],
    metadata: {
      changedBy: "robert.chen@mediflow.com",
      reason: "Patient feedback survey",
    },
  },
  {
    id: "act-012",
    timestamp: new Date(
      Date.now() - 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[0],
    module: "Settings",
    action: "update",
    description:
      "Modified system-wide password policy: min length 12, require special chars",
    severity: "critical",
    status: "success",
    ipAddress: "192.168.1.45",
    location: mockLocations[0],
    device: mockDevices[0],
    beforeState: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecial: false,
      expiryDays: 90,
    },
    afterState: {
      minLength: 12,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecial: true,
      expiryDays: 60,
      mfaRequired: true,
    },
    relatedEntities: [
      { type: "SecurityPolicy", id: "sec-pol-001", name: "Password Policy" },
    ],
    metadata: {
      approvedBy: "Security Committee",
      effectiveDate: "2025-02-15",
      notifyUsers: true,
    },
  },

  // 2 days ago - Failed actions
  {
    id: "act-013",
    timestamp: new Date(
      Date.now() - 48 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000,
    ).toISOString(),
    user: {
      ...mockUsers[1],
      id: "usr-999",
      name: "Unknown User",
      email: "attacker@unknown.com",
      role: "Patient" as UserRole,
    },
    module: "Security",
    action: "login",
    description:
      "Failed login attempt - invalid credentials for admin@mediflow.com",
    severity: "error",
    status: "failed",
    ipAddress: "45.77.123.89",
    location: {
      country: "Unknown",
      city: "Unknown",
      region: "Unknown",
      ip: "45.77.123.89",
      isp: "Vultr",
    },
    device: {
      browser: "Chrome",
      browserVersion: "120.0",
      os: "Linux",
      osVersion: "Unknown",
      device: "desktop" as const,
    },
    beforeState: { attemptCount: 4, locked: false },
    afterState: {
      attemptCount: 5,
      locked: true,
      lockoutUntil: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    },
    relatedEntities: [
      { type: "User", id: "usr-001", name: "Dr. Sarah Mitchell" },
    ],
    metadata: {
      attackType: "credential_stuffing",
      blocked: true,
      geoMismatch: true,
    },
  },
  {
    id: "act-014",
    timestamp: new Date(
      Date.now() - 48 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[2],
    module: "Patients",
    action: "update",
    description:
      "Failed to update patient record - validation error on insurance field",
    severity: "error",
    status: "failed",
    ipAddress: "172.16.5.89",
    location: mockLocations[2],
    device: mockDevices[2],
    beforeState: { insurance: "BlueCross", policyNumber: "BC-12345" },
    afterState: {
      insurance: "BlueCross",
      policyNumber: "BC-12345",
      error: "Invalid policy number format",
    },
    relatedEntities: [
      {
        type: "Patient",
        id: "pat-023",
        name: "Robert Johnson",
        url: "/admin/patients/pat-023",
      },
    ],
    metadata: {
      errorCode: "VALIDATION_ERROR",
      field: "policyNumber",
      retryCount: 0,
    },
  },
  {
    id: "act-015",
    timestamp: new Date(
      Date.now() - 48 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[5], // System
    module: "System",
    action: "import",
    description: "Failed HL7 import - malformed message segment in ADT^A01",
    severity: "error",
    status: "failed",
    ipAddress: "127.0.0.1",
    location: {
      country: "Internal",
      city: "Server",
      region: "DC-1",
      ip: "127.0.0.1",
      isp: "Internal",
    },
    device: {
      browser: "System",
      browserVersion: "1.0",
      os: "Linux",
      osVersion: "Ubuntu 22.04",
      device: "desktop" as const,
    },
    beforeState: { queueSize: 142, processing: true },
    afterState: {
      queueSize: 142,
      processing: false,
      error: "HL7_PARSE_ERROR: Missing required field PID-3",
    },
    relatedEntities: [
      { type: "Integration", id: "int-hl7-001", name: "Epic EHR Integration" },
    ],
    metadata: {
      messageId: "HL7-20250127-0089",
      retryScheduled: true,
      alertSent: true,
    },
  },

  // 3 days ago
  {
    id: "act-016",
    timestamp: new Date(
      Date.now() - 72 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[1],
    module: "Reports",
    action: "export",
    description: "Exported monthly financial report (PDF, 45 pages)",
    severity: "info",
    status: "success",
    ipAddress: "10.0.0.23",
    location: mockLocations[1],
    device: mockDevices[5],
    beforeState: {},
    afterState: {
      reportId: "rpt-fin-2025-01",
      format: "PDF",
      pages: 45,
      size: "3.2 MB",
      generatedAt: new Date().toISOString(),
    },
    relatedEntities: [
      {
        type: "Report",
        id: "rpt-fin-2025-01",
        name: "January 2025 Financial Report",
      },
    ],
    metadata: { requestedBy: "CFO", includeCharts: true, confidential: true },
  },
  {
    id: "act-017",
    timestamp: new Date(
      Date.now() - 72 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[3],
    module: "Departments",
    action: "assign",
    description: "Assigned Nurse Maria Rodriguez as Charge Nurse for ICU",
    severity: "info",
    status: "success",
    ipAddress: "198.51.100.17",
    location: mockLocations[4],
    device: mockDevices[3],
    beforeState: { department: "ICU", chargeNurse: null, shift: "night" },
    afterState: {
      department: "ICU",
      chargeNurse: "Maria Rodriguez",
      shift: "night",
      assignedAt: new Date().toISOString(),
    },
    relatedEntities: [
      {
        type: "Department",
        id: "dept-007",
        name: "ICU",
        url: "/admin/departments/dept-007",
      },
      {
        type: "User",
        id: "usr-004",
        name: "Maria Rodriguez",
        url: "/admin/users/usr-004",
      },
    ],
    metadata: { effectiveDate: "2025-02-01", approvedBy: "Dr. Mitchell" },
  },
  {
    id: "act-018",
    timestamp: new Date(
      Date.now() - 72 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[4],
    module: "Billing",
    action: "create",
    description:
      "Generated invoice INV-2025-001234 for patient Jane Smith ($2,450.00)",
    severity: "info",
    status: "success",
    ipAddress: "203.0.113.195",
    location: mockLocations[5],
    device: mockDevices[4],
    beforeState: {},
    afterState: {
      invoiceId: "INV-2025-001234",
      patient: "Jane Smith",
      amount: 2450.0,
      status: "pending",
      dueDate: "2025-02-28",
    },
    relatedEntities: [
      {
        type: "Invoice",
        id: "INV-2025-001234",
        name: "Invoice #INV-2025-001234",
      },
      {
        type: "Patient",
        id: "pat-015",
        name: "Jane Smith",
        url: "/admin/patients/pat-015",
      },
    ],
    metadata: {
      items: ["Consultation: $150", "Lab Tests: $850", "Procedure: $1,450"],
      insuranceClaimed: true,
    },
  },

  // 4 days ago
  {
    id: "act-019",
    timestamp: new Date(
      Date.now() - 96 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[0],
    module: "Authentication",
    action: "password_change",
    description:
      "Password changed for admin account (forced by security policy)",
    severity: "critical",
    status: "success",
    ipAddress: "192.168.1.45",
    location: mockLocations[0],
    device: mockDevices[0],
    beforeState: { lastChanged: "2024-10-15T08:00:00Z", mfaEnabled: true },
    afterState: {
      lastChanged: new Date().toISOString(),
      mfaEnabled: true,
      policyCompliant: true,
    },
    relatedEntities: [
      { type: "User", id: "usr-001", name: "Dr. Sarah Mitchell" },
    ],
    metadata: { reason: "policy_expiry", forced: true, notifyUser: true },
  },
  {
    id: "act-020",
    timestamp: new Date(
      Date.now() - 96 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[2],
    module: "Articles",
    action: "update",
    description:
      "Published article 'Mental Health in the Workplace: Strategies for Wellbeing'",
    severity: "info",
    status: "success",
    ipAddress: "172.16.5.89",
    location: mockLocations[2],
    device: mockDevices[2],
    beforeState: {
      id: "art-004",
      title: "Mental Health in the Workplace",
      status: "Draft",
      featured: false,
    },
    afterState: {
      id: "art-004",
      title: "Mental Health in the Workplace",
      status: "Published",
      featured: true,
      publishedAt: new Date().toISOString(),
    },
    relatedEntities: [
      {
        type: "Article",
        id: "art-004",
        name: "Mental Health in the Workplace",
        url: "/articles/mental-health-workplace-strategies",
      },
    ],
    metadata: { seoScore: 92, readingTime: "7 min", scheduled: false },
  },

  // 5 days ago
  {
    id: "act-021",
    timestamp: new Date(
      Date.now() - 120 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[1],
    module: "Users",
    action: "create",
    description: "Created new receptionist account: Lisa Thompson",
    severity: "info",
    status: "success",
    ipAddress: "10.0.0.23",
    location: mockLocations[1],
    device: mockDevices[5],
    beforeState: {},
    afterState: {
      id: "usr-028",
      name: "Lisa Thompson",
      email: "lisa.thompson@mediflow.com",
      role: "Receptionist",
      status: "active",
    },
    relatedEntities: [
      {
        type: "User",
        id: "usr-028",
        name: "Lisa Thompson",
        url: "/admin/users/usr-028",
      },
    ],
    metadata: {
      invitedBy: "james.anderson@mediflow.com",
      tempPassword: true,
      onboardingStarted: true,
    },
  },
  {
    id: "act-022",
    timestamp: new Date(
      Date.now() - 120 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[5], // System
    module: "System",
    action: "update",
    description:
      "Applied security patch CVE-2025-0234 - updated OpenSSL to 3.2.1",
    severity: "critical",
    status: "success",
    ipAddress: "127.0.0.1",
    location: {
      country: "Internal",
      city: "Server",
      region: "DC-1",
      ip: "127.0.0.1",
      isp: "Internal",
    },
    device: {
      browser: "System",
      browserVersion: "1.0",
      os: "Linux",
      osVersion: "Ubuntu 22.04",
      device: "desktop" as const,
    },
    beforeState: {
      opensslVersion: "3.0.13",
      vulnerable: true,
      cve: "CVE-2025-0234",
    },
    afterState: {
      opensslVersion: "3.2.1",
      vulnerable: false,
      cve: "CVE-2025-0234",
      patchedAt: new Date().toISOString(),
    },
    relatedEntities: [
      { type: "SystemComponent", id: "openssl", name: "OpenSSL Library" },
    ],
    metadata: {
      severity: "HIGH",
      cvss: 7.5,
      downtime: "0s",
      rollingUpdate: true,
    },
  },

  // 6 days ago
  {
    id: "act-023",
    timestamp: new Date(
      Date.now() - 144 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[3],
    module: "Appointments",
    action: "assign",
    description:
      "Assigned Dr. Priya Sharma as primary physician for patient Michael Brown",
    severity: "info",
    status: "success",
    ipAddress: "198.51.100.17",
    location: mockLocations[4],
    device: mockDevices[3],
    beforeState: { patient: "Michael Brown", primaryPhysician: null },
    afterState: {
      patient: "Michael Brown",
      primaryPhysician: "Dr. Priya Sharma",
      assignedAt: new Date().toISOString(),
    },
    relatedEntities: [
      {
        type: "Patient",
        id: "pat-067",
        name: "Michael Brown",
        url: "/admin/patients/pat-067",
      },
      {
        type: "Doctor",
        id: "doc-003",
        name: "Dr. Priya Sharma",
        url: "/admin/doctors/doc-003",
      },
    ],
    metadata: {
      reason: "Continuity of care",
      previousPhysician: "Dr. Torres (retired)",
    },
  },
  {
    id: "act-024",
    timestamp: new Date(
      Date.now() - 144 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[4],
    module: "Notifications",
    action: "create",
    description: "Created automated appointment reminder workflow",
    severity: "info",
    status: "success",
    ipAddress: "203.0.113.195",
    location: mockLocations[5],
    device: mockDevices[4],
    beforeState: {},
    afterState: {
      workflowId: "wf-remind-001",
      name: "Appointment Reminders",
      triggers: ["24h_before", "2h_before"],
      channels: ["email", "sms"],
      active: true,
    },
    relatedEntities: [
      { type: "Workflow", id: "wf-remind-001", name: "Appointment Reminders" },
    ],
    metadata: {
      template: "standard",
      timezone: "America/New_York",
      testRun: true,
    },
  },

  // 7 days ago
  {
    id: "act-025",
    timestamp: new Date(
      Date.now() - 168 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[0],
    module: "Security",
    action: "logout",
    description: "Admin session terminated - idle timeout (8 hours)",
    severity: "info",
    status: "success",
    ipAddress: "192.168.1.45",
    location: mockLocations[0],
    device: mockDevices[0],
    beforeState: {
      sessionId: "sess-xyz789",
      lastActivity: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
    afterState: {
      sessionId: "sess-xyz789",
      terminatedAt: new Date().toISOString(),
      reason: "idle_timeout",
    },
    relatedEntities: [
      { type: "Session", id: "sess-xyz789", name: "Admin Session" },
    ],
    metadata: { idleTimeout: "8h", forced: true },
  },
  {
    id: "act-026",
    timestamp: new Date(
      Date.now() - 168 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
    ).toISOString(),
    user: mockUsers[1],
    module: "Doctors",
    action: "update",
    description:
      "Updated Dr. Michael Torres schedule - added Tuesday morning clinic",
    severity: "info",
    status: "success",
    ipAddress: "10.0.0.23",
    location: mockLocations[1],
    device: mockDevices[5],
    beforeState: {
      doctor: "Dr. Michael Torres",
      schedule: { mon: "9-17", wed: "9-17", fri: "9-17" },
    },
    afterState: {
      doctor: "Dr. Michael Torres",
      schedule: { mon: "9-17", tue: "9-12", wed: "9-17", fri: "9-17" },
      updatedAt: new Date().toISOString(),
    },
    relatedEntities: [
      {
        type: "Doctor",
        id: "doc-005",
        name: "Dr. Michael Torres",
        url: "/admin/doctors/doc-005",
      },
    ],
    metadata: { reason: "High demand", approvedBy: "Dr. Mitchell" },
  },

  // Additional logs for pagination/testing
  ...Array.from({ length: 50 }, (_, i) => {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const module =
      MODULE_OPTIONS[Math.floor(Math.random() * MODULE_OPTIONS.length)];
    const action =
      ACTION_TYPE_OPTIONS[
        Math.floor(Math.random() * ACTION_TYPE_OPTIONS.length)
      ];
    const severity =
      SEVERITY_OPTIONS[Math.floor(Math.random() * SEVERITY_OPTIONS.length)];
    const status =
      STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)];
    const ip = mockIPs[Math.floor(Math.random() * mockIPs.length)];
    const location =
      mockLocations[Math.floor(Math.random() * mockLocations.length)];
    const device = mockDevices[Math.floor(Math.random() * mockDevices.length)];
    const daysAgo = Math.floor(Math.random() * 30) + 7;

    return {
      id: `act-gen-${String(i + 27).padStart(3, "0")}`,
      timestamp: randomTimestamp(daysAgo),
      user,
      module,
      action,
      description: `${action.charAt(0).toUpperCase() + action.slice(1)} action in ${module} module`,
      severity,
      status,
      ipAddress: ip,
      location,
      device,
      beforeState: {},
      afterState: {},
      relatedEntities: [],
      metadata: {},
    } as ActivityLog;
  }),
];

// Re-export for convenience
export {
  ACTION_TYPE_OPTIONS,
  MODULE_OPTIONS,
  ROLE_OPTIONS,
  SEVERITY_OPTIONS,
  STATUS_OPTIONS,
} from "./types";
