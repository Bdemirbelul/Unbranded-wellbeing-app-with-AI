export type MetricPoint = { date: string; hrv: number; rhr: number; sleep: number; steps: number };

export type SyncRun = { id: string; startedAt: string; status: "success" | "partial" | "failed"; imported: number; errors: number };



export function mockMetrics(days = 60): MetricPoint[] {

  const out: MetricPoint[] = [];

  const now = new Date();

  let drift = 0;



  for (let i = days - 1; i >= 0; i--) {

    const d = new Date(now);

    d.setDate(now.getDate() - i);

    drift += (Math.random() - 0.5) * 0.35;



    const hrv = clamp(55 + drift + randn() * 6, 25, 110);

    const rhr = clamp(60 - (hrv - 55) * 0.08 + randn() * 1.8, 45, 85);

    const sleep = clamp(7 + randn() * 0.7, 4.5, 9.5);

    const steps = Math.round(clamp(8000 + randn() * 2200, 500, 18000));



    out.push({

      date: d.toISOString().slice(0, 10),

      hrv: round(hrv, 1),

      rhr: round(rhr, 1),

      sleep: round(sleep, 2),

      steps,

    });

  }

  return out;

}



export function computeScores(points: MetricPoint[]) {

  const last = points[points.length - 1];

  const recovery = Math.round(scale(last.hrv, 25, 110));

  const sleepScore = Math.round(clamp((last.sleep / 9) * 70 + 30, 0, 100));

  const stress = Math.round(clamp(100 - (last.hrv * 0.7 + (70 - last.rhr) * 1.5), 0, 100));

  const overall = Math.round(clamp(0.4 * recovery + 0.3 * sleepScore + 0.3 * (100 - stress), 0, 100));



  return { recovery, sleepScore, stress, overall };

}



export function mockSyncRuns(): SyncRun[] {

  const now = new Date();

  const runs: SyncRun[] = [];

  for (let i = 0; i < 10; i++) {

    const d = new Date(now);

    d.setDate(now.getDate() - i * 2);

    const status = i % 6 === 0 ? "partial" : "success";

    runs.push({

      id: `SYNC-${d.toISOString().slice(0, 10)}-${String(i).padStart(2, "0")}`,

      startedAt: `${d.toISOString().slice(0, 10)} 09:${String(10 + i).padStart(2, "0")}`,

      status,

      imported: 1200 - i * 55,

      errors: status === "success" ? 0 : 7 + i,

    });

  }

  return runs;

}



export const mockBlog = [

  {

    slug: "the-recovery-loop",

    title: "The Recovery Loop: HRV, Sleep, and Consistency",

    date: "2026-01-10",

    excerpt: "A practical framework to interpret HRV trends without overreacting to daily noise.",

    tags: ["HRV", "Sleep", "Training"],

  },

  {

    slug: "stress-without-guessing",

    title: "Stress Without Guessing: Turning Signals into Actions",

    date: "2026-01-06",

    excerpt: "How to connect subjective stress, resting heart rate, and sleep debt in a single view.",

    tags: ["Stress", "Habits"],

  },

  {

    slug: "skin-as-a-signal",

    title: "Skin as a Signal: A Simple Tracker That Actually Works",

    date: "2026-01-02",

    excerpt: "A minimal routine + trigger tracking beats complex plans you won't follow.",

    tags: ["Skin", "Routine"],

  },

];

// Skin Health Types
export type SkinAnalysis = {
  id: string;
  date: string;
  imageUrl?: string;
  condition: number; // 1-5 scale
  issues: string[];
  score: number; // 0-100
  recommendations: string[];
  triggers?: string[];
};

export type SkinTrend = {
  date: string;
  condition: number;
  score: number;
};

