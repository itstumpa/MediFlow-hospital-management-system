import {
  Ambulance,
  Baby,
  Bone,
  Brain,
  Dna,
  Ear,
  Eye,
  Heart,
  Leaf,
  Microscope,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";

export interface Department {
  id: string;
  name: string;
  icon: LucideIcon;
  category: string;
  description: string;
  longDescription: string;
  doctors: number;
  rating: number;
  reviewCount: number;
  patientsTreated: string;
  yearsOfService: number;
  topProcedures: string[];
  commonTreatments: string[];
  operatingHours: string;
  emergencyAvailable: boolean;
  onlineConsultation: boolean;
  imageUrl: string;
  conditionsTreated: string[];
  facilities: string[];
  technologyUsed: string[];
  recoverySupport: string;
  successRate: number;
  color: string;
}

export interface DoctorBrief {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  department: string;
}

export interface TechnologyItem {
  name: string;
  icon: LucideIcon;
  description: string;
  imageUrl: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  photo: string;
  department: string;
  rating: number;
  summary: string;
  beforeTreatment: string;
  afterTreatment: string;
  verified: boolean;
}

export const categories = [
  "All",
  "Heart Care",
  "Brain & Nerves",
  "Children",
  "Women's Health",
  "Orthopedics",
  "Dermatology",
  "Emergency",
  "Dental",
  "Eye Care",
  "Mental Health",
  "Nutrition",
] as const;

export const departments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: Heart,
    category: "Heart Care",
    description:
      "Comprehensive heart care including diagnostics, interventional procedures, and cardiac rehabilitation.",
    longDescription:
      "Our Cardiology department is equipped with state-of-the-art technology to diagnose and treat a wide range of heart conditions. From preventive cardiology to complex interventional procedures, our team of experienced cardiologists provides personalized care using the latest evidence-based approaches. We offer advanced diagnostic services, cardiac catheterization, electrophysiology studies, and comprehensive rehabilitation programs.",
    doctors: 18,
    rating: 4.9,
    reviewCount: 1250,
    patientsTreated: "15,000+",
    yearsOfService: 25,
    topProcedures: [
      "Angioplasty & Stenting",
      "Cardiac Catheterization",
      "Echocardiography",
      "Heart Valve Surgery",
      "Pacemaker Implantation",
    ],
    commonTreatments: [
      "Chest Pain Evaluation",
      "Heart Failure Management",
      "Hypertension",
      "Arrhythmia Treatment",
      "Preventive Cardiology",
    ],
    operatingHours: "24/7",
    emergencyAvailable: true,
    onlineConsultation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Coronary Artery Disease",
      "Heart Attack",
      "Heart Failure",
      "Arrhythmias",
      "Valvular Heart Disease",
    ],
    facilities: ["Cath Lab", "CCU", "ECG Lab", "Stress Testing Lab"],
    technologyUsed: [
      "3D Echocardiography",
      "64-Slice CT Scanner",
      "Cardiac MRI",
      "Holter Monitoring",
    ],
    recoverySupport:
      "Comprehensive cardiac rehabilitation program with dietary counseling, exercise therapy, and psychological support.",
    successRate: 98,
    color: "#dc2626",
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: Brain,
    category: "Brain & Nerves",
    description:
      "Expert diagnosis and treatment of neurological disorders using advanced diagnostics and therapies.",
    longDescription:
      "The Neurology department at MediFlow offers comprehensive care for disorders of the brain, spinal cord, and nervous system. Our multidisciplinary team includes sub-specialists in stroke, epilepsy, movement disorders, and neuromuscular medicine. We utilize cutting-edge diagnostic tools and treatment modalities to provide accurate diagnoses and effective treatment plans.",
    doctors: 14,
    rating: 4.8,
    reviewCount: 980,
    patientsTreated: "12,000+",
    yearsOfService: 20,
    topProcedures: [
      "Stroke Thrombolysis",
      "EEG Monitoring",
      "Nerve Conduction Studies",
      "Botulinum Toxin Injections",
      "Lumbar Puncture",
    ],
    commonTreatments: [
      "Migraine Management",
      "Epilepsy Care",
      "Multiple Sclerosis",
      "Parkinson's Treatment",
      "Neuropathy Treatment",
    ],
    operatingHours: "24/7",
    emergencyAvailable: true,
    onlineConsultation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Stroke",
      "Epilepsy",
      "Multiple Sclerosis",
      "Parkinson's Disease",
      "Alzheimer's Disease",
    ],
    facilities: ["Neuro ICU", "EEG Lab", "EMG Lab", "Sleep Lab"],
    technologyUsed: [
      "3T MRI",
      "CT Perfusion",
      "Video EEG",
      "Transcranial Doppler",
    ],
    recoverySupport:
      "Dedicated neuro-rehabilitation program with physical, occupational, and speech therapy.",
    successRate: 96,
    color: "#7c3aed",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: Baby,
    category: "Children",
    description:
      "Child-friendly healthcare from infancy through adolescence with compassionate specialized care.",
    longDescription:
      "Our Pediatrics department provides comprehensive medical care for children from birth through adolescence. Our child-friendly environment and experienced pediatricians ensure that young patients receive gentle, compassionate care. We offer preventive health services, acute care management, and specialized treatment for chronic pediatric conditions.",
    doctors: 20,
    rating: 4.9,
    reviewCount: 1560,
    patientsTreated: "20,000+",
    yearsOfService: 22,
    topProcedures: [
      "Well-Child Examinations",
      "Immunization Programs",
      "Developmental Screening",
      "Pediatric Allergy Testing",
      "Neonatal Care",
    ],
    commonTreatments: [
      "Childhood Illnesses",
      "Asthma Management",
      "Nutrition Counseling",
      "Growth Monitoring",
      "Vaccination",
    ],
    operatingHours: "07:00 - 22:00",
    emergencyAvailable: true,
    onlineConsultation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Childhood Infections",
      "Asthma",
      "Allergies",
      "Growth Disorders",
      "Developmental Delays",
    ],
    facilities: ["Pediatric ICU", "Play Therapy Room", "Vaccination Clinic"],
    technologyUsed: [
      "Pediatric MRI",
      "Digital X-Ray",
      "Ultrasound",
      "Telemedicine Platform",
    ],
    recoverySupport:
      "Child life specialists provide emotional support and therapeutic play during recovery.",
    successRate: 99,
    color: "#0891b2",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: Bone,
    category: "Orthopedics",
    description:
      "Specialized care for musculoskeletal conditions, joint replacements, and sports injuries.",
    longDescription:
      "The Orthopedics department offers comprehensive musculoskeletal care spanning from preventive orthopedics to complex reconstructive surgery. Our surgeons specialize in joint replacement, sports medicine, spine surgery, and trauma care. We utilize minimally invasive techniques and robotic-assisted surgery for faster recovery and superior outcomes.",
    doctors: 15,
    rating: 4.7,
    reviewCount: 890,
    patientsTreated: "18,000+",
    yearsOfService: 28,
    topProcedures: [
      "Hip Replacement",
      "Knee Replacement",
      "Arthroscopic Surgery",
      "Spine Fusion",
      "Fracture Repair",
    ],
    commonTreatments: [
      "Sports Injuries",
      "Arthritis Management",
      "Back Pain Treatment",
      "Osteoporosis Care",
      "Joint Injections",
    ],
    operatingHours: "08:00 - 20:00",
    emergencyAvailable: true,
    onlineConsultation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Osteoarthritis",
      "Rheumatoid Arthritis",
      "Sports Injuries",
      "Spinal Disorders",
      "Fractures",
    ],
    facilities: [
      "Orthopedic Ward",
      "Rehab Gym",
      "Robotic Surgery Suite",
      "Plaster Room",
    ],
    technologyUsed: [
      "Robotic-Assisted Surgery",
      "3D CT Scanning",
      "Fluoroscopy",
      "Bone Densitometry",
    ],
    recoverySupport:
      "Comprehensive physical therapy and rehabilitation program with personalized recovery plans.",
    successRate: 97,
    color: "#ea580c",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    icon: Eye,
    category: "Eye Care",
    description:
      "Complete eye care from routine exams to advanced surgical procedures including LASIK and cataract surgery.",
    longDescription:
      "Our Ophthalmology department offers comprehensive eye care services for patients of all ages. Using state-of-the-art diagnostic equipment and advanced surgical techniques, our ophthalmologists provide everything from routine vision exams to complex microsurgical procedures. We are leaders in refractive surgery and corneal transplantation.",
    doctors: 10,
    rating: 4.8,
    reviewCount: 720,
    patientsTreated: "10,000+",
    yearsOfService: 18,
    topProcedures: [
      "Cataract Surgery",
      "LASIK",
      "Glaucoma Surgery",
      "Retinal Detachment Repair",
      "Corneal Transplant",
    ],
    commonTreatments: [
      "Vision Testing",
      "Glaucoma Management",
      "Diabetic Retinopathy",
      "Dry Eye Treatment",
      "Contact Lens Fitting",
    ],
    operatingHours: "09:00 - 19:00",
    emergencyAvailable: false,
    onlineConsultation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1570125909232-512ae1d0a4cb?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Cataracts",
      "Glaucoma",
      "Macular Degeneration",
      "Diabetic Retinopathy",
      "Refractive Errors",
    ],
    facilities: [
      "Eye OPD",
      "Laser Suite",
      "Optical Lab",
      "Vision Therapy Room",
    ],
    technologyUsed: [
      "Optical Coherence Tomography",
      "Excimer Laser",
      "Phacoemulsification",
      "Visual Field Analyzer",
    ],
    recoverySupport:
      "Post-surgical vision therapy and rehabilitation with regular follow-up care.",
    successRate: 99,
    color: "#2563eb",
  },
  {
    id: "pulmonology",
    name: "Pulmonology",
    icon: Stethoscope,
    category: "Heart Care",
    description:
      "Diagnosis and treatment of respiratory conditions with advanced pulmonary function testing.",
    longDescription:
      "The Pulmonology department specializes in the diagnosis and treatment of lung and respiratory disorders. Our team of pulmonologists and respiratory therapists provides comprehensive care for acute and chronic respiratory conditions. We offer advanced diagnostic services including bronchoscopy, pulmonary function testing, and sleep studies.",
    doctors: 11,
    rating: 4.7,
    reviewCount: 650,
    patientsTreated: "8,500+",
    yearsOfService: 15,
    topProcedures: [
      "Bronchoscopy",
      "Pulmonary Function Tests",
      "Thoracentesis",
      "Sleep Study",
      "Lung Biopsy",
    ],
    commonTreatments: [
      "Asthma Care",
      "COPD Management",
      "Pneumonia Treatment",
      "Sleep Apnea Therapy",
      "Allergy Management",
    ],
    operatingHours: "08:00 - 18:00",
    emergencyAvailable: true,
    onlineConsultation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Asthma",
      "COPD",
      "Pneumonia",
      "Sleep Apnea",
      "Pulmonary Fibrosis",
    ],
    facilities: [
      "PFT Lab",
      "Bronchoscopy Suite",
      "Sleep Lab",
      "Oxygen Therapy",
    ],
    technologyUsed: [
      "Spirometry",
      "Plethysmography",
      "DLCO Testing",
      "CPAP/BiPAP",
    ],
    recoverySupport:
      "Pulmonary rehabilitation program with breathing exercises and physical conditioning.",
    successRate: 95,
    color: "#0891b2",
  },
  {
    id: "ent",
    name: "Ear, Nose & Throat (ENT)",
    icon: Ear,
    category: "Brain & Nerves",
    description:
      "Comprehensive ENT care for both adults and children, from hearing tests to complex surgeries.",
    longDescription:
      "Our ENT department provides specialized care for disorders of the ear, nose, throat, head, and neck. Our experienced otolaryngologists use advanced diagnostic and surgical techniques to treat a wide range of conditions, from common ear infections to complex head and neck cancers.",
    doctors: 8,
    rating: 4.6,
    reviewCount: 540,
    patientsTreated: "7,200+",
    yearsOfService: 16,
    topProcedures: [
      "Tonsillectomy",
      "Sinus Surgery",
      "Hearing Restoration",
      "Thyroid Surgery",
      "Cochlear Implants",
    ],
    commonTreatments: [
      "Ear Infections",
      "Sinusitis",
      "Hearing Loss",
      "Voice Disorders",
      "Allergy Treatment",
    ],
    operatingHours: "09:00 - 17:00",
    emergencyAvailable: false,
    onlineConsultation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Otitis Media",
      "Sinusitis",
      "Hearing Loss",
      "Thyroid Disorders",
      "Head & Neck Cancer",
    ],
    facilities: ["Audiometry Lab", "Endoscopy Suite", "Voice Clinic"],
    technologyUsed: [
      "Nasal Endoscopy",
      "Audiometry",
      "Microscope Surgery",
      "Laser Surgery",
    ],
    recoverySupport:
      "Voice therapy and audiological rehabilitation with hearing aid fitting services.",
    successRate: 96,
    color: "#7c3aed",
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    icon: Syringe,
    category: "Emergency",
    description:
      "Advanced surgical procedures including laparoscopic and robotic-assisted surgeries.",
    longDescription:
      "The General Surgery department provides a full spectrum of surgical services using both traditional and advanced minimally invasive techniques. Our board-certified surgeons have expertise in laparoscopic, endoscopic, and robotic-assisted procedures, ensuring the best possible outcomes with reduced recovery times.",
    doctors: 16,
    rating: 4.8,
    reviewCount: 1100,
    patientsTreated: "14,000+",
    yearsOfService: 30,
    topProcedures: [
      "Laparoscopic Surgery",
      "Robotic Surgery",
      "Hernia Repair",
      "Gallbladder Removal",
      "Colorectal Surgery",
    ],
    commonTreatments: [
      "Hernia Treatment",
      "Gallstone Treatment",
      "Appendicitis",
      "Cancer Surgery",
      "Trauma Surgery",
    ],
    operatingHours: "24/7",
    emergencyAvailable: true,
    onlineConsultation: false,
    imageUrl:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Hernias",
      "Gallbladder Disease",
      "Appendicitis",
      "Colorectal Cancer",
      "Soft Tissue Tumors",
    ],
    facilities: [
      "OT Complex",
      "Robotic Surgery Suite",
      "ICU",
      "Minimally Invasive Unit",
    ],
    technologyUsed: [
      "Da Vinci Robot",
      "Laparoscopic System",
      "Cautery Devices",
      "Harmonic Scalpel",
    ],
    recoverySupport:
      "Enhanced recovery after surgery (ERAS) program with specialized nursing care.",
    successRate: 98,
    color: "#dc2626",
  },
  {
    id: "radiology",
    name: "Radiology",
    icon: Microscope,
    category: "Emergency",
    description:
      "Advanced imaging services with precise diagnostics to guide treatment decisions.",
    longDescription:
      "Our Radiology department features cutting-edge imaging technology operated by experienced radiologists and technicians. We provide a complete range of diagnostic and interventional radiology services, supporting all other departments with accurate imaging interpretations and image-guided procedures.",
    doctors: 12,
    rating: 4.6,
    reviewCount: 480,
    patientsTreated: "25,000+",
    yearsOfService: 20,
    topProcedures: [
      "MRI Scans",
      "CT Angiography",
      "Ultrasound Imaging",
      "PET-CT",
      "Interventional Radiology",
    ],
    commonTreatments: [
      "Diagnostic Imaging",
      "Cancer Staging",
      "Vascular Imaging",
      "Image-Guided Biopsy",
      "Screening Programs",
    ],
    operatingHours: "24/7",
    emergencyAvailable: true,
    onlineConsultation: false,
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Tumors & Cancers",
      "Vascular Diseases",
      "Infections",
      "Trauma Evaluation",
      "Sports Injuries",
    ],
    facilities: [
      "MRI Suite",
      "CT Scan Room",
      "Ultrasound Room",
      "Nuclear Medicine",
    ],
    technologyUsed: [
      "3T MRI",
      "256-Slice CT",
      "PET-CT Scanner",
      "Digital Radiography",
    ],
    recoverySupport:
      "Detailed imaging reports with rapid turnaround for timely treatment decisions.",
    successRate: 99,
    color: "#2563eb",
  },
  {
    id: "emergency-medicine",
    name: "Emergency Medicine",
    icon: Ambulance,
    category: "Emergency",
    description:
      "Round-the-clock emergency care for critical conditions and life-threatening situations.",
    longDescription:
      "Our Emergency Medicine department operates 24/7, providing immediate care for critical and life-threatening conditions. Staffed by board-certified emergency physicians and trauma specialists, our ER is equipped to handle any medical emergency with rapid response protocols and advanced life-support equipment.",
    doctors: 25,
    rating: 4.5,
    reviewCount: 2100,
    patientsTreated: "30,000+",
    yearsOfService: 25,
    topProcedures: [
      "Trauma Resuscitation",
      "Emergency Surgery",
      "Stroke Management",
      "Heart Attack Care",
      "Poison Treatment",
    ],
    commonTreatments: [
      "Acute Injury Care",
      "Medical Emergencies",
      "Poisoning",
      "Burn Treatment",
      "Critical Care",
    ],
    operatingHours: "24/7",
    emergencyAvailable: true,
    onlineConsultation: false,
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Trauma & Injuries",
      "Heart Attacks",
      "Strokes",
      "Respiratory Failure",
      "Severe Infections",
    ],
    facilities: [
      "Trauma Bay",
      "Resuscitation Room",
      "Observation Unit",
      "Decontamination Room",
    ],
    technologyUsed: [
      "Point-of-Care Ultrasound",
      "ECG Monitoring",
      "Ventilators",
      "Rapid Diagnostic Labs",
    ],
    recoverySupport:
      "Seamless transition to inpatient care or specialized follow-up services.",
    successRate: 94,
    color: "#ea580c",
  },
  {
    id: "dermatology",
    name: "Dermatology",
    icon: Stethoscope,
    category: "Dermatology",
    description:
      "Comprehensive skin, hair, and nail care for medical and cosmetic dermatology needs.",
    longDescription:
      "The Dermatology department offers expert care for a wide range of skin, hair, and nail conditions. Our dermatologists combine medical expertise with advanced technology to provide both therapeutic and cosmetic treatments. From skin cancer screening to laser therapy, we help patients achieve healthy, beautiful skin.",
    doctors: 9,
    rating: 4.8,
    reviewCount: 780,
    patientsTreated: "9,500+",
    yearsOfService: 14,
    topProcedures: [
      "Skin Cancer Surgery",
      "Laser Therapy",
      "Chemical Peels",
      "Botox & Fillers",
      "Phototherapy",
    ],
    commonTreatments: [
      "Acne Treatment",
      "Eczema Management",
      "Psoriasis Care",
      "Skin Allergy Testing",
      "Anti-Aging Treatments",
    ],
    operatingHours: "09:00 - 18:00",
    emergencyAvailable: false,
    onlineConsultation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Acne",
      "Eczema",
      "Psoriasis",
      "Skin Cancer",
      "Hair Loss",
    ],
    facilities: [
      "Dermatology OPD",
      "Laser Room",
      "Phototherapy Unit",
      "Minor OT",
    ],
    technologyUsed: ["Dermatoscope", "CO2 Laser", "IPL System", "Cryotherapy"],
    recoverySupport:
      "Post-procedure skin care guidance with regular follow-up monitoring.",
    successRate: 97,
    color: "#db2777",
  },
  {
    id: "dentistry",
    name: "Dentistry",
    icon: Dna,
    category: "Dental",
    description:
      "Complete dental care from routine cleanings to advanced restorative and cosmetic procedures.",
    longDescription:
      "Our Dentistry department offers comprehensive oral healthcare for the whole family. From routine cleanings and fillings to advanced cosmetic dentistry and orthodontics, our dental team uses modern techniques and equipment to ensure pain-free, high-quality dental care in a comfortable environment.",
    doctors: 7,
    rating: 4.7,
    reviewCount: 620,
    patientsTreated: "8,000+",
    yearsOfService: 12,
    topProcedures: [
      "Teeth Whitening",
      "Dental Implants",
      "Root Canal Therapy",
      "Orthodontic Treatment",
      "Veneers & Crowns",
    ],
    commonTreatments: [
      "Dental Checkups",
      "Fillings",
      "Scaling & Polishing",
      "Extractions",
      "Gum Disease Treatment",
    ],
    operatingHours: "09:00 - 17:00",
    emergencyAvailable: true,
    onlineConsultation: false,
    imageUrl:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Tooth Decay",
      "Gum Disease",
      "Malocclusion",
      "Tooth Loss",
      "Oral Infections",
    ],
    facilities: [
      "Dental OPD",
      "Orthodontic Clinic",
      "Digital X-Ray",
      "Sterilization Lab",
    ],
    technologyUsed: [
      "Digital X-Rays",
      "Intraoral Scanner",
      "Laser Dentistry",
      "3D CBCT",
    ],
    recoverySupport:
      "Post-treatment care instructions and follow-up appointments for optimal recovery.",
    successRate: 98,
    color: "#0e7c7b",
  },
  {
    id: "mental-health",
    name: "Mental Health",
    icon: Brain,
    category: "Mental Health",
    description:
      "Compassionate mental healthcare with therapy, counseling, and psychiatric services.",
    longDescription:
      "Our Mental Health department provides comprehensive psychiatric care and psychological counseling in a supportive, stigma-free environment. Our team of psychiatrists, psychologists, and therapists offers evidence-based treatments for a wide range of mental health conditions, from anxiety and depression to complex psychiatric disorders.",
    doctors: 10,
    rating: 4.8,
    reviewCount: 560,
    patientsTreated: "6,500+",
    yearsOfService: 10,
    topProcedures: [
      "Individual Therapy",
      "Group Counseling",
      "Psychiatric Evaluation",
      "CBT Treatment",
      "Mindfulness Programs",
    ],
    commonTreatments: [
      "Anxiety Management",
      "Depression Treatment",
      "Stress Counseling",
      "Addiction Support",
      "Relationship Therapy",
    ],
    operatingHours: "08:00 - 20:00",
    emergencyAvailable: true,
    onlineConsultation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Anxiety Disorders",
      "Depression",
      "Bipolar Disorder",
      "PTSD",
      "OCD",
    ],
    facilities: [
      "Therapy Rooms",
      "Group Therapy Suite",
      "Crisis Center",
      "Wellness Studio",
    ],
    technologyUsed: [
      "Telepsychiatry",
      "Digital CBT Tools",
      "EEG Biofeedback",
      "AI-Assisted Assessment",
    ],
    recoverySupport:
      "Ongoing therapy programs with relapse prevention planning and support groups.",
    successRate: 93,
    color: "#7c3aed",
  },
  {
    id: "nutrition",
    name: "Nutrition & Dietetics",
    icon: Leaf,
    category: "Nutrition",
    description:
      "Expert dietary guidance and personalized nutrition plans for optimal health and wellness.",
    longDescription:
      "Our Nutrition & Dietetics department provides evidence-based dietary guidance to support overall health, manage chronic conditions, and optimize athletic performance. Our registered dietitians and nutritionists work closely with other departments to provide integrated care that addresses the nutritional aspects of medical treatment.",
    doctors: 6,
    rating: 4.6,
    reviewCount: 390,
    patientsTreated: "5,000+",
    yearsOfService: 8,
    topProcedures: [
      "Dietary Assessment",
      "Metabolic Analysis",
      "Meal Planning",
      "Weight Management",
      "Sports Nutrition",
    ],
    commonTreatments: [
      "Weight Loss",
      "Diabetes Diet",
      "Heart-Healthy Diet",
      "Food Allergy Management",
      "Eating Disorders",
    ],
    operatingHours: "09:00 - 17:00",
    emergencyAvailable: false,
    onlineConsultation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Obesity",
      "Diabetes",
      "Eating Disorders",
      "Malnutrition",
      "Metabolic Syndrome",
    ],
    facilities: ["Nutrition Clinic", "Dietary Lab", "Cooking Studio"],
    technologyUsed: [
      "Body Composition Analyzer",
      "RMR Testing",
      "Nutrition Software",
      "Mobile Health Apps",
    ],
    recoverySupport:
      "Ongoing nutritional counseling with regular progress tracking and plan adjustments.",
    successRate: 94,
    color: "#16a34a",
  },
  {
    id: "gynecology",
    name: "Gynecology & Women's Health",
    icon: Heart,
    category: "Women's Health",
    description:
      "Comprehensive women's healthcare from adolescence through menopause and beyond.",
    longDescription:
      "Our Gynecology & Women's Health department provides comprehensive medical care tailored to women's unique health needs throughout every stage of life. From adolescent gynecology to menopause management, our specialists offer compassionate, personalized care in a comfortable and private setting.",
    doctors: 13,
    rating: 4.9,
    reviewCount: 1340,
    patientsTreated: "16,000+",
    yearsOfService: 24,
    topProcedures: [
      "Minimally Invasive Surgery",
      "Hysteroscopy",
      "Laparoscopy",
      "Urogynecology",
      "Fertility Treatments",
    ],
    commonTreatments: [
      "Well-Woman Exams",
      "Prenatal Care",
      "Menopause Management",
      "Contraception",
      "HPV Treatment",
    ],
    operatingHours: "08:00 - 20:00",
    emergencyAvailable: true,
    onlineConsultation: true,
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop",
    conditionsTreated: [
      "Menstrual Disorders",
      "PCOS",
      "Endometriosis",
      "Uterine Fibroids",
      "Pelvic Inflammatory Disease",
    ],
    facilities: [
      "Women's Health Clinic",
      "Maternity Ward",
      "Fertility Lab",
      "Birthing Suite",
    ],
    technologyUsed: [
      "3D Ultrasound",
      "Hysteroscope",
      "Colposcope",
      "Fertility Analyzer",
    ],
    recoverySupport:
      "Post-surgical recovery programs with pelvic floor therapy and wellness support.",
    successRate: 98,
    color: "#db2777",
  },
];

