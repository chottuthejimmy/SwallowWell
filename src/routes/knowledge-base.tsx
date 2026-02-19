import { useMemo, useState } from "react";
import { faqEntries } from "@/data/content";
import { PageShell, SectionCard } from "@/components/ui";

const categories = ["all", "diet", "safety", "exercise", "hydration", "family"] as const;
type FaqCategory = (typeof categories)[number];

export function KnowledgeBasePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory>("all");

  const filteredFaq = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return faqEntries.filter((item) => {
      const categoryMatch = category === "all" || item.category === category;
      const textMatch =
        !normalized ||
        item.question.toLowerCase().includes(normalized) ||
        item.answer.toLowerCase().includes(normalized);
      return categoryMatch && textMatch;
    });
  }, [category, query]);

  return (
    <PageShell>
      <SectionCard
        title="Knowledge Base"
        subtitle="Search practical answers so users can solve common issues without waiting for a consultation."
      >
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search e.g. choking, chapati, hydration..."
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
            aria-label="Search FAQs"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as FaqCategory)}
            className="rounded-xl border border-slate-300 px-3 py-2.5"
            aria-label="Filter FAQ category"
          >
            {categories.map((entry) => (
              <option key={entry} value={entry}>
                {entry === "all" ? "All categories" : entry}
              </option>
            ))}
          </select>
        </div>
      </SectionCard>

      <section className="mt-6 space-y-4">
        {filteredFaq.length ? (
          filteredFaq.map((item) => (
            <SectionCard key={item.id} title={item.question} rightSlot={<span className="text-xs uppercase">{item.category}</span>}>
              <p className="text-slate-700">{item.answer}</p>
            </SectionCard>
          ))
        ) : (
          <SectionCard title="No matching results">
            <p className="text-slate-700">Try a different keyword or switch to all categories.</p>
          </SectionCard>
        )}
      </section>
    </PageShell>
  );
}
