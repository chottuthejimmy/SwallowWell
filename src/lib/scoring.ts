import type { RiskAssessmentInput, RiskAssessmentResult } from "@/lib/types";

const WEIGHTS: Record<keyof RiskAssessmentInput, number> = {
  coughingWhileEating: 1,
  foodStuckFeeling: 1,
  painWhileSwallowing: 2,
  wetVoiceAfterMeals: 2,
  unplannedWeightLoss: 2,
  dehydrationSigns: 2,
  recurrentChestInfection: 3,
  frequentChoking: 3
};

const RED_FLAGS: Array<keyof RiskAssessmentInput> = [
  "recurrentChestInfection",
  "frequentChoking"
];

function buildRecommendations(band: RiskAssessmentResult["band"]): string[] {
  if (band === "low") {
    return [
      "Use slow, upright meals with small spoon sizes and frequent pauses.",
      "Prefer soft and moist foods until your swallowing confidence improves.",
      "Track symptoms daily for at least one week and reassess if they increase."
    ];
  }

  if (band === "moderate") {
    return [
      "Book a speech-language pathologist assessment within the next few days.",
      "Switch to texture-modified meals and avoid dry mixed-texture foods.",
      "Log coughing/choking episodes and bring your log to the consultation."
    ];
  }

  return [
    "Seek urgent professional assessment to reduce aspiration risk.",
    "Avoid self-starting advanced exercises until assessed by an SLP.",
    "Use counselor handoff summary to communicate symptoms quickly."
  ];
}

export function scoreRiskCheck(answers: RiskAssessmentInput): RiskAssessmentResult {
  const score = (Object.keys(answers) as Array<keyof RiskAssessmentInput>).reduce((acc, key) => {
    return answers[key] ? acc + WEIGHTS[key] : acc;
  }, 0);

  const hasRedFlag = RED_FLAGS.some((key) => answers[key]);

  let band: RiskAssessmentResult["band"] = "low";
  if (hasRedFlag || score >= 8) {
    band = "high";
  } else if (score >= 4) {
    band = "moderate";
  }

  const nextStep =
    band === "low"
      ? "Continue self-help toolkit and monitor daily."
      : band === "moderate"
        ? "Plan counselor consultation soon (within 3-7 days)."
        : "Escalate to counselor/medical team as soon as possible.";

  return {
    score,
    band,
    hasRedFlag,
    recommendations: buildRecommendations(band),
    nextStep
  };
}

