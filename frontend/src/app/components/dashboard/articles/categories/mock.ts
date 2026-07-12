import type { ArticleCategory } from "./types";

export const categoriesData: ArticleCategory[] = [
  {
    id: "cat-1",
    name: "Heart Health",
    slug: "heart-health",
    description:
      "Expert advice on cardiovascular wellness, heart disease prevention, and cardiac care. Covers everything from cholesterol management to post-surgery recovery.",
    icon: "Heart",
    imageUrl:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=800&q=80",
    articlesCount: 24,
    featured: true,
    status: "active",
    createdAt: "2024-01-15",
    seoTitle: "Heart Health Articles | MediFlow",
    seoDescription:
      "Discover expert cardiology advice, heart disease prevention tips, and cardiac care guides.",
  },
  {
    id: "cat-2",
    name: "Mental Health",
    slug: "mental-health",
    description:
      "Resources for emotional wellbeing, anxiety management, depression support, and mental health care strategies for all ages.",
    icon: "Brain",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    articlesCount: 31,
    featured: true,
    status: "active",
    createdAt: "2024-01-18",
    seoTitle: "Mental Health Resources | MediFlow",
    seoDescription:
      "Find support for anxiety, depression, and emotional wellbeing with expert mental health resources.",
  },
  {
    id: "cat-3",
    name: "Nutrition & Diet",
    slug: "nutrition-diet",
    description:
      "Evidence-based dietary guidance, meal planning tips, and nutritional science to help you eat better at every stage of life.",
    icon: "Apple",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    articlesCount: 28,
    featured: true,
    status: "active",
    createdAt: "2024-02-01",
    seoTitle: "Nutrition & Diet Articles | MediFlow",
  },
  {
    id: "cat-4",
    name: "Women's Health",
    slug: "womens-health",
    description:
      "Comprehensive care guides covering reproductive health, pregnancy, menopause, and overall wellness tailored for women.",
    icon: "Venus",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    articlesCount: 22,
    featured: false,
    status: "active",
    createdAt: "2024-02-10",
  },
  {
    id: "cat-5",
    name: "Children's Health",
    slug: "childrens-health",
    description:
      "Pediatric care advice from vaccinations and developmental milestones to common childhood illnesses and parenting tips.",
    icon: "Baby",
    imageUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    articlesCount: 19,
    featured: false,
    status: "active",
    createdAt: "2024-02-20",
  },
  {
    id: "cat-6",
    name: "Diabetes & Endocrinology",
    slug: "diabetes-endocrinology",
    description:
      "In-depth resources on diabetes management, thyroid health, hormone imbalances, and metabolic disorder treatments.",
    icon: "Activity",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    articlesCount: 16,
    featured: true,
    status: "active",
    createdAt: "2024-03-05",
    seoTitle: "Diabetes Management Guides | MediFlow",
  },
  {
    id: "cat-7",
    name: "Orthopedics",
    slug: "orthopedics",
    description:
      "Guides on bone health, joint pain relief, sports injuries, arthritis management, and orthopedic surgery recovery.",
    icon: "Bone",
    imageUrl:
      "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80",
    articlesCount: 14,
    featured: false,
    status: "active",
    createdAt: "2024-03-12",
  },
  {
    id: "cat-8",
    name: "Respiratory Health",
    slug: "respiratory-health",
    description:
      "Information on asthma, COPD, allergies, lung health, and breathing exercises for better respiratory function.",
    icon: "Lung",
    imageUrl:
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&q=80",
    articlesCount: 12,
    featured: false,
    status: "active",
    createdAt: "2024-03-20",
  },
  {
    id: "cat-9",
    name: "Dermatology & Skin Care",
    slug: "dermatology-skin-care",
    description:
      "Expert advice on skin conditions, acne treatments, anti-aging routines, and sun protection for healthy skin.",
    icon: "Droplets",
    imageUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    articlesCount: 20,
    featured: false,
    status: "active",
    createdAt: "2024-04-01",
  },
  {
    id: "cat-10",
    name: "General Wellness",
    slug: "general-wellness",
    description:
      "Holistic health tips, preventive care advice, sleep optimization, stress management, and healthy lifestyle guides.",
    icon: "Shield",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    articlesCount: 35,
    featured: true,
    status: "active",
    createdAt: "2024-01-10",
    seoTitle: "Wellness Tips & Preventive Care | MediFlow",
  },
  {
    id: "cat-11",
    name: "Senior Health",
    slug: "senior-health",
    description:
      "Aging gracefully with resources on elder care, fall prevention, cognitive health, and chronic condition management.",
    icon: "HeartPulse",
    imageUrl:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=800&q=80",
    articlesCount: 8,
    featured: false,
    status: "inactive",
    createdAt: "2024-04-15",
  },
  {
    id: "cat-12",
    name: "Vaccinations & Immunization",
    slug: "vaccinations-immunization",
    description:
      "Up-to-date information on vaccine schedules, immunization science, and disease prevention for all age groups.",
    icon: "Syringe",
    imageUrl:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80",
    articlesCount: 0,
    featured: false,
    status: "active",
    createdAt: "2024-05-01",
  },
];

export const CATEGORY_ICONS = [
  "Heart",
  "Brain",
  "Apple",
  "Baby",
  "Activity",
  "Lung",
  "Droplets",
  "Shield",
  "Eye",
  "Tooth",
  "Bone",
  "Stethoscope",
  "Pill",
  "Microscope",
  "HeartPulse",
  "Syringe",
  "Weight",
  "Bath",
  "Ear",
  "Fingerprint",
  "Venus",
  "Sparkles",
  "Sun",
  "Moon",
] as const;
