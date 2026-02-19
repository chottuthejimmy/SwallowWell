import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell, SectionCard } from "@/components/ui";

const highlights = [
  {
    title: "Quick Risk Check",
    text: "Answer guided symptom questions and get immediate next-step recommendations."
  },
  {
    title: "Indian Meal Toolkit",
    text: "Pick texture level and get familiar, safer Indian meal examples and avoid lists."
  },
  {
    title: "Daily Tracking",
    text: "Log hydration, cough episodes, and tolerated meals to monitor your trend."
  },
  {
    title: "Counselor Escalation",
    text: "If your risk is high or trend worsens, get a prefilled summary for faster help."
  }
];

export function HomePage() {
  return (
    <PageShell>
      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 p-8 text-white shadow-lg"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-100">
            भारत के परिवारों के लिए | Self-help first, counselor when needed
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            Get practical dysphagia help directly on the website
          </h1>
          <p className="mt-5 max-w-xl text-cyan-50">
            SwallowWell helps you assess risk, improve meal safety, build daily consistency, and know exactly
            when to escalate to a counselor.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/risk-check"
              className="rounded-xl bg-white px-4 py-2.5 font-semibold text-teal-700 transition hover:bg-cyan-50"
            >
              Start Quick Risk Check
            </Link>
            <Link
              to="/toolkit"
              className="rounded-xl border border-cyan-100 px-4 py-2.5 font-semibold text-white transition hover:bg-white/10"
            >
              Open Daily Toolkit
            </Link>
          </div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80"
            alt="Indian family preparing a healthy meal together in a kitchen"
            className="h-80 w-full object-cover"
          />
          <figcaption className="p-4 text-sm text-slate-600">
            Familiar food, safer textures, and structured guidance for everyday confidence.
          </figcaption>
        </motion.figure>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {highlights.map((item) => (
          <SectionCard key={item.title} title={item.title}>
            <p className="text-slate-600">{item.text}</p>
          </SectionCard>
        ))}
      </section>
    </PageShell>
  );
}
