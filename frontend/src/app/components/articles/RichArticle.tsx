"use client";

import { fadeUp } from "@/lib/animations/fade";
import type { ArticleContentSection } from "@/lib/data/articles";
import { motion } from "framer-motion";
import { AlertTriangle, BookOpen, Lightbulb } from "lucide-react";
import Image from "next/image";

interface RichArticleProps {
  content: ArticleContentSection[];
  onHeadingFound?: (id: string) => void;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function RichArticle({ content }: RichArticleProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="prose-custom"
    >
      <div className="space-y-6">
        {content.map((section, idx) => {
          switch (section.type) {
            case "heading":
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <h2
                    id={slugify(section.content || "")}
                    className="mb-4 mt-10 text-2xl font-bold tracking-tight text-text-primary md:text-3xl"
                  >
                    {section.content}
                  </h2>
                </motion.div>
              );

            case "subheading":
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <h3
                    id={slugify(section.content || "")}
                    className="mb-3 mt-8 text-xl font-semibold tracking-tight text-text-primary md:text-2xl"
                  >
                    {section.content}
                  </h3>
                </motion.div>
              );

            case "paragraph":
              return (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.03 * idx }}
                  className="text-base leading-relaxed text-text-secondary md:text-lg"
                >
                  {section.content}
                </motion.p>
              );

            case "list":
              return (
                <motion.ul
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.03 * idx }}
                  className="space-y-3 pl-6"
                >
                  {section.items?.map((item, i) => (
                    <li
                      key={i}
                      className="list-disc text-base leading-relaxed text-text-secondary marker:text-primary md:text-lg"
                    >
                      {item}
                    </li>
                  ))}
                </motion.ul>
              );

            case "quote":
              return (
                <motion.blockquote
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative my-8 border-l-4 border-primary bg-primary/5 py-4 pl-6 pr-4 italic text-text-secondary"
                >
                  <p className="text-lg leading-relaxed md:text-xl">
                    {section.content}
                  </p>
                  {section.caption && (
                    <footer className="mt-3 text-sm font-medium not-italic text-text-secondary">
                      — {section.caption}
                    </footer>
                  )}
                </motion.blockquote>
              );

            case "callout":
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="my-8 flex gap-4 rounded-2xl border border-accent/20 bg-accent/5 p-5 md:p-6"
                >
                  <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <BookOpen
                      className="h-5 w-5 text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      Did You Know?
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              );

            case "warning":
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="my-8 flex gap-4 rounded-2xl border border-danger/20 bg-danger/5 p-5 md:p-6"
                >
                  <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-danger/10">
                    <AlertTriangle
                      className="h-5 w-5 text-danger"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      Important
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              );

            case "tip":
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="my-8 flex gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6"
                >
                  <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Lightbulb
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      Pro Tip
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              );

            case "image":
              return (
                <motion.figure
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="my-8"
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl">
                    <Image
                      src={section.src || ""}
                      alt={section.alt || "Article illustration"}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover"
                    />
                  </div>
                  {section.caption && (
                    <figcaption className="mt-3 text-center text-sm text-text-secondary">
                      {section.caption}
                    </figcaption>
                  )}
                </motion.figure>
              );

            case "table":
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="my-8 overflow-hidden rounded-2xl border border-border"
                >
                  {section.caption && (
                    <div className="bg-primary/5 px-5 py-3 text-sm font-semibold text-text-primary">
                      {section.caption}
                    </div>
                  )}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <tbody>
                        {section.rows?.map((row, i) => (
                          <tr
                            key={i}
                            className={`border-t border-border transition-colors hover:bg-primary/5 ${
                              i % 2 === 0 ? "bg-surface" : "bg-background"
                            }`}
                          >
                            <td className="px-5 py-3.5 font-medium text-text-primary">
                              {row.label}
                            </td>
                            <td className="px-5 py-3.5 text-text-secondary">
                              {row.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              );

            case "statistics":
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3"
                >
                  {section.stats?.map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-5 text-center"
                    >
                      <p className="text-2xl font-bold text-primary md:text-3xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* Custom prose styles */}
      <style jsx>{`
        .prose-custom :global(h2),
        .prose-custom :global(h3) {
          scroll-margin-top: 100px;
        }
        .prose-custom :global(a) {
          color: var(--color-primary);
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }
        .prose-custom :global(a:hover) {
          color: var(--color-primary-dark);
        }
      `}</style>
    </motion.div>
  );
}
