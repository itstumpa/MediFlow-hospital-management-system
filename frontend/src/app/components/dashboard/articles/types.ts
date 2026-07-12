export type ArticleStatus = "Published" | "Draft" | "Scheduled" | "Archived" | "Private";
export type ViewMode = "table" | "grid";
export type SortField =
  | "title"
  | "category"
  | "author"
  | "status"
  | "views"
  | "readingTime"
  | "publishedAt"
  | "updatedAt";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  author: string;
  authorAvatar: string;
  status: ArticleStatus;
  views: number;
  comments: number;
  readingTime: string;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
}

export interface ArticleFilters {
  search: string;
  status: ArticleStatus[];
  category: string[];
  author: string[];
  featured: "all" | "featured" | "standard";
  sortBy: SortField;
  sortAsc: boolean;
  dateFrom: string;
  dateTo: string;
}

export const DEFAULT_FILTERS: ArticleFilters = {
  search: "",
  status: [],
  category: [],
  author: [],
  featured: "all",
  sortBy: "publishedAt",
  sortAsc: false,
  dateFrom: "",
  dateTo: "",
};

export const STATUS_OPTIONS: readonly ArticleStatus[] = [
  "Published",
  "Draft",
  "Scheduled",
  "Archived",
  "Private",
] as const;

export const CATEGORY_OPTIONS: readonly string[] = [
  "Heart Health",
  "Mental Health",
  "Nutrition",
  "Women's Health",
  "Children",
  "Diabetes",
  "Skin Care",
  "Emergency",
  "Fitness",
  "Pregnancy",
  "Vaccination",
  "Senior Care",
] as const;