export function mockSkinAnalyses(days = 30): SkinAnalysis[] {
  const analyses: SkinAnalysis[] = [];
  const now = new Date();
  const issues = ["acne", "dryness", "redness", "oiliness", "sensitivity"];
  const triggers = ["stress", "poor sleep", "dairy", "sugar", "new product", "hormonal"];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    
    const condition = Math.round(clamp(2 + randn() * 1.2, 1, 5));
    const score = Math.round(clamp(condition * 20 + randn() * 10, 20, 100));
    const numIssues = Math.floor(Math.random() * 2) + (condition >= 3 ? 1 : 0);
    const selectedIssues = issues.sort(() => 0.5 - Math.random()).slice(0, numIssues);
    const numTriggers = Math.floor(Math.random() * 2);
    const selectedTriggers = triggers.sort(() => 0.5 - Math.random()).slice(0, numTriggers);
    
    analyses.push({
      id: `SKIN-${d.toISOString().slice(0, 10)}`,
      date: d.toISOString().slice(0, 10),
      condition,
      issues: selectedIssues,
      score,
      recommendations: condition >= 3 ? [
        "Increase hydration",
        "Review skincare routine",
        "Monitor stress levels"
      ] : [
        "Maintain current routine",
        "Continue monitoring"
      ],
      triggers: selectedTriggers.length > 0 ? selectedTriggers : undefined,
    });
  }
  
  return analyses;
}

export function mockSkinTrends(days = 30): SkinTrend[] {
  const trends: SkinTrend[] = [];
  const now = new Date();
  let baseCondition = 3;
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    baseCondition += (Math.random() - 0.5) * 0.3;
    const condition = round(clamp(baseCondition, 1, 5), 1);
    const score = Math.round(clamp(condition * 20 + randn() * 8, 20, 100));
    
    trends.push({
      date: d.toISOString().slice(0, 10),
      condition,
      score,
    });
  }
  
  return trends;
}

// Reports Types
export type WeeklyReport = {
  week: string;
  startDate: string;
  endDate: string;
  avgHRV: number;
  avgSleep: number;
  avgStress: number;
  avgRecovery: number;
  highlights: string[];
  improvements: string[];
  recommendations: string[];
};

export type MonthlyReport = {
  month: string;
  year: number;
  avgHRV: number;
  avgSleep: number;
  avgStress: number;
  avgRecovery: number;
  trends: {
    hrv: "improving" | "stable" | "declining";
    sleep: "improving" | "stable" | "declining";
    stress: "improving" | "stable" | "declining";
  };
  highlights: string[];
  goals: {
    achieved: string[];
    inProgress: string[];
  };
  recommendations: string[];
};

export function mockWeeklyReports(weeks = 8): WeeklyReport[] {
  const reports: WeeklyReport[] = [];
  const now = new Date();
  
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (i * 7 + now.getDay()));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const avgHRV = round(55 + randn() * 8, 1);
    const avgSleep = round(7.2 + randn() * 0.6, 1);
    const avgStress = round(35 + randn() * 15, 0);
    const avgRecovery = round(70 + randn() * 15, 0);
    
    reports.push({
      week: `Week ${weeks - i}`,
      startDate: weekStart.toISOString().slice(0, 10),
      endDate: weekEnd.toISOString().slice(0, 10),
      avgHRV,
      avgSleep,
      avgStress,
      avgRecovery,
      highlights: [
        `Average HRV: ${avgHRV}ms`,
        `Sleep quality improved`,
        `Stress levels stable`
      ],
      improvements: [
        "Consistent sleep schedule",
        "Better recovery scores"
      ],
      recommendations: [
        "Maintain current routine",
        "Focus on sleep hygiene"
      ],
    });
  }
  
  return reports;
}

export function mockMonthlyReports(months = 3): MonthlyReport[] {
  const reports: MonthlyReport[] = [];
  const now = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const avgHRV = round(55 + randn() * 8, 1);
    const avgSleep = round(7.2 + randn() * 0.6, 1);
    const avgStress = round(35 + randn() * 15, 0);
    const avgRecovery = round(70 + randn() * 15, 0);
    
    reports.push({
      month: monthDate.toLocaleString("en-US", { month: "long" }),
      year: monthDate.getFullYear(),
      avgHRV,
      avgSleep,
      avgStress,
      avgRecovery,
      trends: {
        hrv: i === 0 ? "improving" : i === 1 ? "stable" : "declining",
        sleep: i === 0 ? "stable" : "improving",
        stress: i === 0 ? "improving" : "stable",
      },
      highlights: [
        `HRV trend: ${i === 0 ? "improving" : "stable"}`,
        `Sleep consistency improved`,
        `Recovery scores above baseline`
      ],
      goals: {
        achieved: ["8h sleep target", "Stress management"],
        inProgress: ["HRV improvement", "Recovery optimization"]
      },
      recommendations: [
        "Continue current training load",
        "Focus on sleep quality",
        "Monitor stress patterns"
      ],
    });
  }
  
  return reports;
}

