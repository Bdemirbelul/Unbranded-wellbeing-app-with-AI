"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { mockBlog } from "@/lib/mock";

const blogImages: Record<string, string> = {
  "the-recovery-loop": "/photos/1.png",
  "stress-without-guessing": "/photos/2.png",
  "skin-as-a-signal": "/photos/3.png",
};

export default function BlogPage() {
  const t = useTranslations("blog");
  
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      <div className="mb-12 text-center">
        <div className="text-sm text-muted-foreground font-medium mb-2">
          {t("subtitle")}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockBlog.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`}>
            <Card className="rounded-2xl overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl group h-full flex flex-col">
              {/* Image */}
              <div className="aspect-video relative overflow-hidden bg-muted">
                <Image
                  src={blogImages[p.slug] || "/photos/1.png"}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs text-white font-medium">
                    {new Date(p.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-full text-xs"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
                
                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {t(`posts.${p.slug}.title`)}
                </h2>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {t(`posts.${p.slug}.excerpt`)}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>5 {t("readTime")}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}


