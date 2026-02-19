export type RiskBand = "low" | "moderate" | "high";

export interface RiskAssessmentInput {
  coughingWhileEating: boolean;
  foodStuckFeeling: boolean;
  painWhileSwallowing: boolean;
  wetVoiceAfterMeals: boolean;
  unplannedWeightLoss: boolean;
  dehydrationSigns: boolean;
  recurrentChestInfection: boolean;
  frequentChoking: boolean;
}

export interface RiskAssessmentResult {
  score: number;
  band: RiskBand;
  hasRedFlag: boolean;
  recommendations: string[];
  nextStep: string;
}

export interface RiskAssessmentRecord extends RiskAssessmentResult {
  id: string;
  createdAt: string;
  answers: RiskAssessmentInput;
}

export type TextureLevel = "soft-bite-sized" | "minced-moist" | "pureed" | "thickened-liquid";

export interface DailyLogInput {
  hydrationMl: number;
  toleratedMeals: number;
  coughEpisodes: number;
  energyLevel: number;
  notes: string;
}

export interface DailyLogEntry extends DailyLogInput {
  id: string;
  createdAt: string;
}

export interface AppData {
  riskAssessments: RiskAssessmentRecord[];
  dailyLogs: DailyLogEntry[];
}
