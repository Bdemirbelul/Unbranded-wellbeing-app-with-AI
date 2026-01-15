"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Filter,
  Sparkles,
  Brain,
  Target,
  AlertCircle,
} from "lucide-react";
import { mockInsights, type Insight } from "@/lib/mock";
import { mockMetrics, computeScores } from "@/lib/mock";

export default function InsightsPage() {
  const t = useTranslations();
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "hrv" | "sleep" | "stress" | "recovery" | "skin"
  >("all");
  const allInsights = mockInsights();
  const metrics = mockMetrics(30);
  const scores = computeScores(metrics);

  const filteredInsights = allInsights.filter((insight) => {
    if (filter !== "all" && insight.priority !== filter) return false;
    if (categoryFilter !== "all" && insight.category !== categoryFilter) return false;
    return true;
  });

  const getInsightIcon = (type: Insight["type"]) => {
    switch (type) {
      case "pattern":
        return <Brain className="h-5 w-5 text-purple-600" />;
      case "recommendation":
        return <Lightbulb className="h-5 w-5 text-yellow-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "achievement":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    }
  };

  const getPriorityColor = (priority: Insight["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-50 text-green-700 border-green-200";
    }
  };

  const getCategoryColor = (category: Insight["category"]) => {
    switch (category) {
      case "hrv":
        return "bg-cyan-50 text-cyan-700";
      case "sleep":
        return "bg-indigo-50 text-indigo-700";
      case "stress":
        return "bg-orange-50 text-orange-700";
      case "recovery":
        return "bg-green-50 text-green-700";
      case "skin":
        return "bg-pink-50 text-pink-700";
    }
  };

  const insightsByCategory = {
    hrv: filteredInsights.filter((i) => i.category === "hrv").length,
    sleep: filteredInsights.filter((i) => i.category === "sleep").length,
    stress: filteredInsights.filter((i) => i.category === "stress").length,
    recovery: filteredInsights.filter((i) => i.category === "recovery").length,
    skin: filteredInsights.filter((i) => i.category === "skin").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">AI-Powered</div>
          <h1 className="text-2xl font-semibold tracking-tight">Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Personalized insights, patterns, and recommendations based on your data
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate New Insights
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Total Insights</div>
            <Brain className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-3xl font-semibold">{allInsights.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Active patterns</div>
        </Card>
        <Card className="rounded-2xl p-5 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">High Priority</div>
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-3xl font-semibold">
            {allInsights.filter((i) => i.priority === "high").length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Requires attention</div>
        </Card>
        <Card className="rounded-2xl p-5 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Actionable</div>
            <Target className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="text-3xl font-semibold">
            {allInsights.filter((i) => i.actionable).length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">With recommendations</div>
        </Card>
        <Card className="rounded-2xl p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Achievements</div>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-3xl font-semibold">
            {allInsights.filter((i) => i.type === "achievement").length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Milestones reached</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="rounded-xl"
            >
              All Priorities
            </Button>
            <Button
              variant={filter === "high" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("high")}
              className="rounded-xl"
            >
              High
            </Button>
            <Button
              variant={filter === "medium" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("medium")}
              className="rounded-xl"
            >
              Medium
            </Button>
            <Button
              variant={filter === "low" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("low")}
              className="rounded-xl"
            >
              Low
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 ml-auto">
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("all")}
              className="rounded-xl"
            >
              All Categories
            </Button>
            <Button
              variant={categoryFilter === "hrv" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("hrv")}
              className="rounded-xl"
            >
              HRV
            </Button>
            <Button
              variant={categoryFilter === "sleep" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("sleep")}
              className="rounded-xl"
            >
              Sleep
            </Button>
            <Button
              variant={categoryFilter === "stress" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("stress")}
              className="rounded-xl"
            >
              Stress
            </Button>
            <Button
              variant={categoryFilter === "recovery" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("recovery")}
              className="rounded-xl"
            >
              Recovery
            </Button>
            <Button
              variant={categoryFilter === "skin" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("skin")}
              className="rounded-xl"
            >
              Skin
            </Button>
          </div>
        </div>
      </Card>

      {/* Category Breakdown */}
      <div className="grid gap-4 sm:grid-cols-5">
        {Object.entries(insightsByCategory).map(([category, count]) => (
          <Card key={category} className="rounded-2xl p-4 text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-2 ${getCategoryColor(category as Insight["category"])}`}>
              <span className="text-lg font-semibold capitalize">{category[0]}</span>
            </div>
            <div className="text-2xl font-semibold">{count}</div>
            <div className="text-xs text-muted-foreground capitalize">{category}</div>
          </Card>
        ))}
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="font-medium text-lg">
            {filteredInsights.length} Insight{filteredInsights.length !== 1 ? "s" : ""}
          </div>
          <Badge variant="secondary" className="rounded-full">
            {filter === "all" ? "All" : filter} priority
          </Badge>
        </div>

        {filteredInsights.map((insight) => (
          <Card
            key={insight.id}
            className="rounded-2xl p-6 border-2 hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  {getInsightIcon(insight.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{insight.title}</h3>
                      <Badge
                        className={`rounded-full border ${getPriorityColor(insight.priority)}`}
                      >
                        {insight.priority}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`rounded-full capitalize ${getCategoryColor(insight.category)}`}
                      >
                        {insight.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">
                    {new Date(insight.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>

                {insight.actionable && insight.actions && insight.actions.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Recommended Actions</span>
                    </div>
                    <div className="space-y-2">
                      {insight.actions.map((action, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {insight.type === "achievement" && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="font-medium">Achievement Unlocked!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="rounded-2xl p-6 bg-gradient-to-br from-background to-muted/30">
        <div className="font-medium mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Insight Summary
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border p-4 bg-background/50">
            <div className="text-xs text-muted-foreground mb-1">Patterns Detected</div>
            <div className="text-xl font-semibold">
              {allInsights.filter((i) => i.type === "pattern").length}
            </div>
          </div>
          <div className="rounded-xl border p-4 bg-background/50">
            <div className="text-xs text-muted-foreground mb-1">Active Recommendations</div>
            <div className="text-xl font-semibold">
              {allInsights.filter((i) => i.type === "recommendation").length}
            </div>
          </div>
          <div className="rounded-xl border p-4 bg-background/50">
            <div className="text-xs text-muted-foreground mb-1">Warnings</div>
            <div className="text-xl font-semibold">
              {allInsights.filter((i) => i.type === "warning").length}
            </div>
          </div>
          <div className="rounded-xl border p-4 bg-background/50">
            <div className="text-xs text-muted-foreground mb-1">Success Rate</div>
            <div className="text-xl font-semibold">87%</div>
            <div className="text-xs text-green-600 mt-1">Above average</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

