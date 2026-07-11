"use client";

import { slideLeft } from "@/lib/animations/slide";
import type { ArticleContentSection } from "@/lib/data/articles";
import { motion } from "framer-motion";
import { List } from "lucide-react";
import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  sections: ArticleContentSection[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    const tocItems: TOCItem[] = [];
    sections.forEach((section) => {
      if (section.type === "heading" || section.type === "subheading") {
        const id = slugify(section.content || "");
        const el = document.getElementById(id);
        if (el) {
          tocItems.push({
            id,
            text: el.textContent || section.content || "",
            level: section.type === "heading" ? 2 : 3,
          });
        }
      }
    });
    setItems(tocItems);
  }, [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0.1 },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  if (items.length === 0) return null;

  return (
    <motion.nav
      variants={slideLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label="Table of contents"
      className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-primary">
        <List className="h-4 w-4 text-primary" aria-hidden="true" />
        Table of Contents
      </div>

      <ul className="space-y-2" role="list">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollTo(item.id)}
              className={`w-full text-left text-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                item.level === 3 ? "pl-4" : ""
              } ${
                activeId === item.id
                  ? "font-medium text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
              aria-current={activeId === item.id ? "true" : undefined}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
