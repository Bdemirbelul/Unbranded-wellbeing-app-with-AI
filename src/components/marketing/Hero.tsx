"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Heart, Brain, Droplets, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30">
      {/* Premium gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-[-150px] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-400/20 via-teal-400/15 to-indigo-400/20 blur-3xl animate-pulse" />
        <div className="absolute right-1/4 top-[-100px] h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-purple-400/15 via-pink-400/10 to-rose-400/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-xs font-medium">
              <TrendingUp className="h-3 w-3 mr-1.5 inline" />
              {t("badge")}
            </Badge>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                {t("title")}
                <span className="block bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                  {t("titleHighlight")}
                </span>
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-2xl">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-2xl px-8 h-14 text-base font-medium shadow-lg hover:shadow-xl transition-all">
                <Link href="/login">
                  {t("ctaPrimary")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-2xl px-8 h-14 text-base font-medium border-2">
                <Link href="/blog">{t("ctaSecondary")}</Link>
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <Card className="rounded-2xl p-5 border-2 hover:border-primary/50 transition-all hover:shadow-lg bg-card/50 backdrop-blur">
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 p-3 w-fit">
                    <Heart className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-base">{t("features.recovery.title")}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {t("features.recovery.description")}
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="rounded-2xl p-5 border-2 hover:border-primary/50 transition-all hover:shadow-lg bg-card/50 backdrop-blur">
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-3 w-fit">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-base">{t("features.mental.title")}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {t("features.mental.description")}
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="rounded-2xl p-5 border-2 hover:border-primary/50 transition-all hover:shadow-lg bg-card/50 backdrop-blur">
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-3 w-fit">
                    <Droplets className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-base">{t("features.skin.title")}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {t("features.skin.description")}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-border/50">
              <div className="aspect-[4/5] relative bg-gradient-to-br from-cyan-50 via-teal-50 to-indigo-50">
                <Image
                  src="/photos/1.png"
                  alt="Wellbeing app user"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/30 to-teal-400/30 blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}


