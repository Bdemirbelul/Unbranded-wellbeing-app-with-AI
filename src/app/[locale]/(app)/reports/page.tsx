"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, TrendingUp, TrendingDown, Minus, FileText, BarChart3 } from "lucide-react";
import { ChartCard } from "@/components/app/ChartCard";
import { mockWeeklyReports, mockMonthlyReports, type WeeklyReport, type MonthlyReport } from "@/lib/mock";
import { mockMetrics, computeScores } from "@/lib/mock";

export default function ReportsPage() {
  const t = useTranslations();
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");
  const weeklyReports = mockWeeklyReports(8);
  const monthlyReports = mockMonthlyReports(3);
  const metrics = mockMetrics(30);
  const scores = computeScores(metrics);

  const handleExportPDF = (report: WeeklyReport | MonthlyReport) => {
    // Simulate PDF export
    alert(`Exporting ${viewMode === "weekly" ? "weekly" : "monthly"} report to PDF...`);
  };

  const getTrendIcon = (trend: "improving" | "stable" | "declining") => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Analytics</div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Comprehensive weekly and monthly reports on your wellbeing metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "weekly" ? "default" : "outline"}
            onClick={() => setViewMode("weekly")}
            className="rounded-xl"
          >
            Weekly
          </Button>
          <Button
            variant={viewMode === "monthly" ? "default" : "outline"}
            onClick={() => setViewMode("monthly")}
            className="rounded-xl"
          >
            Monthly
          </Button>
        </div>
      </div>

      {/* Current Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl p-5 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border-2">
          <div className="text-sm text-muted-foreground mb-1">Recovery Score</div>
          <div className="text-3xl font-semibold mb-2">{scores.recovery}/100</div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp className="h-3 w-3" />
            <span>+3% vs last week</span>
          </div>
        </Card>
        <Card className="rounded-2xl p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2">
          <div className="text-sm text-muted-foreground mb-1">Sleep Average</div>
          <div className="text-3xl font-semibold mb-2">{metrics[metrics.length - 1].sleep.toFixed(1)}h</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Minus className="h-3 w-3" />
            <span>Stable</span>
          </div>
        </Card>
        <Card className="rounded-2xl p-5 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2">
          <div className="text-sm text-muted-foreground mb-1">Stress Level</div>
          <div className="text-3xl font-semibold mb-2">{scores.stress}/100</div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingDown className="h-3 w-3" />
            <span>-5% vs last week</span>
          </div>
        </Card>
        <Card className="rounded-2xl p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2">
          <div className="text-sm text-muted-foreground mb-1">Overall Score</div>
          <div className="text-3xl font-semibold mb-2">{scores.overall}/100</div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <TrendingUp className="h-3 w-3" />
            <span>+2% vs last week</span>
          </div>
        </Card>
      </div>

      {/* Weekly Reports */}
      {viewMode === "weekly" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-medium text-lg">Weekly Reports</div>
            <Badge variant="secondary" className="rounded-full">
              {weeklyReports.length} weeks
            </Badge>
          </div>
          {weeklyReports.map((report, index) => (
            <Card key={index} className="rounded-2xl p-6 border-2 hover:border-primary/50 transition-colors">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-semibold text-lg mb-1">{report.week}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(report.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(report.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExportPDF(report)}
                      className="rounded-xl"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                    <div className="rounded-xl border p-4 bg-muted/30">
                      <div className="text-xs text-muted-foreground mb-1">Avg HRV</div>
                      <div className="text-xl font-semibold">{report.avgHRV}ms</div>
                    </div>
                    <div className="rounded-xl border p-4 bg-muted/30">
                      <div className="text-xs text-muted-foreground mb-1">Avg Sleep</div>
                      <div className="text-xl font-semibold">{report.avgSleep}h</div>
                    </div>
                    <div className="rounded-xl border p-4 bg-muted/30">
                      <div className="text-xs text-muted-foreground mb-1">Avg Stress</div>
                      <div className="text-xl font-semibold">{report.avgStress}/100</div>
                    </div>
                    <div className="rounded-xl border p-4 bg-muted/30">
                      <div className="text-xs text-muted-foreground mb-1">Avg Recovery</div>
                      <div className="text-xl font-semibold">{report.avgRecovery}/100</div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="font-medium mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Highlights
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {report.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Improvements
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {report.improvements.map((imp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-1.5 shrink-0" />
                            {imp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="font-medium mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Recommendations
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {report.recommendations.map((rec, i) => (
                        <Badge key={i} variant="secondary" className="rounded-full">
                          {rec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Monthly Reports */}
      {viewMode === "monthly" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-medium text-lg">Monthly Reports</div>
            <Badge variant="secondary" className="rounded-full">
              {monthlyReports.length} months
            </Badge>
          </div>
          {monthlyReports.map((report, index) => (
            <Card key={index} className="rounded-2xl p-6 border-2 hover:border-primary/50 transition-colors">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-semibold text-lg mb-1">
                        {report.month} {report.year}
                      </div>
                      <div className="text-sm text-muted-foreground">Monthly Summary</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExportPDF(report)}
                      className="rounded-xl"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                    <div className="rounded-xl border p-4 bg-muted/30">
                      <div className="text-xs text-muted-foreground mb-1">Avg HRV</div>
                      <div className="text-xl font-semibold mb-1">{report.avgHRV}ms</div>
                      <div className="flex items-center gap-1 text-xs">
                        {getTrendIcon(report.trends.hrv)}
                        <span className={report.trends.hrv === "improving" ? "text-green-600" : report.trends.hrv === "declining" ? "text-red-600" : "text-muted-foreground"}>
                          {report.trends.hrv}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl border p-4 bg-muted/30">
                      <div className="text-xs text-muted-foreground mb-1">Avg Sleep</div>
                      <div className="text-xl font-semibold mb-1">{report.avgSleep}h</div>
                      <div className="flex items-center gap-1 text-xs">
                        {getTrendIcon(report.trends.sleep)}
                        <span className={report.trends.sleep === "improving" ? "text-green-600" : report.trends.sleep === "declining" ? "text-red-600" : "text-muted-foreground"}>
                          {report.trends.sleep}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl border p-4 bg-muted/30">
                      <div className="text-xs text-muted-foreground mb-1">Avg Stress</div>
                      <div className="text-xl font-semibold mb-1">{report.avgStress}/100</div>
                      <div className="flex items-center gap-1 text-xs">
                        {getTrendIcon(report.trends.stress)}
                        <span className={report.trends.stress === "improving" ? "text-green-600" : report.trends.stress === "declining" ? "text-red-600" : "text-muted-foreground"}>
                          {report.trends.stress}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl border p-4 bg-muted/30">
                      <div className="text-xs text-muted-foreground mb-1">Avg Recovery</div>
                      <div className="text-xl font-semibold mb-1">{report.avgRecovery}/100</div>
                      <div className="text-xs text-muted-foreground">Overall</div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    <div>
                      <div className="font-medium mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Key Highlights
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {report.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Goals Progress
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Achieved</div>
                          <div className="flex flex-wrap gap-1">
                            {report.goals.achieved.map((goal, i) => (
                              <Badge key={i} variant="default" className="rounded-full text-xs">
                                {goal}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">In Progress</div>
                          <div className="flex flex-wrap gap-1">
                            {report.goals.inProgress.map((goal, i) => (
                              <Badge key={i} variant="secondary" className="rounded-full text-xs">
                                {goal}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="font-medium mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Recommendations for Next Month
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {report.recommendations.map((rec, i) => (
                        <Badge key={i} variant="secondary" className="rounded-full">
                          {rec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <Card className="rounded-2xl p-6">
        <div className="font-medium mb-4">Quick Statistics</div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Reports</div>
            <div className="text-2xl font-semibold">
              {weeklyReports.length + monthlyReports.length}
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-sm text-muted-foreground mb-1">Tracking Period</div>
            <div className="text-2xl font-semibold">
              {Math.floor((weeklyReports.length * 7) / 30)} months
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-sm text-muted-foreground mb-1">Consistency</div>
            <div className="text-2xl font-semibold">95%</div>
            <div className="text-xs text-green-600 mt-1">Excellent</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