export const featuredDepartments: string[] = [
  "cardiology",
  "neurology",
  "orthopedics",
];

export const doctorsList: DoctorBrief[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 328,
    department: "Cardiology",
  },
  {
    id: "2",
    name: "Dr. James Mitchell",
    specialty: "Neurologist",
    experience: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 256,
    department: "Neurology",
  },
  {
    id: "3",
    name: "Dr. Ayesha Khan",
    specialty: "Pediatrician",
    experience: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 412,
    department: "Pediatrics",
  },
  {
    id: "4",
    name: "Dr. Robert Chen",
    specialty: "Orthopedic Surgeon",
    experience: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 189,
    department: "Orthopedics",
  },
];

export const technologies: TechnologyItem[] = [
  {
    name: "3T MRI Scanner",
    icon: Microscope,
    description:
      "High-resolution magnetic resonance imaging for detailed soft tissue visualization with rapid scan times.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
  },
  {
    name: "256-Slice CT Scan",
    icon: Microscope,
    description:
      "Ultra-fast computed tomography capturing detailed cross-sectional images with minimal radiation exposure.",
    imageUrl:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=600&h=400&fit=crop",
  },
  {
    name: "Ultrasound System",
    icon: Stethoscope,
    description:
      "Advanced ultrasound imaging for real-time diagnostic imaging across multiple medical specialties.",
    imageUrl:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop",
  },
  {
    name: "Digital X-Ray",
    icon: Stethoscope,
    description:
      "State-of-the-art digital radiography providing instant high-quality images with lower radiation doses.",
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
  },
  {
    name: "Cardiac Monitoring",
    icon: Heart,
    description:
      "Continuous cardiac telemetry and Holter monitoring for comprehensive heart rhythm assessment.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
  },
  {
    name: "Robotic Surgery System",
    icon: Syringe,
    description:
      "Da Vinci robotic-assisted surgical system enabling precision minimally invasive procedures.",
    imageUrl:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    id: "1",
    name: "Margaret Chen",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    department: "Cardiology",
    rating: 5,
    summary:
      "Life-saving heart surgery with exceptional care. The cardiology team gave me a second chance at life.",
    beforeTreatment:
      "Severe chest pain, shortness of breath, diagnosed with 3 blocked arteries",
    afterTreatment:
      "Successful triple bypass surgery, now walking 5km daily with normal heart function",
    verified: true,
  },
  {
    id: "2",
    name: "James Rodriguez",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    department: "Orthopedics",
    rating: 5,
    summary:
      "Total knee replacement changed my life. I can walk without pain for the first time in years.",
    beforeTreatment:
      "Severe knee osteoarthritis, unable to climb stairs or walk more than 10 minutes",
    afterTreatment:
      "Full mobility restored, playing golf again, pain-free daily activities",
    verified: true,
  },
  {
    id: "3",
    name: "Priya Sharma",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    department: "Pediatrics",
    rating: 5,
    summary:
      "My son's asthma is now fully managed. The pediatric team was wonderful and reassuring.",
    beforeTreatment:
      "Frequent asthma attacks, multiple ER visits, missed school days",
    afterTreatment:
      "Well-controlled asthma, active in sports, no ER visits in 8 months",
    verified: true,
  },
  {
    id: "4",
    name: "Robert Kim",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    department: "Neurology",
    rating: 5,
    summary:
      "Stroke treatment was immediate and effective. The neurologists saved my brain function.",
    beforeTreatment:
      "Sudden weakness on left side, facial droop, rushed to ER with stroke symptoms",
    afterTreatment:
      "Full recovery with minimal weakness, returned to work within 3 months",
    verified: true,
  },
];

