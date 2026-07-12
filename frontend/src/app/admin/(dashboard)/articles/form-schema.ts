import { z } from "zod";

export const contentBlockSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    type: z.literal("heading"),
    content: z.string().min(1, "Heading content is required"),
    level: z.number().min(1).max(6).default(2),
  }),
  z.object({
    id: z.string(),
    type: z.literal("paragraph"),
    content: z.string().min(1, "Paragraph content is required"),
  }),
  z.object({
    id: z.string(),
    type: z.literal("list"),
    content: z.string().optional(),
    items: z.array(z.string()).min(1, "At least one list item is required"),
    listType: z.enum(["ordered", "unordered"]).default("unordered"),
  }),
  z.object({
    id: z.string(),
    type: z.literal("quote"),
    content: z.string().min(1, "Quote content is required"),
    caption: z.string().optional(),
  }),
  z.object({
    id: z.string(),
    type: z.literal("callout"),
    content: z.string().min(1, "Callout content is required"),
    variant: z.enum(["info", "success", "warning", "danger"]).default("info"),
  }),
  z.object({
    id: z.string(),
    type: z.literal("code"),
    content: z.string().min(1, "Code content is required"),
    language: z.string().default("javascript"),
  }),
  z.object({
    id: z.string(),
    type: z.literal("image"),
    src: z.string().min(1, "Image source URL is required"),
    alt: z.string().default(""),
    caption: z.string().optional(),
  }),
  z.object({
    id: z.string(),
    type: z.literal("video"),
    src: z.string().min(1, "Video URL is required"),
    caption: z.string().optional(),
  }),
  z.object({
    id: z.string(),
    type: z.literal("table"),
    caption: z.string().optional(),
    rows: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .min(1, "At least one table row is required"),
  }),
  z.object({
    id: z.string(),
    type: z.literal("medical-warning"),
    content: z.string().min(1, "Warning content is required"),
    severity: z.enum(["info", "warning", "critical"]).default("warning"),
  }),
  z.object({
    id: z.string(),
    type: z.literal("faq"),
    title: z.string().optional(),
    items: z
      .array(
        z.object({
          question: z.string().min(1, "Question is required"),
          answer: z.string().min(1, "Answer is required"),
        }),
      )
      .min(1, "At least one FAQ item is required"),
  }),
]);

export type ContentBlock = z.infer<typeof contentBlockSchema>;

export const articleFormSchema = z.object({
  // Basic Information
  title: z.string().min(2, "Title must be at least 2 characters").max(200),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase alphanumeric with hyphens",
    ),
  excerpt: z
    .string()
    .min(10, "Excerpt must be at least 10 characters")
    .max(500, "Excerpt must not exceed 500 characters"),
  featuredImage: z.string().optional(),
  coverBanner: z.string().optional(),

  // Content
  content: z.array(contentBlockSchema).default([]),

  // SEO
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
  keywords: z.array(z.string()).default([]),
  canonicalUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  ogImage: z.string().optional(),

  // Publishing
  status: z.enum(["draft", "published", "scheduled"]).default("draft"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  readingTime: z.string().default("5 min read"),
  featured: z.boolean().default(false),
  allowComments: z.boolean().default(true),
  publishDate: z.string().optional(),
  scheduleDate: z.string().optional(),

  // Related Content
  relatedArticles: z.array(z.string()).default([]),
  relatedDepartments: z.array(z.string()).default([]),
  relatedDoctors: z.array(z.string()).default([]),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;

export const defaultFormValues: ArticleFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  featuredImage: "",
  coverBanner: "",
  content: [],
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  canonicalUrl: "",
  ogImage: "",
  status: "draft",
  author: "",
  category: "",
  tags: [],
  readingTime: "5 min read",
  featured: false,
  allowComments: true,
  publishDate: "",
  scheduleDate: "",
  relatedArticles: [],
  relatedDepartments: [],
  relatedDoctors: [],
};
