import { useMemo, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { exerciseGuidance, textureGuidance } from "@/data/content";
import { InputLabel, PageShell, SectionCard } from "@/components/ui";
import { useAppData, useSaveDailyLog } from "@/lib/appData";
import type { DailyLogInput, TextureLevel } from "@/lib/types";

const defaultLog: DailyLogInput = {
  hydrationMl: 1200,
  toleratedMeals: 2,
  coughEpisodes: 1,
  energyLevel: 5,
  notes: ""
};

type ExerciseFocus = keyof typeof exerciseGuidance;

export function ToolkitPage() {
  const [textureLevel, setTextureLevel] = useState<TextureLevel>("soft-bite-sized");
  const [exerciseFocus, setExerciseFocus] = useState<ExerciseFocus>("airwayProtection");
  const { data } = useAppData();
  const saveDailyLog = useSaveDailyLog();

  const selectedTexture = textureGuidance[textureLevel];
  const selectedExercise = exerciseGuidance[exerciseFocus];
  const latestLog = useMemo(() => data?.dailyLogs[data.dailyLogs.length - 1], [data]);

  const form = useForm({
    defaultValues: defaultLog,
    onSubmit: async ({ value }) => {
      await saveDailyLog.mutateAsync(value);
    }
  });

  return (
    <PageShell>
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Meal Texture Helper" subtitle="Select your safer texture range for Indian meal ideas.">
          <InputLabel>Texture level</InputLabel>
          <select
            value={textureLevel}
            onChange={(event) => setTextureLevel(event.target.value as TextureLevel)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
          >
            <option value="soft-bite-sized">Soft & Bite-Sized</option>
            <option value="minced-moist">Minced & Moist</option>
            <option value="pureed">Pureed</option>
            <option value="thickened-liquid">Thickened Liquid Support</option>
          </select>

          <h3 className="mt-4 text-lg font-bold text-slate-900">{selectedTexture.title}</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="font-semibold text-emerald-900">Try these</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-emerald-900">
                {selectedTexture.safeFoods.map((food) => (
                  <li key={food}>{food}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-rose-50 p-4">
              <p className="font-semibold text-rose-900">Avoid / limit</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-900">
                {selectedTexture.avoidFoods.map((food) => (
                  <li key={food}>{food}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-3 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">
            Hydration tip: {selectedTexture.hydrationTip}
          </p>
        </SectionCard>

        <SectionCard title="Exercise Guidance" subtitle="Educational guidance only — confirm with your SLP first.">
          <InputLabel>Exercise focus</InputLabel>
          <select
            value={exerciseFocus}
            onChange={(event) => setExerciseFocus(event.target.value as ExerciseFocus)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
          >
            <option value="airwayProtection">Airway protection</option>
            <option value="tongueBase">Tongue base strength</option>
            <option value="laryngealElevation">Laryngeal elevation</option>
          </select>
          <h3 className="mt-4 text-lg font-bold text-slate-900">{selectedExercise.title}</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
            {selectedExercise.drills.map((drill) => (
              <li key={drill}>{drill}</li>
            ))}
          </ul>
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            {selectedExercise.caution}
          </p>
        </SectionCard>
      </div>

      <section className="mt-6">
        <SectionCard
          title="Daily Log"
          subtitle="Track hydration, tolerated meals, and symptom events to monitor progress."
        >
          <form
            className="grid gap-4 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <form.Field name="hydrationMl">
              {(field) => (
                <div>
                  <InputLabel>Hydration (ml)</InputLabel>
                  <input
                    type="number"
                    min={0}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(Number(event.target.value))}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="toleratedMeals">
              {(field) => (
                <div>
                  <InputLabel>Tolerated meals today</InputLabel>
                  <input
                    type="number"
                    min={0}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(Number(event.target.value))}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="coughEpisodes">
              {(field) => (
                <div>
                  <InputLabel>Cough/choking episodes</InputLabel>
                  <input
                    type="number"
                    min={0}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(Number(event.target.value))}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="energyLevel">
              {(field) => (
                <div>
                  <InputLabel>Energy level (0-10)</InputLabel>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(Number(event.target.value))}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="notes">
              {(field) => (
                <div className="md:col-span-2">
                  <InputLabel>Notes (optional)</InputLabel>
                  <textarea
                    rows={3}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5"
                    placeholder="Example: coughed with tea; khichdi was easy."
                  />
                </div>
              )}
            </form.Field>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-teal-600 px-4 py-2.5 font-semibold text-white hover:bg-teal-700"
              >
                Save Daily Log
              </button>
            </div>
          </form>

          {latestLog ? (
            <p className="mt-4 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">
              Last saved log: {new Date(latestLog.createdAt).toLocaleString()} — hydration {latestLog.hydrationMl}
              ml, meals {latestLog.toleratedMeals}, cough episodes {latestLog.coughEpisodes}.
            </p>
          ) : (
            <p className="mt-4 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">
              No log saved yet. Add your first log to unlock dashboard trends.
            </p>
          )}
        </SectionCard>
      </section>
    </PageShell>
  );
}
