"use client";

import { staggerContainer, staggerItem } from "@/lib/animations/stagger";
import type { ArticleComment } from "@/lib/data/articles";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  MessageCircle,
  Reply,
  SortDesc,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CommentsProps {
  comments: ArticleComment[];
}

function CommentItem({
  comment,
  depth = 0,
}: {
  comment: ArticleComment;
  depth?: number;
}) {
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${depth > 0 ? "ml-10 border-l-2 border-border pl-4 md:ml-14" : ""}`}
    >
      <div className="flex gap-3 py-4">
        <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={comment.patientAvatar}
            alt={comment.patientName}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">
              {comment.patientName}
            </span>
            <span className="text-xs text-text-secondary">{comment.date}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            {comment.comment}
          </p>
          <div className="mt-2 flex items-center gap-4">
            <motion.button
              onClick={() => setLiked(!liked)}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center gap-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                liked
                  ? "text-red-500"
                  : "text-text-secondary hover:text-red-400"
              }`}
              aria-label={liked ? "Unlike comment" : "Like comment"}
            >
              <Heart
                className={`h-3.5 w-3.5 ${liked ? "fill-red-500" : ""}`}
                aria-hidden="true"
              />
              <span>{comment.likes + (liked ? 1 : 0)}</span>
            </motion.button>

            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 text-xs text-text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Reply to comment"
            >
              <Reply className="h-3.5 w-3.5" aria-hidden="true" />
              Reply
            </button>
          </div>

          {/* Reply form */}
          {showReply && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3"
            >
              <textarea
                placeholder="Write a reply..."
                rows={2}
                className="w-full resize-none rounded-xl border border-border bg-surface p-3 text-sm text-text-primary placeholder:text-text-secondary/60 transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                aria-label="Write a reply"
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={() => setShowReply(false)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Cancel
                </button>
                <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Post Reply
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </motion.div>
  );
}

export function Comments({ comments }: CommentsProps) {
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState(5);

  if (comments.length === 0) return null;

  const sorted = [...comments].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  const visible = sorted.slice(0, visibleCount);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="my-10"
      aria-labelledby="comments-heading"
    >
      <motion.div
        variants={staggerItem}
        className="mb-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
          <h3
            id="comments-heading"
            className="text-xl font-bold text-text-primary"
          >
            Comments ({comments.length})
          </h3>
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
            className="appearance-none rounded-xl border border-border bg-surface py-2 pl-3 pr-8 text-sm text-text-primary transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
            aria-label="Sort comments"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <SortDesc
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="divide-y divide-border rounded-2xl border border-border bg-surface"
      >
        {visible.length === 0 && (
          <p className="p-6 text-center text-sm text-text-secondary">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}

        {visible.map((comment) => (
          <div key={comment.id} className="px-5 last:rounded-b-2xl">
            <CommentItem comment={comment} />
          </div>
        ))}
      </motion.div>

      {/* Load more */}
      {visibleCount < comments.length && (
        <motion.div variants={staggerItem} className="mt-6 text-center">
          <button
            onClick={() => setVisibleCount(visibleCount + 5)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-all hover:border-primary/30 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Load More Comments
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </motion.section>
  );
}