// Insights Types
export type Insight = {
  id: string;
  type: "pattern" | "recommendation" | "warning" | "achievement";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "hrv" | "sleep" | "stress" | "recovery" | "skin";
  date: string;
  actionable: boolean;
  actions?: string[];
};

// Leaderboard Types
export type LeaderboardUser = {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  change: number; // position change from last week
  metrics: {
    hrv: number;
    recovery: number;
    sleep: number;
    consistency: number;
  };
  streak: number; // days of consecutive tracking
  badge?: "gold" | "silver" | "bronze";
};

export function mockLeaderboard(): LeaderboardUser[] {
  const users: LeaderboardUser[] = [
    {
      id: "user-1",
      name: "Sarah Chen",
      avatar: "/photos/4.png",
      score: 2847,
      rank: 1,
      change: 0,
      metrics: {
        hrv: 68.5,
        recovery: 92,
        sleep: 8.2,
        consistency: 98,
      },
      streak: 45,
      badge: "gold",
    },
    {
      id: "user-2",
      name: "Marcus Rodriguez",
      avatar: "/photos/5.png",
      score: 2734,
      rank: 2,
      change: 1,
      metrics: {
        hrv: 65.2,
        recovery: 88,
        sleep: 7.8,
        consistency: 95,
      },
      streak: 38,
      badge: "silver",
    },
    {
      id: "user-3",
      name: "Emma Thompson",
      avatar: "/photos/6.png",
      score: 2651,
      rank: 3,
      change: -1,
      metrics: {
        hrv: 63.8,
        recovery: 85,
        sleep: 7.9,
        consistency: 92,
      },
      streak: 42,
      badge: "bronze",
    },
    {
      id: "user-4",
      name: "Alex Johnson",
      avatar: "/photos/7.png",
      score: 2589,
      rank: 4,
      change: 2,
      metrics: {
        hrv: 62.1,
        recovery: 82,
        sleep: 7.6,
        consistency: 89,
      },
      streak: 31,
    },
    {
      id: "user-5",
      name: "Demo User",
      avatar: "/photos/1.png",
      score: 2456,
      rank: 5,
      change: 0,
      metrics: {
        hrv: 58.3,
        recovery: 75,
        sleep: 7.2,
        consistency: 85,
      },
      streak: 28,
    },
    {
      id: "user-6",
      name: "Lisa Wang",
      avatar: "/photos/4.png",
      score: 2389,
      rank: 6,
      change: -2,
      metrics: {
        hrv: 56.7,
        recovery: 78,
        sleep: 7.4,
        consistency: 87,
      },
      streak: 25,
    },
    {
      id: "user-7",
      name: "David Kim",
      avatar: "/photos/5.png",
      score: 2312,
      rank: 7,
      change: 1,
      metrics: {
        hrv: 55.2,
        recovery: 72,
        sleep: 7.1,
        consistency: 83,
      },
      streak: 22,
    },
    {
      id: "user-8",
      name: "Sophie Martin",
      avatar: "/photos/6.png",
      score: 2245,
      rank: 8,
      change: -1,
      metrics: {
        hrv: 54.8,
        recovery: 70,
        sleep: 6.9,
        consistency: 80,
      },
      streak: 19,
    },
    {
      id: "user-9",
      name: "James Wilson",
      avatar: "/photos/7.png",
      score: 2189,
      rank: 9,
      change: 0,
      metrics: {
        hrv: 53.5,
        recovery: 68,
        sleep: 6.8,
        consistency: 78,
      },
      streak: 16,
    },
    {
      id: "user-10",
      name: "Maria Garcia",
      avatar: "/photos/4.png",
      score: 2123,
      rank: 10,
      change: 1,
      metrics: {
        hrv: 52.1,
        recovery: 65,
        sleep: 6.7,
        consistency: 75,
      },
      streak: 14,
    },
  ];

  return users;
}

