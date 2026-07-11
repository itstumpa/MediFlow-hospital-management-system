export type Availability = "available-now" | "available-today" | "tomorrow";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  languages: string[];
  hospital: string;
  fee: number;
  availability: Availability;
  isTopRated: boolean;
  isVerified: boolean;
  education: string[];
  patientsTreated: string;
  awards: number;
  successRate: number;
  about: string;
  shortBio: string;
  qualifications: Qualification[];
  expertise: string[];
  certifications: Certificate[];
  gallery: string[];
  schedule: DaySchedule[];
  consultationTypes: ("in-person" | "video")[];
}

export interface Qualification {
  degree: string;
  institution: string;
  year: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  icon: string;
}

export interface DaySchedule {
  day: string;
  isAvailable: boolean;
  isEmergency?: boolean;
  hours?: string;
}

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 328,
    languages: ["English", "Bangla", "Hindi", "French"],
    hospital: "MediFlow Medical Center",
    fee: 40,
    availability: "available-now",
    isTopRated: true,
    isVerified: true,
    education: ["MBBS", "MD", "FCPS"],
    patientsTreated: "2,300+",
    awards: 12,
    successRate: 98,
    shortBio:
      "Highly experienced cardiologist dedicated to providing exceptional heart care with cutting-edge technology.",
    about:
      "Dr. Sarah Johnson is a highly experienced cardiologist dedicated to providing exceptional heart care. With over 18 years of clinical practice, she specializes in diagnosing and treating complex cardiovascular conditions. Her patient-centered approach combines cutting-edge medical technology with compassionate care, ensuring every patient receives personalized treatment plans. Dr. Johnson believes in preventive cardiology and works closely with patients to develop heart-healthy lifestyles. She has published numerous research papers on interventional cardiology and is a sought-after speaker at international medical conferences.",
    qualifications: [
      { degree: "MBBS", institution: "Harvard Medical School", year: "2008" },
      {
        degree: "MD Cardiology",
        institution: "Johns Hopkins University",
        year: "2012",
      },
      {
        degree: "Senior Consultant",
        institution: "MediFlow Hospital",
        year: "2020",
      },
      {
        degree: "Fellowship Interventional Cardiology",
        institution: "Mayo Clinic",
        year: "2014",
      },
    ],
    expertise: [
      "Heart Failure Management",
      "Hypertension",
      "ECG Interpretation",
      "Angiography",
      "Cardiac Surgery",
      "Preventive Care",
      "Echocardiography",
      "Stress Testing",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2008",
        icon: "award",
      },
      {
        title: "Board Certification",
        issuer: "American Board of Cardiology",
        year: "2012",
        icon: "certificate",
      },
      {
        title: "Research Excellence Award",
        issuer: "Cardiology Association",
        year: "2020",
        icon: "trophy",
      },
      {
        title: "Clinical Excellence Award",
        issuer: "MediFlow Hospital",
        year: "2023",
        icon: "star",
      },
      {
        title: "Medical Association Membership",
        issuer: "AMA",
        year: "2008",
        icon: "users",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Tuesday", isAvailable: true, hours: "09:00–15:00" },
      {
        day: "Wednesday",
        isAvailable: true,
        isEmergency: true,
        hours: "Emergency Duty",
      },
      { day: "Thursday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Friday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Saturday", isAvailable: false, hours: "Off" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person", "video"],
  },
  {
    id: "2",
    name: "Dr. James Mitchell",
    specialty: "Neurologist",
    experience: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 256,
    languages: ["English", "Spanish"],
    hospital: "NeuroCare Institute",
    fee: 50,
    availability: "available-today",
    isTopRated: false,
    isVerified: true,
    education: ["MBBS", "MD", "DM Neurology"],
    patientsTreated: "1,800+",
    awards: 8,
    successRate: 96,
    shortBio:
      "Board-certified neurologist specializing in diagnosing and treating disorders of the nervous system.",
    about:
      "Dr. James Mitchell is a board-certified neurologist with 14 years of experience in diagnosing and treating disorders of the nervous system. He takes a comprehensive approach to patient care, combining advanced diagnostic techniques with personalized treatment plans. His expertise spans stroke management, epilepsy, multiple sclerosis, and movement disorders. Dr. Mitchell is committed to advancing neurological care through research and has contributed to several landmark clinical trials.",
    qualifications: [
      { degree: "MBBS", institution: "Stanford University", year: "2012" },
      {
        degree: "MD Neurology",
        institution: "UCSF Medical Center",
        year: "2016",
      },
      {
        degree: "Senior Neurologist",
        institution: "NeuroCare Institute",
        year: "2026",
      },
    ],
    expertise: [
      "Stroke Management",
      "Epilepsy",
      "Multiple Sclerosis",
      "Headache Disorders",
      "Movement Disorders",
      "Neuromuscular Medicine",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2012",
        icon: "award",
      },
      {
        title: "Board Certification",
        issuer: "American Board of Neurology",
        year: "2016",
        icon: "certificate",
      },
      {
        title: "Research Grant Award",
        issuer: "NIH",
        year: "2021",
        icon: "trophy",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "10:00–18:00" },
      { day: "Tuesday", isAvailable: true, hours: "10:00–18:00" },
      { day: "Wednesday", isAvailable: true, hours: "10:00–14:00" },
      { day: "Thursday", isAvailable: true, hours: "10:00–18:00" },
      { day: "Friday", isAvailable: true, hours: "10:00–16:00" },
      { day: "Saturday", isAvailable: false, hours: "Off" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person", "video"],
  },
  {
    id: "3",
    name: "Dr. Ayesha Khan",
    specialty: "Pediatrician",
    experience: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 412,
    languages: ["English", "Hindi", "Urdu"],
    hospital: "Child Health Clinic",
    fee: 35,
    availability: "available-today",
    isTopRated: true,
    isVerified: true,
    education: ["MBBS", "MD", "DCH"],
    patientsTreated: "3,100+",
    awards: 10,
    successRate: 99,
    shortBio:
      "Compassionate pediatrician dedicated to the health and well-being of children from infancy through adolescence.",
    about:
      "Dr. Ayesha Khan is a compassionate pediatrician dedicated to the health and well-being of children from infancy through adolescence. With 12 years of experience, she provides comprehensive care including preventive health, vaccinations, and management of acute and chronic conditions. Her gentle approach puts young patients at ease, and she believes in partnering with parents to ensure the best outcomes for every child.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "All India Institute of Medical Sciences",
        year: "2014",
      },
      {
        degree: "MD Pediatrics",
        institution: "Boston Children's Hospital",
        year: "2018",
      },
    ],
    expertise: [
      "Newborn Care",
      "Child Development",
      "Vaccinations",
      "Asthma Management",
      "Nutrition",
      "Adolescent Medicine",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2014",
        icon: "award",
      },
      {
        title: "Board Certification",
        issuer: "American Board of Pediatrics",
        year: "2018",
        icon: "certificate",
      },
      {
        title: "Excellence in Pediatrics Award",
        issuer: "Pediatric Association",
        year: "2022",
        icon: "trophy",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Tuesday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Wednesday", isAvailable: true, hours: "09:00–12:00" },
      { day: "Thursday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Friday", isAvailable: false, hours: "Off" },
      { day: "Saturday", isAvailable: true, hours: "10:00–14:00" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person", "video"],
  },
  {
    id: "4",
    name: "Dr. Robert Chen",
    specialty: "Orthopedic Surgeon",
    experience: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=600&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 189,
    languages: ["English", "Mandarin"],
    hospital: "Bone & Joint Center",
    fee: 55,
    availability: "available-today",
    isTopRated: false,
    isVerified: true,
    education: ["MBBS", "MS", "MCh Ortho"],
    patientsTreated: "4,500+",
    awards: 15,
    successRate: 97,
    shortBio:
      "Leading orthopedic surgeon with expertise in joint replacement, sports medicine, and trauma surgery.",
    about:
      "Dr. Robert Chen is a leading orthopedic surgeon with 20 years of expertise in joint replacement, sports medicine, and trauma surgery. He has performed over 4,500 successful surgeries and is known for his meticulous technique and excellent patient outcomes. Dr. Chen stays at the forefront of orthopedic innovation, utilizing minimally invasive techniques and robotic-assisted surgery when appropriate.",
    qualifications: [
      { degree: "MBBS", institution: "University of Toronto", year: "2006" },
      {
        degree: "MS Orthopedics",
        institution: "Harvard Medical School",
        year: "2010",
      },
      {
        degree: "MCh Orthopedic Surgery",
        institution: "Johns Hopkins University",
        year: "2014",
      },
    ],
    expertise: [
      "Joint Replacement",
      "Sports Medicine",
      "Trauma Surgery",
      "Arthroscopy",
      "Spine Surgery",
      "Pediatric Orthopedics",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2006",
        icon: "award",
      },
      {
        title: "Board Certification",
        issuer: "American Board of Orthopedic Surgery",
        year: "2010",
        icon: "certificate",
      },
      {
        title: "Lifetime Achievement Award",
        issuer: "Orthopedic Society",
        year: "2024",
        icon: "trophy",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "08:00–16:00" },
      { day: "Tuesday", isAvailable: true, hours: "08:00–16:00" },
      { day: "Wednesday", isAvailable: false, hours: "Off" },
      { day: "Thursday", isAvailable: true, hours: "08:00–16:00" },
      { day: "Friday", isAvailable: true, hours: "08:00–14:00" },
      { day: "Saturday", isAvailable: false, hours: "Off" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person"],
  },
  {
    id: "5",
    name: "Dr. Emily Watson",
    specialty: "Dermatologist",
    experience: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=600&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 203,
    languages: ["English", "French"],
    hospital: "Skin Care Clinic",
    fee: 45,
    availability: "available-now",
    isTopRated: false,
    isVerified: true,
    education: ["MBBS", "MD", "DVD"],
    patientsTreated: "1,900+",
    awards: 6,
    successRate: 95,
    shortBio:
      "Skilled dermatologist specializing in medical, surgical, and cosmetic dermatology for all skin types.",
    about:
      "Dr. Emily Watson is a skilled dermatologist specializing in medical, surgical, and cosmetic dermatology. She is passionate about skin health and offers comprehensive care ranging from acne treatment and skin cancer screening to advanced laser therapy and cosmetic procedures. Dr. Watson believes in educating her patients about proper skin care and works with them to achieve healthy, radiant skin.",
    qualifications: [
      { degree: "MBBS", institution: "University of Cambridge", year: "2016" },
      { degree: "MD Dermatology", institution: "Mayo Clinic", year: "2020" },
    ],
    expertise: [
      "Skin Cancer Screening",
      "Acne Treatment",
      "Cosmetic Dermatology",
      "Laser Therapy",
      "Pediatric Dermatology",
      "Allergy Testing",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2016",
        icon: "award",
      },
      {
        title: "Board Certification",
        issuer: "American Board of Dermatology",
        year: "2020",
        icon: "certificate",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "10:00–18:00" },
      { day: "Tuesday", isAvailable: true, hours: "10:00–18:00" },
      { day: "Wednesday", isAvailable: true, hours: "10:00–18:00" },
      { day: "Thursday", isAvailable: true, hours: "10:00–15:00" },
      { day: "Friday", isAvailable: false, hours: "Off" },
      { day: "Saturday", isAvailable: true, hours: "10:00–14:00" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person", "video"],
  },
  {
    id: "6",
    name: "Dr. Michael Torres",
    specialty: "Interventional Cardiologist",
    experience: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 275,
    languages: ["English", "Spanish", "Portuguese"],
    hospital: "MediFlow Medical Center",
    fee: 60,
    availability: "available-today",
    isTopRated: true,
    isVerified: true,
    education: ["MBBS", "MD", "FACC"],
    patientsTreated: "2,800+",
    awards: 14,
    successRate: 97,
    shortBio:
      "Interventional cardiologist specializing in minimally invasive heart procedures and preventive cardiology.",
    about:
      "Dr. Michael Torres is an interventional cardiologist specializing in minimally invasive heart procedures. With 16 years of experience, he has performed thousands of successful angioplasties, stent placements, and cardiac catheterizations. Dr. Torres is dedicated to advancing the field of interventional cardiology and is actively involved in research on novel treatment approaches for coronary artery disease.",
    qualifications: [
      { degree: "MBBS", institution: "Yale University", year: "2010" },
      {
        degree: "MD Cardiology",
        institution: "Cleveland Clinic",
        year: "2014",
      },
      {
        degree: "FACC",
        institution: "American College of Cardiology",
        year: "2018",
      },
    ],
    expertise: [
      "Angioplasty",
      "Stent Placement",
      "Heart Attack Care",
      "Peripheral Vascular Disease",
      "Cardiac Catheterization",
      "Preventive Cardiology",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2010",
        icon: "award",
      },
      {
        title: "Board Certification",
        issuer: "American Board of Cardiology",
        year: "2014",
        icon: "certificate",
      },
      {
        title: "FACC Fellowship",
        issuer: "American College of Cardiology",
        year: "2018",
        icon: "star",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Tuesday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Wednesday", isAvailable: true, hours: "09:00–12:00" },
      { day: "Thursday", isAvailable: false, hours: "Off" },
      { day: "Friday", isAvailable: true, hours: "09:00–16:00" },
      { day: "Saturday", isAvailable: false, hours: "Off" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person", "video"],
  },
  {
    id: "7",
    name: "Dr. Lisa Park",
    specialty: "Pediatric Cardiologist",
    experience: 13,
    imageUrl:
      "https://images.unsplash.com/photo-1527613426441-4da17471b0d0?w=600&h=600&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 167,
    languages: ["English", "Korean", "Japanese"],
    hospital: "Children's Heart Institute",
    fee: 48,
    availability: "tomorrow",
    isTopRated: true,
    isVerified: true,
    education: ["MBBS", "MD", "FACC"],
    patientsTreated: "1,500+",
    awards: 9,
    successRate: 99,
    shortBio:
      "Specialist in treating congenital heart defects and pediatric cardiovascular conditions with compassionate care.",
    about:
      "Dr. Lisa Park specializes in treating congenital heart defects and pediatric cardiovascular conditions. With 13 years of dedicated experience, she provides comprehensive care from fetal cardiology through adolescence. Dr. Park is known for her ability to explain complex conditions to families with clarity and compassion, and she works closely with pediatric cardiac surgeons to ensure seamless coordinated care.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "Seoul National University",
        year: "2013",
      },
      {
        degree: "MD Pediatrics",
        institution: "Boston Children's Hospital",
        year: "2017",
      },
      {
        degree: "Pediatric Cardiology Fellowship",
        institution: "Texas Children's Hospital",
        year: "2020",
      },
    ],
    expertise: [
      "Congenital Heart Defects",
      "Pediatric Echocardiography",
      "Fetal Cardiology",
      "Cardiac Arrhythmias",
      "Heart Failure in Children",
      "Post-operative Care",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2013",
        icon: "award",
      },
      {
        title: "Board Certification",
        issuer: "American Board of Pediatrics",
        year: "2017",
        icon: "certificate",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Tuesday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Wednesday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Thursday", isAvailable: true, hours: "09:00–15:00" },
      { day: "Friday", isAvailable: false, hours: "Off" },
      { day: "Saturday", isAvailable: false, hours: "Off" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person"],
  },
  {
    id: "8",
    name: "Dr. Omar Hassan",
    specialty: "General Surgeon",
    experience: 22,
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 445,
    languages: ["English", "Arabic", "French"],
    hospital: "MediFlow Medical Center",
    fee: 65,
    availability: "available-today",
    isTopRated: false,
    isVerified: true,
    education: ["MBBS", "MS", "FRCS"],
    patientsTreated: "5,200+",
    awards: 18,
    successRate: 98,
    shortBio:
      "Seasoned general surgeon with over two decades of experience in complex surgical procedures.",
    about:
      "Dr. Omar Hassan is a seasoned general surgeon with over two decades of experience in complex surgical procedures. He has performed more than 5,200 successful surgeries and is highly regarded for his expertise in laparoscopic and minimally invasive techniques. Dr. Hassan is committed to surgical excellence and mentors the next generation of surgeons through his teaching role at the medical school.",
    qualifications: [
      { degree: "MBBS", institution: "University of Oxford", year: "2004" },
      {
        degree: "MS General Surgery",
        institution: "Imperial College London",
        year: "2008",
      },
      {
        degree: "FRCS",
        institution: "Royal College of Surgeons",
        year: "2012",
      },
    ],
    expertise: [
      "Laparoscopic Surgery",
      "Hernia Repair",
      "Gallbladder Surgery",
      "Colon Surgery",
      "Trauma Surgery",
      "Emergency Surgery",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2004",
        icon: "award",
      },
      {
        title: "FRCS",
        issuer: "Royal College of Surgeons",
        year: "2012",
        icon: "certificate",
      },
      {
        title: "Distinguished Service Award",
        issuer: "American College of Surgeons",
        year: "2022",
        icon: "trophy",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "08:00–16:00" },
      { day: "Tuesday", isAvailable: true, hours: "08:00–16:00" },
      { day: "Wednesday", isAvailable: true, hours: "08:00–16:00" },
      { day: "Thursday", isAvailable: true, hours: "08:00–12:00" },
      { day: "Friday", isAvailable: false, hours: "Off" },
      { day: "Saturday", isAvailable: false, hours: "Off" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person"],
  },
  {
    id: "9",
    name: "Dr. Maria Santos",
    specialty: "Ophthalmologist",
    experience: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=600&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 198,
    languages: ["English", "Spanish", "Italian"],
    hospital: "Vision Care Center",
    fee: 42,
    availability: "available-now",
    isTopRated: false,
    isVerified: true,
    education: ["MBBS", "MD", "DOMS"],
    patientsTreated: "2,100+",
    awards: 7,
    successRate: 96,
    shortBio:
      "Ophthalmologist dedicated to preserving and restoring vision through advanced surgical and medical treatments.",
    about:
      "Dr. Maria Santos is an ophthalmologist dedicated to preserving and restoring vision through advanced surgical and medical treatments. With 14 years of experience, she specializes in cataract surgery, LASIK, glaucoma management, and corneal transplantation. Dr. Santos is passionate about using the latest technology to achieve the best possible outcomes for her patients and believes in personalized, compassionate eye care.",
    qualifications: [
      { degree: "MBBS", institution: "University of Barcelona", year: "2012" },
      {
        degree: "MD Ophthalmology",
        institution: "Moorfields Eye Hospital",
        year: "2016",
      },
      {
        degree: "Fellowship Corneal Surgery",
        institution: "Wills Eye Hospital",
        year: "2018",
      },
    ],
    expertise: [
      "Cataract Surgery",
      "LASIK",
      "Glaucoma Management",
      "Corneal Transplantation",
      "Diabetic Retinopathy",
      "Dry Eye Treatment",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2012",
        icon: "award",
      },
      {
        title: "Board Certification",
        issuer: "American Board of Ophthalmology",
        year: "2016",
        icon: "certificate",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Tuesday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Wednesday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Thursday", isAvailable: false, hours: "Off" },
      { day: "Friday", isAvailable: true, hours: "09:00–16:00" },
      { day: "Saturday", isAvailable: true, hours: "10:00–14:00" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person", "video"],
  },
  {
    id: "10",
    name: "Dr. John Baker",
    specialty: "Pulmonologist",
    experience: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=600&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 223,
    languages: ["English"],
    hospital: "Respiratory Health Center",
    fee: 52,
    availability: "tomorrow",
    isTopRated: false,
    isVerified: true,
    education: ["MBBS", "MD", "FCCP"],
    patientsTreated: "2,500+",
    awards: 11,
    successRate: 95,
    shortBio:
      "Pulmonologist specializing in the diagnosis and treatment of respiratory diseases and sleep disorders.",
    about:
      "Dr. John Baker is a pulmonologist specializing in the diagnosis and treatment of respiratory diseases. With 16 years of experience, he provides comprehensive care for asthma, COPD, sleep apnea, and other pulmonary conditions. Dr. Baker is certified in interventional pulmonology and performs advanced bronchoscopic procedures. He is dedicated to helping patients breathe easier and improve their quality of life.",
    qualifications: [
      { degree: "MBBS", institution: "University of Chicago", year: "2010" },
      {
        degree: "MD Pulmonary Medicine",
        institution: "National Jewish Health",
        year: "2014",
      },
      {
        degree: "FCCP",
        institution: "American College of Chest Physicians",
        year: "2018",
      },
    ],
    expertise: [
      "Asthma Management",
      "COPD Treatment",
      "Sleep Medicine",
      "Lung Cancer Screening",
      "Pulmonary Hypertension",
      "Bronchoscopy",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2010",
        icon: "award",
      },
      {
        title: "Board Certification",
        issuer: "American Board of Pulmonary Medicine",
        year: "2014",
        icon: "certificate",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "10:00–18:00" },
      { day: "Tuesday", isAvailable: true, hours: "10:00–18:00" },
      { day: "Wednesday", isAvailable: true, hours: "10:00–14:00" },
      { day: "Thursday", isAvailable: true, hours: "10:00–18:00" },
      { day: "Friday", isAvailable: false, hours: "Off" },
      { day: "Saturday", isAvailable: false, hours: "Off" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person", "video"],
  },
  {
    id: "11",
    name: "Dr. Rachel Green",
    specialty: "Neonatologist",
    experience: 11,
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 156,
    languages: ["English", "German"],
    hospital: "Children's Health Center",
    fee: 55,
    availability: "available-today",
    isTopRated: true,
    isVerified: true,
    education: ["MBBS", "MD", "Fellowship Neonatology"],
    patientsTreated: "1,200+",
    awards: 8,
    successRate: 98,
    shortBio:
      "Dedicated neonatologist providing specialized care for premature and critically ill newborns.",
    about:
      "Dr. Rachel Green is a dedicated neonatologist providing specialized care for premature and critically ill newborns. With 11 years of experience in the neonatal intensive care unit, she is skilled in managing complex neonatal conditions and supporting families through challenging times. Dr. Green is passionate about advancing neonatal care through research and quality improvement initiatives.",
    qualifications: [
      {
        degree: "MBBS",
        institution: "University of Pennsylvania",
        year: "2015",
      },
      {
        degree: "MD Pediatrics",
        institution: "Children's Hospital of Philadelphia",
        year: "2019",
      },
      {
        degree: "Fellowship Neonatology",
        institution: "Stanford University",
        year: "2022",
      },
    ],
    expertise: [
      "Premature Infant Care",
      "Newborn Resuscitation",
      "Congenital Conditions",
      "Breastfeeding Support",
      "Developmental Care",
      "Parent Counseling",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2015",
        icon: "award",
      },
      {
        title: "Board Certification",
        issuer: "American Board of Pediatrics",
        year: "2019",
        icon: "certificate",
      },
      {
        title: "Neonatal Resuscitation Award",
        issuer: "AAP",
        year: "2023",
        icon: "trophy",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "08:00–16:00" },
      { day: "Tuesday", isAvailable: true, hours: "08:00–16:00" },
      { day: "Wednesday", isAvailable: true, hours: "08:00–16:00" },
      { day: "Thursday", isAvailable: false, hours: "Off" },
      { day: "Friday", isAvailable: true, hours: "08:00–14:00" },
      { day: "Saturday", isAvailable: false, hours: "Off" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person"],
  },
  {
    id: "12",
    name: "Dr. David Kim",
    specialty: "Clinical Neurologist",
    experience: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
    rating: 4.6,
    reviewCount: 178,
    languages: ["English", "Korean"],
    hospital: "NeuroCare Institute",
    fee: 48,
    availability: "available-now",
    isTopRated: false,
    isVerified: true,
    education: ["MBBS", "MD", "FAAN"],
    patientsTreated: "2,000+",
    awards: 7,
    successRate: 94,
    shortBio:
      "Clinical neurologist focused on comprehensive care for patients with neurological disorders.",
    about:
      "Dr. David Kim is a clinical neurologist focused on comprehensive care for patients with neurological disorders. With 15 years of experience, he provides expert diagnosis and management of epilepsy, multiple sclerosis, neuropathic pain, and cognitive disorders. Dr. Kim takes a holistic approach to patient care, addressing both the medical and lifestyle factors that impact neurological health.",
    qualifications: [
      { degree: "MBBS", institution: "UCLA", year: "2011" },
      { degree: "MD Neurology", institution: "UCSF", year: "2015" },
      {
        degree: "FAAN",
        institution: "American Academy of Neurology",
        year: "2021",
      },
    ],
    expertise: [
      "Epilepsy Management",
      "Multiple Sclerosis",
      "Neuropathic Pain",
      "Cognitive Disorders",
      "EEG Interpretation",
      "Botulinum Toxin Therapy",
    ],
    certifications: [
      {
        title: "Medical License",
        issuer: "State Medical Board",
        year: "2011",
        icon: "award",
      },
      {
        title: "Board Certification",
        issuer: "American Board of Neurology",
        year: "2015",
        icon: "certificate",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
    ],
    schedule: [
      { day: "Monday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Tuesday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Wednesday", isAvailable: false, hours: "Off" },
      { day: "Thursday", isAvailable: true, hours: "09:00–17:00" },
      { day: "Friday", isAvailable: true, hours: "09:00–16:00" },
      { day: "Saturday", isAvailable: false, hours: "Off" },
      { day: "Sunday", isAvailable: false, hours: "Off" },
    ],
    consultationTypes: ["in-person", "video"],
  },
];

export const doctorsList: Doctor[] = doctors; // Alias for page compatibility

export const departmentsList = [
  { value: "all", label: "All Departments" },
  { value: "Cardiology", label: "Cardiology" },
  { value: "Neurology", label: "Neurology" },
  { value: "Pediatrics", label: "Pediatrics" },
  { value: "Orthopedics", label: "Orthopedics" },
  { value: "Dermatology", label: "Dermatology" },
  { value: "Ophthalmology", label: "Ophthalmology" },
  { value: "Pulmonology", label: "Pulmonology" },
  { value: "General Surgery", label: "General Surgery" },
  { value: "Neonatology", label: "Neonatology" },
];

export const languagesList = [
  { value: "all", label: "All Languages" },
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "Hindi", label: "Hindi" },
  { value: "Bangla", label: "Bangla" },
  { value: "Arabic", label: "Arabic" },
  { value: "Korean", label: "Korean" },
  { value: "Mandarin", label: "Mandarin" },
];

export const quickFiltersList = [
  { id: "popular", label: "Popular" },
  { id: "available-today", label: "Available Today" },
  { id: "top-rated", label: "Top Rated" },
  { id: "online", label: "Online Consultation" },
  { id: "emergency", label: "Emergency" },
  { id: "female", label: "Female Doctors" },
  { id: "male", label: "Male Doctors" },
  { id: "experienced", label: "Most Experienced" },
  { id: "children", label: "Children Specialists" },
  { id: "heart", label: "Heart Specialists" },
];

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}

export function getRelatedDoctors(doctor: Doctor, count: number = 4): Doctor[] {
  return doctors
    .filter((d) => d.id !== doctor.id && d.specialty === doctor.specialty)
    .slice(0, count);
}

export function getDepartments(): string[] {
  return [...new Set(doctors.map((d) => d.specialty))];
}
