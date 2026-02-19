import type { TextureLevel } from "@/lib/types";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/risk-check", label: "Quick Risk Check" },
  { to: "/toolkit", label: "Daily Toolkit" },
  { to: "/dashboard", label: "Progress Dashboard" },
  { to: "/knowledge-base", label: "Knowledge Base" },
  { to: "/counselor", label: "Counselor" }
] as const;

export const riskQuestions: Array<{ key: string; label: string; hint: string }> = [
  {
    key: "coughingWhileEating",
    label: "I cough while eating or drinking.",
    hint: "Frequent cough during meals can indicate swallowing discoordination."
  },
  {
    key: "foodStuckFeeling",
    label: "I feel food getting stuck in my throat/chest.",
    hint: "Persistent stuck sensation should be discussed with a specialist."
  },
  {
    key: "painWhileSwallowing",
    label: "I feel pain when swallowing.",
    hint: "Pain can signal irritation or dysfunction in swallow pathway."
  },
  {
    key: "wetVoiceAfterMeals",
    label: "My voice sounds wet/gurgly after meals.",
    hint: "Wet voice after swallowing may need professional assessment."
  },
  {
    key: "unplannedWeightLoss",
    label: "I am losing weight without trying.",
    hint: "Unintentional weight loss can signal reduced safe intake."
  },
  {
    key: "dehydrationSigns",
    label: "I often feel dry mouth, dark urine, or dehydration.",
    hint: "Dehydration may happen when liquids are hard to swallow."
  },
  {
    key: "recurrentChestInfection",
    label: "I have recurrent chest infection / pneumonia episodes.",
    hint: "This is a red flag and should be escalated urgently."
  },
  {
    key: "frequentChoking",
    label: "I have frequent choking episodes.",
    hint: "Frequent choking is a red flag requiring urgent support."
  }
];

export const textureGuidance: Record<
  TextureLevel,
  {
    title: string;
    safeFoods: string[];
    avoidFoods: string[];
    hydrationTip: string;
  }
> = {
  "soft-bite-sized": {
    title: "Soft & Bite-Sized (easy chewing)",
    safeFoods: [
      "Soft idli with sambar (strained pieces)",
      "Moist poha with extra curd",
      "Khichdi with mashed vegetables",
      "Ripe banana mashed with dahi"
    ],
    avoidFoods: ["Dry chapati rolls", "Hard pakoda", "Nuts/seeds", "Dry biscuits"],
    hydrationTip: "Sip frequently during meals and maintain upright posture."
  },
  "minced-moist": {
    title: "Minced & Moist (minimal chewing)",
    safeFoods: [
      "Finely mashed upma with extra moisture",
      "Minced paneer bhurji in gravy",
      "Soft dal-rice mash",
      "Curd rice with mashed vegetables"
    ],
    avoidFoods: ["Chunky biryani", "Raw salad", "Dry fried snacks", "Whole grapes"],
    hydrationTip: "Use thick soups or buttermilk if thin liquids trigger coughing."
  },
  pureed: {
    title: "Pureed (smooth no lumps)",
    safeFoods: [
      "Pureed dal soup",
      "Smooth vegetable puree",
      "Blended paneer curry",
      "Smooth kheer without dry fruits"
    ],
    avoidFoods: ["Rice grains", "Mixed textures", "Leafy stems", "Coconut pieces"],
    hydrationTip: "Pair purees with prescribed thickened liquids if required."
  },
  "thickened-liquid": {
    title: "Thickened Liquids (IDDSI-style consistency support)",
    safeFoods: [
      "Thick lassi (no chunks)",
      "Thickened soups",
      "Smooth fruit pulp drinks",
      "Oral hydration drinks with prescribed thickener"
    ],
    avoidFoods: ["Watery tea", "Thin soups", "Plain water gulping", "Ice cubes"],
    hydrationTip: "Use measured thickening guidance from your SLP."
  }
};

export const exerciseGuidance = {
  airwayProtection: {
    title: "Airway Protection Focus",
    drills: [
      "Effortful swallow: 5 reps x 2 sets",
      "Chin tuck swallow trial under guidance",
      "Breath hold + swallow coordination drill"
    ],
    caution: "Only practice with professional confirmation that these are suitable for you."
  },
  tongueBase: {
    title: "Tongue Base Strength Focus",
    drills: [
      "Masako maneuver: 3-5 supervised reps",
      "Tongue press to palate: 10 reps",
      "Controlled saliva swallows with pauses"
    ],
    caution: "Stop immediately if pain, dizziness, or severe cough occurs."
  },
  laryngealElevation: {
    title: "Laryngeal Elevation Focus",
    drills: [
      "Mendelsohn maneuver: 3-5 guided holds",
      "Pitch glide voice warm-up",
      "Gentle breath support coordination"
    ],
    caution: "Do not self-progress repetitions without therapist direction."
  }
} as const;

export const faqEntries = [
  {
    id: "faq-1",
    category: "diet",
    question: "Can I eat normal chapati if I have swallowing difficulty?",
    answer:
      "Dry chapati is often difficult. Moistening it in dal/gravy or shifting to softer alternatives is safer until assessed."
  },
  {
    id: "faq-2",
    category: "safety",
    question: "When should I urgently contact a counselor or doctor?",
    answer:
      "Frequent choking, repeated chest infections, breathlessness during meals, or rapid weight loss are urgent escalation signs."
  },
  {
    id: "faq-3",
    category: "exercise",
    question: "Can I start swallowing exercises from the internet directly?",
    answer:
      "No. Exercises should be individualized. Wrong drill selection may worsen symptoms or increase aspiration risk."
  },
  {
    id: "faq-4",
    category: "hydration",
    question: "How can I stay hydrated if thin liquids trigger cough?",
    answer:
      "Use prescribed thickened liquids, smaller sip volumes, and slower pace. Discuss exact consistency with your SLP."
  },
  {
    id: "faq-5",
    category: "family",
    question: "How can family members help at home?",
    answer:
      "They can support upright posture, texture-modified meal prep, pacing reminders, and symptom log tracking."
  }
] as const;