export const comparisonData = [
  {
    department: "Cardiology",
    icon: Heart,
    conditions: "Heart Disease, Hypertension, Arrhythmias",
    specialists: "18 Specialists",
    emergency: true,
    onlineConsultation: true,
  },
  {
    department: "Neurology",
    icon: Brain,
    conditions: "Stroke, Epilepsy, Parkinson's",
    specialists: "14 Specialists",
    emergency: true,
    onlineConsultation: true,
  },
  {
    department: "Orthopedics",
    icon: Bone,
    conditions: "Arthritis, Sports Injuries, Fractures",
    specialists: "15 Specialists",
    emergency: true,
    onlineConsultation: true,
  },
  {
    department: "Pediatrics",
    icon: Baby,
    conditions: "Childhood Illnesses, Vaccinations",
    specialists: "20 Specialists",
    emergency: true,
    onlineConsultation: true,
  },
  {
    department: "Dermatology",
    icon: Stethoscope,
    conditions: "Acne, Eczema, Skin Cancer",
    specialists: "9 Specialists",
    emergency: false,
    onlineConsultation: true,
  },
];

export const faqItems = [
  {
    question: "How do I choose the right department?",
    answer:
      "Our online assessment tool can help guide you, or you can call our helpline to speak with a medical professional who will recommend the appropriate department based on your symptoms. You can also start with your primary care physician who can provide a referral to the right specialist.",
  },
  {
    question: "Can I visit without a referral?",
    answer:
      "Yes, many of our departments accept direct appointments without a referral. However, some specialist consultations may require a referral from your primary care physician. Check the specific department page or contact us for details.",
  },
  {
    question: "Do you provide online consultation?",
    answer:
      "Yes, we offer telemedicine consultations across most departments. You can book a video consultation with our specialists from the comfort of your home. Online prescriptions and follow-up care are also available.",
  },
  {
    question: "What insurance is accepted?",
    answer:
      "We accept a wide range of insurance plans including major private insurers, Medicare, and Medicaid. Our billing team can verify your coverage and provide cost estimates before your appointment.",
  },
  {
    question: "How quickly can I get an appointment?",
    answer:
      "Urgent cases are seen immediately. For routine appointments, wait times vary by department — typically 1-3 days for most specialties. Our online booking system shows real-time availability.",
  },
  {
    question: "Is the emergency department open 24/7?",
    answer:
      "Yes, our Emergency Department is open 24 hours a day, 7 days a week, 365 days a year. We have trauma teams on standby and can handle any medical emergency.",
  },
];

