import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
import { riskQuestions } from "@/data/content";
import { SectionCard, PageShell, SeverityBadge } from "@/components/ui";
import { getRiskAnnouncement } from "@/lib/accessibility";
import type { RiskAssessmentInput, RiskAssessmentResult } from "@/lib/types";
import { scoreRiskCheck } from "@/lib/scoring";
import { useSaveRiskAssessment } from "@/lib/appData";

const defaultAnswers: RiskAssessmentInput = {
  coughingWhileEating: false,
  foodStuckFeeling: false,
  painWhileSwallowing: false,
  wetVoiceAfterMeals: false,
  unplannedWeightLoss: false,
  dehydrationSigns: false,
  recurrentChestInfection: false,
  frequentChoking: false
};

export function RiskCheckPage() {
  const [result, setResult] = useState<RiskAssessmentResult | null>(null);
  const saveRisk = useSaveRiskAssessment();

  const form = useForm({
    defaultValues: defaultAnswers,
    onSubmit: async ({ value }) => {
      const scored = scoreRiskCheck(value);
      setResult(scored);
      await saveRisk.mutateAsync({ answers: value, result: scored });
    }
  });

  return (
    <PageShell>
      <SectionCard
        title="Quick Risk Check"
        subtitle="Answer these questions for educational triage. This is not a medical diagnosis."
      >
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          {riskQuestions.map((question) => (
            <form.Field key={question.key} name={question.key as keyof RiskAssessmentInput}>
              {(field) => (
                <fieldset className="rounded-2xl border border-slate-200 p-4">
                  <legend className="px-1 text-base font-semibold text-slate-900">{question.label}</legend>
                  <p className="mt-1 text-sm text-slate-600">{question.hint}</p>
                  <div className="mt-3 flex gap-3">
                    <button
                      type="button"
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        field.state.value
                          ? "bg-teal-600 text-white"
                          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                      onClick={() => field.handleChange(true)}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        !field.state.value
                          ? "bg-slate-700 text-white"
                          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                      onClick={() => field.handleChange(false)}
                    >
                      No
                    </button>
                  </div>
                </fieldset>
              )}
            </form.Field>
          ))}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-xl bg-teal-600 px-4 py-2.5 font-semibold text-white transition hover:bg-teal-700"
            >
              Evaluate Risk
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100"
              onClick={() => {
                form.reset();
                setResult(null);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </SectionCard>

      <section aria-live="polite" className="mt-6">
        {result ? <p className="sr-only">{getRiskAnnouncement(result)}</p> : null}
        {result ? (
          <SectionCard
            title="Your Risk Output"
            rightSlot={<SeverityBadge band={result.band} />}
            subtitle={`Score: ${result.score} | Red flag detected: ${result.hasRedFlag ? "Yes" : "No"}`}
          >
            <ul className="list-disc space-y-2 pl-6 text-slate-700">
              {result.recommendations.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-slate-100 p-3 font-medium text-slate-800">
              Recommended next step: {result.nextStep}
            </p>

            {result.band !== "low" ? (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-amber-900">
                  Your current result suggests professional review. Use the counselor page with an auto-generated
                  handoff summary.
                </p>
                <Link
                  to="/counselor"
                  className="mt-3 inline-flex rounded-lg bg-amber-600 px-3 py-2 font-semibold text-white hover:bg-amber-700"
                >
                  Go to Counselor Support
                </Link>
              </div>
            ) : null}
          </SectionCard>
        ) : null}
      </section>
    </PageShell>
  );
}
