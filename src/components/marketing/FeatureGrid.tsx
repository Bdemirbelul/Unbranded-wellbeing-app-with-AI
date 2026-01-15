"use client";

import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import {
  Activity,
  Brain,
  Droplets,
  Languages,
  Link2,
  LineChart,
  Sparkles
} from "lucide-react";

const featureKeys = ["hrv", "mental", "physical", "skin", "connectors", "multilang"] as const;
const featureIcons = [LineChart, Brain, Activity, Droplets, Link2, Languages];
const featureGradients = [
  "from-cyan-500/10 to-teal-500/10",
  "from-purple-500/10 to-pink-500/10",
  "from-blue-500/10 to-indigo-500/10",
  "from-green-500/10 to-emerald-500/10",
  "from-orange-500/10 to-red-500/10",
  "from-violet-500/10 to-purple-500/10"
];
const featureIconColors = [
  "text-cyan-600",
  "text-purple-600",
  "text-blue-600",
  "text-green-600",
  "text-orange-600",
  "text-violet-600"
];

export function FeatureGrid() {
  const t = useTranslations("features");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground font-medium mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          {t("subtitle")}
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featureKeys.map((key, i) => {
          const Icon = featureIcons[i];
          return (
            <Card
              key={key}
              className="rounded-2xl p-6 border-2 hover:border-primary/50 transition-all hover:shadow-lg bg-card/50 backdrop-blur group"
            >
              <div className="flex flex-col gap-4">
                <div className={`rounded-xl bg-gradient-to-br ${featureGradients[i]} p-3 w-fit group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-6 w-6 ${featureIconColors[i]}`} />
                </div>
                <div>
                  <div className="font-semibold text-lg mb-2">{t(`items.${key}.title`)}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {t(`items.${key}.description`)}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}


