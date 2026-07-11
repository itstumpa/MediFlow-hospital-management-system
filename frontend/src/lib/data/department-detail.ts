import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  Ambulance,
  Award,
  Baby,
  BadgeCheck,
  Bandage,
  Bone,
  Brain,
  Building2,
  Calendar,
  Clock,
  Dna,
  Droplets,
  Ear,
  Eye,
  Heart,
  HeartPulse,
  Hospital,
  Laptop,
  Leaf,
  Microscope,
  Pill,
  Scanning,
  Shield,
  Stethoscope,
  Syringe,
  Thermometer,
  Users,
  Watch,
  Weight,
} from "lucide-react";

/* ─── Condition Card ─── */
export interface ConditionItem {
  name: string;
  icon: LucideIcon;
  description: string;
}

/* ─── Procedure ─── */
export interface ProcedureItem {
  name: string;
  description: string;
  duration: string;
  recoveryTime: string;
  technology: string;
}

/* ─── Technology Card ─── */
export interface TechnologyDetail {
  name: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
}

/* ─── Specialist Brief ─── */
export interface SpecialistBrief {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  patientsTreated: string;
  languages: string[];
  verified: boolean;
}

/* ─── Gallery Item ─── */
export interface GalleryItem {
  title: string;
  imageUrl: string;
  description: string;
}

/* ─── Insurance Info ─── */
export interface InsuranceProvider {
  name: string;
  accepted: boolean;
}

/* ─── Health Resource ─── */
export interface HealthResource {
  title: string;
  imageUrl: string;
  readingTime: string;
  author: string;
  slug: string;
}

/* ─── FAQ ─── */
export interface DeptFAQ {
  question: string;
  answer: string;
}

/* ─── Achievement Stat ─── */
export interface AchievementStat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

/* ─── Success Story ─── */
export interface DeptSuccessStory {
  id: string;
  patientName: string;
  patientPhoto: string;
  treatment: string;
  doctor: string;
  review: string;
  beforeSummary: string;
  afterSummary: string;
  rating: number;
  verified: boolean;
}

/* ─── Treatment Step ─── */
export interface TreatmentStep {
  step: number;
  title: string;
  description: string;
}

/* ─── Overview Data ─── */
export interface DepartmentOverview {
  mission: string;
  vision: string;
  coreValues: string[];
}

/* ─── Emergency Info ─── */
export interface EmergencyInfo {
  hotline: string;
  instructions: string[];
}

/* ─── Full Detail ─── */
export interface DepartmentDetailData {
  overview: DepartmentOverview;
  conditions: ConditionItem[];
  procedures: ProcedureItem[];
  technologies: TechnologyDetail[];
  specialists: SpecialistBrief[];
  treatmentProcess: TreatmentStep[];
  achievements: AchievementStat[];
  successStories: DeptSuccessStory[];
  gallery: GalleryItem[];
  insurance: InsuranceProvider[];
  paymentMethods: string[];
  healthResources: HealthResource[];
  faq: DeptFAQ[];
  emergency: EmergencyInfo;
}

/* ──────────────────────────────────────────── */
/*  Helper to build a DepartmentDetailData      */
/* ──────────────────────────────────────────── */

function deptDetail(overrides: Partial<DepartmentDetailData>): DepartmentDetailData {
  const defaults: DepartmentDetailData = {
    overview: {
      mission: "To provide exceptional, patient-centered care through clinical excellence, innovation, and compassion.",
      vision: "To be a globally recognized leader in our specialty, setting standards for quality care and patient outcomes.",
      coreValues: ["Patient-Centered Care", "Clinical Excellence", "Innovation & Research", "Compassion & Empathy", "Collaboration & Teamwork"],
    },
    conditions: [],
    procedures: [],
    technologies: [],
    specialists: [],
    treatmentProcess: [
      { step: 1, title: "Initial Consultation", description: "Meet with a specialist to discuss your symptoms, medical history, and concerns in a comfortable setting." },
      { step: 2, title: "Medical Examination", description: "Comprehensive physical examination and initial diagnostic tests to gather essential health data." },
      { step: 3, title: "Diagnosis", description: "Advanced diagnostic tests and imaging provide an accurate diagnosis of your condition." },
      { step: 4, title: "Personalized Treatment Plan", description: "Your specialist creates a customized treatment strategy tailored to your unique needs." },
      { step: 5, title: "Treatment", description: "Evidence-based treatment using the latest medical technology and techniques." },
      { step: 6, title: "Recovery", description: "Guided recovery with rehabilitation, therapy, and ongoing support from our care team." },
      { step: 7, title: "Follow-up Care", description: "Regular follow-up appointments to monitor progress and ensure lasting health." },
    ],
    achievements: [
      { value: "20", label: "Years Serving", suffix: "+" },
      { value: "12", label: "Patients Treated", prefix: "k", suffix: "+" },
      { value: "98", label: "Treatment Success", suffix: "%" },
      { value: "4.9", label: "Patient Satisfaction", suffix: "★" },
      { value: "150", label: "Research Publications", suffix: "+" },
    ],
    successStories: [],
    gallery: [],
    insurance: [],
    paymentMethods: ["Cash", "Credit / Debit Card", "UPI / Digital Wallet", "Insurance Card", "EMI / Installment"],
    healthResources: [],
    faq: [],
    emergency: {
      hotline: "+1 (249) 752-5068",
      instructions: ["Call our emergency hotline immediately.", "Do not eat or drink anything.", "Take any prescribed medications if available.", "Have your medical ID and insurance card ready.", "Remain calm and wait for medical assistance."],
    },
  };

  return { ...defaults, ...overrides };
}

