import { useEffect, useMemo, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { InputLabel, PageShell, SectionCard, SeverityBadge } from "@/components/ui";
import { buildCounselorSummary, useAppData } from "@/lib/appData";

export function CounselorPage() {
  const { data } = useAppData();
  const latestRisk = data?.riskAssessments[data.riskAssessments.length - 1];
  const [submitted, setSubmitted] = useState(false);

  const summary = useMemo(() => buildCounselorSummary(data ?? { riskAssessments: [], dailyLogs: [] }), [data]);

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: summary
    },
    onSubmit: async () => {
      setSubmitted(true);
    }
  });

  useEffect(() => {
    form.setFieldValue("message", summary);
  }, [form, summary]);

  const recentLogs = data?.dailyLogs.slice(-3) ?? [];
  const worseningTrend =
    recentLogs.length >= 3 && recentLogs[recentLogs.length - 1].coughEpisodes > recentLogs[0].coughEpisodes;
  const needsEscalation =
    latestRisk?.band === "high" || (latestRisk?.band ?? "low") === "moderate" || worseningTrend;

  return (
    <PageShell>
      <SectionCard
        title="Counselor Escalation"
        subtitle="Use this only when self-help is insufficient, symptoms worsen, or your risk check indicates escalation."
        rightSlot={latestRisk ? <SeverityBadge band={latestRisk.band} /> : undefined}
      >
        <div
          className={`rounded-2xl border p-4 ${
            needsEscalation ? "border-rose-200 bg-rose-50" : "border-emerald-200 bg-emerald-50"
          }`}
        >
          <p className={needsEscalation ? "text-rose-900" : "text-emerald-900"}>
            {needsEscalation
              ? "Your recent data suggests you should consult a counselor soon. Use the prefilled message below."
              : "Current data does not indicate urgent escalation. Continue toolkit use and monitoring unless symptoms worsen."}
          </p>
          {worseningTrend ? (
            <p className="mt-2 text-sm font-medium text-rose-800">
              Trend alert: your recent cough/choking episodes are increasing.
            </p>
          ) : null}
        </div>

        <form
          className="mt-5 grid gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field name="name">
            {(field) => (
              <div>
                <InputLabel>Name</InputLabel>
                <input
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
                  placeholder="Your name"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="phone">
            {(field) => (
              <div>
                <InputLabel>Phone</InputLabel>
                <input
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
                  placeholder="+91..."
                />
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div className="md:col-span-2">
                <InputLabel>Email</InputLabel>
                <input
                  type="email"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
                  placeholder="you@example.com"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="message">
            {(field) => (
              <div className="md:col-span-2">
                <InputLabel>Prefilled summary</InputLabel>
                <textarea
                  rows={6}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
                />
              </div>
            )}
          </form.Field>

          <div className="md:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-xl bg-teal-600 px-4 py-2.5 font-semibold text-white hover:bg-teal-700"
            >
              Save as ready-to-send message
            </button>
            <a
              className="rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-100"
              href={`mailto:counselor@example.com?subject=SwallowWell%20Support%20Request&body=${encodeURIComponent(summary)}`}
            >
              Open in Email App
            </a>
            <Link
              to="/toolkit"
              className="rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Back to Toolkit
            </Link>
          </div>
        </form>

        {submitted ? (
          <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-emerald-900" aria-live="polite">
            Message prepared successfully. You can now copy it into WhatsApp/email for your counselor.
          </p>
        ) : null}
      </SectionCard>
    </PageShell>
  );
}
