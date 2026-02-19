import type { RiskAssessmentResult } from "@/lib/types";

export function getRiskAnnouncement(result: RiskAssessmentResult) {
  const flagText = result.hasRedFlag ? "Red-flag symptom detected." : "No red-flag symptom detected.";
  return `Risk evaluation complete. ${result.band} risk, score ${result.score}. ${flagText} Recommended next step: ${result.nextStep}`;
}