/* ──────────────────────────────────────────── */
/*  Per‑department detail data                  */
/* ──────────────────────────────────────────── */

const departmentDetails: Record<string, DepartmentDetailData> = {

  /* ═══════════════ CARDIOLOGY ═══════════════ */
  cardiology: deptDetail({
    overview: {
      mission: "To reduce the burden of cardiovascular disease through excellence in patient care, groundbreaking research, and preventive cardiology programs.",
      vision: "To be the premier cardiology center where every patient receives personalized, world-class heart care with the best possible outcomes.",
      coreValues: ["Heart-Centered Care", "Clinical Innovation", "Research-Driven Practice", "Multidisciplinary Collaboration", "Lifelong Patient Partnership"],
    },
    conditions: [
      { name: "Coronary Artery Disease", icon: Heart, description: "Narrowing of heart arteries due to plaque buildup, reducing blood flow to the heart muscle." },
      { name: "Heart Attack", icon: HeartPulse, description: "Sudden blockage of blood flow to the heart, requiring immediate emergency intervention." },
      { name: "Heart Failure", icon: Activity, description: "Chronic condition where the heart cannot pump blood effectively to meet the body's needs." },
      { name: "Arrhythmia", icon: Activity, description: "Irregular heartbeat patterns that can cause palpitations, dizziness, or serious complications." },
      { name: "Valvular Heart Disease", icon: Heart, description: "Damage to one or more heart valves affecting proper blood flow through the heart." },
      { name: "Hypertension", icon: Thermometer, description: "Persistently high blood pressure that strain the heart and blood vessels over time." },
      { name: "Congenital Heart Disease", icon: Baby, description: "Structural heart problems present at birth requiring specialized lifelong care." },
      { name: "High Cholesterol", icon: Droplets, description: "Elevated lipid levels in the blood increasing risk of atherosclerosis and heart disease." },
    ],
    procedures: [
      { name: "ECG (Electrocardiogram)", description: "Non-invasive test recording electrical activity of the heart to detect rhythm abnormalities.", duration: "10-15 min", recoveryTime: "None", technology: "12-Lead ECG System" },
      { name: "Echocardiogram", description: "Ultrasound imaging of the heart to assess structure, function, and blood flow in real-time.", duration: "30-45 min", recoveryTime: "None", technology: "3D Echocardiography" },
      { name: "Stress Test", description: "Exercise-based test monitoring heart performance under physical stress to detect blockages.", duration: "45-60 min", recoveryTime: "15 min", technology: "Treadmill & ECG Monitoring" },
      { name: "Cardiac Catheterization", description: "Minimally invasive procedure to examine coronary arteries and heart chambers using a thin catheter.", duration: "30-60 min", recoveryTime: "4-6 hours", technology: "Digital Angiography System" },
      { name: "Angioplasty & Stenting", description: "Balloon-based procedure to open blocked arteries with stent placement to maintain blood flow.", duration: "1-2 hours", recoveryTime: "24-48 hours", technology: "Drug-Eluting Stents" },
      { name: "Pacemaker Implantation", description: "Surgical placement of a device that regulates abnormal heart rhythms with electrical pulses.", duration: "1-2 hours", recoveryTime: "1-2 weeks", technology: "Dual-Chamber Pacemaker" },
      { name: "Heart Valve Surgery", description: "Repair or replacement of damaged heart valves to restore normal blood flow.", duration: "3-6 hours", recoveryTime: "4-8 weeks", technology: "Minimally Invasive Valve System" },
      { name: "Cardiac Rehabilitation", description: "Supervised program of exercise, education, and lifestyle modification for heart patients.", duration: "12 weeks", recoveryTime: "Ongoing", technology: "Remote Monitoring Platform" },
    ],
    technologies: [
      { name: "3D Echocardiography", icon: Scanning, description: "Advanced ultrasound technology creating three-dimensional images of the heart for precise diagnosis.", benefits: ["Real-time 3D imaging", "Accurate valve assessment", "No radiation exposure"] },
      { name: "64-Slice CT Scanner", icon: Scanning, description: "High-speed CT imaging for detailed coronary artery visualization and calcium scoring.", benefits: ["Rapid scan time", "Low radiation dose", "High resolution images"] },
      { name: "Cardiac MRI", icon: Scanning, description: "Magnetic resonance imaging specialized for detailed heart structure and function analysis.", benefits: ["Gold-standard imaging", "No ionizing radiation", "Tissue characterization"] },
      { name: "Holter Monitoring", icon: Watch, description: "Portable device continuously recording heart rhythm over 24-48 hours for arrhythmia detection.", benefits: ["Continuous monitoring", "Detects intermittent arrhythmias", "Comfortable wear"] },
      { name: "AI Diagnostics", icon: Laptop, description: "Artificial intelligence-powered analysis of cardiac images and ECG data for early detection.", benefits: ["Faster diagnosis", "Pattern recognition", "Predictive analytics"] },
      { name: "Wearable Monitoring", icon: Watch, description: "Smart wearable devices tracking heart rate, rhythm, and activity for remote patient management.", benefits: ["24/7 tracking", "Early warning alerts", "Remote patient data"] },
    ],
    specialists: [
      { id: "1", name: "Dr. Sarah Johnson", specialty: "Interventional Cardiologist", experience: 18, imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face", rating: 4.9, reviewCount: 328, patientsTreated: "5,200+", languages: ["English", "Spanish"], verified: true },
      { id: "20", name: "Dr. Michael Torres", specialty: "Cardiac Surgeon", experience: 22, imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face", rating: 4.8, reviewCount: 276, patientsTreated: "3,800+", languages: ["English"], verified: true },
      { id: "21", name: "Dr. Emily Park", specialty: "Electrophysiologist", experience: 14, imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face", rating: 4.7, reviewCount: 198, patientsTreated: "2,900+", languages: ["English", "Korean"], verified: true },
      { id: "22", name: "Dr. David Okonkwo", specialty: "Preventive Cardiologist", experience: 16, imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face", rating: 4.9, reviewCount: 245, patientsTreated: "4,100+", languages: ["English", "French"], verified: true },
    ],
    achievements: [
      { value: "25", label: "Years Serving", suffix: "+" },
      { value: "15", label: "Patients Treated", prefix: "k", suffix: "+" },
      { value: "98", label: "Treatment Success", suffix: "%" },
      { value: "4.9", label: "Patient Satisfaction", suffix: "★" },
      { value: "200", label: "Research Publications", suffix: "+" },
    ],
    successStories: [
      { id: "cs1", patientName: "Margaret Chen", patientPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", treatment: "Triple Bypass Surgery", doctor: "Dr. Michael Torres", review: "The cardiology team saved my life. From the emergency room to the operating room and through months of recovery, every step was handled with exceptional skill and compassion.", beforeSummary: "Severe chest pain, shortness of breath, diagnosed with 3 blocked arteries", afterSummary: "Successful bypass surgery, now walking 5km daily with normal heart function", rating: 5, verified: true },
      { id: "cs2", patientName: "Robert Kim", patientPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", treatment: "Angioplasty & Stenting", doctor: "Dr. Sarah Johnson", review: "I had a heart attack at 52. Dr. Johnson's quick response and expert care saved my life. The stenting procedure was smooth and recovery was faster than I expected.", beforeSummary: "Acute chest pain, diagnosed with 90% blockage in LAD artery", afterSummary: "Stent placed successfully, back to active lifestyle within 6 weeks", rating: 5, verified: true },
      { id: "cs3", patientName: "Linda O'Brien", patientPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face", treatment: "Pacemaker Implantation", doctor: "Dr. Emily Park", review: "Living with arrhythmia was terrifying. Dr. Park explained everything and the pacemaker has given me my life back. I'm no longer afraid of every palpitation.", beforeSummary: "Severe bradycardia, fainting episodes, diagnosed with heart block", afterSummary: "Pacemaker regulating heart rhythm normally, no more fainting, active daily life", rating: 5, verified: true },
    ],
    gallery: [
      { title: "Cardiac Catheterization Lab", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop", description: "State-of-the-art cath lab with digital angiography" },
      { title: "CCU Patient Room", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop", description: "Comfortable cardiac care unit with advanced monitoring" },
      { title: "ECG Laboratory", imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop", description: "Modern ECG lab with 12-lead systems" },
      { title: "Reception Area", imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop", description: "Welcoming reception with dedicated cardiology staff" },
      { title: "Stress Testing Lab", imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop", description: "Exercise stress testing with advanced monitoring" },
      { title: "Cardiac Rehab Gym", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop", description: "Supervised rehabilitation facility for heart patients" },
    ],
    insurance: [
      { name: "Blue Cross Blue Shield", accepted: true },
      { name: "Aetna", accepted: true },
      { name: "Cigna", accepted: true },
      { name: "UnitedHealthcare", accepted: true },
      { name: "Medicare", accepted: true },
      { name: "Humana", accepted: true },
    ],
    healthResources: [
      { title: "10 Early Signs of Heart Disease", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop", readingTime: "5 min read", author: "Dr. Sarah Johnson", slug: "early-signs-heart-disease" },
      { title: "Preventing a Heart Attack: Risk Factors You Can Control", imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop", readingTime: "7 min read", author: "Dr. Michael Torres", slug: "preventing-heart-attack" },
      { title: "Managing Blood Pressure Naturally", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop", readingTime: "6 min read", author: "Dr. David Okonkwo", slug: "managing-blood-pressure" },
      { title: "Understanding Your Cholesterol Numbers", imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop", readingTime: "4 min read", author: "Dr. Sarah Johnson", slug: "understanding-cholesterol" },
    ],
    faq: [
      { question: "When should I visit a cardiologist?", answer: "You should see a cardiologist if you experience chest pain, shortness of breath, palpitations, dizziness, or have risk factors like high blood pressure, diabetes, high cholesterol, or a family history of heart disease. Regular checkups are recommended after age 40 or earlier if you have risk factors." },
      { question: "How often should I get a heart check-up?", answer: "For most adults, an annual heart health screening is recommended. If you have existing heart conditions or risk factors, your cardiologist may recommend more frequent visits every 3-6 months." },
      { question: "Do I need a referral to see a cardiologist?", answer: "Some insurance plans require a referral from your primary care physician, while others allow direct appointments. Our team can help verify your insurance requirements before scheduling." },
      { question: "What insurance plans are accepted for cardiology?", answer: "We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare, and Humana. Contact our billing team for specific coverage verification." },
      { question: "Can I schedule an online consultation?", answer: "Yes, we offer telemedicine consultations for follow-up visits, medication management, and initial assessments. Online consultations are convenient and available for most cardiology services." },
      { question: "What tests are performed during the first visit?", answer: "A first cardiology visit typically includes a detailed medical history review, physical examination, blood pressure measurement, ECG, and possibly blood work. Additional tests may be scheduled based on your symptoms." },
    ],
    emergency: {
      hotline: "+1 (249) 752-5068",
      instructions: ["Call 911 or our emergency hotline immediately if you experience chest pain.", "Chew and swallow an aspirin (325mg) if you are not allergic.", "Stop all activity and rest in a comfortable position.", "If prescribed, take your nitroglycerin as directed.", "Do not drive yourself — wait for emergency services.", "Keep your medical history and medication list ready."],
    },
  }),

  /* ═══════════════ NEUROLOGY ═══════════════ */
  neurology: deptDetail({
    overview: {
      mission: "To advance the understanding and treatment of neurological disorders through compassionate care, innovative research, and multidisciplinary expertise.",
      vision: "To be a center of excellence where patients with neurological conditions receive the most advanced, effective, and compassionate care available.",
      coreValues: ["Brain Health Focus", "Scientific Excellence", "Patient & Family Care", "Innovation in Treatment", "Continuous Learning"],
    },
    conditions: [
      { name: "Stroke", icon: Brain, description: "Sudden interruption of blood supply to the brain requiring immediate emergency treatment." },
      { name: "Epilepsy", icon: Activity, description: "Neurological disorder characterized by recurrent, unprovoked seizures." },
      { name: "Multiple Sclerosis", icon: Brain, description: "Autoimmune condition affecting the central nervous system causing varied neurological symptoms." },
      { name: "Parkinson's Disease", icon: Brain, description: "Progressive movement disorder affecting dopamine-producing neurons in the brain." },
      { name: "Alzheimer's Disease", icon: Brain, description: "Progressive brain disorder causing memory loss, cognitive decline, and behavioral changes." },
      { name: "Migraine", icon: Thermometer, description: "Severe, recurring headaches often accompanied by visual disturbances and nausea." },
      { name: "Neuropathy", icon: Activity, description: "Peripheral nerve damage causing weakness, numbness, and pain, often in hands and feet." },
      { name: "Brain Tumors", icon: Scanning, description: "Abnormal growth of cells within the brain requiring specialized neurological and surgical care." },
    ],
    procedures: [
      { name: "EEG (Electroencephalogram)", description: "Non-invasive recording of brain electrical activity to diagnose epilepsy and other disorders.", duration: "30-60 min", recoveryTime: "None", technology: "Digital EEG System" },
      { name: "MRI Brain Scan", description: "High-resolution magnetic resonance imaging for detailed brain structure visualization.", duration: "30-45 min", recoveryTime: "None", technology: "3T MRI Scanner" },
      { name: "CT Perfusion", description: "Advanced CT imaging measuring blood flow in the brain for stroke assessment.", duration: "15-20 min", recoveryTime: "None", technology: "256-Slice CT" },
      { name: "Nerve Conduction Study", description: "Test measuring electrical impulses along nerves to diagnose nerve damage or dysfunction.", duration: "30-60 min", recoveryTime: "None", technology: "EMG/NCS System" },
      { name: "Lumbar Puncture", description: "Procedure to collect cerebrospinal fluid for diagnosis of infections and neurological conditions.", duration: "20-30 min", recoveryTime: "1-2 hours", technology: "Image Guidance" },
      { name: "Stroke Thrombolysis", description: "Emergency medication treatment to dissolve blood clots causing ischemic stroke.", duration: "1 hour infusion", recoveryTime: "24-48 hours", technology: "IV Thrombolysis Protocol" },
      { name: "Botulinum Toxin Therapy", description: "Targeted injections to treat movement disorders, chronic migraines, and muscle spasticity.", duration: "15-30 min", recoveryTime: "None", technology: "EMG-Guided Injection" },
      { name: "Neuropsychological Testing", description: "Comprehensive cognitive assessment to evaluate memory, attention, and executive function.", duration: "2-4 hours", recoveryTime: "None", technology: "Standardized Test Battery" },
    ],
    technologies: [
      { name: "3T MRI Scanner", icon: Scanning, description: "High-field magnetic resonance imaging providing exceptional brain and spine detail.", benefits: ["Superior resolution", "Advanced contrast imaging", "fMRI capability"] },
      { name: "CT Perfusion", icon: Scanning, description: "Rapid CT imaging technique measuring cerebral blood flow parameters.", benefits: ["Quick acquisition", "Stroke treatment guidance", "Low contrast dose"] },
      { name: "Video EEG Monitoring", icon: Watch, description: "Continuous EEG recording synchronized with video for seizure characterization.", benefits: ["Long-term monitoring", "Seizure localization", "Treatment planning"] },
      { name: "Transcranial Doppler", icon: Scanning, description: "Ultrasound technique measuring blood flow velocity in brain arteries.", benefits: ["Non-invasive", "Bedside assessment", "Vasospasm monitoring"] },
      { name: "Telemedicine Platform", icon: Laptop, description: "Remote consultation system for neurological assessments and follow-up care.", benefits: ["Remote access", "Stroke tele-assessment", "Convenient follow-ups"] },
    ],
    specialists: [
      { id: "2", name: "Dr. James Mitchell", specialty: "Neurologist", experience: 14, imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face", rating: 4.8, reviewCount: 256, patientsTreated: "4,100+", languages: ["English"], verified: true },
      { id: "23", name: "Dr. Priya Sharma", specialty: "Stroke Neurologist", experience: 16, imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face", rating: 4.9, reviewCount: 312, patientsTreated: "3,600+", languages: ["English", "Hindi"], verified: true },
      { id: "24", name: "Dr. Kevin O'Connell", specialty: "Neurosurgeon", experience: 20, imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face", rating: 4.8, reviewCount: 198, patientsTreated: "3,200+", languages: ["English", "Irish"], verified: true },
    ],
    achievements: [
      { value: "20", label: "Years Serving", suffix: "+" },
      { value: "12", label: "Patients Treated", prefix: "k", suffix: "+" },
      { value: "96", label: "Treatment Success", suffix: "%" },
      { value: "4.8", label: "Patient Satisfaction", suffix: "★" },
      { value: "180", label: "Research Publications", suffix: "+" },
    ],
    successStories: [
      { id: "ns1", patientName: "Thomas Wright", patientPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", treatment: "Stroke Thrombolysis", doctor: "Dr. Priya Sharma", review: "I had a stroke while at work. The team at MediFlow responded immediately and Dr. Sharma's quick action saved my brain function. I've made a near-full recovery thanks to them.", beforeSummary: "Sudden weakness on left side, facial droop, rushed to ER with stroke symptoms", afterSummary: "Full recovery with minimal weakness, returned to work within 3 months", rating: 5, verified: true },
      { id: "ns2", patientName: "Eleanor Hayes", patientPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", treatment: "Epilepsy Management", doctor: "Dr. James Mitchell", review: "After years of uncontrolled seizures, Dr. Mitchell found the right medication combination. I've been seizure-free for 18 months now and can finally drive again.", beforeSummary: "Frequent seizures despite multiple medications, unable to drive or work", afterSummary: "Seizure-free for 18 months on optimized medication regimen", rating: 5, verified: true },
    ],
    gallery: [
      { title: "Neurology OPD", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop", description: "Modern neurology outpatient consultation rooms" },
      { title: "EEG Laboratory", imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop", description: "Advanced EEG monitoring and diagnostics lab" },
      { title: "Neuro ICU", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop", description: "Specialized intensive care for neurological patients" },
      { title: "MRI Suite", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop", description: "High-field 3T MRI scanner for detailed imaging" },
    ],
    insurance: [
      { name: "Blue Cross Blue Shield", accepted: true },
      { name: "Aetna", accepted: true },
      { name: "Cigna", accepted: true },
      { name: "UnitedHealthcare", accepted: true },
      { name: "Medicare", accepted: true },
    ],
    healthResources: [
      { title: "Recognizing Stroke Symptoms: FAST Method", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop", readingTime: "4 min read", author: "Dr. Priya Sharma", slug: "stroke-symptoms-fast" },
      { title: "Living Well with Epilepsy", imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop", readingTime: "6 min read", author: "Dr. James Mitchell", slug: "living-with-epilepsy" },
      { title: "Understanding Migraine Triggers", imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop", readingTime: "5 min read", author: "Dr. James Mitchell", slug: "migraine-triggers" },
    ],
    faq: [
      { question: "When should I see a neurologist?", answer: "You should consult a neurologist if you experience persistent headaches, seizures, numbness or tingling, memory problems, dizziness, vision changes, or muscle weakness that doesn't resolve." },
      { question: "How is a stroke diagnosed?", answer: "Stroke diagnosis involves a rapid assessment including a neurological exam, CT scan of the brain, blood tests, and sometimes MRI or angiography to determine the type and location of the stroke." },
      { question: "What is the recovery time for stroke patients?", answer: "Stroke recovery varies widely depending on severity and location. Initial hospital stay is 3-7 days, followed by weeks to months of rehabilitation. Many patients continue improving for up to 1-2 years." },
    ],
  }),

  /* ═══════════════ ORTHOPEDICS ═══════════════ */
  orthopedics: deptDetail({
    overview: {
      mission: "To restore mobility and improve quality of life through advanced orthopedic care, innovative surgical techniques, and comprehensive rehabilitation programs.",
      vision: "To be the leading orthopedic center where patients regain full function and return to the activities they love with confidence.",
      coreValues: ["Mobility Restoration", "Surgical Excellence", "Patient-Centered Rehab", "Innovation & Technology", "Long-Term Partnership"],
    },
    conditions: [
      { name: "Osteoarthritis", icon: Bone, description: "Degenerative joint disease causing cartilage breakdown, pain, and stiffness in joints." },
      { name: "Rheumatoid Arthritis", icon: Bone, description: "Autoimmune condition causing chronic joint inflammation and potential joint damage." },
      { name: "Sports Injuries", icon: Activity, description: "Acute or overuse injuries affecting muscles, ligaments, tendons, and bones from athletic activity." },
      { name: "Spinal Disorders", icon: Bone, description: "Conditions affecting the spine including herniated discs, stenosis, and curvature abnormalities." },
      { name: "Fractures & Trauma", icon: Bandage, description: "Broken bones and musculoskeletal trauma requiring immediate assessment and treatment." },
      { name: "Osteoporosis", icon: Bone, description: "Condition causing weakened, brittle bones with increased fracture risk, common in older adults." },
      { name: "Tendonitis", icon: Activity, description: "Inflammation of tendons causing pain and tenderness, often near joints like shoulder or elbow." },
      { name: "Carpal Tunnel Syndrome", icon: Activity, description: "Compression of the median nerve in the wrist causing numbness, tingling, and hand weakness." },
    ],
    procedures: [
      { name: "Hip Replacement Surgery", description: "Replacement of damaged hip joint with artificial implant to restore mobility and reduce pain.", duration: "1-2 hours", recoveryTime: "6-12 weeks", technology: "Robotic-Assisted Hip System" },
      { name: "Knee Replacement Surgery", description: "Resurfacing of damaged knee joint with prosthetic components for pain-free movement.", duration: "1-2 hours", recoveryTime: "8-12 weeks", technology: "Computer-Navigated Knee System" },
      { name: "Arthroscopic Surgery", description: "Minimally invasive keyhole surgery for joint diagnosis and treatment using a tiny camera.", duration: "30-60 min", recoveryTime: "2-6 weeks", technology: "4K Arthroscopy System" },
      { name: "Spine Fusion", description: "Surgical fusion of vertebrae to treat instability, deformity, or chronic back pain.", duration: "2-4 hours", recoveryTime: "3-6 months", technology: "Minimally Invasive Spine System" },
      { name: "Fracture Repair (ORIF)", description: "Open reduction and internal fixation using plates, screws, or rods to stabilize broken bones.", duration: "1-3 hours", recoveryTime: "6-12 weeks", technology: "Locking Plate System" },
      { name: "Joint Injections", description: "Targeted corticosteroid or hyaluronic acid injections to reduce joint inflammation and pain.", duration: "10-15 min", recoveryTime: "24-48 hours", technology: "Ultrasound Guidance" },
      { name: "Rotator Cuff Repair", description: "Surgical repair of torn shoulder tendons to restore strength and range of motion.", duration: "1-2 hours", recoveryTime: "4-6 months", technology: "Arthroscopic Suture System" },
      { name: "Physical Therapy", description: "Customized exercise program to strengthen muscles, improve flexibility, and speed recovery.", duration: "4-12 weeks", recoveryTime: "Ongoing", technology: "Digital Rehab Platform" },
    ],
    technologies: [
      { name: "Robotic-Assisted Surgery", icon: Scanning, description: "Precision robotic guidance for joint replacement and complex orthopedic procedures.", benefits: ["Sub-millimeter precision", "Custom implant placement", "Faster recovery"] },
      { name: "3D CT Scanning", icon: Scanning, description: "Three-dimensional imaging for detailed bone and joint assessment before surgery.", benefits: ["Precise measurements", "Surgical planning", "Implant sizing"] },
      { name: "Fluoroscopy (C-Arm)", icon: Scanning, description: "Real-time X-ray guidance during surgical procedures for accurate implant positioning.", benefits: ["Live imaging", "Minimally invasive guidance", "Reduced radiation"] },
      { name: "Bone Densitometry (DEXA)", icon: Scanning, description: "Specialized X-ray measuring bone mineral density for osteoporosis diagnosis.", benefits: ["Accurate bone density", "Fracture risk assessment", "Low radiation dose"] },
      { name: "Digital Rehab Platform", icon: Laptop, description: "Remote physical therapy platform with guided exercises and progress tracking.", benefits: ["Home therapy", "Progress tracking", "Video guidance"] },
    ],
    specialists: [
      { id: "4", name: "Dr. Robert Chen", specialty: "Orthopedic Surgeon", experience: 20, imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face", rating: 4.7, reviewCount: 189, patientsTreated: "4,800+", languages: ["English", "Mandarin"], verified: true },
      { id: "25", name: "Dr. Maria Santos", specialty: "Joint Replacement Specialist", experience: 15, imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face", rating: 4.9, reviewCount: 267, patientsTreated: "3,500+", languages: ["English", "Spanish"], verified: true },
      { id: "26", name: "Dr. James Wilson", specialty: "Sports Medicine Physician", experience: 12, imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face", rating: 4.8, reviewCount: 212, patientsTreated: "3,100+", languages: ["English"], verified: true },
      { id: "27", name: "Dr. Anita Patel", specialty: "Spine Surgeon", experience: 18, imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face", rating: 4.8, reviewCount: 178, patientsTreated: "2,900+", languages: ["English", "Gujarati"], verified: true },
    ],
    achievements: [
      { value: "28", label: "Years Serving", suffix: "+" },
      { value: "18", label: "Patients Treated", prefix: "k", suffix: "+" },
      { value: "97", label: "Treatment Success", suffix: "%" },
      { value: "4.7", label: "Patient Satisfaction", suffix: "★" },
      { value: "120", label: "Research Publications", suffix: "+" },
    ],
    successStories: [
      { id: "os1", patientName: "James Rodriguez", patientPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", treatment: "Total Knee Replacement", doctor: "Dr. Maria Santos", review: "Total knee replacement changed my life. I can walk without pain for the first time in years. Dr. Santos and her team were exceptional.", beforeSummary: "Severe knee osteoarthritis, unable to climb stairs or walk more than 10 minutes", afterSummary: "Full mobility restored, playing golf again, pain-free daily activities", rating: 5, verified: true },
      { id: "os2", patientName: "Sarah Mitchell", patientPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", treatment: "Hip Replacement", doctor: "Dr. Robert Chen", review: "I was terrified of hip replacement surgery, but Dr. Chen made it so easy. I was walking the same day and back to hiking within 3 months.", beforeSummary: "Severe hip pain, limping, unable to hike or exercise", afterSummary: "Pain-free hip, walking 10,000 steps daily, returned to hiking", rating: 5, verified: true },
    ],
    gallery: [
      { title: "Orthopedic Ward", imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop", description: "Comfortable orthopedic patient rooms" },
      { title: "Rehabilitation Gym", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop", description: "Fully equipped physical therapy gym" },
      { title: "Robotic Surgery Suite", imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=600&fit=crop", description: "Robotic-assisted surgery system" },
      { title: "Plaster & Cast Room", imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop", description: "Modern casting and splinting facility" },
    ],
    insurance: [
      { name: "Blue Cross Blue Shield", accepted: true },
      { name: "Aetna", accepted: true },
      { name: "Cigna", accepted: true },
      { name: "UnitedHealthcare", accepted: true },
      { name: "Medicare", accepted: true },
    ],
    healthResources: [
      { title: "Preparing for Joint Replacement Surgery", imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop", readingTime: "8 min read", author: "Dr. Robert Chen", slug: "joint-replacement-prep" },
      { title: "Managing Arthritis Without Surgery", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop", readingTime: "6 min read", author: "Dr. Maria Santos", slug: "managing-arthritis" },
      { title: "Sports Injury Prevention Guide", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop", readingTime: "5 min read", author: "Dr. James Wilson", slug: "sports-injury-prevention" },
    ],
    faq: [
      { question: "How long does it take to recover from knee replacement?", answer: "Most patients are walking with assistance the day of surgery. Full recovery typically takes 8-12 weeks, with complete return to strenuous activities at 4-6 months. Physical therapy is essential throughout the process." },
      { question: "Is robotic surgery better than traditional surgery?", answer: "Robotic-assisted surgery offers greater precision, smaller incisions, and potentially faster recovery. The surgeon maintains full control while the robot enhances accuracy and visualization." },
      { question: "Can sports injuries heal without surgery?", answer: "Many sports injuries can be managed conservatively with rest, physical therapy, and anti-inflammatory medications. Surgery is considered when conservative treatments fail or for severe injuries like complete tendon ruptures." },
    ],
  }),
};

/* ──────────────────────────────────────────── */
/*  Lookup & fallback                          */
/* ──────────────────────────────────────────── */

/**
 * Returns enriched department detail data for a given department slug.
 * If no custom data exists, returns sensible defaults with minimal content.
 */
export function getDepartmentDetail(slug: string): DepartmentDetailData | null {
  return departmentDetails[slug] ?? null;
}

/**
 * Returns the list of department slugs that have detail data.
 */
export function getAvailableDetailSlugs(): string[] {
  return Object.keys(departmentDetails);
}
