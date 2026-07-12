"use client";

import { Plus, X } from "lucide-react";
import {
  mockRelatedArticles,
  mockDepartments,
  mockDoctors,
} from "../../../admin/(dashboard)/articles/mock";

interface RelatedContentProps {
  relatedArticles: string[];
  relatedDepartments: string[];
  relatedDoctors: string[];
  onChange: (field: string, value: string[]) => void;
}

export function RelatedContent({
  relatedArticles,
  relatedDepartments,
  relatedDoctors,
  onChange,
}: RelatedContentProps) {
  return (
    <div className="space-y-6">
      {/* Related Articles */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Related Articles
        </label>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Link to other articles on similar topics
        </p>
        <MultiSelect
          items={mockRelatedArticles}
          selectedIds={relatedArticles}
          onToggle={(id) => {
            const next = relatedArticles.includes(id)
              ? relatedArticles.filter((r) => r !== id)
              : [...relatedArticles, id];
            onChange("relatedArticles", next);
          }}
          getLabel={(a) => a.title}
          getId={(a) => a.id}
        />
      </div>

      {/* Related Departments */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Related Departments
        </label>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Link to relevant hospital departments
        </p>
        <MultiSelect
          items={mockDepartments}
          selectedIds={relatedDepartments}
          onToggle={(id) => {
            const next = relatedDepartments.includes(id)
              ? relatedDepartments.filter((d) => d !== id)
              : [...relatedDepartments, id];
            onChange("relatedDepartments", next);
          }}
          getLabel={(d) => d.name}
          getId={(d) => d.id}
        />
      </div>

      {/* Related Doctors */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Related Doctors
        </label>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Link to doctors specializing in this topic
        </p>
        <MultiSelect
          items={mockDoctors}
          selectedIds={relatedDoctors}
          onToggle={(id) => {
            const next = relatedDoctors.includes(id)
              ? relatedDoctors.filter((d) => d !== id)
              : [...relatedDoctors, id];
            onChange("relatedDoctors", next);
          }}
          getLabel={(d) => `${d.name} — ${d.department}`}
          getId={(d) => d.id}
        />
      </div>
    </div>
  );
}

function MultiSelect<T extends { id: string }>({
  items,
  selectedIds,
  onToggle,
  getLabel,
  getId,
}: {
  items: T[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  getLabel: (item: T) => string;
  getId: (item: T) => string;
}) {
  const available = items.filter((item) => !selectedIds.includes(getId(item)));

  return (
    <div className="space-y-2">
      {/* Selected */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedIds.map((id) => {
            const item = items.find((i) => getId(i) === id);
            if (!item) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
              >
                {getLabel(item)}
                <button
                  type="button"
                  onClick={() => onToggle(id)}
                  className="text-indigo-400 hover:text-indigo-700 dark:text-indigo-500 dark:hover:text-indigo-300"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Available */}
      <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto">
        {available.map((item) => (
          <button
            key={getId(item)}
            type="button"
            onClick={() => onToggle(getId(item))}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-0.5 text-xs text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <Plus className="h-3 w-3" />
            {getLabel(item)}
          </button>
        ))}
        {available.length === 0 && (
          <p className="text-xs text-slate-400 dark:text-slate-500">
            All items selected
          </p>
        )}
      </div>
    </div>
  );
}
