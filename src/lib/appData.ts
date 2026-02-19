import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { readAppData, writeAppData } from "@/lib/storage";
import type {
  AppData,
  DailyLogEntry,
  DailyLogInput,
  RiskAssessmentRecord,
  RiskAssessmentResult
} from "@/lib/types";

export const appDataQueryKey = ["swallowwell-app-data"];

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function updateAndPersist(transform: (previous: AppData) => AppData) {
  const current = readAppData();
  const next = transform(current);
  writeAppData(next);
  return next;
}

export function useAppData() {
  return useQuery({
    queryKey: appDataQueryKey,
    queryFn: async () => readAppData(),
    staleTime: Infinity
  });
}

export function useSaveRiskAssessment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      answers,
      result
    }: {
      answers: RiskAssessmentRecord["answers"];
      result: RiskAssessmentResult;
    }) => {
      const record: RiskAssessmentRecord = {
        id: makeId(),
        createdAt: new Date().toISOString(),
        answers,
        ...result
      };

      updateAndPersist((previous) => ({
        ...previous,
        riskAssessments: [...previous.riskAssessments, record]
      }));

      return record;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: appDataQueryKey })
  });
}

export function useSaveDailyLog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: DailyLogInput) => {
      const entry: DailyLogEntry = {
        id: makeId(),
        createdAt: new Date().toISOString(),
        ...input
      };

      updateAndPersist((previous) => ({
        ...previous,
        dailyLogs: [...previous.dailyLogs, entry]
      }));

      return entry;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: appDataQueryKey })
  });
}

export function buildCounselorSummary(data: AppData) {
  const latestRisk = data.riskAssessments[data.riskAssessments.length - 1];
  const recentLogs = data.dailyLogs.slice(-3);

  const logSummary = recentLogs.length
    ? recentLogs
        .map(
          (log) =>
            `${new Date(log.createdAt).toLocaleDateString()}: water ${log.hydrationMl}ml, meals ${log.toleratedMeals}, cough episodes ${log.coughEpisodes}, energy ${log.energyLevel}/10`
        )
        .join(" | ")
    : "No daily logs yet.";

  if (!latestRisk) {
    return `Hello counselor, I need guidance for swallowing difficulty. Recent tracker summary: ${logSummary}`;
  }

  return `Hello counselor, my latest self-check shows ${latestRisk.band.toUpperCase()} risk (score: ${latestRisk.score}, red flag: ${latestRisk.hasRedFlag ? "yes" : "no"}). Next step suggested: ${latestRisk.nextStep}. Recent daily tracker: ${logSummary}. Please guide next actions.`;
}
