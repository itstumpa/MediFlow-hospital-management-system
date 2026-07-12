export type CategoryStatus = "active" | "inactive";

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  imageUrl: string;
  articlesCount: number;
  featured: boolean;
  status: CategoryStatus;
  createdAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CategoryFilters {
  search: string;
  status: CategoryStatus | "all";
  featured: "all" | "featured" | "not-featured";
  sortBy: "name" | "articlesCount" | "createdAt";
  sortOrder: "asc" | "desc";
}

export const DEFAULT_FILTERS: CategoryFilters = {
  search: "",
  status: "all",
  featured: "all",
  sortBy: "name",
  sortOrder: "asc",
};

export type ViewMode = "table" | "grid";
