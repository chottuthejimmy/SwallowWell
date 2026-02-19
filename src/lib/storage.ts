import type { AppData } from "@/lib/types";

const STORAGE_KEY = "swallowwell_app_data_v1";

const EMPTY_DATA: AppData = {
  riskAssessments: [],
  dailyLogs: []
};

let storageSupportCache: boolean | undefined;

export function isStorageAvailable() {
  if (storageSupportCache !== undefined) return storageSupportCache;
  if (typeof window === "undefined") return false;

  try {
    const testKey = "__swallowwell_storage_check";
    window.localStorage.setItem(testKey, "ok");
    window.localStorage.removeItem(testKey);
    storageSupportCache = true;
    return storageSupportCache;
  } catch {
    storageSupportCache = false;
    return storageSupportCache;
  }
}

export function readAppData(): AppData {
  if (!isStorageAvailable()) return EMPTY_DATA;

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
  if (!isStorageAvailable()) return false;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearAppData() {
  if (!isStorageAvailable()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}
