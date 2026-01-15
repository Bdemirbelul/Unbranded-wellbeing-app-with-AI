"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const LOCALES = ["en", "es", "tr", "pl"] as const;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("nav");

  const switchLocale = (newLocale: string) => {
    // next-intl'in router'ını kullanarak locale değiştir
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border bg-muted">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">Unbranded</div>
            <div className="text-xs text-muted-foreground">Wellbeing Web</div>
          </div>
          <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
            Demo
          </Badge>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            className="text-sm text-muted-foreground hover:text-foreground"
            href="/blog"
          >
            {t("blog")}
          </Link>
          <Link
            className="text-sm text-muted-foreground hover:text-foreground"
            href="/pricing"
          >
            {t("pricing")}
          </Link>
          <Link
            className="text-sm text-muted-foreground hover:text-foreground"
            href="/login"
          >
            {t("login")}
          </Link>
          <Button asChild size="sm" className="rounded-xl">
            <Link href="/register">{t("register")}</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LOCALES.map((l) => (
                <DropdownMenuItem 
                  key={l} 
                  onClick={() => switchLocale(l)}
                  className={locale === l ? "bg-muted" : ""}
                >
                  {l.toUpperCase()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="sm:hidden">
          <Button asChild size="sm" className="rounded-xl">
            <Link href="/register">{t("register")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


