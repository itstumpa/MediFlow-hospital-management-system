"use client";

import { useParams } from "next/navigation";
import { ArticleForm } from "../../ArticleForm";

/** Mock edit data — in production this would be fetched from an API */
const mockEditArticle = {
  title: "Understanding Heart Disease: A Comprehensive Guide",
  slug: "understanding-heart-disease",
  excerpt:
    "Heart disease remains one of the leading causes of death worldwide. This comprehensive guide covers everything from risk factors to prevention strategies, helping you take control of your cardiovascular health.",
  featuredImage: "",
  coverBanner: "",
  content: [
    {
      id: "edit-block-1",
      type: "heading" as const,
      content: "What is Heart Disease?",
      level: 2,
    },
    {
      id: "edit-block-2",
      type: "paragraph" as const,
      content:
        "Heart disease refers to a range of conditions that affect your heart. Under the umbrella of cardiovascular disease, it includes blood vessel diseases, heart rhythm problems, and congenital heart defects. Understanding these conditions is the first step toward prevention and effective management.",
    },
    {
      id: "edit-block-3",
      type: "callout" as const,
      content:
        "According to the World Health Organization, cardiovascular diseases are the number one cause of death globally, taking an estimated 17.9 million lives each year.",
      variant: "info" as const,
    },
    {
      id: "edit-block-4",
      type: "heading" as const,
      content: "Common Types of Heart Disease",
      level: 2,
    },
    {
      id: "edit-block-5",
      type: "list" as const,
      items: [
        "Coronary artery disease (most common)",
        "Heart arrhythmias (irregular heartbeat)",
        "Heart valve disease",
        "Cardiomyopathy (heart muscle disease)",
        "Congenital heart defects",
      ],
      listType: "unordered" as const,
    },
    {
      id: "edit-block-6",
      type: "quote" as const,
      content:
        "The secret of good health is for the body to become a temple for the mind, and for the mind to become a temple for the soul.",
      caption: "— Preventive Cardiology Principle",
    },
    {
      id: "edit-block-7",
      type: "table" as const,
      caption: "Key risk factors for heart disease",
      rows: [
        { label: "High Blood Pressure", value: "Major risk factor" },
        { label: "High Cholesterol", value: "Significant contributor" },
        { label: "Smoking", value: "Doubles risk" },
        { label: "Diabetes", value: "2-4x increased risk" },
        { label: "Obesity", value: "Moderate risk factor" },
      ],
    },
    {
      id: "edit-block-8",
      type: "medical-warning" as const,
      content:
        "If you experience chest pain, shortness of breath, or any signs of a heart attack, call emergency services immediately. Do not wait.",
      severity: "critical" as const,
    },
  ],
  metaTitle: "Understanding Heart Disease: A Comprehensive Guide | MediFlow",
  metaDescription:
    "Explore our comprehensive guide to heart disease, including types, risk factors, prevention strategies, and when to seek medical help.",
  keywords: [
    "heart disease",
    "cardiovascular health",
    "heart attack prevention",
    "cardiac care",
  ],
  canonicalUrl: "https://mediflow.com/articles/understanding-heart-disease",
  ogImage: "",
  status: "published" as const,
  author: "auth-1",
  category: "cat-1",
  tags: ["tag-1", "tag-2", "tag-13", "tag-14"],
  readingTime: "8 min read",
  featured: true,
  allowComments: true,
  publishDate: "2026-06-15T10:00",
  scheduleDate: "",
  relatedArticles: ["art-2", "art-3"],
  relatedDepartments: ["dept-1"],
  relatedDoctors: ["doc-1"],
};

export default function EditArticlePage() {
  const params = useParams();
  const articleId = params.id as string;

  // In production, you'd fetch the article by ID from your API
  return <ArticleForm mode="edit" defaultValues={mockEditArticle} />;
}
