export interface MockAuthor {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
  bio: string;
}

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface MockTag {
  id: string;
  name: string;
  slug: string;
}

export interface MockRelatedArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  imageUrl: string;
  date: string;
}

export const mockAuthors: MockAuthor[] = [
  {
    id: "auth-1",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    avatar: "",
    bio: "Board-certified cardiologist with over 15 years of experience in preventive cardiology and heart disease management.",
  },
  {
    id: "auth-2",
    name: "Dr. James Mitchell",
    specialization: "Neurologist",
    avatar: "",
    bio: "Senior neurologist specializing in migraine treatment, stroke prevention, and neurodegenerative disorders.",
  },
  {
    id: "auth-3",
    name: "Dr. Emily Chen",
    specialization: "Pediatrician",
    avatar: "",
    bio: "Dedicated pediatrician passionate about children's health, vaccination, and developmental medicine.",
  },
  {
    id: "auth-4",
    name: "Dr. Robert Kim",
    specialization: "Orthopedic Surgeon",
    avatar: "",
    bio: "Orthopedic surgeon specializing in sports medicine, joint replacement, and minimally invasive procedures.",
  },
  {
    id: "auth-5",
    name: "Dr. Michael Torres",
    specialization: "Dermatologist",
    avatar: "",
    bio: "Clinical dermatologist with expertise in skin cancer screening, acne treatment, and cosmetic dermatology.",
  },
  {
    id: "auth-6",
    name: "Sarah Williams",
    specialization: "Health Writer",
    avatar: "",
    bio: "Senior health writer and medical content specialist with a background in public health communication.",
  },
];

export const mockCategories: MockCategory[] = [
  {
    id: "cat-1",
    name: "Heart Health",
    slug: "heart-health",
    description:
      "Articles about cardiovascular health, heart disease prevention, and cardiac care.",
  },
  {
    id: "cat-2",
    name: "Neurology",
    slug: "neurology",
    description:
      "Brain health, neurological disorders, and cognitive wellness insights.",
  },
  {
    id: "cat-3",
    name: "Pediatrics",
    slug: "pediatrics",
    description:
      "Children's health, developmental milestones, and pediatric care guidance.",
  },
  {
    id: "cat-4",
    name: "Orthopedics",
    slug: "orthopedics",
    description:
      "Bone health, joint care, sports injuries, and orthopedic treatments.",
  },
  {
    id: "cat-5",
    name: "Dermatology",
    slug: "dermatology",
    description:
      "Skin health, dermatological conditions, and cosmetic treatments.",
  },
  {
    id: "cat-6",
    name: "Mental Health",
    slug: "mental-health",
    description:
      "Mental wellness, therapy approaches, and psychological health resources.",
  },
  {
    id: "cat-7",
    name: "Nutrition",
    slug: "nutrition",
    description:
      "Dietary guidance, nutritional science, and healthy eating habits.",
  },
  {
    id: "cat-8",
    name: "Preventive Care",
    slug: "preventive-care",
    description:
      "Preventive medicine, screenings, vaccinations, and wellness checkups.",
  },
  {
    id: "cat-9",
    name: "Women's Health",
    slug: "womens-health",
    description:
      "Women's health issues, reproductive health, and gender-specific care.",
  },
  {
    id: "cat-10",
    name: "Men's Health",
    slug: "mens-health",
    description:
      "Men's health concerns, preventive care, and wellness strategies.",
  },
];

export const mockTags: MockTag[] = [
  { id: "tag-1", name: "Heart Disease", slug: "heart-disease" },
  { id: "tag-2", name: "Prevention", slug: "prevention" },
  { id: "tag-3", name: "Exercise", slug: "exercise" },
  { id: "tag-4", name: "Nutrition", slug: "nutrition" },
  { id: "tag-5", name: "Mental Health", slug: "mental-health" },
  { id: "tag-6", name: "Vaccination", slug: "vaccination" },
  { id: "tag-7", name: "Children's Health", slug: "childrens-health" },
  { id: "tag-8", name: "Skin Care", slug: "skin-care" },
  { id: "tag-9", name: "Brain Health", slug: "brain-health" },
  { id: "tag-10", name: "Bone Health", slug: "bone-health" },
  { id: "tag-11", name: "Sleep", slug: "sleep" },
  { id: "tag-12", name: "Stress Management", slug: "stress-management" },
  { id: "tag-13", name: "Diabetes", slug: "diabetes" },
  { id: "tag-14", name: "Blood Pressure", slug: "blood-pressure" },
  { id: "tag-15", name: "Cancer", slug: "cancer" },
];

export const mockRelatedArticles: MockRelatedArticle[] = [
  {
    id: "art-1",
    title: "Understanding Heart Disease: A Comprehensive Guide",
    slug: "understanding-heart-disease",
    category: "Heart Health",
    imageUrl: "/images/blog-1.jpg",
    date: "2026-06-15",
  },
  {
    id: "art-2",
    title: "The Importance of Regular Health Checkups",
    slug: "importance-regular-health-checkups",
    category: "Preventive Care",
    imageUrl: "/images/blog-2.jpg",
    date: "2026-06-20",
  },
  {
    id: "art-3",
    title: "Managing Stress for Better Mental Health",
    slug: "managing-stress-mental-health",
    category: "Mental Health",
    imageUrl: "/images/blog-3.jpg",
    date: "2026-06-25",
  },
  {
    id: "art-4",
    title: "A Guide to Children's Nutrition",
    slug: "guide-childrens-nutrition",
    category: "Pediatrics",
    imageUrl: "/images/blog-4.jpg",
    date: "2026-07-01",
  },
  {
    id: "art-5",
    title: "Common Skin Conditions and Treatments",
    slug: "common-skin-conditions-treatments",
    category: "Dermatology",
    imageUrl: "/images/blog-5.jpg",
    date: "2026-07-05",
  },
  {
    id: "art-6",
    title: "Exercise and Joint Health: What You Need to Know",
    slug: "exercise-joint-health",
    category: "Orthopedics",
    imageUrl: "/images/blog-6.jpg",
    date: "2026-07-08",
  },
];

export const mockDepartments: { id: string; name: string }[] = [
  { id: "dept-1", name: "Cardiology" },
  { id: "dept-2", name: "Neurology" },
  { id: "dept-3", name: "Pediatrics" },
  { id: "dept-4", name: "Orthopedics" },
  { id: "dept-5", name: "Dermatology" },
  { id: "dept-6", name: "Psychiatry" },
  { id: "dept-7", name: "Obstetrics & Gynecology" },
  { id: "dept-8", name: "Ophthalmology" },
];

export const mockDoctors: { id: string; name: string; department: string }[] = [
  { id: "doc-1", name: "Dr. Sarah Johnson", department: "Cardiology" },
  { id: "doc-2", name: "Dr. James Mitchell", department: "Neurology" },
  { id: "doc-3", name: "Dr. Emily Chen", department: "Pediatrics" },
  { id: "doc-4", name: "Dr. Robert Kim", department: "Orthopedics" },
  { id: "doc-5", name: "Dr. Michael Torres", department: "Dermatology" },
  { id: "doc-6", name: "Dr. Amanda Foster", department: "Psychiatry" },
  { id: "doc-7", name: "Dr. Lisa Wang", department: "Obstetrics & Gynecology" },
  { id: "doc-8", name: "Dr. David Patel", department: "Ophthalmology" },
];
