"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LayoutDashboard, Link2, MessageSquare, Settings, Droplets, FileText, Lightbulb, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", labelKey: "appNav.dashboard", icon: LayoutDashboard },
  { href: "/sources", labelKey: "appNav.sources", icon: Link2 },
  { href: "/skin", labelKey: "appNav.skin", icon: Droplets },
  { href: "/coach", labelKey: "appNav.coach", icon: MessageSquare },
  { href: "/reports", labelKey: "appNav.reports", icon: FileText },
  { href: "/insights", labelKey: "appNav.insights", icon: Lightbulb },
  { href: "/leaderboard", labelKey: "appNav.leaderboard", icon: Trophy },
  { href: "/settings", labelKey: "appNav.settings", icon: Settings }
];



export function AppSidebar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <aside className="hidden w-[280px] shrink-0 border-r bg-background/60 backdrop-blur lg:block">
      <div className="p-4">
        <Link href={`/${locale}`} className="block">
          <div className="rounded-2xl border bg-muted p-4">
            <div className="text-sm text-muted-foreground">Unbranded Wellbeing</div>
            <div className="mt-1 text-lg font-semibold">Demo App</div>
            <div className="mt-2 text-xs text-muted-foreground">
              {t("demo")}
            </div>
          </div>
        </Link>

        <nav className="mt-4 space-y-1">
          {items.map((it) => {
            const full = `/${locale}${it.href}`;
            const active = pathname === full;

            return (
              <Link
                key={it.href}
                href={full}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                  active && "bg-muted text-foreground"
                )}
              >
                <it.icon className="h-4 w-4" />
                {t(it.labelKey)}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

