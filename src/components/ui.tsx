import { motion } from "framer-motion";
import type { PropsWithChildren, ReactNode } from "react";
import type { RiskBand } from "@/lib/types";

export function PageShell({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">{children}</div>;
}

export function SectionCard({
  title,
  subtitle,
  children,
  rightSlot
}: PropsWithChildren<{ title: string; subtitle?: string; rightSlot?: ReactNode }>) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur"
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-3xl text-slate-600">{subtitle}</p> : null}
        </div>
        {rightSlot}
      </div>
      {children}
    </motion.section>
  );
}

export function SeverityBadge({ band }: { band: RiskBand }) {
  const config = {
    low: "bg-emerald-100 text-emerald-800 border-emerald-200",
    moderate: "bg-amber-100 text-amber-800 border-amber-200",
    high: "bg-rose-100 text-rose-800 border-rose-200"
  } as const;

  return (
    <span className={`rounded-full border px-3 py-1 text-sm font-semibold capitalize ${config[band]}`}>
      {band} risk
    </span>
  );
}

export function InputLabel({ children }: PropsWithChildren) {
  return <label className="mb-2 block text-sm font-semibold text-slate-800">{children}</label>;
}
