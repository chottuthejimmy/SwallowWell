import type { AppData } from "@/lib/types";

const STORAGE_KEY = "swallowwell_app_data_v1";

const EMPTY_DATA: AppData = {
  riskAssessments: [],
  dailyLogs: []
};

function canUseStorage() {
  try {
    const testKey = "__swallowwell_storage_check";
    window.localStorage.setItem(testKey, "ok");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function readAppData(): AppData {
  if (typeof window === "undefined" || !canUseStorage()) return EMPTY_DATA;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return EMPTY_DATA;

  try {
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return {
      riskAssessments: Array.isArray(parsed.riskAssessments) ? parsed.riskAssessments : [],
      dailyLogs: Array.isArray(parsed.dailyLogs) ? parsed.dailyLogs : []
    };
  } catch {
    return EMPTY_DATA;
  }
}

export function writeAppData(data: AppData) {
  if (typeof window === "undefined" || !canUseStorage()) return false;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearAppData() {
  if (typeof window === "undefined" || !canUseStorage()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}
