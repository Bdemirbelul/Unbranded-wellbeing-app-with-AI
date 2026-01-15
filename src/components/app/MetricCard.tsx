import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  gradient,
}: {
  title: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  gradient?: string;
}) {
  const TrendIcon =
    trend === "up"
      ? TrendingUp
      : trend === "down"
      ? TrendingDown
      : Minus;

  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
      ? "text-red-600"
      : "text-muted-foreground";

  return (
    <Card
      className={`rounded-2xl p-6 border-2 hover:shadow-lg transition-all ${
        gradient
          ? `bg-gradient-to-br ${gradient} border-transparent`
          : "bg-card/50 backdrop-blur"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        {trend && (
          <TrendIcon className={`h-4 w-4 ${trendColor}`} />
        )}
      </div>
      <div className="text-4xl font-bold tracking-tight mb-2">{value}</div>
      {subtitle && (
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      )}
    </Card>
  );
}