export const whyChooseItems = [
  {
    title: "Experienced Specialists",
    description:
      "Our departments are led by board-certified physicians with decades of combined experience in their respective fields.",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=500&fit=crop",
  },
  {
    title: "Modern Technology",
    description:
      "We invest in cutting-edge medical technology including robotic surgery systems, advanced imaging, and AI-assisted diagnostics.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=500&fit=crop",
  },
  {
    title: "Evidence-Based Treatment",
    description:
      "Every treatment plan follows the latest clinical guidelines and research, ensuring you receive proven, effective care.",
    imageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=500&fit=crop",
  },
  {
    title: "Personalized Care",
    description:
      "We create individualized treatment plans tailored to your unique health needs, preferences, and lifestyle.",
    imageUrl:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=500&fit=crop",
  },
  {
    title: "24/7 Emergency Support",
    description:
      "Round-the-clock emergency services with rapid response protocols and dedicated trauma teams always on standby.",
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=500&fit=crop",
  },
  {
    title: "International Standards",
    description:
      "Our facilities meet global healthcare standards with JCI accreditation and continuous quality improvement programs.",
    imageUrl:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=500&fit=crop",
  },
];

export const treatmentProcess = [
  {
    step: 1,
    title: "Consultation",
    description:
      "Meet with a specialist to discuss your symptoms and concerns.",
  },
  {
    step: 2,
    title: "Diagnosis",
    description:
      "Comprehensive diagnostic tests and imaging for accurate diagnosis.",
  },
  {
    step: 3,
    title: "Treatment Plan",
    description: "Personalized treatment strategy tailored to your condition.",
  },
  {
    step: 4,
    title: "Recovery",
    description: "Guided recovery with rehabilitation and supportive care.",
  },
  {
    step: 5,
    title: "Follow-up Care",
    description: "Ongoing monitoring and follow-up to ensure lasting health.",
  },
];
