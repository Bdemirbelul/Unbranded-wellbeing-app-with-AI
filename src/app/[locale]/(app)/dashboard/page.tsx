import { MetricCard } from "@/components/app/MetricCard";

import { ChartCard } from "@/components/app/ChartCard";

import { Card } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { mockMetrics, computeScores } from "@/lib/mock";



export default function DashboardPage() {

  const points = mockMetrics(60);

  const scores = computeScores(points);

  const last = points[points.length - 1];

  const prev = points[points.length - 2];



  const insights: string[] = [];

  if (last.hrv < prev.hrv - 5) insights.push("HRV dropped vs yesterday — consider a lighter day.");

  if (last.sleep < 6.5) insights.push("Sleep was short — recovery may be impacted.");

  if (last.rhr > prev.rhr + 2) insights.push("RHR increased — a fatigue/stress signal.");

  if (insights.length === 0) insights.push("Signals look stable — keep your routine consistent.");



  return (

    <div className="space-y-6">

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <div className="text-sm text-muted-foreground">Dashboard</div>

          <h1 className="text-2xl font-semibold tracking-tight">Today overview</h1>

        </div>

        <Badge variant="secondary" className="rounded-full">Sample data · Demo</Badge>

      </div>



      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Recovery"
          value={`${scores.recovery}`}
          subtitle="HRV-based readiness score"
          trend={scores.recovery > 70 ? "up" : scores.recovery < 50 ? "down" : "neutral"}
          gradient="from-cyan-500/10 to-teal-500/10"
        />
        <MetricCard
          title="Stress"
          value={`${scores.stress}`}
          subtitle="Lower is better"
          trend={scores.stress < 30 ? "up" : scores.stress > 60 ? "down" : "neutral"}
          gradient="from-purple-500/10 to-pink-500/10"
        />
        <MetricCard
          title="Sleep"
          value={`${scores.sleepScore}`}
          subtitle={`${last.sleep}h last night`}
          trend={scores.sleepScore > 75 ? "up" : scores.sleepScore < 60 ? "down" : "neutral"}
          gradient="from-blue-500/10 to-indigo-500/10"
        />
        <MetricCard
          title="Overall"
          value={`${scores.overall}`}
          subtitle="Weighted composite score"
          trend={scores.overall > 75 ? "up" : scores.overall < 60 ? "down" : "neutral"}
          gradient="from-green-500/10 to-emerald-500/10"
        />
      </div>



      <div className="grid gap-4 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <ChartCard title="HRV trend (ms)" data={points} dataKey="hrv" yLabel="ms" />

        </div>

        <Card className="rounded-2xl p-6 border-2 bg-card/50 backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Today&apos;s insights</h3>
            <Badge variant="secondary" className="rounded-full text-xs">
              AI-generated
            </Badge>
          </div>

          <div className="space-y-3 mb-6">
            {insights.map((x, i) => (
              <div
                key={i}
                className="rounded-xl border-2 bg-gradient-to-r from-muted/50 to-muted/30 p-4 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {x}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t">
            <div className="text-sm font-medium text-muted-foreground mb-3">
              Quick snapshot
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border-2 p-4 bg-gradient-to-br from-cyan-500/5 to-teal-500/5">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  HRV
                </div>
                <div className="text-xl font-bold">{last.hrv}</div>
                <div className="text-xs text-muted-foreground">ms</div>
              </div>
              <div className="rounded-xl border-2 p-4 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  RHR
                </div>
                <div className="text-xl font-bold">{last.rhr}</div>
                <div className="text-xs text-muted-foreground">bpm</div>
              </div>
              <div className="rounded-xl border-2 p-4 bg-gradient-to-br from-blue-500/5 to-indigo-500/5">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  Sleep
                </div>
                <div className="text-xl font-bold">{last.sleep}</div>
                <div className="text-xs text-muted-foreground">hours</div>
              </div>
              <div className="rounded-xl border-2 p-4 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  Steps
                </div>
                <div className="text-xl font-bold">
                  {last.steps.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">today</div>
              </div>
            </div>
          </div>
        </Card>

      </div>



      <div className="grid gap-4 lg:grid-cols-2">

        <ChartCard title="Sleep trend (hours)" data={points} dataKey="sleep" yLabel="hours" />

        <ChartCard title="Resting HR trend (bpm)" data={points} dataKey="rhr" yLabel="bpm" />

      </div>

    </div>

  );

}

