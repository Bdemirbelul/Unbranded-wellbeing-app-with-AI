"use client";

import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    roleKey: "testimonials.roles.marathon",
    contentKey: "testimonials.content.sarah",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    roleKey: "testimonials.roles.tech",
    contentKey: "testimonials.content.marcus",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    roleKey: "testimonials.roles.yoga",
    contentKey: "testimonials.content.emma",
    rating: 5,
  },
];

export function Testimonials() {
  const t = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <div className="text-sm text-muted-foreground font-medium mb-2">
          {t("testimonials.subtitle")}
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {t("testimonials.title")}
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Card
            key={i}
            className="rounded-2xl p-6 border-2 hover:border-primary/50 transition-all hover:shadow-lg bg-card/50 backdrop-blur"
          >
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, j) => (
                <Star
                  key={j}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <Quote className="h-8 w-8 text-primary/30 mb-4" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              &quot;{t(testimonial.contentKey)}&quot;
            </p>
            <div>
              <div className="font-semibold text-sm">{testimonial.name}</div>
              <div className="text-xs text-muted-foreground">
                {t(testimonial.roleKey)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