export function mockInsights(): Insight[] {
  const now = new Date();
  return [
    {
      id: "INSIGHT-001",
      type: "pattern",
      title: "Sleep-Stress Correlation Detected",
      description: "Your stress levels consistently increase when sleep duration drops below 6.5 hours. This pattern has been observed 8 times in the last 30 days.",
      priority: "high",
      category: "sleep",
      date: now.toISOString().slice(0, 10),
      actionable: true,
      actions: [
        "Aim for 7-8 hours of sleep",
        "Maintain consistent bedtime",
        "Practice relaxation before sleep"
      ],
    },
    {
      id: "INSIGHT-002",
      type: "recommendation",
      title: "HRV Baseline Established",
      description: "Your HRV baseline is now established at 58ms. Values consistently above 65ms indicate excellent recovery, while values below 50ms suggest fatigue.",
      priority: "medium",
      category: "hrv",
      date: new Date(now.getTime() - 86400000).toISOString().slice(0, 10),
      actionable: true,
      actions: [
        "Monitor HRV trends weekly",
        "Adjust training based on HRV",
        "Track recovery patterns"
      ],
    },
    {
      id: "INSIGHT-003",
      type: "warning",
      title: "Recovery Score Declining",
      description: "Your recovery score has decreased by 15% over the past week. This may indicate accumulated fatigue or increased stress.",
      priority: "high",
      category: "recovery",
      date: new Date(now.getTime() - 2 * 86400000).toISOString().slice(0, 10),
      actionable: true,
      actions: [
        "Consider a deload week",
        "Prioritize sleep and recovery",
        "Review training load"
      ],
    },
    {
      id: "INSIGHT-004",
      type: "achievement",
      title: "Consistent Sleep Streak",
      description: "You've maintained 7+ hours of sleep for 12 consecutive days. This is your longest streak this month!",
      priority: "low",
      category: "sleep",
      date: new Date(now.getTime() - 3 * 86400000).toISOString().slice(0, 10),
      actionable: false,
    },
    {
      id: "INSIGHT-005",
      type: "pattern",
      title: "Skin-Stress Link Identified",
      description: "Breakouts occur 2-3 days after periods of elevated stress. This correlation has been observed 5 times in the last month.",
      priority: "medium",
      category: "skin",
      date: new Date(now.getTime() - 4 * 86400000).toISOString().slice(0, 10),
      actionable: true,
      actions: [
        "Monitor stress levels",
        "Use stress management techniques",
        "Adjust skincare routine during stress"
      ],
    },
    {
      id: "INSIGHT-006",
      type: "recommendation",
      title: "Optimal Training Window",
      description: "Your HRV and recovery scores are highest on Tuesdays and Thursdays. Consider scheduling intense training on these days.",
      priority: "medium",
      category: "hrv",
      date: new Date(now.getTime() - 5 * 86400000).toISOString().slice(0, 10),
      actionable: true,
      actions: [
        "Plan intense sessions for optimal days",
        "Schedule recovery on low HRV days",
        "Track performance correlation"
      ],
    },
  ];
}



// ---------- helpers ----------

function randn() {

  // Box–Muller

  let u = 0, v = 0;

  while (u === 0) u = Math.random();

  while (v === 0) v = Math.random();

  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

}

function clamp(x: number, a: number, b: number) {

  return Math.max(a, Math.min(b, x));

}

function round(x: number, n = 0) {

  const p = Math.pow(10, n);

  return Math.round(x * p) / p;

}

function scale(x: number, a: number, b: number) {

  return clamp(((x - a) / (b - a)) * 100, 0, 100);

}

